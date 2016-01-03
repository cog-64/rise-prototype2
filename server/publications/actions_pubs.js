/***
 * so these are the live query dataflows about the actions (the crowd based gathering)
 */

/**
 * publish the data about a single action to anyone who has the actionId
 * publish can only return a cursor though, so can't use findOne...
 */
Meteor.publish('currentAction', function(actionId) {
    if (this.userId) {
        console.log(`${this.userId} is getting information for action ${actionId}`);
        return ActionPubs.currentAction(actionId);
}

});

/**
 * actions within a radius that are currently running
 */
Meteor.publish('nearbyCurrentActions', function(loc)  {
    if (this.userId) {
        return ActionPubs.closestActions(loc)
    }
    });


/***
 * todo: publish all actions that have are currently happening
 * if we don't think you're just some scabby narc.
 */
Meteor.publish('allRunningActions', function() {
    if (this.userId === 'trusted') {
            //todo:
    } else {
        return [];
    }


});


/***
 * todo publish all actions to supervisory types
 */
Meteor.publish('allActions', function() {
    if (this.userId === 'organizer') {

    } else {
        return [];
    }


});



//////////////////////////////////////
///// function implementations //////
/////////////////////////////////////
ActionPubs = {};

/**
 * get the info about a specific action from the server
 * @priority 1
 * @param actionId
 */
ActionPubs.currentAction = (actionId) => {
    //debugger;
    let query ={}
        , options = {}
        , fields = {_id:true, name:true, description:true, startDT:true, endDT:true, latLng:true}
        , rtn  // a debug convenience
        ;
    check(actionId, String);
    query._id = actionId;
    options.fields = fields;

    try {
        //rtn = Actions.findOne(query, options);
        rtn = Actions.find(query, options);
    } catch(e) {
        console.log(e);
    }


    return (rtn);

};

/**
 * find the closest (min($near)) from the current location
 * @param loc : array of latlng
 * @returns {any}
 */
ActionPubs.closestActions = (loc) => {
    let maxSearchRadius = Meteor.settings.public.actionSearchRadius;
    // do the geonear aggregation stuff here
    return ActionPubs.actionsInRadius(loc, maxSearchRadius)
};

/**
 * get a reactive cursor of actions within your radius
 * @param loc :the users latLng
 * @param radius: search radius in meters
 */
ActionPubs.actionsInRadius = (loc, radius) => {

    // todo: could use Match.Where(function (x) {..} to validate the array len and range of the elt values as req'd
    check(loc, [Number]);

    let query = {}  // geolocation query to locate the actions
        , options = {}
        , sort = {startDT:1}
        , limit = 10
        , fields = {_id:true, name:true, description:true, startDT:true, endDT:true, latLng:true, externalUrl:true}
        , cutOffDT = new Date() // this will init the data to the current time
        , lnglat = [] // need to convert latlng to lnglat for index
        ;


    // convert to coordinates
    lnglat = ActionPubs.ConvertLatLngToCoords(loc);

    query = {
        location: {
            $near: {
                $geometry: {
                    type: "Point"
                    , coordinates: lnglat
                }
                , $maxDistance: radius
            }
        }
        , stealthy : false
        , endDT : {$gt: cutOffDT}
    };

    options.fields = fields;
    options.sort = sort;
    options.limit = limit;


    console.log(JSON.stringify(query));
    console.log(JSON.stringify(options));


    // ( note we rely on meteor's generators/fibers/wtfuck is being used on the server for async)
    // todo: implement skip and page of records
    var cursor = Actions.find(query,options);

    console.log(cursor.count());
    return cursor;





};

/**
 * a client only helper
 * @param action
 */
ActionPubs.currentActionLocation = (action) => {

    return action.latLng;
};

//// utils
/**
 * flip the long and lat
 * @param LatLng
 * @returns {*|Array.<num>}
 * @constructor
 */
ActionPubs.ConvertLatLngToCoords = (LatLng) => {
    return LatLng.reverse();
};
