Meteor.publish('currentActionPropositions', function(actionId) {
    if (this.userId) {
        console.log(`${this.userId} is getting propositions for action ${actionId}`);
        return ActionPropositionPubs.currentActionPropositions(actionId);
    }

});




//////////////////////////////////////
///// function implementations //////
/////////////////////////////////////
ActionPropositionPubs = {};

ActionPropositionPubs.currentActionPropositions = (actionId) => {
    //debugger;
    let query ={}
        , options = {}
        , fields = {_id:true, actionId:true, actorId:true, type:true, description:true, voters:true, carried:true, closed: true, createdDT: true}
        , sort = {createdDT: -1}
        , limit = 10
        , rtn  // a debug convenience
        ;
    check(actionId, String);
    query.actionId = actionId;
    query.closed = false;
    options.fields = fields;
    options.sort = sort;
    options.limit = limit;


    try {
        rtn = ActionPropositions.find(query, options);
    } catch(e) {
        console.log(e);
    }


    return (rtn);

};
