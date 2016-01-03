Meteor.startup( () => {

if  ( Meteor.isClient ) {
   // Meteor.call("nonReactiveLocation");
}

}) ;
var _actorMovementTolerance = Meteor.settings.public.movementTolerance;
Meteor.methods ({
    /***
     * non-reactive call to get the position.
     * can't call this from componentDidMount(times out)
     * not sure I understand this is
     */
    "nonReactiveLocation": () => {
        if (Meteor.isClient) {
            let foundLocation = function (loc) {
                //debugger;
                console.log(JSON.stringify(loc));
                let latLng = []
                    , accuracy = loc.coords.accuracy
                    ;

                latLng.push(loc.coords.latitude);
                latLng.push(loc.coords.longitude);

                Session.set("startLatLng", latLng);
                Session.set("geoAccuracy", accuracy);
                Session.set("startPosErr", null);
                Session.set("geolocating", false);

            };
            let noLocation = (err) => {
                debugger;

                let errString = geoErrorHash[err.code] || geoErrorHash["UNKNOWN_ERROR"];
                Session.set("startPosErr", errString);
                Session.set("geolocating", false);

            };

            let geoOptions = {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 10000
            };

            let geoErrorHash = {
                "1": "You must allow geolocation to join an action"
                , "2": "location information is currently unavailable on your device"
                , "3": "location determination timed out"
                , "UNKNOWN_ERROR": "an unknown error occurred determining your position"
                , "NO_GEO": "your device does not support geolocation, which is needed to join an action"

            };

            // now make the call
            if (navigator.geolocation) {
                //debugger;
                console.log('geoloc supported');
                Session.set("geolocating", true);
                navigator.geolocation.getCurrentPosition(foundLocation, noLocation, geoOptions);
            } else {
                console.log("ixne on avigatornay ");
                Session.set("startPosErr", geoErrorHash["NO_GEO"])
            }
        }
    },

    /***
     * set the latLng of the user
     * only do the set if we have moved some distance...
     * @param latLng
     */
    "setUserGeolocation": (latLng) => {
        console.log(`called server to set geolocation for ${Meteor.userId()}`)
        check(Meteor.userId(), String);


        let  userId = Meteor.userId()
            , now = new Date()
            , userQuery = {_id: userId}  // make sure that we only allow updates to own
            , userFields = {_id: 1, latLng: 1, latLngSetAt: 1}
            , actorQuery = {userId: userId}
            , modifier = {$set: {latLng: latLng, latLngSetAt:now}}
            , user =  Meteor.users.findOne(userQuery, userFields)
            , existingLatLng = user.latLng
            , latLngLastSetAt = user.latLngSetAt
            , applyMovement = true
            , options = {multi: true}
            ;



        if (existingLatLng) {
            console.log(` set ${userId} from ${existingLatLng} on ${latLngLastSetAt}, to ${latLng} on ${now}`);
            let origLatLng = existingLatLng.slice(0)
                , newLatLng = latLng.slice(0)
                , delta = geolib.getDistance(origLatLng.reverse() ,newLatLng.reverse())
            ;
            applyMovement = (delta > _actorMovementTolerance);
        }


        if (applyMovement) {
            Meteor.users.update(userQuery, modifier);
            Actors.update(actorQuery, modifier, options);
            return;
        }




    }

}) ;

