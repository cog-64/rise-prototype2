/****
 * estimates for various things at time and location
 * rely on publish in crowd_moods.js to calc stats and send to actors
 */

CrowdEstimates = new Mongo.Collection('crowdEstimates');

CrowdEstimates.schema = new SimpleSchema({
    actionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "action Id"}
    , type: {type: String, label: "estimate type"}
    , actorId:{type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "actor Id"}
    , rating: {type: Number, optional: false, label:"rating"}
    , latLng:  {type: [Number], minCount: 2, maxCount: 2, decimal:true, optional: false, label:"LatLng"}
    , fromBlackballedActor: {type: Boolean, defaultValue:false, optional: true, label: "blackballed user"} // cause this not to be part of stats evaluation
    , createdDT: {type: Date, defaultValue: new Date(), optional: true, label: "Created Date"}
});

// attach the schema so that each cud op checks the validity of the doc (aldeed)
CrowdEstimates.attachSchema(CrowdEstimates.schema);

if (Meteor.isServer)
{
    CrowdEstimates._ensureIndex({ actionId: 1, type: 1, actorId: 1});
}


/***
 * called by client to report their subjective estimates of various factors
 */
Meteor.methods({
    /***
     *  upsert an estimate for the current actor
     * @param userId
     * @param estimate
     */
    "makeEstimate": (userId, estimate)=> {
        check(Meteor.userId(), String);

        check(estimate, {
            actionId: String
            , type: String
            , actorId: String
            , rating: Number
        });


        // ne hacky pas la
        let {actorId, actionId} = estimate;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);
        if (actor) {
            let type = estimate.type
                , selector = {actionId: actionId, type: type, actorId: actorId}
                , modifier = {$set: estimate}
                ;

            // add the current date on the server
            estimate.createdDT = new Date();
            estimate.latLng = actor.latLng;
            estimate.fromBlackballedActor = actor.blackballed;

            CrowdEstimates.schema.validate(estimate);
            CrowdEstimates.upsert(selector, modifier);

            // aggregation works on the server.   minimongo doesn't support yet :(
            // could role ny own for the client, if we ever get to the point of having local queues

            if (Meteor.isServer) {
                // update the estimates and let it reactively update the clients
                CrowdEstimateAggregationsPubs.updateCrowdEstimateAggregate(actionId, type);
            }


            // todo: enhancement:  insert raw into a different table to understand how the perception
            // of estimate evolved over time, although I have concerns about if this breaks my ephemeral data ethos
        }
    }
})

