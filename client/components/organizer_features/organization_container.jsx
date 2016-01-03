OrganizationWrapper = React.createClass({
    propTypes: {
        currentActionId: React.PropTypes.string.isRequired
        , selfActorId:  React.PropTypes.string.isRequired
    },

  render() {
    return (
        <div className="ui center aligned inverted red segment">
            {/*crowd emo*/}
            <h2 className="ui header">
                <i className="big child icon"/>
                <div className="content">
                    Emotion
                </div>
            </h2>


            <ActorMoodRating />
            <CrowdMoodRatings />
            <Foreboding />
        </div>
    );
  }
});

