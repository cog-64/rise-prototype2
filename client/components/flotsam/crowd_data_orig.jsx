
CrowdMenuFeaturesOrig = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
        , actorId:  React.PropTypes.string
    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        console.log('in the ctx mixin for CrowdActions');
        let actionId =  this.props.actionId
            , actorId = this.props.actorId
            , subsReady = false
            , emotionTypes = this.getEstimateTypes(RiseSharedConstants.Emotions)
            , intelligenceTypes = this.getEstimateTypes(RiseSharedConstants.Intelligence)
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

            //, crowdWellbeingMap: CrowdEstimates.find({type:RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_WELLBEING}).fetch()
            //, crowdWellbeingAggregate: CrowdEstimateAggregations.find({type:RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_WELLBEING}).fetch()
            //
            //, crowdMotivationMap:  CrowdEstimates.find({type:RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_MOTIVATION}).fetch()
            //, crowdMotivationAggregate: CrowdEstimateAggregations.find({type:RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_MOTIVATION}).fetch()
            //
            //, crowdForeboddingMap:  CrowdEstimates.find({type:RiseSharedConstants.Emotions.SUBJECTIVE_FOREBODING}).fetch()
            //, crowdForeboddingAggregate: CrowdEstimateAggregations.find({type:RiseSharedConstants.Emotions.SUBJECTIVE_FOREBODING}).fetch()
            //
            //, crowdSizeEstimateMap:  CrowdEstimates.find({type:RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_SIZE_ESTIMATE}).fetch()
            //, crowdSizeEstimateAggregate: CrowdEstimateAggregations.find({type:RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_SIZE_ESTIMATE}).fetch()

            , crowdEmotionsMap: CrowdEstimates.find({type:{$in: emotionTypes }}).fetch()
            , crowdEmotionsAggregate: CrowdEstimateAggregations.find({type:{$in: emotionTypes }}).fetch()

            , crowdIntelligenceMap: CrowdEstimates.find({type:{$in: intelligenceTypes }}).fetch()
            , crowdIntelligenceAggregate: CrowdEstimateAggregations.find({type:{$in: intelligenceTypes }}).fetch()




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
            actionId: this.props.actionId
            , actorId: this.props.actorId
            , type:type
            , rating: rating
        };

        Meteor.call("makeEstimate", Meteor.userId(), estimateDatum);
    },


    render() {

        let showCrowdWisdomActions = () => {
            if ( this.data.subsReady ) {
                return (
                    <div className="crowd-wisdom-options">

                        <EmotionContainer actionId={this.props.actionId}
                                          mapData={this.data.crowdEmotionsMap}
                                          aggData={this.data.crowdEmotionsAggregate}
                                          ratingUpdater={this.crowdRatingUpdater}
                        />


                        <IntelligenceContainer actionId={this.props.actionId} actorId={this.props.actorId} />

                    </div>
                );
            }
        };

        return (
            <div className="crowd-features">

                { showCrowdWisdomActions() }
                <EnvironmentContainer actionId={this.props.actionId} actorId={this.props.actorId} />
                <EvolutionContainer actionId={this.props.actionId} actorId={this.props.actorId} />

            </div>
        );
    }
});











