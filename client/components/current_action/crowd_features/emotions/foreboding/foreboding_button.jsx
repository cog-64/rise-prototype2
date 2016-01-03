
ForebodingButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="foreboding"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="cloud"
                                      linkText="Sense trouble"
            />


        );
    }
});

