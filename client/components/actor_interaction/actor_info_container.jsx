ActorInfoContainer = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , actorId: React.PropTypes.string.isRequired
        , orientation: React.PropTypes.string.isRequired
        , colour: React.PropTypes.string.isRequired
    },


    render() {
        let segmentClass = `ui center aligned inverted ${this.props.colour} segment`
            , outerMenuClass = `actor-container ui inverted ${this.props.colour} ${this.props.orientation} menu`
            , innerMenuClass = `ui inverted ${this.props.colour} ${this.props.orientation} right menu`
            ;
        return (
            <div className={segmentClass}>
                <div className={outerMenuClass}>
                    {/*crowd emo*/}
                    <div className="item">
                        <h2 className="ui inverted header">
                            <div className="content">
                                You
                            </div>
                        </h2>
                    </div>
                    <div className="item">

                        <div className={innerMenuClass}>
                            <ActorHandleButton actionId={this.props.actionId} colour={this.props.colour}/>
                        </div>


                    </div>
                </div>
            </div>

        );
    }
});

