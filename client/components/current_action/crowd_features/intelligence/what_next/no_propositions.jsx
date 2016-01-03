NoPropositions = React.createClass({

    render() {
        return (
            <div className="ui floating information message">
                <div className="ui center aligned inverted segment">
                    <h2 className="ui header">
                        <i className="big info icon"/>
                        <div className="content">
                            No propositions to vote on yet
                        </div>
                    </h2>
                </div>
            </div>
        );
    }
});
