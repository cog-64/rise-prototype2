

Meteor.methods({
    /**
     * this is when the user joins an action
     * @param newActor
     * @returns {{_id: *}}
     */
    "createActor": (newActor)=>{
        // before we create an actor, check:
        //  if we are within the radius specified by the action
        // cif action actor limits exceeded for the action
        // action is running.
        //debugger;
        check(Meteor.userId(), String);

        check(newActor, {
            actionId: String
            , latLng: [Number]
            , userId:  String
        });


        // here's the bag for the created/found actor to be returned in
        let actorId = null

        // define sanity checks before joining action
        // a litttle helper
        let errMsg = null;
        let errThrower = (errMsg) => {
            debugger;
            console.log(`${errMsg} for ${Meteor.userId()}`)
            throw new Meteor.Error(403, errMsg);
        };

        /**
         * confirm that the show is on
         * @param actionId
         * @returns {boolean}
         */
        let checkActionInProgress = (actionId) => {

            let now = new Date()
                , query = {_id: actionId}
                ;

            let action = Actions.findOne(query);

            if (!action) {
                errMsg = "Sorry. but this action doesn't exist.";
            } else if (action.startDT < now) {
                errMsg = `The action begins in ${moment(action.startDT).fromNow()}.  Please join us then!`;
            } else if (action.endDT > now) {
                errMsg = `The action ended ${moment(action.endDT).fromNow()}.  Alas, it's too late to join now.`;
            } else {
                return true;
            }
        };

        /**
         * check action is close
         * @param actionId
         * @param latLng
         * @returns {boolean}
         */
        let checkActionIsClose = (actionId, latLng) => {

            let query = {_id: actionId}
                , action = Actions.findOne(query)
                , location = action.location
                , maxRadius = action.maxRadius
                , startLoc = latLng.slice(0) // clone the array before we reverse ;0
                , userDistance = geolib.getDistance(location, startLoc.reverse())
                ;

            console.log(`${actionId} is ${userDistance} meters away from ${Meteor.userId()}`);

            if ( userDistance <= maxRadius) {
                return true;
            } else {
                errMsg = `you need to be within ${maxRadius} meters to join this action.  You are
                currently ${userDistance} away.  `;
            }


        };

        /**
         *  check action is not beyond maxActors throttle
         * @param actionId
         * @returns {boolean}
         */
        let checkMaxActors = (actionId) => {

            let actionsQuery = {_id: actionId}
                , actorsQuery = {actionId: actionId}
                , maxActors = Actions.findOne(actionsQuery).maxActors || -1
                , currentActors = Actors.find(actorsQuery).count()
                ;

            if (maxActors > currentActors) {
                return true;
            } else {
                errMsg = `The organizers of this action have configured a maximum of ${maxActors} actors.  We'll message them that more folks want to join.
                Who knows, maybe they'll allow a few more.

                Please check back later :)`;
            }

            // fall into the thrower
            errThrower(errMsg);
        };

        /**
         * check user submitting actor create is the same on both sides of the wire
         * @param passedUserId
         */
        let checkUserOrigin =  (passedUserId) => {
            if (passedUserId !== Meteor.userId()) {
                // could also log this bastard out...
                errMsg = `You attempted to associate another user with this action.  That's not cool.  Why would you do such
                a sleazy thing?  You should join us, rather than fight us.`;
            } else {
                return;
            }

            // fall into the thrower
            errThrower(errMsg);

        };



        // parameterize for server
        if (Meteor.isServer) {
            //debugger;
            let userQuery = {_id: Meteor.userId()}
                , actorExistsQuery = {userId: Meteor.userId(), actionId: newActor.actionId}
                , user = Meteor.users.findOne(userQuery)
                , userLatLng = user.latLng
            ;

            // make sure we're not being scammed
            checkUserOrigin(newActor.userId);

            // and that the show is still going
            checkActionInProgress(newActor.actionId);

            // and find out where we're really at
            checkActionIsClose(newActor.actionId, userLatLng);

            // if that's all ok, check to see if this user already has an actor in the action
            let actor = Actors.findOne(actorExistsQuery);
            actorId = actor && actor._id;

           if (!actorId) {
               // see if were beyond throttle limit
               checkMaxActors(newActor.actionId);

               // update the passed parameters with the server parameters
               newActor.latLng = userLatLng;
               console.log(`creating new actor ${Meteor.userId()} in action ${newActor.actionId}`);

               // and create the new actor
               actorId = Actors.insert(newActor);

           }

        }

        // no errors so return the created or found actor
        return {
            _id: actorId
        }

    },

    "updateActor": (props) => {
        // todo; need to $set the diffs
        //check that the update is coming from the requesting user.
    }




})
