ActionMessagesDisplay = React.createClass({
    propTypes:{
        actionMessages: React.PropTypes.array.isRequired
    },



    formatMessages() {
       let formattedMessages =  this.props.actionMessages.map( (message) => {


            //debugger;
           let category = message.category
               , msgConfiguration = _.findWhere(RiseSharedConstants.ActionMessages.Categories,{key:category} )
               , segmentColour = msgConfiguration.colour
               , segmentClass = `ui center aligned inverted ${segmentColour} compact segment`
               , icon = message.icon || msgConfiguration.icon
               , isAdministrative = !!message.isAdministrative
               , iconClass = `big ${icon} icon`
               , contentText = message.msgBody
               , handle = ActorUtilities.getActorHandle(message.actorId)
               , latLng = ActorUtilities.getActorLatLng(message.actorId)
               , key = message._id
           ;
           // helper to do panning
           let setPanLocation = (latLng) => {
               debugger;
               IntercomponentComs.setPanToLatLng(latLng);
           };

           messageFrom = () => {
               if (isAdministrative) {
                   return "Crowd says:";
               } else {
                   return `${handle} says:`
               }
           };

           showMessageButtons = () => {
               if (!isAdministrative) {

                   return (
                       <div className="ui basic container segment">

                           <button className="ui circular inverted left floated icon button" onClick={setPanLocation.bind(null, latLng)}>
                               <i className="big circular marker icon"></i>
                           </button>

                           <div className="ui massive right floated buttons">
                               <button className="ui inverted negative icon button">
                                   <i className="icon thumbs down"></i>
                               </button>
                               <div className="or"></div>
                               <button className="ui inverted positive icon button">
                                   <i className="icon thumbs up"></i>
                               </button>
                           </div>

                       </div>
                   );
               }
           }




            return (
                <div key={key} className="ui bottom attached inverted message">
                    <div className={segmentClass}>
                        <h2 className="ui black header">
                            <i className={iconClass}></i>
                            <div className="content">
                                { messageFrom() }
                            </div>
                        </h2>

                        <div className="horizontal divider"/>
                        <h1 className="ui huge black header">
                            <div className="content">
                                {contentText}
                            </div>
                        </h1>

                        { showMessageButtons() }

                    </div>
                </div>
            );
        })

        return formattedMessages;

    },



    render() {
        return (  <div id="formatted-action-messages">
            { this.formatMessages() }
        </div>  );
    }

});