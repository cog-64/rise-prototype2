EnvironmentContainer = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string
        , actorId:  React.PropTypes.string
        , orientation: React.PropTypes.string.isRequired
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        let segmentClass = `ui center aligned inverted ${this.props.colour} segment`
            , outerMenuClass = `environment-container ui inverted ${this.props.colour} ${this.props.orientation} menu`
            , innerMenuClass = `ui inverted ${this.props.colour} ${this.props.orientation} menu`
            ;

        return (
            <div className={segmentClass}>
                <div className={outerMenuClass}>

                    <div className="item">
                        <h2 className="ui header">
                            <div className="content">
                                Situational Awareness
                            </div>
                        </h2>
                    </div>
                    <div className="item">

                        <div className={innerMenuClass}>
                            <ReportSituationButton  actionId={this.props.actionId} colour={this.props.colour} />
                            <BroadcastMessageButton  actionId={this.props.actionId} colour={this.props.colour} />
                            <UploadPicButton  actionId={this.props.actionId} colour={this.props.colour} />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

