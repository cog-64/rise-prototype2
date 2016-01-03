// use Random.choice(arrayOrString) on the SharedRiseConstants

SimulationUtilities = {};

// some goofy text data
SimulationUtilities.PithyPhrases = [
    'honey, have you seen my pants?'
    , 'Everything is Awesome when you\'re part of a team'
    , 'Be ye disabling of yond shield'
    , 'Guarded by a robot army and secondary measures of every kind imaginable. Lasers, sharks, laser sharks, overbearing assistants... '
    , 'President Business is going to end the world? But he\'s such a good guy! And Octan, they make good stuff: music, dairy products, coffee, TV shows, surveillance systems, all history books, voting machines... wait a minute!'
    , 'resistance is not futile'
    , 'fatalism is the enemy of change'
    , 'they\'re not as all powerful as you think'
    , 'despite much opposition the innovator generally wins'
    , 'design and develop; two wings of a bird'
    , 'in our multiple core and/or cloud distributed compute future, the real world will be competing cores on a single memory bus'
    , 'Glucksberg, 1962. monetary rewards and time pressure negative correlation on creative problem solving'
    , 'money is an effective reward for well-known tasks, but is a negative influence when need creative solutions to complex issues.  In the case of complex work, purpose, autonomy and mastery were the rewards that worked.  Should be highly compensated, but compensation not tied to a particular task.'
    , 'Be the person who abandons the old way of thinking; be more productive, be cross platform, be open source. If you do, you’ll find yourself armed with a unique set of skills, ready to solve the problems of tomorrow instead of idly working on problems from the past.'
    , 'I think that the open source movement serves the best interest of cupe, as a social organization, and of society at large'
    , 'You decide your own level of involvement.'
    , 'The primary thing when you take a sword in your hands is your intention to cut the enemy, whatever the means. Whenever you parry, hit, spring, strike or touch the enemy’s cutting sword, you must cut the enemy in the same movement. It is essential to attain this. If you think only of hitting, springing, striking or touching the enemy, you will not be able actually to cut him'
    , 'The important thing in strategy is to suppress the enemy’s useful actions but allow his useless actions.'
    , 'One’s concern with the ethics of means and ends varies inversely with one’s distance from the scene of conflict'
    , 'A revolution is not a dinner party, or writing an essay, or painting a picture, or doing embroidery; it cannot be so refined, so leisurely and gentle, so temperate, kind, courteous, restrained and magnanimous. A revolution is an insurrection, an act of violence by which one class overthrows another.'
    , 'There is nothing more difficult to carry out, nor more doubtful of success, nor more dangerous to handle, than to initiate a new order of things. For the reformer has enemies in all those who profit from the old order, and only lukewarm defenders in those who would profit from the new order — the lukewarmness arising partly from fear of adversaries who have the laws in their favor, and partly from the incredulity of mankind who do not believe in anything new unless they have had actual experience of it'
    , 'Today, humanity faces a stark choice: save the planet and ditch capitalism or save capitalism and ditch the planet'
];
SimulationUtilities.RandomHandles = [
    'Anne Archist'
    , 'Sid Icious'
    , 'Skippy the anarchist'
    , 'mad nim'
    , 'Any mouse'
    , 'Johnny B Rotten'
    , 'Anne T Imperialist'
    , 'D Fiance'
    , 'Di Sobedient'
    , 'N Subordinant'
    , 'Rob Ellion'
    , 'The Once-ler'
    , 'Horton'
    , 'Sam I Am'
    , 'Mr Knox'
    , 'Bartholomew Cubbins'
    , 'Zanzibar Buck-Buck McFate'
    , 'Oliver Bolivar Butt'
    , 'Sunny Jim'
    , 'Sir Michael Carmichael-Zutt'
    , 'Buffalo Bill'
    , 'Biffalo Buff'
    , 'Dave'
    , 'Metalbeard'
    , 'Unikitty'
    , 'Emmet'
    , 'Benny'
    , 'Wildstyle'
    , 'Vitruvius '


];

SimulationUtilities.getRandomPhrase = () => {
    return Random.choice(SimulationUtilities.PithyPhrases);
};
SimulationUtilities.getRandomHandle = () => {
    return Random.choice(SimulationUtilities.RandomHandles);
};

SimulationUtilities.Actions = {};
SimulationUtilities.Actions.generateSeedData = () => {

    SimpleSchema.debug = true;

    console.log("plant seeds");
    if (Meteor.isServer) {
        debugger;
        let userQuery = {_id: Meteor.userId()}
            , user = Meteor.users.findOne(userQuery)
            , userLatLng = user.latLng
            ;

        const randomizedLatLng = (latLng, size) => {
            if (!size) {
                size = 0.003
            }

            return latLng.map((elt) => {
                return elt + ((Math.random() - .5) * size)
            })
        };

        // make sure that all are in progess so that we can load the users...
        let data = [
            {
                name: "Seed One"
                ,
                description: "Seed action one, 100 max actors and 5 k radius; started yesterday, ends in 2 days, randomized location based on your current pos."
                ,
                stealthy: false
                ,
                latLng: randomizedLatLng(userLatLng, 0.007) // Leaflet uses latlng this may change as the thing moves (perhaps we want the pos data from the organizer too
                ,
                externalUrl: "http://cupe.ca"
                ,
                maxRadius: 5000
                ,
                maxActors: 100
                ,
                startDT: new Date(moment().subtract(1, 'days'))// per iso 8601; 11 o;clock Eastern
                ,
                endDT: new Date(moment().add(2, 'days'))
                //, msgQueues : {}
                //, externalStorageLocation :{} // a place to store artifacts
                //, avatar : {} // a pic for the action
                //, organizers: []

            },
            {
                name: "Seed Two"
                ,
                description: "Seed action two; 1 k radius and 20 actor max, starts in an hour from creation, goes for 1 day.  Randomized location based on your current pos."
                ,
                stealthy: false
                ,
                latLng: randomizedLatLng(userLatLng, 0.005) // Leaflet uses latlng this may change as the thing moves (perhaps we want the pos data from the organizer too
                ,
                externalUrl: "https://github.com/cupe-opensource/rise"
                ,
                maxRadius: 1000 // for throttling
                ,
                maxActors: 20 // for throttling
                ,
                startDT: new Date(moment().add(1, 'hours'))// per iso 8601; 11 o;clock Eastern
                ,
                endDT: new Date(moment().add(1, 'days'))

            },
            {
                name: "Seed action 3"
                , description: "Seed three, 10 km radius around parliament hill"
                , stealthy: false
                , latLng: [45.4289959, -75.6998248] // Leaflet uses latlng this may change as the thing moves (perhaps we want the pos data from the organizer too
                , externalUrl: "http://meteor.com"
                , maxRadius: 10000
                , maxActors: 15
                , startDT: new Date(moment().subtract(1, 'days'))// per iso 8601; 11 o;clock Eastern
                , endDT: new Date(moment().add(5, 'days'))

            }
        ];


        /**
         * create seed actor object that is composed of two objects:
         * a user object to create the user and a props object that
         * sets some second-pass optionals
         * @param actionId
         * @param action
         * @returns {{}}
         */
        const createSeedActor = (actionId, action) => {
//debugger;
            let seedActor = {}
                , user = {}
                , props = {}
                ;
            let username = Random.id()
                , password = Random.id()
                , actorId = Random.id()
                ;

            user.username = username;
            user.password = password;


            props._id = actorId;
            props.actionId = actionId;
            props.latLng = randomizedLatLng(action.latLng);
            props.handleName = SimulationUtilities.getRandomHandle();
            props.mood = Math.floor((Math.random() * 3) - 1);
            //props.SOS = false;  // distress signal
            props.blackballed = false;
            props.lastMessage = SimulationUtilities.getRandomPhrase();

            //props.skills = []; // skills to help the crowd e.g. first-aid, facilitation, translation, conflict resolution
            //props.cast = []; // maybe; but later is better; directly interact with other actors in the current action, but how?

            seedActor.user = user;
            seedActor.props = props;

            return seedActor;
        };

        /***
         *
         * mutate an existing actor in mongo
         * by setting the differences
         * @param userId
         * @param props
         */
        const insertSeedActor = (userId, props)  => {
            //let query = {_id: props._id}
            //    , updater = {$set:props} // don't want a wholesale replace so just set the values sent in props
            //;
            //debugger;
            //Actors.update(query, updater);

            // slightly torturous because the original impl
            // had the createActor called from onCreateUser...
            // the issue was that if the validation failed
            // the actor was still created.
            // ...
            let newActor = {
                userId: userId
            };

            let actor = _.extend(newActor, props);

            console.log("insert actor: " + JSON.stringify(actor));
            let actorId = Actors.insert(actor);
            return actorId;
        };

        /**
         * define a cute little recursive function, just to be a dick.
         * if I really wanted to get hardcore FP and not mutate the array
         * i'd clone the array each time and push onto a new arr
         * @param actorCnt
         * @param arr
         * @param actionId
         * @param action
         * @returns {*}
         */
        const actorFactory = (actorCnt, arr, actionId, action) => {

            if (actorCnt > 0) {
                // ok, will have to create a randomid here
                // and use it to create the user
                arr.push(createSeedActor(actionId, action));
                return actorFactory(actorCnt - 1, arr, actionId, action);
            } else {
                return arr;
            }
        };

        const createSituation = (actionId, action) => {
            //debugger;
            let situation = {};
            situation.actionId = actionId;
            situation.actorId = SimulationUtilities.Actors.getRandomActionActor(actionId)._id;
            situation.latLng = randomizedLatLng(action.latLng);
            situation.type = SimulationUtilities.Situations.PickRandomSituation();
            situation.isEmergency = (Math.random() < .1); //
            situation.description =SimulationUtilities.getRandomPhrase();
            return situation;
        };

        const situationFactory = (situationCnt, arr, actionId, action) => {

            if (situationCnt > 0) {
                arr.push(createSituation(actionId, action));
                return situationFactory(situationCnt - 1, arr, actionId, action);
            } else {
                return arr;
            }
        };

        const ratingsFactory = (actionId, actorId, latLng) => {
            //debugger;
            _.each(RiseSharedConstants.Emotions, (value) => {
                //debugger;
                let rating = Math.ceil(Math.random() * 10) // hardwire in  1 to 10, for now
                    , floatedLatLng = randomizedLatLng(latLng);
                ;
                let actorEstimate = {
                    actionId: actionId
                    , type: value
                    , actorId: actorId
                    , rating: rating
                    , latLng: floatedLatLng
                };
                console.log(`insert estimate for ${actorId} on rating ${value}`)
                CrowdEstimates.insert(actorEstimate);
                CrowdEstimateAggregationsPubs.updateCrowdEstimateAggregate(actionId, value);
            });

            _.each(RiseSharedConstants.Intelligence, (value) => {
                //debugger;
                let rating = Math.ceil(Math.random() * 10) // hardwire i 1 to 10, for now
                    , floatedLatLng = latLng.map((elt) => {
                    return elt + ((Math.random() - .5) * 0.003)
                });
                ;
                let actorEstimate = {
                    actionId: actionId
                    , type: value
                    , actorId: actorId
                    , rating: rating
                    , latLng: floatedLatLng
                };
                console.log(`insert estimate for ${actorId} on rating ${value}`)
                CrowdEstimates.insert(actorEstimate);
                CrowdEstimateAggregationsPubs.updateCrowdEstimateAggregate(actionId, value);
            });
        };


        // now insert into mongo

        _.each(data, (action)=> {
                //debugger;
                // insert our action
                let actionId;

                actionId = ActionUtilities.createAction(action);

                // and add a bunch of random actors to the action
                let seedActors = [], actorCount = 10;
                actorFactory(actorCount, seedActors, actionId, action).forEach((seedActor) => {
                    //debugger;
                    console.log(JSON.stringify(seedActor));

                    let userId = Accounts.createUser(seedActor.user);
                    //debugger;
                    console.log(` actor ${seedActor.props.actorId} with password ${seedActor.user.password} has login ${userId}`);

                    let actorId = insertSeedActor(userId, seedActor.props);

                    ratingsFactory(actionId, actorId, seedActor.props.latLng);


                });

                let seedSituations = [], situationCount = 5;
                situationFactory(situationCount, seedSituations, actionId, action).forEach((situation) => {
                    Situations.insert(situation)
                });

            }
        )


    }

};

SimulationUtilities.Actors = {};
SimulationUtilities.Actors.createNewActor = (actionId) => {
debugger;
    const createSeedActor = (actionId) => {
//debugger;
        let action = Actions.findOne({_id: actionId});

        let seedActor = {}
            , user = {}
            , props = {}
            ;
        let username = Random.id()
            , password = Random.id()
            , actorId  = Random.id()
            ;

        user.username = username;
        user.password = password;


        props._id = actorId;
        props.actionId = actionId;
        props.latLng = action.latLng.map((elt) => {
            return elt + ((Math.random() - .5) * 0.001)
        });
        props.handleName = SimulationUtilities.getRandomHandle();
        props.mood = Math.floor((Math.random() * 3) - 1);
        props.blackballed = false;
        props.lastMessage = SimulationUtilities.getRandomPhrase();
        props.createdDT = new Date();

        //props.skills = []; // skills to help the crowd e.g. first-aid, facilitation, translation, conflict resolution
        //props.cast = []; // maybe; but later is better; directly interact with other actors in the current action, but how?

        seedActor.user = user;
        seedActor.props = props;

        return seedActor;
    };
    const insertSeedActor = (userId, props)  => {

        let newActor= {
            userId: userId
        };

        let actor = _.extend(newActor, props);

        console.log("insert actor: " + JSON.stringify(actor));
        let actorId = Actors.insert(actor);
        return actorId;
    };

    let   seedActor = createSeedActor(actionId)
        , userId = Accounts.createUser( seedActor.user )
    ;
    //debugger;
    console.log(` actor ${seedActor.props.actorId} with password ${seedActor.user.password} has login ${userId}`);

    let actorId = insertSeedActor(userId, seedActor.props);
    let msg = `${seedActor.props.handleName} has joined the action`;
    SimulationUtilities.ActionMessages.createNewMessage(actionId, actorId, RiseSharedConstants.ActionMessages.Categories.ACTOR.key, msg);
    return actorId;
};
SimulationUtilities.Actors.getRandomActionActor = (actionId) => {
    //debugger;
    let actors = Actors.find({actionId: actionId}).fetch()
        ,  actorCount = actors.length
        , idx = Math.floor(Math.random() * actorCount)
        , actor = actors[idx]
        ;

    console.log(`actor ${actor._id} selected for situation`)
    return actor;
};
SimulationUtilities.Actors.PickRandomSOS  = () => {
    // create a list, pick from it randomly, return the situation type

    // get values from RiseSharedConstants.Situations hashtable
    // and place into an array
    let sos = _. values(RiseSharedConstants.SOS);

    // randomly choose a value
    let idx = Math.floor(Math.random()*sos.length);
    let rtn = sos[idx].key;

    return rtn;
};
SimulationUtilities.Actors.createRandomSOS = (actionId, actorId, type) => {
    debugger;
    let selector = null, modifier = null;

    if (!type) {
        type = SimulationUtilities.Actors.PickRandomSOS();
    }

    if (!actorId) {
        let actor = SimulationUtilities.Actors.getRandomActionActor(actionId);
        actorId = actor._id;
    }


    // Can't use the *real* method, because it checks that the callinbg user is associated
    // with the actor to prevent any spoof attacks....
    selector = {_id: actorId};
    modifier = {$set:{SOS: type}};
    Actors.update(selector, modifier);


   // but create a message in the usual way...
    let SOSDatum = {
        actionId: actionId
        , actorId: actorId
        , type: type
        , description: SimulationUtilities.getRandomPhrase()
    };
    ActionMessageUtilities.createStandardActionMessage(RiseSharedConstants.SOS, SOSDatum, RiseSharedConstants.ActionMessages.Categories.EMERGENCY);

};

SimulationUtilities.Situations = {};
SimulationUtilities.Situations.PickRandomSituation = () => {
    // create a list, pick from it randomly, return the situation type

    // get values from RiseSharedConstants.Situations hashtable
    // and place into an array
    let situations = _. values(RiseSharedConstants.Situations);

    // randomly choose a value
    let idx = Math.floor(Math.random()*situations.length);
    let rtn = situations[idx].key;

    return rtn;
};
SimulationUtilities.Situations.createNewSituation = (actionId, actorId, type) => {
    debugger;
    let latLng = null;

    if (!type) {
        type = SimulationUtilities.Situations.PickRandomSituation()
    };

    if (!actorId) {
        let actor = SimulationUtilities.Actors.getRandomActionActor(actionId);
        actorId = actor._id;
        latLng = actor.latLng;
    } else {
        let actor = Actors.find({_id: actorId});
        latLng = actor.latLng;
    }

    let situation =  {
        actionId: actionId
        , actorId: actorId
        , type: type
        , latLng: latLng
        , description: `yo; ${type} situation unfolding`
    };

    Situations.insert(situation);
    ActionMessageUtilities.createStandardActionMessage(RiseSharedConstants.Situations, situation, RiseSharedConstants.ActionMessages.Categories.ENVIRONMENT);



};

SimulationUtilities.CrowdEstimates = {};
SimulationUtilities.CrowdEstimates.PickRandomCrowdFeature = ()  => {
    let crowdFeatures = _.union(_. values(RiseSharedConstants.Emotions), _.values(RiseSharedConstants.Intelligence));
    let rtn = Random.choice(crowdFeatures);

    return rtn;

};
SimulationUtilities.CrowdEstimates.createNewEstimate = (actionId, actorId, type) => {
    let latLng = null;

    if (!type) {
        type = SimulationUtilities.CrowdEstimates.PickRandomCrowdFeature()
    };

    if (!actorId) {
        let actor = SimulationUtilities.Actors.getRandomActionActor(actionId);
        actorId = actor._id;
        latLng = actor.latLng;
    } else {
        let actor = Actors.find({_id: actorId});
        latLng = actor.latLng;
    }

    let rating = Math.ceil(Math.random()*10) // hardwire in  1 to 10, for now
    ;

    let actorEstimate =  {
        actionId: actionId
        , type: type
        , actorId: actorId
        , rating: rating
        , latLng: latLng
    };

    console.log(`insert estimate for ${actorId} on rating ${type}`);
    CrowdEstimates.insert(actorEstimate);
    CrowdEstimateAggregationsPubs.updateCrowdEstimateAggregate(actionId, type);

};

SimulationUtilities.ActionMessages = {};
SimulationUtilities.ActionMessages.PickRandomMessageCat = () => {
    debugger;
    let messageCats = _. values(RiseSharedConstants.ActionMessages.Categories);
    let rtn = Random.choice(messageCats);

    return rtn;

};
SimulationUtilities.ActionMessages.createNewMessage = (actionId, actorId, cat, msg) => {
debugger;
    if (!cat) {
        cat = SimulationUtilities.ActionMessages.PickRandomMessageCat().key;
    };

    if (!actorId) {
        let actor = SimulationUtilities.Actors.getRandomActionActor(actionId);
        actorId = actor._id;
    }

    if (!msg) {
        msg = SimulationUtilities.getRandomPhrase();
    }

    let actionMessage =  {
        actionId: actionId
        , actorId: actorId
        , icon: 'birthday'
        , category: cat
        , msgBody: msg
        , createdDT: new Date()
    };

    ActionMessages.insert(actionMessage);
    ActorUtilities.updateLastMsg(actorId, msg );


};
