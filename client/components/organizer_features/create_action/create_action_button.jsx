
CreateActionButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
    },

    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="newaction"
                                      buttonColour="yellow"
                                      iconColour="black"
                                      iconName="flag"
                                      linkText="Create New Action"
            />


        );
    }
});



