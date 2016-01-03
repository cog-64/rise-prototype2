Meteor.startup( () => {

    // pick up the session id on the client
    console.log("session is " + Meteor.default_connection._lastSessionId);

    //sessionConnection = Meteor.onConnection( () => {
    //    // check the current session
    //    debugger;
    //    if ( Session.equals("sessionId", null) ) {
    //        Session.set("sessionId", Meteor.default_connection._lastSessionId)
    //    }
    //
    //})
})