
BroadcastMessageButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="broadcast"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="announcement"
                                      linkText="Broadcast Message"
                                      />


        );
    }
});