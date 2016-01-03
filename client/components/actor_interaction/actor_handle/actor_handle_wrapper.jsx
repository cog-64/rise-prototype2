/***
 * let the actor choose a name for themselves
 */

ActorHandleWrapper = React.createClass({

    /**
     * send the actor's handle
     * @param handle
     */
    actorUpdater( handle) {

        let actorDatum = {
            actionId: Session.get("currentActionId")
            , actorId: Session.get("currentActorId")
            , handleName: handle

        };

        Meteor.call("createActorHandle", Meteor.userId(), actorDatum);

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

                    <ActorHandle  updater={this.actorUpdater} returnTo={ this.returnTo() } />

                </div>
            </div>
        );
    }
});