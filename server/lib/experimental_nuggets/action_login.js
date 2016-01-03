///*****
// * create a login account for an actor in the action
// * The user account is an expediency because of all the integration
// * with pubs and subs.
// *
// * It's not meant to be a persistent
// * thing that we will allow folks to use to login later with.
// * In fact, we want to purge these accounts when the action ends.
// *
// * The action must be currently on for the account to be created
// * and the actor can't re-login from other devices/sessions (although could generate/pass a random.id
// * and store if we need to have this in the future..
// *
// */
//
//
///***
// * this is a wip / experiment
// * custom login
// * maybe remove and use the standard password stuff instead
// */
//Accounts.registerLoginHandler( (loginRequest) => {
//    debugger;
//    // the registerLoginHandler is required to return undefined if this
//    // handler is not not the one that should be used.
//
//    // to use this login service, we must have a current action and actor
//    if ( ! (loginRequest.actionId && loginRequest.actorId && loginRequest.latLng) ) {
//        return undefined;
//    }
//    // now create the user
//    // rely on the validation hooks to check validity
//
//    let userId = null;
//    let user = Meteor.users.insert({username: actorId, actionId: loginRequest.actionId, startLoc: loginRequest.latLng});
//
//    if (!!user) {
//        userId = user._id;
//    }
//
//    //creating the token and adding to the user (from Arunoda)
//    var stampedToken = Accounts._generateStampedLoginToken();
//    var hashStampedToken = Accounts._hashStampedToken(stampedToken);
//
//    Meteor.users.update(userId,
//        {$push: {'services.resume.loginTokens': hashStampedToken}}
//    );
//
//    //sendtoken along with the userId
//    return {
//        id: userId,
//        token: stampedToken.token
//    }
//
//});
//
//
//// use the validation hooks built into accounts base
//// validate that the action is currently on.
//// note that we needed to add the pieces to the user
//// collection in the onCreateUser handler
//
//Accounts.validateNewUser((user) => {
//    debugger;
//    let now = new Date()
//        , query = {_id: user.actionId
//                , startDT: {$lte: now}
//                , endDT: {$gt: now}
//    };
//    if (user.actionId && Actions.find(query).count() === 1) {
//        return true;
//    } else {
//        debugger;
//        let errMsg = "the action must be in progress before you can join";
//        throw new Meteor.Error(403, errMsg);
//    }
//
//});
//
//// validate that we are not too far from the action to join
//Accounts.validateNewUser((user) => {
//
//    let query = {_id: user.actionId}
//        , action = Actions.findOne(query)
//        , location = action.location
//        , maxRadius = action.maxRadius
//        , startLoc = user.latLng.slice(0) // clone the array before we reverse ;0
//        , userDistance = geolib.getDistance(location, startLoc.reverse())
//    ;
//
//    console.log(`${user.username} is ${userDistance} meters away`);
//
//    if ( userDistance <= maxRadius) {
//        return true;
//    } else {
//        debugger;
//        let errMsg = `you need to be within ${maxRadius} meters to join`;
//        console.log(`${errMsg} for ${user.actorId}`)
//        throw new Meteor.Error(403, errMsg);
//    }
//
//});
//
//// validate that we are not beyond max number of actors for the action
//Accounts.validateNewUser((user) => {
//
//    let query = {_id: user.actionId}
//        , maxActors = Actions.findOne(query).maxActors || -1
//        , currentActors = Actors.find(query).count()
//    ;
//
//    if (maxActors > currentActors) {
//        return true;
//    } else {
//        debugger;
//        let errMsg = `the maximum number of actors has been reached, please try again later `;
//        console.log(`${errMsg} for ${user.actorId}`)
//        throw new Meteor.Error(403, errMsg);
//    }
//
//
//});
//
//// validate that the action exists and is actually going on right now
//Accounts.validateNewUser((user) => {
//
//    let now = new Date()
//        , query = {_id: user.actionId
//        , startDT: {$lte: now}
//        , endDT: {$gt: now}
//    };
//    if (user.actionId && Actions.find(query).count() === 1) {
//        return true;
//    } else {
//        debugger;
//        let errMsg = "the action must be in progress before you can join";
//        console.log(`${errMsg} for ${user.actorId}`)
//        throw new Meteor.Error(403, errMsg);
//    }
//
//});
//
///***
// * fires when the call is made to create the user (either from server or client)
// * the user object is the *proposed* user object, the options were what was
// * sent to createUser.  function returns the (modified) user  object which is then
// * inserted into  meteor.users
// * btw, the call to createUser is mande in seeds (for testing) and collection/actors.js for app
// * */
//Accounts.onCreateUser((options, user) => {
//    // create the actor's data
//    debugger;
//    console.log('user created with options: '+ JSON.stringify(options));
//    //console.log('user' +  JSON.stringify(user));
//
//    // add the actionId, latLng and actorId to the user object
//    // so that we can run the validations with these pieces.
//    user.actorId = options.actorId;
//    user.actionId = options.actionId;
//    user.latLng = options.latLng;
//
//
//
//    // now create the actor doc
//    let newActor={
//        _id:  options.actorId
//        , actionId: options.actionId
//        , latLng: options.latLng
//        , userId: user._id
//
//
//    };
//
//    // no can do :(
//    // this will create the actor even if the user accounts fails the validations :(
//    // create/(upsert?) after the login validates
//    //Meteor.call( "createActor", newActor);
//
//    return user;
//
//    //
//
//});
//
//// called _after_ the validateNewUser hooks have run
//// if successful login, create (and maybe update) the actor
//Accounts.validateLoginAttempt( (attempt) => {
//
//    console.log(JSON.stringify(attempt));
//
//    if (attempt.allowed) {
//        // create the actor
//        // could also write the ip now, if we wanted to
//        // since its in the connection object :)
//        let newActor= {
//           actionId: attempt.user.actionId
//            , latLng: attempt.user.latLng
//            , userId: attempt.user._id
//            , createdDT:attempt.user.createdAt
//        }
//        let selector = {_id: attempt.user.actorId}
//        let modifier = {$set: newActor}
//
//        // we won't expose a create actor as a meteor method
//        // the client is also doing an insert in the local minimongo
//        // so we need to upsert the doc
//        Actors.upsert(selector, modifier);
//
//        // must return truthy value for the login to proceed...
//        return true;
//    } else {
//        debugger;
//        let err = attempt.error;
//        console.log (`invalid login attempt: ${JSON.stringify(err)}`);
//    }
//
//
//} )
//
//
//// validate the IP too?  Is there sense in this?
//// if we have multiple actors at the same ip, that could be an attack
//// but on the other hand what about folks having their connection drop?
//
//
//
//
//
//// todo: function to remove the accounts when the action ends
//
//// todo: function to remove the actor when the actor leaves