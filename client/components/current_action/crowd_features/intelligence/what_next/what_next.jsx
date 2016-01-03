let { Link } = ReactRouter;

VoteWhatNext = React.createClass({
    propTypes: {
        propositions: React.PropTypes.array.isRequired
        , updater: React.PropTypes.func.isRequired
        , returnTo: React.PropTypes.string.isRequired
    },


    styles: {
        position:'absolute'
        , top: '15%'
        , bottom: '10%'
        , left: '0%'
        , right: '0%'
        , overflow: 'scroll'
    },


      render() {

        return (

            <div className="ui fluid container ">
                <h1 className="ui huge left aligned header">
                    Vote!  (Because a diverse and independent crowd, when intelligently aggregated, is smarter than any expert...)
                </h1>

                <div style={this.styles}>
                    <PropositionsList propositions={this.props.propositions} updater={this.props.updater}/>
                </div>
            </div>
        );
    }




});