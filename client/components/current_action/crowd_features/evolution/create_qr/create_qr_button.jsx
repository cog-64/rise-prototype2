
CreateQRCodeButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },

    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="qrcode"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="qrcode"
                                      linkText="Invite"
            />


        );
    }
});



