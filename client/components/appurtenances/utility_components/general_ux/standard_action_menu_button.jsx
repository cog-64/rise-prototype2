
/***
 * item wrapper for sidebar button on the menu
 */
StandardActionMenuButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , route:  React.PropTypes.string.isRequired
        , buttonColour: React.PropTypes.string.isRequired
        , iconColour: React.PropTypes.string.isRequired
        , iconName: React.PropTypes.string.isRequired
        , linkText: React.PropTypes.string.isRequired
    },


    render() {
        //debugger;

    let     itemClass=`${this.props.route}-feature link item`
           ;
        return (
            <div className={itemClass}>

                <StandardLinkToModalButton actionId={this.props.actionId}
                                           route={this.props.route}
                                           buttonColour={this.props.buttonColour}
                                           iconColour={this.props.iconColour}
                                           iconName={this.props.iconName}
                                           linkText={this.props.linkText}
                />
            </div>
        );
    }
});
