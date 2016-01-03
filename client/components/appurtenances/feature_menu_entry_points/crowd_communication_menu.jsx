
CrowdCommunicationMenu = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , actorId:  React.PropTypes.string.isRequired
        , orientation: React.PropTypes.string.isRequired
    },



    render() {


        return (
            <div className="crowd-communication-features">

                <ActorInfoContainer actionId={this.props.actionId}
                    actorId={this.props.actorId}
                    orientation={this.props.orientation}
                    colour="black"
                />

                <EnvironmentContainer actionId={this.props.actionId}
                                      actorId={this.props.actorId}
                                      orientation={this.props.orientation}
                                      colour="green"
                />
                <EvolutionContainer actionId={this.props.actionId}
                                    actorId={this.props.actorId}
                                    orientation={this.props.orientation}
                                    colour="orange"

                />

            </div>
        );
    }
});





