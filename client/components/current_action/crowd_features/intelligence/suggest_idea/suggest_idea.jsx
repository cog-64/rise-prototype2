 /****
 * allow the actor to add some additional information
 */


const { Link } = ReactRouter;

 SuggestIdea = React.createClass({
     propTypes: {
         propositions: React.PropTypes.object.isRequired //RiseSharedConstants.Propositions
         , updater: React.PropTypes.func.isRequired
         , returnTo: React.PropTypes.string.isRequired
     },

     getInitialState () {
         return {
             currentPropositionKey: null
             , propositionDescription: null

         };
     },

     selectProposition(key) {
         // set the state
         this.setState({
             currentPropositionKey: key
         });
     },

     setDescription(textarea) {
         //debugger;
         let description = textarea.val();
         this.setState({
             propositionDescription: description
         });
     },


     render() {

         let getButtonIconStyle = () => {
             let colour = 'black', icon='question'
             let proposition = _.findWhere(this.props.propositions, {key: this.state.currentPropositionKey});
             if (proposition) {
                 colour = proposition.colour;
                 icon = proposition.icon;
             }

             return `huge circular inverted ${colour} ${icon} icon`;

         };

         let getButtonStyle = () => {
             let isDisabled = 'disabled';
             if (this.state.currentPropositionKey) {
                 isDisabled = '';
             };

             return `${isDisabled} positive ui fluid icon button`;
         };

         let getButtonText = () => {
             let buttText = '(tap a proposition first)';
             if (this.state.currentPropositionKey) {
                 buttText = 'tell the crowd';
             };

             return buttText;
         };

         let getTextAreaClass = () => {
             let isDisabled = 'disabled';
             if (this.state.currentPropositionKey) {
                 isDisabled = '';
             };

             return `${isDisabled} field`;
         };


         return (
             <div className="ui two column middle aligned relaxed stackable grid">
                 <div className="column">
                     <h1 className="ui left aligned header">
                         What do you think we should do?
                     </h1>
                     <div className="ui horizontal divider">
                     </div>

                     <LookupList listObjects={this.props.propositions} selectListObject={this.selectProposition}/>
                 </div>
                 <div className="ui vertical divider">
                     <i className="comment outline icon"></i>
                 </div>
                 <div className="center aligned column">
                     <div className="row">

                         <h1 className="ui left aligned header">
                             So how does it go?
                         </h1>

                         <div className="ui horizontal divider">
                         </div>


                         <div className="ui horizontal divider">
                         </div>

                         <div className="ui form" onBlur={this.setDescription.bind(null,  $('#proposition-description') )}>
                             <div className={ getTextAreaClass() }>
                                 <textarea id="proposition-description" placeholder="any helpful details to mention?"></textarea>
                             </div>
                         </div>
                     </div>

                     <div className="ui horizontal divider">
                     </div>

                     <div className="row">

                         <div className="ui horizontal divider">
                         </div>


                         <Link to={this.props.returnTo} className={getButtonStyle()}
                               onClick={this.props.updater.bind(null, this.state.currentPropositionKey, this.state.propositionDescription)}>
                             <i className={getButtonIconStyle()}></i>
                             <h1>{ getButtonText() }</h1>

                         </Link>

                     </div>

                 </div>

             </div>
         );
     }

 });


