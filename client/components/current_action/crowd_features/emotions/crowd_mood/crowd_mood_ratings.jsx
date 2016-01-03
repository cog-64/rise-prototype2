
CrowdMoodRatings = React.createClass({
    propTypes: {
        crowdEmotionsMap: React.PropTypes.array
        , actorRatingUpdater: React.PropTypes.func
        , avgWellbeingRating:  React.PropTypes.number
        , avgMotivationRating:  React.PropTypes.number
        ,
    },

    // style note:
    // the icons for the ratings are hard wired in using css :before
    // e.g. .ui.star.rating .active.icon:before {
    //content: '\f005';
    // set in cli lib:
    //\client\lib\semantic-ui\themes\default\modules\rating.overrides.import.less
    // an issue has been filed, ideally would have a css variable(s) for custom ones

    getInitialState() {
        return {
            showMap: false
            , mapData: null
        };
    },

    outerStyles: {
        position: 'relative'
        , height:'100%'
    },

    topStyles: {
        position: 'absolute',
        top: '0%',
        right: '0%',
        bottom: '70%',
        left: '0%',
        minHeight: '30%',
        padding: 0,
        overflow: 'hidden',
    },

    // map
    bottomStyles: {
        position: 'absolute',
        top: '30%',
        right: '0%',
        bottom: '10%',
        left: '0%',
        minHeight: '60%',
        padding: 0,
        overflow: 'hidden',
        background: '#000'


    },



    getMaxEmotionRating() {
        return Meteor.settings.public.maxEmotionRating;
    },

    showMap() {
        if (this.state.showMap) {
            return <CrowdFeatureMap mapHeatData={this.getData()}/>
        } else  {
            return (
                <div className="ui inverted compact icon message">
                    <i className="info icon"></i>
                    <div className="content">
                        <div className="large header">
                            Want to see a visualization of the crowd's actual mood?
                        </div>
                        <p>Make your best estimate and then click the view on map button.</p>
                    </div>
                </div>
            );
        }
    },

    enableMap(estimateType) {
        this.setState({
            showMap: true
            , mapData: _.where(this.props.crowdEmotionsMap, {type: estimateType})
        })

    },

    getData() {
        return this.state.mapData
    },


    render() {



            return (


                <div className="crowd-mood-ratings" style={this.outerStyles}>


                    <div className="ui center aligned white segment" style={this.topStyles}>
                        <div className="crowd-wellbeing">
                            <ActorAndCrowdRatings iconName="heart"
                                                  estimateType={RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_WELLBEING}
                                                  headerText="Is the crowd in good spirits?"
                                                  dividerText="crowd-averaged perception"
                                                  maxRating={this.getMaxEmotionRating()}
                                                  crowdRating={this.props.avgWellbeingRating}
                                                  updater={this.props.actorRatingUpdater}
                                                  enableMap={this.enableMap}
                            />
                        </div>
                        <div className="crowd-motivation">
                            <ActorAndCrowdRatings iconName="star"
                                                  estimateType={RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_MOTIVATION}
                                                  headerText="How determined does the crowd seem?"
                                                  dividerText="crowd-averaged perception"
                                                  maxRating={this.getMaxEmotionRating()}
                                                  crowdRating={this.props.avgMotivationRating}
                                                  updater={this.props.actorRatingUpdater}
                                                  enableMap={this.enableMap}
                            />}
                        </div>
                    </div>

                    <div  style={this.bottomStyles}>
                        <div className="ui center aligned inverted green segment" style={this.outerStyles} >
                            { this.showMap() }

                        </div>
                    </div>


                </div>

            );
        }
});