
const { Link, History  } = ReactRouter;

AuthErrors = React.createClass({
    propTypes: {
        errors: React.PropTypes.object
    },

    mixins: [  History ],

    componentDidMount(){
       // debugger;

        // selector cache
        const
            $modalDlg = $('.ui.basic.modal');

        $modalDlg
            .modal({debug: true})
            .modal({
                closable: false //no x-out: force a choice
                , transition: 'vertical flip'
            })
        //todo: fix reload from history
        // history goes back to the dash, but dies with an invariant violation that I just don't
        // have the time or energy to deal with now...
            //.modal({
            //    onApprove: ()=> {
            //        console.log('errors modal closed');
            //        this.history.pushState(null, '/');
            //    }
        //})
        ;

        //  show this modal if we have errors
        if (this.props.errors) {
            $modalDlg.modal('show');
        }


    },
    render() {
        //onClick={() => this.history.pushState(null, '/')}

        let showErrs = (errMsgs) => {
            //debugger;
            let msgs =  _.values(this.props.errors).map(function (errorMessage) {
                            //debugger;
                            let msg = {errorMessage}
                            return  msg["errorMessage"]
                        });

            // todo: make a formatted list of tags rather than returning just the first
            return _.first(msgs);
        };

        if (this.props.errors) {
            //debugger;
            return (
            <div className="ui basic modal">
                    <div className="ui huge icon header">
                        <i className="huge red lock icon"></i>
                        <div className="content">
                            Can't join this action

                            <div className="ui sub header">
                                Here's the skinny:
                            </div>

                            <div>
                                { showErrs(this.props.errors) }
                            </div>
                        </div>

                    </div>

                    <div className="actions">
                        <Link to="/">
                            <div className="ui positive right labeled icon button">
                                Ok, back to the dashboard
                                <i className="large arrow circle outline left icon"></i>

                            </div>
                        </Link>
                    </div>


            </div>



            );
        } else {
            // Don't render anything
            return <span />
        }
    }
});


/***
 * wrapper around the standard AuthErrors to
 * massage the text of the geolocation errors
 */
GeolocErr = React.createClass({
    propTypes: {
        geoError: React.PropTypes.object
    },

    getInitialState () {
        return {
            errors: null
            , selfActorId: null

        };
    },

    componentDidMount() {
        let geoErrorHash = {
            "1": "You must allow geolocation to join an action"
            , "2": "location information is currently unavailable on your device"
            , "3": "location determination timed out"
            , "UNKNOWN_ERROR": "an unknown error occurred determining your position"

        };

        let errString = geoErrorHash[err.code] || geoErrorHash["UNKNOWN_ERROR"];

        this.setState({
            errors: {'geolocation': errString}
        })

    },



  render() {

          return <AuthErrors errors={this.state.errors}/>

  }
});




