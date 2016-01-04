if (Meteor.isClient) {

    ClientSimulations = {};
    Handles = {};

    ClientSimulations.Handles = Handles;

    ClientSimulations.startActorMotion = (fieldStrength, timerInterval, walkDuration) => {

        let actionId = Session.get('currentActionId') ;

        walkDuration = (!!walkDuration)? walkDuration* 1000: 30000;

        const startMotion = () => {
            Meteor.call("moveActors", actionId, fieldStrength);
        };


        let handle = Meteor.setInterval(startMotion, timerInterval);
        ClientSimulations.Handles.motion = handle;

        //and don't let it go for too long... let's say 1 min max.
        Meteor.setTimeout(ClientSimulations.stopActorMotion, walkDuration)
        console.log("movement simulation started ")

    };

    ClientSimulations.stopActorMotion = () => {
        // clear the timer
        console.log("movement simulation stopped");
        Meteor.clearInterval(ClientSimulations.Handles.motion);
    };


}
