
ActorSOSButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="sos"
                                      buttonColour={this.props.colour}
                                      iconColour="white"
                                      iconName="life ring"
                                      linkText="HELP!"
            />


        );
    }
});

