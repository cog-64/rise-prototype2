if (Meteor.isClient) {

    ClientSimulations = {};
    Handles = {};

    ClientSimulations.Handles = Handles;

    ClientSimulations.startActorMotion = (fieldStrength, timerInterval) => {

        let actionId = Session.get('currentActionId');

        const startMotion = () => {
            Meteor.call("moveActors", actionId, fieldStrength);
        };
        debugger;
        let handle = Meteor.setInterval(startMotion, timerInterval);
        ClientSimulations.Handles.motion = handle;

    };

    ClientSimulations.stopActorMotion = () => {
        // cleat the timer
        Meteor.clearInterval(Simulations.Handles.motion);
    };


}
