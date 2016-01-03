/***
 * render a list of buttons for the types of situations
 * and allow a space for a description to be written
 */

const { Link } = ReactRouter;

ReportSituation = React.createClass({
    propTypes: {
        situations: React.PropTypes.object.isRequired //RiseSharedConstants.Situations
        , updater: React.PropTypes.func.isRequired
        , returnTo: React.PropTypes.string.isRequired
    },

    getInitialState () {
        return {
            currentSituationKey: null
            , situationDescription: null

        };
    },

    //createSituationButtons() {
    //    //debugger;
    //
    //    let buttonArray = _.map(this.props.situations,  (situation) => {
    //        // generate an icon button for the situation
    //        return this.renderButton(situation);
    //
    //        // attach onclick event to set state with name of situation
    //    });
    //
    //    return buttonArray;
    //},
    //
    //renderButton(situation) {
    //
    //        let buttClass = "ui huge labeled button"
    //            , buttKey = situation.key
    //            , leftButtClass = `ui ${situation.colour} button`
    //            , icoClass = `ui big ${situation.icon} icon`
    //            , aClass = `ui basic ${situation.colour} left pointing label`
    //            , description = situation.description
    //    ;
    //
    //    return (
    //        <div className="ui left aligned basic segment">
    //            <div key={buttKey} className={buttClass}>
    //                <div className={leftButtClass}>
    //                    <i className={icoClass}></i>
    //                </div>
    //                <a className={aClass}>
    //                    {description}
    //                </a>
    //            </div>
    //
    //        </div>
    //    );
    //},

    selectSituation(key) {
        // set the state
        this.setState({
            currentSituationKey: key
        });
    },

    setDescription(textarea) {
        //debugger;
        let description = textarea.val();
        this.setState({
            situationDescription: description
        });
    },


render() {

    let getButtonIconStyle = () => {
        let colour = 'black', icon='question'
        let situation = _.findWhere(this.props.situations, {key: this.state.currentSituationKey});
        if (situation) {
            colour = situation.colour;
            icon = situation.icon;
        }

        return `huge circular inverted ${colour} ${icon} icon`;

    };

    let getButtonStyle = () => {
        let isDisabled = 'disabled';
        if (this.state.currentSituationKey) {
            isDisabled = '';
        };

        return `${isDisabled} positive ui fluid icon button`;
    };

    let getButtonText = () => {
        let buttText = '(tap a situation first)';
        if (this.state.currentSituationKey) {
            buttText = 'tell the crowd';
        };

        return buttText;
    };

    let getTextAreaClass = () => {
        let isDisabled = 'disabled';
        if (this.state.currentSituationKey) {
            isDisabled = '';
        };

        return `${isDisabled} field`;
    };


    return (
        <div className="ui two column middle aligned relaxed stackable grid">
            <div className="column">
                <h1 className="ui left aligned header">
                    What's going on?
                </h1>
                <div className="ui horizontal divider">
                </div>

                <LookupList listObjects={this.props.situations} selectListObject={this.selectSituation}/>
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
                          onClick={this.props.updater.bind(null, this.state.currentSituationKey, this.state.situationDescription)}>
                        <i className={getButtonIconStyle()}></i>
                        <h1>{ getButtonText() }</h1>

                    </Link>

                </div>

            </div>

        </div>
    );
    }
});