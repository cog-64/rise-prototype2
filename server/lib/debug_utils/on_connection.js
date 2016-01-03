/***
 * tracking of the login behaviour
 */

Meteor.onConnection( (connection) => {

    // when the connection is closed we want to clean up
    // the actors data
    //debugger;
    connection.onClose( (connection) => {
        //debugger;
        console.log(`closed session ${connection && connection.id} from client ${connection && connection.clientAddress}`);
    })


});
