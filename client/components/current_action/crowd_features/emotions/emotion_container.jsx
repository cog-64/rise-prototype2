
EmotionContainer = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string
        , actorId:  React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },



    render() {
        let segmentClass = `ui center aligned inverted ${this.props.colour} segment`
            , outerMenuClass = `emotion-container ui inverted ${this.props.colour} ${this.props.orientation} menu`
            , innerMenuClass = `ui inverted ${this.props.colour} ${this.props.orientation} menu`
            ;

        return (
            <div className={segmentClass}>
                <div className={outerMenuClass}>

                    <div className="item">
                        <h2 className="ui header">
                            <div className="content">
                                Crowd Emotion
                            </div>
                        </h2>
                    </div>
                    <div className="item">

                        <div className={innerMenuClass}>
                            <CrowdMoodButton actionId={this.props.actionId} colour={this.props.colour}/>
                            <ForebodingButton actionId={this.props.actionId} colour={this.props.colour}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

