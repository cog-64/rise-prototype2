ConnectionIssueDialog = React.createClass({
    render() {
        // If we needed to display multiple kinds of notifications, we would split
        // this out into reusable components, but we only have this one kind so
        // we'll keep it all here.
        return (
            <div className="ui massive warning icon message">
                <i className="notched circle loading icon"></i>
                <div className="content">
                    <div className="huge header">
                        Hang on
                    </div>
                    <p>Looks like we're having some connection issues with the network...</p>
                </div>
            </div>
        );
    }
});
