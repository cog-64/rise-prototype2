
SignIn = React.createClass({

    componentDidMount() {
        // dummy for testing menu behaviour
        IntercomponentComs.setAsOrganizer(true);
    },

    render() {

        return (
            <div className="ui icon message">
                <i className="notched circle loading icon"></i>
                <div className="content">
                    <div className="header">
                        Working on this one
                    </div>
                    <p>sign in with known credentials, maybe from other service, so that actions can be created and administered</p>
                </div>
            </div>
        );
    }
});
