/***
 * died the death, but interesting snips
 */


/***
 * modal to let them no that nothing is available and present
 * options for further query
 * problematic to use modal because it left a table with 0 rows, which would cause
 * semantic/react integration to throw...
 */
const NoCloseActions = React.createClass({
    // show a nothing in your area message
    componentDidMount() {
        console.log('no actions');
        $('.ui.basic.modal')
            .modal('show');

    },

    render() {
        return (
            <div className="ui basic modal">
                <i className="close icon"/>
                <div className="header">
                    No current actions are running in the immediate area.
                </div>
                <div className="image content">
                    <div className="image">
                        <i className="archive icon"/>
                    </div>
                    <div className="description">
                        <p>There are no actions currently in progress within a 10 km radius from your current position.
                            Why don't you call your mates and go raise some hell?
                        </p>
                    </div>
                </div>
                <div className="actions">
                    <div className="two fluid ui inverted buttons">
                        <div className="ui red basic inverted button">
                            <i className="remove icon"></i>
                            Check to see what's coming up
                        </div>
                        <div className="ui green basic inverted button">
                            <i className="checkmark icon"></i>
                            Yes
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
