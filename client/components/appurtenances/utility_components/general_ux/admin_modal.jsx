const { Link } = ReactRouter;
AdminModal = React.createClass({
    PropTypes:{
        returnTo: React.PropTypes.string.isRequired
    },

    styles: {
        position: 'fixed',
        top: '15%',
        right: '15%',
        bottom: '15%',
        left: '15%',
        padding: 50,
        boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
        overflow: 'visible',
        background: '#fff'
    },

    buttonStyles: {
        position: 'absolute'
        , width: '90%'
        , top: '90%'
    },

    /***
     * toggle the sidbar off
     */
    componentDidMount() {
        MenuActions.closeOpenSidebars();
    },

    render() {
        //debugger;
        let returnTo = this.props.returnTo;
        return (
            <div style={this.styles}>

                {this.props.children}

                <div className="actions" style={this.buttonStyles}>

                    <Link to={returnTo} className="ui positive right floated labeled icon button">
                        That's cool
                        <i className="checkmark icon"></i>
                    </Link>
                </div>
            </div>
        )
    }
})