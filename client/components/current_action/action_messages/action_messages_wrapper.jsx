ActionMessageWrapper = React.createClass({
    propTypes:{
        actionId: React.PropTypes.string.isRequired
    },

    styles: {
        position: 'fixed',
        top: '80%',
        right: '0%',
        bottom: '0%',
        left: '0%',
        padding: 0,
        overflow: 'scroll',
        background: '#000'
    },

    mixins: [ReactMeteorData],

    getMeteorData() {

        //debugger;
        let
            actionId = this.props.actionId
            , subsReady = false
            , messageOptions = {}
            , messageSort = {createdDT: -1}
            ;

        messageOptions.sort = messageSort;

        const subHandles = [
          Meteor.subscribe("currentActionMessages", actionId)
        ];

        subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });



        return ({
            subsReady: subsReady
            , currentActionMessages: ActionMessages.find({actionId:actionId},  messageOptions).fetch()
        })
    },

    messageDisplay() {
        //debugger;
        if (this.data.currentActionMessages.length === 0) {
            return ( <NoActionMessages /> );
        } else {
            return ( <ActionMessagesDisplay actionMessages={this.data.currentActionMessages}/> );
        }
    },

    render() {

        if (!this.data.subsReady) {
            //debugger;
            // className="full height"
            return (
                <div id="action-messages" style={this.styles}>
                    <LoadingMessage message="getting recent action messages.."/>
                </div>
            );
        } else {
            return (
                <div style={this.styles}>
                    { this.messageDisplay() }
                </div>
            );
        }
    }
});
