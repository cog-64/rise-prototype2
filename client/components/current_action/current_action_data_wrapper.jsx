/**
 * note that we want to export the component (so don't limit component scope with const)
 */


CurrentAction = React.createClass({

    PropTypes:{
        actionId: React.PropTypes.string.isRequired
        , selfActorId:  React.PropTypes.string.isRequired
        , location: React.PropTypes.object
        , children: React.PropTypes.object
    },


    mixins: [ReactMeteorData],

    // set up an empty object for login errors
    getInitialState() {
        return {
            errors: {}
        };
    },

    // get the unique identifier for the action off the url
    getActionId () {
        //debugger;
        return this.props.actionId;
        //return this.props.params.actionId;
    },

    getSelfActorId () {
        return this.props.selfActorId;
    },



    getMeteorData() {

    //debugger;
        let
            actionId = this.getActionId()
            , subsReady = false
            ;


        console.log(`in the meatier ctxt for currentAction with id ${actionId}`);

        // subscribe to the current action, its actors and situations
        // and get an array of their handles
        // maybe better to do this in one uber publish method
        const subHandles = [
            Meteor.subscribe("currentAction", actionId)
            , Meteor.subscribe("allActorsInAction", actionId)
            , Meteor.subscribe("allSituationsInAction", actionId)
        ];

        subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        const mapIsReady = Mapbox.loaded();

        return ({
            subsReady: subsReady
            , mapIsReady: mapIsReady
            , currentUser: Meteor.user()
            , currentAction: Actions.findOne(actionId)
            , currentActors: Actors.find({action:actionId}).fetch()
            , currentSituations: Situations.find({action:actionId}).fetch()
        })
    },

    componentDidMount(){

        //console.log('in the didMount for the currentAction with self ' + this.props.selfActorId);
        IntercomponentComs.setCurrentAction(this.props.actionId);
        IntercomponentComs.setCurrentActorId(this.props.selfActorId);
        IntercomponentComs.enableRightMenu(true);
        IntercomponentComs.enableLeftMenu(true);
    },

    showModal() {
        //debugger;
        let { location } = this.props;
        let isModal = (location && location.state && location.state.modal);

        if (isModal) {
            return (
                <ActionFeatureModal actionId={this.props.actionId}
                       actorId={this.props.selfActorId}
                       returnTo={location.state.returnTo} >
                    {this.props.children}
                </ActionFeatureModal>
            )
        }
    },

    render() {
        //debugger;
        // here's a loader
        console.log(`subs ready is ${this.data.subsReady} and map ready is ${this.data.mapIsReady}`);

        if (!this.data.subsReady ) {
            //debugger;
            // className="full height"
            return  (
                <div id="maploader">
                    <LoadingMessage message="finding out what's happening in the action.."/>
                </div>

            );
        } else {
                return (
                    <div >
                        <Map data={ this.data }  selfActorId={ this.getSelfActorId() } />
                        <ActionMessageWrapper actionId={ this.getActionId() }/>
                        { this.showModal() }
                    </div>
                );

        };



    }
});
