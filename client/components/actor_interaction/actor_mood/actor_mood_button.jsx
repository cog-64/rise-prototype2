
ActorMoodButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="actormood"
                                      buttonColour={this.props.colour}
                                      iconColour="white"
                                      iconName="heart"
                                      linkText="Your mood"
            />


        );
    }
});

