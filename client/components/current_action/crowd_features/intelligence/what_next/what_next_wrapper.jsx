WhatNextWrapper = React.createClass({


    mixins: [ReactMeteorData],

    getMeteorData() {
        console.log('in the reactive ctx for CrowdMoodWrapper');
        let actionId =  Session.get('currentActionId')
            , actorId = Session.get('currentActorId')
            , subsReady = false
            ;

        console.log(`crowd actions sees the action as ${actionId} and the actor as ${actorId}`);

        const subHandles = [
            Meteor.subscribe("currentActionPropositions", actionId)
        ];

        subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });


        return {

             subsReady: subsReady

            , actorId: actorId
            , actionId: actionId
            , actionPropositions: ActionPropositions.find({actionId: actionId, voters: {$nin: [actorId]}}, {sort:{createdDT:-1}}).fetch()

        };
    },


    /**
     * send the vote
     * @param propositionId
     * @param support
     */
    propositionUpdater(propositionId, support) {
        
        let voteDatum = {
            actionId: this.data.actionId
            , actorId: this.data.actorId
            , propositionId: propositionId
            , supported: support
        };

        Meteor.call("voteProposition", Meteor.userId(), voteDatum);
    },


    /***
     * return path to action
     * todo: drive out of props.children passed to modal
     * @returns {*}
     */
    returnTo() {
        return ( `/actions/${Session.get("currentActionId")}` );
    },

    messageDisplay() {

        if (this.data.actionPropositions.length === 0) {
            return ( <NoPropositions /> );
        } else {

            return (<VoteWhatNext propositions={this.data.actionPropositions}
                                  updater={this.propositionUpdater}
                                  returnTo={ this.returnTo() }
            /> );
        }

    },


    render() {


        if (!this.data.subsReady ) {

            return  (
                <div>
                    <LoadingMessage message="getting crowd propositions.."/>
                </div>

            );
        } else {
            return (
                <div id="formatted-action-propositions">
                    { this.messageDisplay() }
                </div>
            );


        }
    }
});

