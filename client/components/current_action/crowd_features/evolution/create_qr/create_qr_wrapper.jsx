CreateQRWrapper = React.createClass({
    returnTo() {
        //debugger;
        let { origin } = window.location;
        return ( `${origin}/actions/${Session.get("currentActionId")}` );
    },


    actionDescription() {
        return ActionUtilities.getActionDescription(Session.get("currentActionId"));
    },

    render() {
        return (

                <div className="content">
                    <CreateQRCode  actionURI={ this.returnTo() } description={this.actionDescription()} />
                </div>

        );
    }
});
