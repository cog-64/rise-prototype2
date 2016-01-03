
SuggestIdeaButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="idea"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="lightbulb"
                                      linkText="Pitch Idea"
            />


        );
    }
});



