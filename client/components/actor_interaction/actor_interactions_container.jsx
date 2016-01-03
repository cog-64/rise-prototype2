ActorInteractionContainer = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , actorId: React.PropTypes.string.isRequired
        , orientation: React.PropTypes.string.isRequired
        , colour: React.PropTypes.string.isRequired
    },

    styles: {
        left: "10%"
        , right: "10%"
        , width: "80%"
        , top: 0
    },


    render() {
        let segmentClass = `ui center aligned inverted ${this.props.colour} segment`
            , outerMenuClass = `actor-container ui inverted ${this.props.colour} ${this.props.orientation} menu`
            , innerMenuClass = `ui inverted ${this.props.colour} ${this.props.orientation} right menu`
            ;
        return (
            <div className={segmentClass} style={this.styles}>
                <div className={outerMenuClass}>
                    {/*crowd emo*/}
                    <div className="item">
                        <h2 className="ui inverted header">
                            <div className="content">

                            </div>
                        </h2>
                    </div>
                    <div className="item">

                        <div className=" left menu">
                            <RiseHomeLink colour="black"/>
                        </div>

                        <div className={innerMenuClass}>

                            <ActorHandleButton actionId={this.props.actionId} colour={this.props.colour}/>
                            <ActorMoodButton actionId={this.props.actionId} colour={this.props.colour}/>
                            <ActorSOSButton actionId={this.props.actionId} colour={this.props.colour}/>
                        </div>


                    </div>
                </div>
            </div>

        );
    }
});

