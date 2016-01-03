SignInWrapper = React.createClass({
    componentDidMount() {

        IntercomponentComs.enableRightMenu(false);
        IntercomponentComs.enableLeftMenu(false);

    },
    showModal() {
        //debugger;
        let { location } = this.props;
        let isModal = (location && location.state && location.state.modal);

        let getReturnTo = () => {
            if (Session.get("currentActionId")) {
                // session set to new action
                let actionId = Session.get("currentActionId");
                return `/actions/${actionId}`;

            } else  if (location && location.state && location.state.returnTo)   {
                return location.state.returnTo

            } else {
                return '/'
            }
        };

        if (isModal) {
            return (
                <AdminModal returnTo={getReturnTo()} >
                    <SignIn />
                </AdminModal>
            )
        }
    },
    render() {
        return (
            this.showModal()
        );
    }
});