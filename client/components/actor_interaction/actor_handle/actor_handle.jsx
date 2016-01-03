/****
 * allow the actor to add some additional information
 */


const { Link } = ReactRouter;

ActorHandle = React.createClass({
  propTypes: {
    updater: React.PropTypes.func.isRequired
    , returnTo: React.PropTypes.string.isRequired
  },

  getInitialState () {
    return {
      handle: null
    };
  },

    setHandle(textInput) {
        //debugger;
        if ( !!(textInput) ) {
            let handle = textInput.val();
            this.setState({
                handle: handle
            });
        }


    },

    getPlaceHolderText() {
        let currentHandle = ActorUtilities.getActorHandle(Session.get("currentActorId"))
        if ( !!currentHandle ) {
            return currentHandle;
        } else {
            return "be cool about this now..."
        }
    },

  render() {

      let getButtonIconStyle = () => {
          let colour = 'black', icon = 'question';
          if (!!this.state.handle) {
              colour = 'green';
              icon = 'checkmark'
          }

          return `huge circular inverted ${colour} ${icon} icon`;

      };

      let getButtonText = () => {
          let buttText = '(enter your handle first)';
          if (!!this.state.handle) {
              buttText = 'tell the crowd';
          }

          return buttText;
      };

      let getButtonStyle = () => {
          let isDisabled = 'disabled';
          if (!!this.state.handle) {
              isDisabled = '';          }

          return `${isDisabled} positive ui fluid icon button`;
      };


    return (
        <div className="ui inverted segment">
            <form className="ui inverted form">
                <div className="field">
                    <label>Create a handle for yourself</label>
                    <textarea id="actor-handle" type="text" placeholder={this.getPlaceHolderText()}
                           onChange={this.setHandle.bind(null, $('#actor-handle') ) } />
                </div>

                <Link to={this.props.returnTo} className={getButtonStyle()}
                      onClick={this.props.updater.bind(null, this.state.handle)}>
                    <i className={getButtonIconStyle()}></i>
                    <h1>{ getButtonText() }</h1>

                </Link>
            </form>
        </div>
    );
  }
});


