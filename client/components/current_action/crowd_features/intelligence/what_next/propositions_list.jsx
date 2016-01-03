PropositionsList = React.createClass({
    propTypes: {
        propositions: React.PropTypes.array.isRequired
        , updater:  React.PropTypes.func.isRequired
    },

    createList() {
        return (
            <div className="ui list">
                {this.createListItems()}
            </div>

        );
    },

    createListItems() {
        let items = this.props.propositions.map((proposition) => {
            // generate an icon button for the object
            return this.createItem(proposition);

        });

        return items;
    },

    createItem(proposition) {

        let  key = proposition._id
            , contentText = proposition.description
            , {carried, closed} = proposition
            , type = _.findWhere(RiseSharedConstants.Propositions, {key:proposition.type})
            , { icon, colour, description } = type
            , segmentClass = `ui center aligned inverted ${colour} compact segment`
            , iconClass = `ui huge circular inverted ${icon} icon`
            , handle = ActorUtilities.getActorHandle(proposition.actorId)

            ;



        return (

            <div key={key} className="ui bottom attached inverted compact message" >
                <div className={segmentClass}>
                    <h2 className="ui black header">
                        <i className={iconClass}></i>
                        <div className="content">
                            {description}
                        </div>
                    </h2>

                    <div className="horizontal divider"/>
                    <h1 className="ui huge black header">
                        <div className="content">
                            {contentText}
                        </div>
                        <div className="ui basic container segment">
                            <div className="ui right floated massive buttons">
                                <button className="ui inverted negative icon button" onClick={this.props.updater.bind(null, key, false)}>
                                    <i className="icon thumbs down"></i>
                                </button>
                                <div className="or"></div>
                                <button className="ui inverted positive icon button" onClick={this.props.updater.bind(null, key, true)}>
                                    <i className="icon thumbs up"></i>
                                </button>
                            </div>

                        </div>
                    </h1>



                </div>
            </div>
        );
    },

    render() {
        return (
            <div >
                {this.createList()}
            </div>
        );
    }

});