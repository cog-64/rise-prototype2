SuggestIdeaWrapper = React.createClass({

    /**
     * send the actor's handle
     * @param handle
     */
    propositionUpdater(type, description) {
        // debugger;

        let propositionDatum = {
            actionId: Session.get("currentActionId")
            , actorId: Session.get("currentActorId")
            , type:type
        };

        // only add the description if it's a real description
        if (!!description) {
            propositionDatum.description = description;
        } else {
            propositionDatum.description = "(no details !?)"
        }

        Meteor.call("createProposition", Meteor.userId(), propositionDatum);

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

                    <SuggestIdea propositions={RiseSharedConstants.Propositions} updater={this.propositionUpdater} returnTo={ this.returnTo() } />

                </div>
            </div>
        );
    }
});