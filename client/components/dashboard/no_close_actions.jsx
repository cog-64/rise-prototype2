/***
 * msg the user if there isn't anything running within their radius
 */
NoCloseActionsMsg = React.createClass({
    render() {
        return (
            <div className="ui icon floating huge warning message">
                <i className="info circle icon"></i>
                <div className="content">
                    <div className="header">
                        No Actions are currently running in your vicinity
                    </div>
                    <p>Why don't you get some friends together and start one?</p>
                </div>
            </div>
        );
    }
});
