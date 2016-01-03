
CrowdMoodButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },

    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="mood"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="heartbeat"
                                      linkText="Crowd mood"
            />


        );
    }
});
