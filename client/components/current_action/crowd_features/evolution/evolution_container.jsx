
EvolutionContainer = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string
        , actorId:  React.PropTypes.string
        , orientation: React.PropTypes.string.isRequired
        , colour: React.PropTypes.string.isRequired
    },



    render() {
        let segmentClass = `ui center aligned inverted ${this.props.colour} segment`
            , outerMenuClass = `evolution-container ui inverted ${this.props.colour} ${this.props.orientation} menu`
            , innerMenuClass = `ui inverted ${this.props.colour} ${this.props.orientation} menu`
            ;

        return (
            <div className={segmentClass} >
                <div className={outerMenuClass} >

                    <div className="item">
                        <h2 className="ui header">
                            <div className="content">
                                Evolve Action
                            </div>
                        </h2>
                    </div>
                    <div className="item">

                        <div className={innerMenuClass}>
                            <CreateQRCodeButton actionId={this.props.actionId} colour={this.props.colour}/>
                            <LeaveActionButton actionId={this.props.actionId} colour={this.props.colour}/>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
});

