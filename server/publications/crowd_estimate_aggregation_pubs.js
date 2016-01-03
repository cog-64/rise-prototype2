
// actionAverageEstimates

Meteor.publish("crowdActionAggregations", function(actionId)  {
    if ( this.userId ){
        console.log(`${this.userId} is getting aggregations for action ${actionId}`);
        return (CrowdEstimateAggregationsPubs.crowdActionAggregations(actionId));
    }

});




CrowdEstimateAggregationsPubs = {};

CrowdEstimateAggregationsPubs.crowdActionAggregations = (actionId) => {
    check(actionId, String);
debugger;
    let query = {actionId: actionId}
        , options = {fields: {_id: 1, actionId: 1, type: 1, averageRating: 1, count: 1 }}
        , rtn
        ;

    try {
        // set up the cursor
        rtn = CrowdEstimateAggregations.find(query, options);
    } catch(e) {
        console.log(e);
    }

    return (rtn);


};


CrowdEstimateAggregationsPubs.updateCrowdEstimateAggregate = (actionId, type)=> {
    //  already wrapAsync'd by the package, so can call in a synchronous style
    // and let the fibers manage the callbacks/event loop
    //debugger;
    let fullSetPipeline = [
        {$match: {actionId: actionId, type: type, fromBlackballedActor: false}}
        , {$group: {_id: {type: "$type"}, averageRating: {$avg: "$rating"}, countEstimates: {$sum: 1}}}
        , {$project: {_id: 0, type: "$_id.type", count: "$countEstimates", averageRating: 1}}
    ];

    let aggResult = CrowdEstimates.aggregate(fullSetPipeline);
    let limit10pct = Math.ceil( aggResult[0].count * .10) ;
    console.log(`average from full set of ${aggResult[0].count} observations is ${aggResult[0].averageRating}`);

    // do the average on the last 10%, and take the delta from the whole set
    // call this value the acceleration.  Use it as a test signal to trip a message
    // e.g. if there is a large acceleration, notify the crowd that the factor is changing rapidly

    let sliding10Pipeline = [
        {$match: {actionId: actionId, type: type, fromBlackballedActor: false}}
        , {$sort: {createdDT:-1}}
        , {$limit: limit10pct }
        , {$group: {_id: {type: "$type"}, averageRating: {$avg: "$rating"}, countEstimates: {$sum: 1}}}
        , {$project: {_id: 0, type: "$_id.type", count: "$countEstimates", averageRating: 1}}
    ];

    let aggSliding10Result = CrowdEstimates.aggregate(sliding10Pipeline);

    console.log(`average from most recent ${limit10pct} estimates is ${aggSliding10Result[0].averageRating}`);

    // add in the metadata and update
    if (aggResult) {
        // the aggResult contains objects in an array.  This prevents it from
        // being an acceptable replacement doc to mongo
        // so build the datum for upsert
        let aggDatum ={
            actionId: actionId
            , type: aggResult[0].type
            , count: aggResult[0].count
            , averageRating: aggResult[0].averageRating
            , acceleration: aggResult[0].averageRating - aggSliding10Result[0].averageRating
            , createdDT: new Date()

        };

        let query = {actionId: actionId, type: type};

        CrowdEstimateAggregations.upsert(query, aggDatum);

        //todo: insert ActionMessage if acceleration is high
    }
};


