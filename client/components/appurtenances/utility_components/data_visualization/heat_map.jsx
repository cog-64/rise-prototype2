

/***
 * modal to show where the thing is actually running
 * todo: rewrite this in simple css and html.  The semantic-ui
 * modal is causing me headaches around unmounting/lack of events
 * see git br unmountmodal for the failed attempt at unmounting
 */

var UserMarkers = {};
var previewMap;
HeatMap= React.createClass({

    propTypes : {
        action: React.PropTypes.object.isRequired
        , userLatLng: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
        , mapIsReady: React.PropTypes.bool.isRequired
    },

    // for the background image
    styles:{
        opacity: 0.4
    },

    getInitialState(){
        return ({
            loadedAlready: false
        });

    },

    mountMap() {

        const DEFAULT_MAP_ZOOM = Meteor.settings.public.defaultMapZoom;
        let actionLatlng = this.props.action.latLng
            ;

        console.log('about to render the action preview map at ' + actionLatlng.toString());
        // don't rebind the map
        if (!previewMap) {
            L.mapbox.accessToken = Meteor.settings.public.mapboxAccessToken; //;
            previewMap = L.mapbox.map('action-map', 'mapbox.streets', {zoomControl: false})
        }
        previewMap.setView(actionLatlng, DEFAULT_MAP_ZOOM);

        //debugger;
        MapUtilities.addActionNameLayer(this.props.action, previewMap)
        this.addUserPositionMarker();

    },

    /**
     * once animation is finished, resize the map to cause it
     * to paint to the correct size
     */
    invalidateMapSize(){
        //debugger;
        console.log('resixe the map');
        previewMap.invalidateSize();
    },

    addUserPositionMarker() {
        let userId = Meteor.userId()
            , marker = UserMarkers[userId];

        if (!marker) {
            marker = new L.marker(this.props.userLatLng,
                // and the marker's options
                {
                    id: userId
                    , icon: this.userIcon()
                });
            UserMarkers[userId] = marker;
            previewMap.addLayer(marker);
        } else {
            // update where on the map you are
            marker.setLatLng(this.props.userLatLng);
        }


    },

    userIcon() {
        let iconHtml = `<i class="large icons">
                            <i class='big yellow loading sun icon'></i>
                            <i class='big blue child icon'></i>

                        </i>`;

        let mapIcon = L.divIcon({
            // specify a class name that we can refer to in styles
            className: 'fa-icon',
            // html here defines what goes in the div created for each marker
            html: iconHtml
            // and the marker width and height
            //iconSize: [40, 40]
        });

        return mapIcon;
    },

    // sort of a hack to deal with adding more actions to the grid
    // called from the render method
    hookModalToExternalEvents() {
        let $ModalMap = $('.action-map.modal');
        $ModalMap.modal('attach events', '.action-map-view', 'show');
    },

    componentDidMount(){

        console.log('loaded modal with action: ' + JSON.stringify(this.props.action));

        // define the object that will hold the map that we will be using
        // and make sure it's visible outside the closure...
        previewMap = null;

        // wire and fire the modal
        let $ModalMap = $('.action-map.modal')
        //, $upVoteButton = $ModalMap.find('.positive.button')
        //, $downVoteButton = $ModalMap.find('.negative.button')
            ;

        // todo: refactor the css class out as a prop
        $ModalMap
            .modal({
                closeable: true
                , onShow: () => {
                    console.log('show event of the map modal');
                    this.mountMap();
                    this.invalidateMapSize();

                }
                , onVisible: ()=> {
                    // hackity: doesn't seem to work consistently on mb devs, at least in emu, so call here too :(
                    console.log('visible event of the map modal');
                    this.invalidateMapSize();
                }
                , onHide: ()=> {
                    console.log('hide event of the map modal');
                    // hack:
                    // mark the fact that we've already init'd
                    // this screen to compensate for the onShow
                    // an onVis only firing once
                    // sometimes, the component _does_ actually
                    // try to unmount and I get a non-fatal-err/warn/no-op...
                    this.setState({loadedAlready:true});
                }
                , onHidden: ()=>{
                    console.log('Hidden event of the map modal');
                }


            })
            .modal('show'); // for the first time in only...(hackity smack)




    },

    render() {
        console.log('rendering of the map modal');
        // hack; onVisible and onShow only fire once for the loaded screen,
        //
        // so need to reset the map tiles for action here in render land...
        // we are most unhappy about this.
        if (this.state.loadedAlready) {
            this.hookModalToExternalEvents();
            this.mountMap();
        }



        return (


            <div className="ui action-map inverted options modal">

                <i className="close icon"></i>

                <div id="action-map" className="content">
                    <img src="/img/Rise.png" style={this.styles}/>
                </div>

                {/*this causes an invariant violation*/}
                {/*<ActionDescriptionMsg action={this.props.action} />*/}

            </div>

        );
    }
});

const ActionDescriptionMsg = React.createClass({

    /**
     *   minimum -still blows up
     *      <div>
     { niceHeader }
     { fullDescrip }
     </div>
     * @returns {XML}
     */
    render() {
        let  niceHeader = Dashboard.getNiceHeader(this.props.action)
            , fullDescrip = Dashboard.getFullDescription(this.props.action)
            ;

        console.log(niceHeader);
        console.log(fullDescrip);

        return (

            <div className="ui icon message">
                <i className="info circle icon"></i>
                <div className="content">
                    <div className="header">
                        { niceHeader }
                    </div>
                    <p>
                        { fullDescrip }
                    </p>
                </div>
            </div>


        );
    }
});











