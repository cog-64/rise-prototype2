


const { Link } = ReactRouter;

LeaveAction = React.createClass({
    propTypes: {
        updater: React.PropTypes.func.isRequired
        , returnTo: React.PropTypes.string.isRequired
    },

    getInitialState () {
        return {
            goodByeMsg: null // good bye message
        };
    },

    setGoodbye(textInput) {
        //debugger;
        if ( !!(textInput) ) {
            let goodByeMsg = textInput.val();
            this.setState({
                goodByeMsg: goodByeMsg
            });
        }


    },

    getPlaceHolderText() {
        let currentHandle = ActorUtilities.getActorHandle(Session.get("currentActorId"))
        if ( !!currentHandle ) {
            return `${currentHandle}'s good bye message`;
        } else {
            return "bye..."
        }
    },

    render() {

        let getButtonIconStyle = () => {
            let colour = 'green'
                ,icon = 'checkmark'
            ;

            return `huge circular inverted ${colour} ${icon} icon`;

        };

        let getButtonText = () => {
            return "Leave action";
        };

        let getButtonStyle = () => {

            return `positive ui fluid icon button`;
        };


        return (
            <div className="ui inverted segment">
                <div className="ui huge header" >
                    When you leave an action, your actor record for the action is deleted.  All Situations, Messages,
                    etc. that you have reported will be attributed to anonymous.  If you come back, it will be as if
                    you are new to the action.
                </div>
                <div className="ui horizontal divider">
                </div>
                <form className="ui inverted form">
                    <div className="field">
                        <label>Leave a good bye message</label>
                    <textarea id="actor-goodbye" type="text" placeholder={this.getPlaceHolderText()}
                              onChange={this.setGoodbye.bind(null, $('#actor-goodbye') ) } />
                    </div>

                    <Link to={this.props.returnTo} className={getButtonStyle()}
                          onClick={this.props.updater.bind(null, this.state.goodByeMsg)}>
                        <i className={getButtonIconStyle()}></i>
                        <h1>{ getButtonText() }</h1>

                    </Link>
                </form>
            </div>
        );
    }
});


