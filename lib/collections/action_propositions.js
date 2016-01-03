/***
 * ideas and such pitched to the crowd and subsequently voted on
 */

ActionPropositions = new Mongo.Collection('propositions');

ActionPropositions.schema = new SimpleSchema({
    actionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "action Id"}
    , type: {type: String, label: "proposition type"}
    , actorId:{type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "actor Id"}
    , upVotes: {type: Number, optional: true, defaultValue: 0, label: "up Votes"}
    , downVotes: {type: Number, optional: true, defaultValue: 0, label: "down Votes"} // if this situation gets too many downvotes, get rid of it
    , description: {type: String, optional: false, label: "description"}
    , voters: {type: [String], optional: true, label:"voters"}
    , carried: {type: Boolean, optional: true, defaultValue: false, label:"proposition carried"}
    , closed: {type:Boolean, optional: true, defaultValue: false, label:"proposition closed"}
    , fromBlackballedActor: {type: Boolean, defaultValue:false, optional: true, label: "blackballed user"} // want to know what the bad actors are proposing the crowd does
    , createdDT: {type: Date, defaultValue: new Date(), optional: true, label: "Created Date"}
});

// attach the schema so that each cud op checks the validity of the doc (aldeed)
ActionPropositions.attachSchema(ActionPropositions.schema);

if (Meteor.isServer)
{
    ActionPropositions._ensureIndex({ actionId: 1, type: 1});
};


Meteor.methods({

    "createProposition": (userId, propositionDatum)  => {

        check(Meteor.userId(), String);

        check(propositionDatum, {
            actionId: String
            , actorId: String
            , type: String
            , description:String
        });

        let {actorId, actionId} = propositionDatum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {
            // add the current date, and user info
            propositionDatum.createdDT = new Date();
            propositionDatum.fromBlackballedActor = actor.blackballed;

            ActionPropositions.schema.validate(propositionDatum);
            ActionPropositions.insert(propositionDatum);

            // normalize the datum and write to the action message stream
            ActionMessageUtilities.createStandardActionMessage(RiseSharedConstants.Propositions, propositionDatum, RiseSharedConstants.ActionMessages.Categories.INTELLIGENCE);

        }

    },

    "voteProposition": (userId, voteDatum) => {
        debugger;
        check(Meteor.userId(), String);

        check(voteDatum, {
            actionId: String
            , actorId: String
            , propositionId: String
            , supported: Boolean
        });

        let {actorId, actionId, propositionId, supported} = voteDatum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {
            // check to see if this actor has voted
            if ( ActionPropositionUtilities.actorHasVoted(propositionId, actorId) ) {
                console.log(`${actorId} has tried to vote more than once on ${propositionId}`);
            } else {
                let selector = {_id: propositionId}
                , modifier = {$inc:{downVotes: 1}, $push:{voters: actorId}} // assume a no vote
                ;
                if ( supported ) {
                    modifier = {$inc:{upVotes: 1}, $push:{voters: actorId}};
                }
                ActionPropositions.update(selector, modifier);

                // don't message the fact that this actor has voted, but check for a simple majority and message that result
                if( Meteor.isServer ) {
                    let res = ActionPropositionUtilities.checkForSimpleMajority(propositionId);

                    if ( res && res.closed ) {
                        // normalize the datum and write to the action message stream
                        let voteResult = (res.carried) ? 'won': 'lost'
                            , description = `vote for ${res.description} has ${voteResult} a simple majority vote with a participation rate of ${res.participationPercent.toFixed(2)} percent.  Let's do it!`
                            , datum = {type: res.type, description: description, actionId: actionId, actorId: actorId, isAdministrative: true}
                        ;

                        ActionMessageUtilities.createStandardActionMessage(RiseSharedConstants.Propositions, datum, RiseSharedConstants.ActionMessages.Categories.INTELLIGENCE);
                    }

                };
            }
        }


    }
});

ActionPropositionUtilities = {};

ActionPropositionUtilities.actorHasVoted = (propositionId, actorId) => {
    let selector = {
        _id: propositionId
        , voters: actorId
    };

    let proposition = ActionPropositions.findOne(selector);

    return !!proposition;
};

/**
 * check to see if there is consensus and then do smart things.
 * @param propositionId
 */
ActionPropositionUtilities.checkForSimpleMajority = (propositionId) => {

    // get the vote counts
    let selector = {
        _id: propositionId
    };
    let proposition = ActionPropositions.findOne(selector);
    if ( !!proposition ){
        let {actionId, upVotes, downVotes, type, description } = proposition
            , totalVotesCast = upVotes + downVotes
            ;

        // get number of online, non-blackballed actors in the action
        let actorsInAction = ActorUtilities.countActiveActorsInAction(actionId)
            , simpleMajority = Math.floor(actorsInAction / 2) + 1
            , carried = upVotes >= simpleMajority
            , closed = carried || (downVotes >= simpleMajority)
        ;

        if (closed) {
            ActionPropositionUtilities.closeProposition(propositionId, carried);
        }

        return ({
            type: type
            , description: description
            , carried: carried
            , closed: closed
            , totalVotesCast: totalVotesCast
            , totalActors: actorsInAction
            , participationPercent: (totalVotesCast/actorsInAction) * 100
            , positivePercent: (upVotes/actorsInAction) * 100
        });

    }





};

ActionPropositionUtilities.closeProposition = (propositionId, carried) => {
    let selector = {_id: propositionId, closed: false}
        , modifier = {$set: {carried: carried, closed: true}}
    ;

    ActionPropositions.update(selector, modifier)


};








