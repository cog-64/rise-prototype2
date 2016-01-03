

const {
    Link // the primary mechanism of navigation; link will render a fully accessible anchor with a proper href
    } = ReactRouter

StandardLinkToModalButton  = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , route:  React.PropTypes.string.isRequired
        , buttonColour: React.PropTypes.string.isRequired
        , iconColour: React.PropTypes.string.isRequired
        , iconName: React.PropTypes.string.isRequired
        , linkText: React.PropTypes.string.isRequired
    },

    //showModal() {
    //    //onClick={this.showModal}
    //    //actually we'll navigate to the route mood to load CrowdMoodRating\
    //},

    /***
     * link to a new route, and pass state up to the router, Router will pass it into
     * the first component (GeolocateUser).  Will need to pass this state down to the component
     * that will eventually render the modal (CurrentAction)
     * @returns {XML}
     */
    render() {
        //debugger;

        let  root =  ( !!this.props.actionId ) ? `/actions/${this.props.actionId}` : ''
            , url = `${root}/${this.props.route}`
            , returnTo =  ( !!this.props.actionId ) ? `/actions/${this.props.actionId}` : '/'
            , linkClass = `ui big ${this.props.buttonColour} animated fade button`
            , iconClass =`huge ${this.props.iconColour} ${this.props.iconName} icon`
            ;

        //console.log(`button for route ${this.props.route} navigates to ${url} and when finished in modal return to ${returnTo}`);

        return (

            <Link to={url} className={linkClass}
                  state={{ modal: true, returnTo: returnTo }}  // pass this object up to the router, and then through the layers to the modal
            >

                <div className="hidden content">{this.props.linkText}</div>
                <div className="visible content">
                    <i className={iconClass}></i>
                </div>
            </Link>
        );
    }
});