
ActorHandleButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="handle"
                                      buttonColour={this.props.colour}
                                      iconColour="white"
                                      iconName="child"
                                      linkText="Your handle"
            />


        );
    }
});


