/***
 * render a list of buttons for the types of situations
 * and allow a space for a description to be written
 */

const { Link } = ReactRouter;

ActorSOS = React.createClass({
    propTypes: {
        SOSs: React.PropTypes.object.isRequired //RiseSharedConstants.SOS
        , updater: React.PropTypes.func.isRequired
        , returnTo: React.PropTypes.string.isRequired
        , cancelSOS: React.PropTypes.func.isRequired
        , hasSOS: React.PropTypes.bool.isRequired
    },

    getInitialState () {
        return {
            currentSOSKey: null
            , SOSDescription: null

        };
    },


    selectSOS(key) {
        // set the state
        this.setState({
            currentSOSKey: key
        });
    },

    setDescription(textarea) {
        debugger;
        let description = textarea.val();
        this.setState({
            SOSDescription: description
        });
    },


    render() {

        let getButtonIconStyle = () => {
            let colour = 'black', icon='question'
            let sos = _.findWhere(this.props.SOSs, {key: this.state.currentSOSKey});
            if (sos) {
                colour = sos.colour;
                icon = sos.icon;
            }

            return `huge circular inverted ${colour} ${icon} icon`;

        };

        let getButtonStyle = () => {
            let isDisabled = 'disabled';
            if (this.state.currentSOSKey) {
                isDisabled = '';
            };

            return `${isDisabled} positive ui fluid icon button`;
        };

        let getButtonText = () => {
            let buttText = '(what kind of SOS first)';
            if (this.state.currentSOSKey) {
                buttText = 'Send SOS';
            };

            return buttText;
        };



        let getTextAreaClass = () => {
            let isDisabled = 'disabled';
            if (this.state.currentSOSKey) {
                isDisabled = '';
            };

            return `${isDisabled} field`;
        };

        let showCancelButton = () => {

            let getCancelButtonIconStyle = () => {
                let colour = 'black', icon='close'
                return `huge circular inverted ${colour} ${icon} icon`;

            };

            let getCancelButtonStyle = () => {
                return `negative ui fluid icon button`;
            };

            let getCancelButtonText= () => {
                let buttText = 'cancel SOS';

                return buttText;
            };

            if (this.props.hasSOS) {
                return (
                    <Link to={this.props.returnTo} className={getCancelButtonStyle()}
                          onClick={this.props.cancelSOS}>
                        <i className={getCancelButtonIconStyle()}></i>
                        <h1>{ getCancelButtonText() }</h1>

                    </Link>
                );
            }

        };


        return (
            <div className="ui two column middle aligned relaxed stackable grid">
                <div className="column">
                    <h1 className="ui left aligned header">
                        SOS! What's going on?
                    </h1>
                    <div className="ui horizontal divider">
                    </div>

                    <LookupList listObjects={this.props.SOSs} selectListObject={this.selectSOS}/>
                </div>
                <div className="ui vertical divider">
                    <i className="comment outline icon"></i>
                </div>
                <div className="center aligned column">
                    <div className="row">

                        <h1 className="ui left aligned header">
                            Got any details?  Tell the crowd...
                        </h1>

                        <div className="ui horizontal divider">
                        </div>


                        <div className="ui horizontal divider">
                        </div>

                        <div className="ui form" onBlur={this.setDescription.bind(null,  $('#situation-description') )}>
                            <div className={ getTextAreaClass() }>
                                <textarea id="situation-description" placeholder="any helpful details to mention?"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="ui horizontal divider">
                    </div>

                    <div className="row">

                        <div className="ui horizontal divider">
                        </div>


                        <Link to={this.props.returnTo} className={getButtonStyle()}
                              onClick={this.props.updater.bind(null, this.state.currentSOSKey, this.state.SOSDescription)}>
                            <i className={getButtonIconStyle()}></i>
                            <h1>{ getButtonText() }</h1>

                        </Link>

                        { showCancelButton() }

                    </div>

                </div>

            </div>
        );
    }
});