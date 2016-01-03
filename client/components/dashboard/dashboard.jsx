/***
 * show the actions available.
 * display an order list of names, times and distances based on proximity
 */



/***
 * the reactive meteor data component
 */
Dashboard = React.createClass({

    mixins: [ReactMeteorData],
    propTypes: {
        latLng: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
        , significantGeolocationChange: React.PropTypes.bool.isRequired

    },

    statics: {
        // use twix to get nice looking date
        getNiceActionDate(action) {
            if (action && action.startDT && action.endDT) {
                let t = moment(action.startDT).twix(action.endDT);
                return t.format();
            } else {
                return "TBD"
            }
        },
        getNiceHeader(action) {
            if (action && action.name) {
                return action.name;
            } else {
                return "TBD"
            }
        },

        getFullDescription(action) {
            if (action && action.description) {
                return (
                    `${action.description}
                     ${this.getNiceActionDate(action)}`
                );
            } else {
                return "TBD"
            }
        },
        actionIsOnNow(action){
            //debugger;
            if (action && action.startDT && action.endDT) {
                let t = moment(action.startDT).twix(action.endDT)
                    , now = new Date();
                return t.contains(now);
            } else {
                return false;
            }
        }

    },

    styles: {
        zIndex: 0
    },

    getInitialState(){
        return ({
            selectedAction: null
    });

    },


    /***
     * get the reactive nearby action data (i.e. the cursor) and fetch() it into an array that the UI can subsequently operate on
     * @returns {{dataReady: boolean, currentUser: any, currentNearbyAction: any, nearbyCount: any, loc: *, locErr: (*|PositionError)}}
     */
    getMeteorData(){
        //debugger;
        console.log(`enter dashboard reactive ctx with ${ this.props.latLng} signicant change is ${this.props.significantGeolocationChange} `);
        let
            subsReady = false
            ;

        const subHandles = [
            Meteor.subscribe("nearbyCurrentActions", this.props.latLng)
        ];

        subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });


        // ensure our background map lib is loaded
        const mapIsReady = Mapbox.loaded();

        return ({
            dataReady: subsReady
            , currentNearbyAction: Actions.find({}).fetch()
            , mapIsReady: mapIsReady
        });

    },

    componentDidMount() {

        MenuActions.closeOpenSidebars();

        IntercomponentComs.enableRightMenu(false);
        IntercomponentComs.enableLeftMenu(false);
        console.log(`disabled side menus in dashboard`);

    },


    /**
     * only update if we are beyond movement tolerance
     * @param nextProps
     * @param nextState
     * @returns {boolean|*}
     */
    shouldComponentUpdate(nextProps, nextState) {
        // cause render to be skipped when false returned
        return nextProps.significantGeolocationChange
    },

    setSelectedAction(action_id){
        console.log('selected action is ' + action_id);
        //debugger;
        let query = {_id:action_id}
            , action = Actions.findOne(query)
        ;
        this.setState(
            {selectedAction:action});

    },

  render() {
        // check to make sure that we have data and location
        if (!this.data.dataReady) {
            //debugger;
            return (

                    <LoadingMessage message="seeking nearby actions"/>

            );
        } else {
            let nearbyCount = Actions.find({}).count()
                , AvailableActions = (nearbyCount === 0)? <NoCloseActionsMsg/> : <RiseActionsTable data={this.data} latLng={this.props.latLng} setCurrentAction={this.setSelectedAction}/> // only show if there's no data
            ;

            // console.log(`static LatLng is ${this.state.staticLatLng} and latLng from props is ${this.props.latLng}`)
            let ActionLocationModal =(nearbyCount > 0 && !!this.state.selectedAction)? <ActionLocation action={ this.state.selectedAction } userLatLng={ this.props.latLng } mapIsReady= { this.data.mapIsReady }/> : null;

            console.log ('current nearby actions count: ' + nearbyCount.toString());

            return (
                <div id="dash" className="board">
                    { AvailableActions }
                    { ActionLocationModal }
                </div>
            );
        }


    }
});




 


