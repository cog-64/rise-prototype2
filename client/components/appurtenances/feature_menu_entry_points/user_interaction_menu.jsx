UserInteractionMenu = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string
        , actorId: React.PropTypes.string
        , isOrganizer: React.PropTypes.bool
        , orientation: React.PropTypes.string.isRequired

    },
    styles: {
        left: "30%"
        , right: "30%"
        , width: "40%"
        , top: 0
    },

    showOrganizerButton() {
        if (this.props.isOrganizer) {
            return  <OrganizerButton />
        }
    },



    render() {

        return (
            <div className="actor-features">
                <div className=" center aligned black segment">
                    <RiseVersionLabel />

                    <div className="ui center aligned inverted segment" style={this.styles}>
                        <RiseHomeLink />
                        <SignInButton />
                        {this.showOrganizerButton()}

                    </div>

                </div>
                <ForkLabel />
            </div>
        );
    }
});

