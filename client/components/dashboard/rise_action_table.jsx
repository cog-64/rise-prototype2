
const {  Link  } = ReactRouter;

/***
 * Tombstone information about actions the actor can see
 * passed the reactive data from the up-hierarchy component (dashboard)
 */
RiseActionsTable = React.createClass({

    propTypes : {
        data:  React.PropTypes.object.isRequired
        , latLng: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
        , setCurrentAction: React.PropTypes.func.isRequired
    },

    // use outatime:geolib to find the distance to the action
    getDistanceFromAction(latlngAction, latlngActor) {
        return geolib.getDistance(latlngAction, latlngActor);
    },

    componentDidMount(){
        console.log("at latLng: " + this.props.latLng)
    },

    /**
     * render the rows that will be displayed in the grid
     * btw, I think the fact that this is an object causes the
     * history.pushState to die
     *
     */
    closeActionRows() {

        let closeActions = this.props.data.currentNearbyAction.map((action) => {
            // pre-compute a nice date into a var
            let
                niceDate = Dashboard.getNiceActionDate(action)
                , currentlyRunning = Dashboard.actionIsOnNow(action)
                , actionId = action._id
                , distanceToAction = this.getDistanceFromAction(action.latLng, this.props.latLng)
                , distanceToActionMsg = `  ${distanceToAction} meters away`
                , mapLoadedStyle = (!this.props.data.mapIsReady)? "loading":""
                , actionColour = (currentlyRunning)? "green": "blue"
                , previewButtonStyle = `${mapLoadedStyle} large inverted circular ${ actionColour } map icon`
                , joinButtonState = (!currentlyRunning)? "disabled": ""
                , joinButtonStyle = ` ui large circular ${ joinButtonState } ${ actionColour } icon button`
                , actionLink = (!currentlyRunning)? "#":`/actions/${actionId}`
                //, currentAction = action
                ;

            //debugger;
            //console.log (`rise action table actionLink for ${actionId} is ${actionLink}`);

            return (
                <tr key={action._id}>
                    <td>
                        <h2 className="ui header">
                            { action.name }
                            <div className="sub header">{ action.description }</div>
                        </h2>
                    </td>
                    <td>{ niceDate }</td>
                    <td>
                        <button className="action-map-view circular ui icon button" onClick={this.props.setCurrentAction.bind(null,actionId)}>

                            <i className={previewButtonStyle}/>
                            { distanceToActionMsg }
                        </button>

                    </td>
                    <td className="selectable">
                        <Link to={ actionLink }>
                            <button className={ joinButtonStyle }>
                                Join in!
                            </button>
                        </Link>
                    </td>
                </tr>
            ); // rtn

        }); //cb/map

        return closeActions
    },

    render() {

        if (!this.props.data.dataReady) {
            console.log("waiting for current");
            return (
                <div className="board">
                    <LoadingMessage message="rendering nearby actions..." />
                </div>
            );
        } else {
            return (
                <div className="current-actions-table">
                    <table className="ui celled table">
                        <thead>
                        <tr>
                            <th>What</th>
                            <th>When</th>
                            <th>Where</th>
                            <th>Join</th>

                        </tr>
                        </thead>

                        <tbody>
                        {/*<RiseActionsTableRow data={this.props.data}/> :alas, a limitation with react right now, so will have to render the actions directly in this component*/}
                        {this.closeActionRows()}

                        </tbody>


                    </table>

                </div>
            );
        }
    }
});
