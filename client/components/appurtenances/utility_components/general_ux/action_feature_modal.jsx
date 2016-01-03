const { Link } = ReactRouter;
ActionFeatureModal = React.createClass({
    PropTypes:{
        actionId: React.PropTypes.string.isRequired
        , actorId:  React.PropTypes.string.isRequired
        , returnTo: React.PropTypes.string.isRequired
    },

    styles: {
        position: 'fixed',
        top: '15%',
        right: '2%',
        bottom: '15%',
        left: '2%',
        padding: 50,
        boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
        overflow: 'visible',
        background: '#fff'
    },
    /***
     * toggle the sidbar off
     */
    componentDidMount() {
        MenuActions.closeOpenSidebars();
    },

    /***
     * function to pass to children to close this modal from a child
     */
    closeModal() {
        //
    },

    buttonStyles: {
        position: 'absolute'
        , width: '90%'
        , top: '90%'
    },

    render() {
        //debugger;
        let returnTo = this.props.returnTo;
        return (
            <div style={this.styles}>

                {this.props.children}

                <div className="actions" style={this.buttonStyles}>

                    <Link to={returnTo} className="ui positive right floated labeled icon button">
                        Back to Action
                        <i className="checkmark icon"></i>
                    </Link>
                </div>
            </div>
        )
    }
});