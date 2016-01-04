/***
 * data component and subscription management for the crowd moods
 * called by the router on the mood route
 */

CrowdMoodWrapper= React.createClass({


    mixins: [ReactMeteorData],

    getMeteorData() {
        console.log('in the reactive ctx for CrowdMoodWrapper');
        let actionId =  Session.get('currentActionId')
            , actorId = Session.get('currentActorId')
            , subsReady = false
            , emotionTypes = this.getEstimateTypes(RiseSharedConstants.Emotions)
            ;

        console.log(`crowd actions sees the action as ${actionId} and the actor as ${actorId}`);

        const subHandles = [
            Meteor.subscribe("crowdActionAggregations", actionId)
            , Meteor.subscribe("actorActionEstimates", actionId)
        ];

        subsReady = _.all(subHandles, function (handle) {
            return handle.ready();
        });

        const mapIsReady = Mapbox.loaded();

        return {

            mapIsReady: mapIsReady
            , subsReady: subsReady

            , actorId: actorId
            , actionId: actionId

            , crowdEmotionsMap: CrowdEstimates.find({actionId: actionId, type:{$in: emotionTypes }}).fetch()
            , crowdEmotionsAggregate: CrowdEstimateAggregations.find({actionId: actionId, type:{$in: emotionTypes }}).fetch()

        };
    },


    // get an array of type codes for an estimate category
    getEstimateTypes(category) {
        return _.values(category);
    },

    /**
     * send the estimate
     * @param type
     * @param rating
     */
    crowdRatingUpdater(type, rating) {
        //debugger;
        let estimateDatum = {
            actionId: this.data.actionId
            , actorId: this.data.actorId
            , type:type
            , rating: rating
        };

        Meteor.call("makeEstimate", Meteor.userId(), estimateDatum);
    },


    /***
     * return the crowd's current averaged rating for an estimate
     */
    getCrowdAverageRating(category) {
        //debugger;
        let crowdRating = 0
            , type = category // RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_WELLBEING
            , serverData = _.where(this.data.crowdEmotionsAggregate, {type: type})
            ;

        // expect a singleton or nada
        if (serverData && serverData[0]) {
            crowdRating = serverData[0].averageRating;
        }

        console.log(`got average rating ${crowdRating} for ${category}`)
        return crowdRating;

    },



    render() {


        if (!this.data.subsReady ) {
            //debugger;
            // className="full height"
            return  (
                <div>
                    <LoadingMessage message="getting crowd mood estimates.."/>
                </div>

            );
        } else {
            return (
                <CrowdMoodRatings crowdEmotionsMap={this.data.crowdEmotionsMap}
                                  actorRatingUpdater={this.crowdRatingUpdater}
                                  avgWellbeingRating={this.getCrowdAverageRating(RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_WELLBEING)}
                                  avgMotivationRating={this.getCrowdAverageRating(RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_MOTIVATION)}

                />
            );
        }
    }
});



