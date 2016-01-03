/***
 * expect this to be sited in a modal
 */

ReportSituationWrapper = React.createClass({

    /**
     * send the estimate
     * @param type
     * @param rating
     */
    situationUpdater(type, description) {
       // debugger;

        let situationDatum = {
            actionId: Session.get("currentActionId")
            , actorId: Session.get("currentActorId")
            , type:type
            //, description: description
        };

        // only add the description if it's a real description
        if (!!description) {
            situationDatum.description = description;
        }

        Meteor.call("reportSituation", Meteor.userId(), situationDatum);

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


                    <ReportSituation situations={RiseSharedConstants.Situations} updater={this.situationUpdater} returnTo={ this.returnTo() } />


                </div>
            </div>
        );
    }
});