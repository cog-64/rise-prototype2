OrganizerWrapper = React.createClass({


    showSimulations(){
        if (Meteor.settings.public.showSimulations) {
            return <Simulations/>
        }

    },

    showModal() {
        let getReturnTo = () => {
            if (Session.get("currentActionId")) {
                // session set to new action
                let actionId = Session.get("currentActionId");
                return `/actions/${actionId}`;

            } else if (location && location.state && location.state.returnTo) {
                return location.state.returnTo

            } else {
                return '/'
            }
        };


        let { location } = this.props;

        return (
            <AdminModal returnTo={getReturnTo()}>
                <div className="ui fluid grid container">
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Working on this one...,

                            </div>
                            <p>
                                An area for the action organizer to create, monitor and adjust an action. Containing,
                                perhaps, it's own menus and modals. For now, I'll just
                                commandeer the space for simulation utilities that help with testing and
                                demonstrations...
                            </p>
                        </div>
                    </div>

                    {this.showSimulations()}
                </div>
            </AdminModal>
        )

    },
    render() {
        return (
            <div>
                {this.showModal()}
            </div>
        );
    }
});