LeaveActionWrapper =  React.createClass({

    /**
     * send the actor's handle
     * @param handle
     */
    actorLeaveUpdater( msg) {
        debugger;

        let actorDatum = {
            actionId: Session.get("currentActionId")
            , actorId: Session.get("currentActorId")
            , description: msg

        };

        Meteor.call("actorLeave", Meteor.userId(), actorDatum);


    },

    /***
     * return path to action
     * todo: drive out of props.children passed to modal
     * @returns {*}
     */
    returnTo() {
        return ( `/about` );
    },

    render() {
        return (
            <div className="ui icon message">

                <div className="content">

                    <LeaveAction  updater={this.actorLeaveUpdater} returnTo={ this.returnTo() } />

                </div>
            </div>
        );
    }
});