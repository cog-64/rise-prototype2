/**
 * situations that happen drawn on the map.
 */

Situations = new Mongo.Collection('situations');

//schema
Situations.schema = new SimpleSchema({
    actionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "action Id"}
    , actorId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "action Id"} // reporter
    , latLng: {type: [Number], minCount: 2, maxCount: 2, decimal: true, label: "LatLng"}
    , type: {type: String, label: "situation type"}
    , isEmergency: {type: Boolean, optional: true, defaultValue: false, label: "severity" } //implement later, if at all
    , upVotes: {type: Number, optional: true, defaultValue: 0, label: "up Votes"}
    , downVotes: {type: Number, optional: true, defaultValue: 0, label: "down Votes"} // if this situation gets too many downvotes, get rid of it
    , description: {type: String, optional: true, label: "description"}
    , fromBlackballedActor: {type: Boolean, defaultValue:false, optional: true, label: "blackballed user"}// from the beginning architecture, I want to understand what bad actors do.
    , createdDT: {type: Date, defaultValue: new Date(), optional: true, label: "Created Date"}
});

Situations.attachSchema(Situations.schema);

if (Meteor.isServer) {
    Situations._ensureIndex({actionId: 1});
}

Meteor.methods({
    /***
     * receive an object that defines the logical content of a situation
     * check the bejezzuz out of it, and write it to the mongo store
     * @param userId
     * @param situation
     */
    "reportSituation": (userId, situation)=> {
        //debugger;
        check(Meteor.userId(), String);

        check(situation, {
            actionId: String
            , actorId: String
            , type: String
            , description: Match.Optional(String)
        });

        let {actorId, actionId} = situation;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {
            // add the current date, and user info
            situation.createdDT = new Date();
            situation.latLng = actor.latLng;
            situation.fromBlackballedActor = actor.blackballed;

            Situations.schema.validate(situation);
            Situations.insert(situation);

            // normalize the datum and write to the action message stream
            ActionMessageUtilities.createStandardActionMessage(RiseSharedConstants.Situations, situation, RiseSharedConstants.ActionMessages.Categories.ENVIRONMENT);

        }
    },

   "setSituationPosition": (userId, situation, latLng)  => {
       debugger;
       check(Meteor.userId(), String);

       check(situation, {
           _id: String
           , actionId: String
           , actorId: String
           , type: String
           , description: Match.Optional(String)
           , latLng: [Number]
           , createdDT: Date
       });

       let {_id, actorId, actionId} = situation;
       let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

       if (actor) {
           // update the situation.
           let updatedSituation = {};
           updatedSituation.latLng = latLng;
           updatedSituation.createdDT = new Date();

           let type = situation.type
               , selector = {_id: _id}
               , modifier = {$set: updatedSituation}
               ;

           Situations.update(selector, modifier);
       }

   }

       });

