

BroadcastMessageWrapper = React.createClass({

    /**
     * send the actor's handle
     * @param handle
     */
    messageUpdater( msgBody) {
        //debugger;

        let messageDatum = {
            actionId: Session.get("currentActionId")
            , actorId: Session.get("currentActorId")
            , category: RiseSharedConstants.ActionMessages.Categories.ENVIRONMENT.key
            , msgBody: msgBody

        };

        Meteor.call("createActionMessage", Meteor.userId(), messageDatum);


    },

    /***
     * return path to action
     * todo: drive out of props.children passed to modal
     * @returns {*}
     */
    returnTo() {
        return ( `/actions/${Session.get("currentActionId")}` );
    },

    render() {
        return (
            <div className="ui icon message">

                <div className="content">

                    <BroadcastMessage  updater={this.messageUpdater} returnTo={ this.returnTo() } />

                </div>
            </div>
        );
    }
});