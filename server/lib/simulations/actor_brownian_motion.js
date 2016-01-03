/***
 * simulation to move the actors around
 */


Meteor.methods({
    "moveActors": (actionId, fieldStrength)=> {
        debugger;
        console.log(`moving actors in swarm for ${actionId}`);
        let actors = Actors.find({actionId:actionId});

        actors.forEach( (actor) => {
            let selector = {_id: actor._id}
                , latLng = actor.latLng.map((elt) => {
                            return elt + ((Math.random() - .5) * 0.0001) + fieldStrength
                            })

                , modifier = {$set:{latLng: latLng}};
            Actors.update(selector, modifier)})

    }
}

)