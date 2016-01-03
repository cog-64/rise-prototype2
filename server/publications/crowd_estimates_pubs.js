/****
 * observe changes on the actors in the action
 * keep a running sliding average
 * that gets published back to clients
 *
 */



/***
 * publish all estimates with their position for the current action
 */
Meteor.publish("actorActionEstimates", function(actionId)  {
    if ( this.userId ){
        console.log(`${this.userId} is getting estimates for action ${actionId}`);
        return (EstimatePubs.actorActionEstimates(actionId));
    }

});




//////////////////////////////////////
///// function implementations //////
/////////////////////////////////////
EstimatePubs = {};

/***
 * get all legit estimates in the action
 *  with a latLng to map the estimates
 * @param actionId
 * @returns {*}
 */
EstimatePubs.actorActionEstimates = (actionId) => {
    debugger;
    check(actionId, String);

    let query = {actionId: actionId, fromBlackballedActor: false}
        , options = {fields: {_id: 1, type: 1, actorId: 1, rating: 1, latLng: 1 }}
        , rtn
    ;

    try {
        // set up the cursor
        rtn = CrowdEstimates.find(query, options);
    } catch(e) {
        console.log(e);
    }

    return (rtn);


};




