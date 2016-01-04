/***
 * simulation to move the actors around
 */


Meteor.methods({
    "moveActors": (actionId, fieldStrength)=> {
        debugger;
        console.log(`moving actors in swarm for ${actionId}`);
        let actors = Actors.find({actionId:actionId});

        actors.forEach( (actor) => {
            let actorSelector = {_id: actor._id}
                , userSelector = {_id: actor.userId}
                , latLng = actor.latLng.map((elt) => {
                            return elt + ((Math.random() - .5) * 0.0001) + fieldStrength
                            })

                , modifier = {$set:{latLng: latLng}};
            Actors.update(actorSelector, modifier);
            Meteor.users.update(userSelector, modifier );
});

    }
}

)