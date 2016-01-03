/***
 * these are the actual folks who are participating in an action
 */



/**
 * all the actors currently in the action
 * =======================================
 * note that Meteor rebinds this in the callback function
 * to the publish handler object, so we can't use
 * ES2015 arrow functions if we want to get things like
 * the this.userId
 */
Meteor.publish('allActorsInAction', function (actionId) {
    if ( this.userId ){
        console.log(`${this.userId} is getting actors for action ${actionId}`);
        return (ActorPubs.actionActors(actionId));
    }

});

/**
 * todo: actors close to you
 */
Meteor.publish('allActorsInVicinity', function (actionId, radius) {
    if (this.userId === 'trusted') {

    }


});


//////////////////////////////////////
///// function implementations //////
/////////////////////////////////////

ActorPubs = {};

/**
 * get the actors in the current action
 * @priority 1
 * @param actionId
 */
ActorPubs.actionActors =  (actionId) => {
    //debugger;
    let query ={}  // mongo spec
        , options = {}
        , fields =   {_id:1, actionId:1, handleName:1,  latLng:1, mood:1, SOS:1, skills:1, lastMessage:1, online:1, blackballed: 1, createdDT: 1}
        , rtn //  debug convenience...
        ;


    //check(actionId, String);
    query = {actionId : actionId};
    options.fields = fields;

    rtn = Actors.find(query, options);
    return (rtn);

};

