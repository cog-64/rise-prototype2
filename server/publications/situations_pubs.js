/***
 * these is the event knowledge that need to be disseminated to the crowd
 */

/**
 * all active situations for an action.
 */
Meteor.publish("allSituationsInAction", function (actionId) {
    if ( this.userId ){
        return (actionSituations(actionId));
    }

});


/***
 * all situations in the area of interest
 * todo:
 */
Meteor.publish("allSituationsInVicinity", function (actionId, radius) {

   return ( {} );

});


//////////////////////////////////////
///// function implementations //////
/////////////////////////////////////


/**
 * situations associated with an action
 * @priority 1
 * @param actionId
 * @returns {Cursor}
 */
actionSituations =  (actionId) => {
    //debugger;

    let query ={}  // mongo spec
        , options = {}
        , fields =  {_id:true, type:true, latLng:true, actionId: true, actorId:true, description:true, createdDT:true}
        , rtn //  debug convenience...
        ;


    //check(actionId, String);
    query.actionId = actionId;
    options.fields = fields;

    rtn = Situations.find(query, options);
    return (rtn);

};





