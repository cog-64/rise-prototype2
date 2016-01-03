Meteor.publish('currentActionMessages', function(actionId) {
    if (this.userId) {
        console.log(`${this.userId} is getting information for action ${actionId}`);
        return ActionMessagePubs.currentActionMessages(actionId);
    }

});




//////////////////////////////////////
///// function implementations //////
/////////////////////////////////////
ActionMessagePubs = {};

/**
 * get the info about a specific action from the server
 * @priority 1
 * @param actionId
 */
ActionMessagePubs.currentActionMessages = (actionId) => {
    //debugger;
    let query ={}
        , options = {}
        , fields = {_id:true, actionId:true, actorId:true, category:true, icon: true, msgBody:true, createdDT: true, isAdministrative: true}
        , sort = {createdDT: -1}
        , limit = 10
        , rtn  // a debug convenience
        ;
    check(actionId, String);
    query.actionId = actionId;
    options.fields = fields;
    options.sort = sort;
    options.limit = limit;


    try {
        rtn = ActionMessages.find(query, options);
    } catch(e) {
        console.log(e);
    }


    return (rtn);

};
