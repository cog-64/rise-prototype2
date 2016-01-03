ActorSOSWrapper = React.createClass({
    /**
     * send the estimate
     * @param type
     * @param rating
     */
    SOSUpdater(type, description) {


        let SOSDatum = {
            actionId: Session.get("currentActionId")
            , actorId: Session.get("currentActorId")
            , type:type
        };

        // only add the description if it's a real description
        if (!!description) {
            SOSDatum.description = description;
        }

        Meteor.call("sendActorSOS", Meteor.userId(), SOSDatum);

    },

    cancelSOS() {
        let SOSDatum = {
            actionId: Session.get("currentActionId")
            , actorId: Session.get("currentActorId")
        };

        Meteor.call("cancelActorSOS", Meteor.userId(), SOSDatum);

    },
    hasSOS() {
        //debugger;
        return ActorUtilities.hasSOS(Session.get("currentActorId"));
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

                    <ActorSOS SOSs={RiseSharedConstants.SOS} updater={this.SOSUpdater} returnTo={ this.returnTo()} cancelSOS={this.cancelSOS} hasSOS={ this.hasSOS() } />

                </div>
            </div>
        );
    }
});