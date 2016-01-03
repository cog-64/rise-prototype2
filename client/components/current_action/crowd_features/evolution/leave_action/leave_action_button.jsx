
LeaveActionButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="leave"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="remove user"
                                      linkText="Leave action"
            />


        );
    }
});



