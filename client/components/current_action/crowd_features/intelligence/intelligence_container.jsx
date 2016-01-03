
IntelligenceContainer = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string
        , actorId:  React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        let segmentClass = `ui center aligned inverted ${this.props.colour} segment`
            , outerMenuClass = `intelligence-container ui inverted ${this.props.colour} ${this.props.orientation} menu`
            , innerMenuClass = `ui inverted ${this.props.colour} ${this.props.orientation} menu`
            ;

        return (
            <div className={segmentClass}>
                <div className={outerMenuClass}>

                    <div className="item">
                        <h2 className="ui header">
                            <div className="content">
                                Crowd Intelligence
                            </div>
                        </h2>
                    </div>
                    <div className="item">

                        <div className={innerMenuClass}>
                            <CrowdSizeButton actionId={this.props.actionId} colour={this.props.colour}/>
                            <SuggestIdeaButton actionId={this.props.actionId} colour={this.props.colour}/>
                            <WhatNextButton actionId={this.props.actionId} colour={this.props.colour}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

