Meteor.methods({
    "generateSeedData": () => {
        check(Meteor.userId(), String);
        if (Meteor.isServer) {
            SimulationUtilities.Actions.generateSeedData();
        }
    },

    "createRandomActor": (actionId) => {
        check(Meteor.userId(), String);
        if (Meteor.isServer) {
            SimulationUtilities.Actors.createNewActor(actionId);
        }
    },

    "createRandomSituation": (actionId) => {
        check(Meteor.userId(), String);
        if (Meteor.isServer) {
            SimulationUtilities.Situations.createNewSituation(actionId);
        }
    },

    "createRandomSOS": (actionId) => {
        check(Meteor.userId(), String);
        if (Meteor.isServer) {
            SimulationUtilities.Actors.createRandomSOS(actionId);
        }
    },

    "createRandomMessage": (actionId) => {
        check(Meteor.userId(), String);
        if (Meteor.isServer) {
            SimulationUtilities.ActionMessages.createNewMessage(actionId);
        }
    }
})