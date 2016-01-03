/***
 * allow actor to submit their subjective opinion on a topic
 * avoid information cascade by not showing crowd results until
 * after they have submitted their feeling
 */
ActorAndCrowdRatings = React.createClass({
    propTypes: {
        iconName: React.PropTypes.string.isRequired
        , estimateType: React.PropTypes.string.isRequired
        , headerText: React.PropTypes.string.isRequired
        , dividerText: React.PropTypes.string.isRequired
        , maxRating: React.PropTypes.number.isRequired
        , crowdRating: React.PropTypes.number.isRequired
        , updater: React.PropTypes.func.isRequired
        , enableMap: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            showCrowdRating: false
        };
    },


    componentDidMount(){
        // selector cache
        //debugger;
        let $ActorRatingDlg = this.getActorRatingModule()
            ;
        //
        $ActorRatingDlg
            .rating({
                initialRating: 0
                , maxRating: this.props.maxRating
                , interactive: !this.state.showCrowdRating // toggle, so they can't easily sex up the result
                , onRate: (value)=> {
                    if (value > 0) {
                        // then its a real entry, not initialization noise
                        //debugger;
                        console.log(`chose ${value} as the rating`);
                        this.props.updater(this.props.estimateType, value);
                        this.setState({
                            showCrowdRating: true
                        })
                    }
                    ;
                }
            });

    },

    getActorRatingModule() {
        let rootNode = ReactDOM.findDOMNode(this)
            , $ActorRatingDlg = $(rootNode).find('.rating.actor')
            ;

        return $ActorRatingDlg;
    },

    showCrowdRating() {
        let formattedCrowdAgg = '???';
        if (this.state.showCrowdRating) {
            formattedCrowdAgg = this.props.crowdRating.toFixed(2);
            console.log(`calculated show crowd rating to be ${formattedCrowdAgg}`);
        }
        return ( formattedCrowdAgg );
    },

    disableMapButton() {
        return this.state.showCrowdRating ? "" : 'disabled'

    },


    render() {

        let actorCSS = `ui massive ${this.props.iconName} rating actor`
            , buttonCSS = `rating-map-view circular ui right floated ${this.disableMapButton()} icon button`
            ;


        return (

            <div className="actor-crowd-rating">
                <div className="ui two column middle aligned stackable divided grid">
                    <div className="row">
                        <div className="center aligned column">
                            <div className="ui large header">
                                {this.props.headerText}
                            </div>

                            <div className={actorCSS}></div>
                        </div>
                        <div className="center aligned column">
                            <div className="ui statistic">
                                <div className="value">
                                    <i class={`big ${this.props.iconName} icon`}></i>
                                    {this.showCrowdRating()}
                                </div>
                                <div className="label">
                                    (crowd averaged opinion)
                                </div>
                            </div>
                            <button className={buttonCSS} onClick={this.props.enableMap.bind(null,this.props.estimateType)}>
                                <i className='large inverted circular green map icon'/>
                                view on map
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
});

