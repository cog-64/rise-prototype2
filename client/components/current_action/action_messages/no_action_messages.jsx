NoActionMessages = React.createClass({

    render() {
        return (
            <div className="ui bottom attached inverted message">
                <div className="ui center aligned inverted white segment">
                    <h2 className="ui header">
                        <i className="big info icon"/>
                        <div className="content">
                            No messages to display yet
                        </div>
                    </h2>
                </div>
            </div>
        );
    }
});
