/**
 * the folks who are participating in a given action
 * todo: define schema explicitly
 */

Actors = new Mongo.Collection('actors');

//schema
Actors.schema = new SimpleSchema({
    actionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "action Id"}
    , latLng:  {type: [Number], minCount: 2, maxCount: 2, decimal:true, optional: false, label:"LatLng"}
    , latLngSetAt: {type: Date, defaultValue: new Date(), optional: true, label: "LatLng set date"}
    , userId: {type: String, regEx: SimpleSchema.RegEx.Id, label: "user id"}
    , handleName: {type: String, optional: true, defaultValue: "Anonymous", label: "handle name"}
    , mood: {type: Number, min: -2, max:2, optional: true, label: "mood"}
    , SOS: {type: String, optional: true, label: "sos"}
    , online: {type: Boolean, defaultValue: true, optional: true, label: "onLine"}
    , blackballed: {type: Boolean, defaultValue: false, optional: true, label: "blackballed"}
    , upVotes:  {type: Number,  optional: true, defaultValue: 0, label: "up Votes"}
    , downVotes: {type: Number,  optional: true, defaultValue: 0, label: "down Votes"}
    , createdDT: {type: Date, defaultValue: new Date(), optional: true, label: "Created Date"}
    , lastMessage: {type: String, optional: true, label: "last message"} // sure, this could be an array of messages made, but why?  We want the data to be ephemeral in this app
    //, cast: {type: [String]}
    //, skills:  {type: [String]}
});

Actors.attachSchema(Actors.schema);

if (Meteor.isServer) {
    Actors._ensureIndex({ actionId: 1 });
}



Meteor.methods({

    "createActorHandle": (userId, actorDatum)  => {

        check(Meteor.userId(), String);

        check(actorDatum, {
            actionId: String
            , actorId: String
            , handleName: String
        });

        let {actorId, actionId, handleName} = actorDatum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {
            // update the situation.
            let updater = {};
            updater.handleName = handleName;

            let  selector = {_id: actorId}
                , modifier = {$set: updater}
                ;

            Actors.update(selector, modifier);

            // normalize the datum and write to the action message stream
            actorDatum.type="NEW";
            actorDatum.description = `${handleName} has joined the action. \n (welcome ${handleName}!)`;

            ActionMessageUtilities.createStandardActionMessage(null, actorDatum, RiseSharedConstants.ActionMessages.Categories.ACTOR);

        }

    },

    "cancelActorSOS": (userId, SOSDatum) => {
        //debugger;
        check(Meteor.userId(), String);

        check(SOSDatum, {
            actionId: String
            , actorId: String
        });

        let {actorId, actionId, type} = SOSDatum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {
            // update the situation.
            let updater = {};
            updater.SOS = '';


            let  selector = {_id: actorId}
                , modifier = {$unset: updater}
                ;

            Actors.update(selector, modifier);

            // normalize the datum and write to the action message stream
            SOSDatum.type="RESOLVED";
            SOSDatum.description = "The SOS has been resolved, thanks.";
            ActionMessageUtilities.createStandardActionMessage(RiseSharedConstants.SOS, SOSDatum, RiseSharedConstants.ActionMessages.Categories.ACTOR);



        }


    },

    "sendActorSOS": (userId, SOSDatum) => {
        debugger;
        check(Meteor.userId(), String);

        check(SOSDatum, {
            actionId: String
            , actorId: String
            , type: String
            , description: Match.Optional(String)
        });

        let {actorId, actionId, type} = SOSDatum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {
            // update the situation.
            let updater = {};
            updater.SOS = type;
            updater.createdDT = new Date();

            if (!!SOSDatum.description) {
                updater.lastMessage = SOSDatum.description;
            }


            let selector = {_id: actorId}
                , modifier = {$set: updater}
                ;

            Actors.update(selector, modifier);

            // write to the action message stream
            ActionMessageUtilities.createStandardActionMessage(RiseSharedConstants.SOS, SOSDatum, RiseSharedConstants.ActionMessages.Categories.EMERGENCY);
        }
    },

    "actorLeave": (userId, datum) => {
        debugger;
        check(Meteor.userId(), String);

        check(datum, {
            actionId: String
            , actorId: String
            , description: Match.Optional(String)
        });

        let {actorId, actionId, description} = datum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {
            let handle = ActorUtilities.getActorHandle(actorId);

            let selector = {_id: actorId};
            Actors.remove(selector);

            // write to the action message stream
            datum.type="LOGOUT"
            datum.description = `${handle} is leaving the action now... \n ${description} `;
            ActionMessageUtilities.createStandardActionMessage(null, datum, RiseSharedConstants.ActionMessages.Categories.ACTOR);
        }
    }
});



ActorUtilities = {};
/**
 * check to make sure that the user is associated with the actor
 * @param actorId
 * @param userId
 * @param actionId
 */
ActorUtilities.getConfirmedActor = (actorId, actionId, userId) => {

    if (userId = Meteor.userId()) {

        // confirm also that the actor sent matches the user sending...
        // but will only do this on the server
        if (Meteor.isServer) {

            let actorUser = Actors.findOne({_id: actorId, actionId: actionId, userId: userId});

            if (!actorUser) {
                // todo: so now what to do?   Probably, if I trusted the code to be perfect and perfectly tested
                // i'd set the actor records for this userId to blackballed, since it appears that they are spoofing
                // an actor that does not belong to them.  Let's just raise an error for now until I can poke this a bit
                // more.
                let errMsg = `The actorId sent ${actorId} does not belong to the sending user ${userId}`;
                console.log(errMsg);
                throw new Meteor.Error(403, errMsg);
            } else {
                return actorUser
            }

        } else {
            // if just on the client, we'll return the actor
            // and eat any errors so as to subtly mislead any attackers
            return Actors.findOne({_id: actorId, actionId: actionId});
        }

    }

};

ActorUtilities.getActorHandle = (actorId) => {
    let actor = Actors.findOne({_id: actorId});
    return (actor && actor.handleName) || 'Anonymous';
};

ActorUtilities.getActorLatLng = (actorId) => {
    let actor = Actors.findOne({_id: actorId});
    return (actor && actor.latLng) || '[0,0]'; // or santa
};

ActorUtilities.hasSOS = (actorId) => {
    let actor = Actors.findOne({_id: actorId});
    return !!actor.SOS

};

/***
 * write the actors last message to the record
 * @param actorId
 * @param msg
 */
ActorUtilities.updateLastMsg = (actorId, msg) => {
    let selector ={_id: actorId}
        , modifier = {$set: {lastMessage:msg, createdDT: new Date()}}
    ;

    Actors.update(selector, modifier);

};

/***
 * find the number of online, non-blackballed actors currently playing
 * @param actionId
 * @returns {*|number}
 */
ActorUtilities.countActiveActorsInAction = (actionId) => {
    let selector = {actionId: actionId, blackballed: false }; // , online:true leave off, for now...
    let actors = Actors.find(selector).fetch();

    return (actors && actors.length) || 0;
};



