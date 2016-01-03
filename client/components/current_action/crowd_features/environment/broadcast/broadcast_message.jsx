
 /****
 * allow the actor to add some additional information
 */


const { Link } = ReactRouter;

 BroadcastMessage = React.createClass({
    propTypes: {
        updater: React.PropTypes.func.isRequired
        , returnTo: React.PropTypes.string.isRequired
    },

    getInitialState () {
        return {
            msg: null
        };
    },

    setMessage(textInput) {
        //debugger;
        if ( !!(textInput) ) {
            let msg = textInput.val();
            this.setState({
                msg: msg
            });
        }


    },

    getPlaceHolderText() {
        let currentHandle = ActorUtilities.getActorHandle(Session.get("currentActorId"))
        if ( !!currentHandle ) {
            return (`${currentHandle} says: `);
        } else {
            return "be cool about this now..."
        }
    },

    render() {

        let getButtonIconStyle = () => {
            let colour = 'black', icon = 'question';
            if (!!this.state.msg) {
                colour = 'green';
                icon = 'checkmark'
            }

            return `huge circular inverted ${colour} ${icon} icon`;

        };

        let getButtonText = () => {
            let buttText = '(enter your message first)';
            if (!!this.state.msg) {
                buttText = 'message the crowd';
            }

            return buttText;
        };

        let getButtonStyle = () => {
            let isDisabled = 'disabled';
            if (!!this.state.msg) {
                isDisabled = '';          }

            return `${isDisabled} positive ui fluid icon button`;
        };

        let getInputFieldClass = () => {
            let isDisabled = 'disabled';
            if ( !!this.state.msg ) {
                isDisabled = '';
            };

            return `${isDisabled} field`;
        };

        return (
            <div className="ui inverted segment">
                <form className="ui inverted form">
                    <div className="field">
                        <label>Send a message to the crowd</label>
                    <textarea id="broadcast-message" type="text" placeholder={this.getPlaceHolderText()}
                              onChange={this.setMessage.bind(null, $('#broadcast-message') ) } />
                    </div>

                    <Link to={this.props.returnTo} className={getButtonStyle()}
                          onClick={this.props.updater.bind(null, this.state.msg)}>
                        <i className={getButtonIconStyle()}></i>
                        <h1>{ getButtonText() }</h1>

                    </Link>
                </form>
            </div>
        );
    }
});


