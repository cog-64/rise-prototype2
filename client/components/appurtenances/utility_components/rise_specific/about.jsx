/**
 * note that we want to export the component (so don't limit component scope with const)
  */

About = React.createClass({

    componentDidMount() {

        IntercomponentComs.enableRightMenu(false);
        IntercomponentComs.enableLeftMenu(false);

    },

    render() {
        return (
            <div className="ui raised very padded text container segment">
                <h2 className="ui header">
                    <img className="ui medium circular image" src="/img/Rise.png" />
                    <div className="content">
                        RISE : Real-time Information for Social Empowerment
                        <div className="sub header">
                            Because resistance is not futile...
                        </div>
                    </div>
                </h2>

                <div className="horizontal divider" > </div>

                <div className="ui huge middle aligned divided list">
                    <AboutItem icon="heartbeat" header="Real-time tactical messaging" blurb="for tactical needs, rather than strategic outreach"/>
                    <AboutItem icon="hide" header="Ephemeral and Anonymous data" blurb="anonymous, minimally persistent data by design"/>
                    <AboutItem icon="marker" header="Location aware" blurb="geo-spatial, visually oriented user experience"/>
                    <AboutItem icon="qrcode" header="Simple to join" blurb="uses dynamically generated QR codes to enable local ad-hoc dissemination"/>
                    <AboutItem icon="student" header="Based on crowd dynamics psychology" blurb="Enables interaction and cooperation without creating information cascades (*group think*)">
                        <div className="list">
                            <AboutItem icon="check circle" header="diversity of opinions" blurb="not hierarchical or closed.  Everyone has equal ability to suggest and vote on ideas, or report facts" />
                            <AboutItem icon="check circle" header="independence of opinions" blurb="objective facts disseminated to group, personal interpretations kept private but aggregated" />
                            <AboutItem icon="check circle" header="decentralized" blurb="local knowledge and experience of individual used as inputs to aggregation" />
                            <AboutItem icon="check circle" header="timely" blurb="aggregated decisions reflected back to crowd at key inflection points" />
                            <AboutItem icon="check circle" header="concise" blurb="simple input and output of messages and facts" />
                            <AboutItem icon="check circle" header="removal of emotionality" blurb="anonymous and loosely tied interconnections between actors, so reduced peer pressure and herd behaviour" />
                            <AboutItem icon="check circle" header="co-ordination" blurb="based on crowd consensus rather imitation of a few original decision makers" />
                        </div>
                    </AboutItem>

                    <AboutItem icon="database" header="Analyse Only Aggregated Results" blurb="rather than actions of an individual in the crowd"/>
                    <AboutItem icon="wifi" header="Mobile Friendly" blurb="single page js web socket application. Rendering is done on local device, only data on the wire."/>

                </div>
                </div>
        );
    }
});

const AboutItem = React.createClass({
    propTypes: {
        icon: React.PropTypes.string.isRequired
        , header: React.PropTypes.string.isRequired
        , blurb: React.PropTypes.string.isRequired
    },

  render() {
    return (
        <div className="item">
            <i className={`large ${this.props.icon} icon`}></i>
            <div className="content">
                <a className="header">{this.props.header}</a>
                <div className="description">{this.props.blurb}</div>
            </div>
        </div>
    );
  }
});
  
 