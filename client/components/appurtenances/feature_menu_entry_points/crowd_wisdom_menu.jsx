
CrowdWisdomMenu = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , actorId:  React.PropTypes.string.isRequired
        , orientation: React.PropTypes.string.isRequired
    },



    render() {


        return (
            <div className="crowd-wisdom-features">
                <ActorSOSContainer actionId={this.props.actionId}
                                   actorId={this.props.actorId}
                                   orientation={this.props.orientation}
                                   colour="black"
                />

                <EmotionContainer actionId={this.props.actionId}
                                  actorId={this.props.actorId}
                                  orientation={this.props.orientation}
                                  colour="red"
                />
                <IntelligenceContainer actionId={this.props.actionId}
                                       actorId={this.props.actorId}
                                       orientation={this.props.orientation}
                                       colour="blue"
                />

            </div>
        );
    }
});





