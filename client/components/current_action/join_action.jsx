/***
 * check to see if we are close enough,
 * and throttling not exceeded
 * to join the action and have an actor record created
 *
 */

JoinAction  = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , latLng: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
        , location: React.PropTypes.object
        , children: React.PropTypes.object
    },

    // set up an empty object for login errors
    getInitialState () {
        return {
            errors: null
            , selfActorId: null
            , actorCreationInProgress: false

        };
    },

    getActionId () {
        //debugger;
        return this.props.actionId;
    },

    getLatLng () {
        return this.props.latLng;
    },


    componentDidMount() {
        //debugger;
        this.tryToJoinAction();
    },


    componentWillUnmount() {
        console.log("unmounting join and logging out");
        //todo: method to set actor online false
        //Meteor.logout();
    },


    // if we aren't a user and we have good co-ords
    // try to join the action
    tryToJoinAction() {
        // flag the work in-progress
        this.setState({
            actorCreationInProgress: true
        });

        console.log(`try to join action ${this.getActionId()}`);

        // let the client provide what it believes so that the
        // method stub has the (likely) data
        let newActor = {
            actionId: this.getActionId()
            , latLng: this.getLatLng()
            , userId: Meteor.userId()
        };

        Meteor.call("createActor", newActor, (err, result) => {
            if (err) {
                //debugger;
                console.log(`error on user creation ${err.reason}`);
                this.setState({
                    errors: {'login': err.reason}
                    , actorCreationInProgress: false
                })
            } else if (result._id) {
                // cache the identification of self in the statebag...
                //debugger;
               // console.log(`actorId set into user is ${result._id}`);
                this.setState({
                    selfActorId: result._id
                    , errors: null
                    , actorCreationInProgress: false
                });
            }

        });;



    },





    render() {


        if (this.state.errors) {
            return <AuthErrors errors={this.state.errors}/>

        } else if (!this.state.selfActorId) {
            return (
                <div id="login-loader">
                    <LoadingMessage message="attempting to join action..."/>
                </div>
            )
        } else {
            console.log(`JoinAction self is ${this.state.selfActorId}`);
            return (  <CurrentAction actionId={this.getActionId()}
                                     selfActorId = {this.state.selfActorId}
                                     location={this.props.location}
                                     children={this.props.children}
            />   );
        }

    }
});


