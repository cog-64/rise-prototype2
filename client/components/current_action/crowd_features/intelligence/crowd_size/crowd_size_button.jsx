
CrowdSizeButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="crowdsize"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="users"
                                      linkText="Crowd Size"
            />


        );
    }
});

