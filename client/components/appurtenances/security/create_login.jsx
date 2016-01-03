/***
 * automatically create a login when the user hits the index rout of the app
 * or a specific action
 */

/***
 * ALSO HAS RESPONSBILITY FOR UPDATING THE selfActor's geolocation.
 */
var _movementTolerance = Meteor.settings.public.movementTolerance;
CreateLogin = React.createClass({

    propTypes: {
        latLng: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
        , actionId: React.PropTypes.string
        , location: React.PropTypes.object
        , children: React.PropTypes.object
    },


mixins: [ReactMeteorData],

    // set up an empty object for login errors
    getInitialState () {
    return {
        errors: null
        , significantGeolocationChange: true

    };
},

    getMeteorData() {
        console.log('in the meatier ctx for CreateLogin');
        //debugger;
        let
            loginInProgress = Accounts.loggingIn()
            , userLoggedIn = !!Meteor.userId()
            , subsReady = false
            , currentLoc = this.props.latLng
            , userFields = {_id: 1, latLng: 1, latLngSetAt: 1}
            ;


        let handle = Meteor.subscribe("currentUserGeolocation");
        subsReady =  handle.ready();


        if ( userLoggedIn ) {

            console.log(`check to set latLng to ${currentLoc} for ${Meteor.userId()} in meteor ctxt of createLogin`);

            // to cut down network chatter to the server
            if (subsReady && this.state.significantGeolocationChange ) {
                console.log(`significant geolocation change for ${Meteor.userId()}`);
                Meteor.call("setUserGeolocation", currentLoc);
            }

        }

        return ({
            subsReady: subsReady
            , loginInProgress: loginInProgress
            , userCreated: userLoggedIn
            , userLocation:  Meteor.users.findOne({_id: Meteor.userId()}, userFields)
        })
    },

    /**
     * create/get the current user's login
     */
    componentWillMount() {
        //debugger;
        this.createLogin();
    },

    /**
     * set significantGeolocationChange state
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        //debugger;
        console.log("createLogin received props of nextProps.latLng");
        let sigChange = this.checkForSignificantGeolocationChange(nextProps.latLng);

        if (sigChange) {
            // put latLng  where we can access easily
            IntercomponentComs.setCurrentLatLng(nextProps.latLng);
        }

        // and get ready to pass the fact down the chain
        this.setState({
            "significantGeolocationChange":sigChange
        });
    },


    //shouldComponentUpdate(nextProps, nextState) {
    // maybe check the movement amount here...
    //},

    /**
     * do a check of the incoming prop to see if we have a significant change in position
     * @param latLng
     * @returns {boolean}
     */
    checkForSignificantGeolocationChange(newLatLng) {
        let delta = geolib.getDistance(newLatLng, this.props.latLng);
        console.log(`user has moved position by ${delta} m`);
        return ( delta > _movementTolerance );
    },

    /**
     * we might have been passed and action id in the url
     * @returns {*|params|any|Object}
     */
    getActionId () {
        //debugger;
        return this.props.actionId;
    },

    /***
     * call accounts createUser if we don't have a meteor.userId
     */
    createLogin() {
    //debugger;
        console.log(`meteor user is ${JSON.stringify(Meteor.user())}`);
        if ( ! Meteor.userId() ) {
            let username = Random.id()
                , password = Random.id()
            ;

            let user = {
                username: username
                , password: password
            };

            // try to create a new user, and so by implication the actor
            // pump any errors onto the statebag
            // automatically to any actors associated with this user
            // create a function in this component and pass the function as a prop that
            // gets checked in child's shouldCompoUpdate and called in  componentDidMount???
            Accounts.createUser(user, (err) => {
                if (err) {
                    console.log(`error on user creation ${err.reason}`);
                    this.setState({
                        errors: {'login': err.reason}
                    })
                }
                return;
            });
        } else {
            console.log(`Already logged in as user ${Meteor.userId()}`)
        }
    },

    render() {
        // encapsulate the decision logic used in the return
        //debugger;
        //console.log(`user data ${JSON.stringify(this.data.userLocation)} in createLogin render`)

        let resultComponent = () => {
            //debugger;
            if (this.state.errors ) {

                return <AuthErrors errors={this.state.errors} />

            }  else if (this.getActionId () ) {

                return <JoinAction actionId={this.getActionId()}
                                   latLng={this.data.userLocation.latLng}
                                   location={this.props.location}
                                   children={this.props.children}
                />
            } else {

                return <Dashboard   latLng={this.data.userLocation.latLng}
                                    significantGeolocationChange={this.state.significantGeolocationChange}
                />
            }
        };


        if (!this.data.subsReady || this.data.loginInProgress) {
            return (
                <div id="login-loader">
                    <LoadingMessage message="attempting to join in..."/>
                </div>
            )
        } else {
            return ( resultComponent() );
        }

    }


});