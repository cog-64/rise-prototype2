
ReportSituationButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },

    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="situation"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="alarm"
                                      linkText="Situation in progress"
            />


        );
    }
});