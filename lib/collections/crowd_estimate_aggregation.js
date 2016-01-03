/***
 * meteor does not do reactive aggregation queries
 * spoof this out by updating a separate table
 * (in the makeEstimate method)
 * and having a reactive cursor listening on this table
 */
CrowdEstimateAggregations = new Mongo.Collection('crowdEstimateAggregations');

CrowdEstimateAggregations.schema = new SimpleSchema({
    actionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "action Id"}
    , type: {type: String, label: "estimate type"}
    , count: {type: Number, optional: false, label:"count"}
    , averageRating: {type: Number, optional: false,  decimal:true, label:"average rating"}
    , acceleration:{type: Number, optional: true,  decimal:true, label:"change in average rating"}
    , createdDT: {type: Date, defaultValue: new Date(), optional: true, label: "Created Date"}
});


if (Meteor.isServer)
{
    CrowdEstimateAggregations._ensureIndex({ actionId: 1, type: 1});
}




//Meteor.methods({
//    // aggregate the data in CrowdEstimates an upsert
//    "updateCrowdEstimateAggregate": () => {
//
//        if ( Meteor.userId() ) {
//            // use the aggregation package to aggregate the mongo data on the server
//            if (Meteor.isServer) {
//
//            }
//        }
//
//
//    }
//}




