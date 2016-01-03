
var ActorMarker = {};
var featureMap;
CrowdFeatureMap= React.createClass({

    propTypes : {
        mapHeatData: React.PropTypes.array
    },

    styles: {
        position: 'absolute',
        top: '0%',
        right: '0%',
        bottom: '00%',
        left: '0%',
        minHeight: '100%',
        padding: 0,
        overflow: 'hidden',
        zIndex:1000000
    },

    getInitialState(){
        return ({
            loadedAlready: false
        });

    },

    mixins: [ReactMeteorData],

    /****
     * observe the changes to the local minimongo client db;
     * server subscriptions were established and guaranteed to be
     * ready in the upstream owner (i.e. currentActions component)
     * @returns {{currentActorMarker: {}}}
     */
    getMeteorData() {

        let actorId =  Session.get("currentActorId")
            , actionId = Session.get("currentActionId")
        ;

        console.log(`in the feature map ctx for ${actorId}`);

        Actors.find({_id:actorId}).observe({

            // don't render here because the map isn't yet ready when the component is first mounted
            added: (actor, actorId)=> {
                this.actorAdded(actor);
            },

            changed: (beforeActor, currentActor, actorId)=> {
                this.actorChanged(beforeActor, currentActor);
            },

        });

        return ({
            subsReady: !!ActorMarker[actorId]
            , actorId: actorId
            , currentActorMarker: ActorMarker
        });
    },

    actorAdded(actor, selfActorId) {
        // add the marker and bling
        // add to the hashtable
        let id = actor._id;
        //console.log("self is: " + selfActorId);
        //console.log(` create marker at ${actor.latLng} for actor ${id}`);
        //console.log(JSON.stringify(actor));
        // create a new marker and add it to the markers hash
        let marker = new L.marker(actor.latLng,
            // and the marker's options
            {
                id: id
                , icon: MapUtilities.actorIcon(actor, selfActorId)
                , actor: actor
                , currentLatLng: actor.latLng
            });

        ActorMarker[id] = marker;
        //console.log("Markers accumulated :" + this.countHash(ActorMarker));
    },

    /**
     * what to do when an actor changes
     * @param beforeActor
     * @param currentActor
     */
    actorChanged (updatedActor, currentActor, selfActorId) {

        let id = updatedActor._id;
        let marker = ActorMarker[id];

        if (!!marker) {
            let newll = updatedActor.latLng
                , oldll = currentActor.latLng
                ;
            //console.log(JSON.stringify(updatedActor));
            if ( MapUtilities.shouldUpdatePosition(newll, oldll) ) {
                // mutate, and so move, the marker,
                // 'cause we moved a significant amount
                //  note that we shouldn't have to re-render
                console.log(`${id} has moved`)
                marker.setLatLng(newll);
            }
            // update bling (iif perf issues, then consider a change check)
            marker.setIcon (MapUtilities.actorIcon(updatedActor, selfActorId));
            marker.options.actor = updatedActor;
            marker.options.currentLatLng = newll;



        }
    },

    /***
     * pull the latlng from the marker we just wrote
     * @returns {*}
     */
    getActorLatLng() {
        let actorId = this.data.actorId
        , marker = ActorMarker[actorId];
        if (marker) {
            return (marker.options.currentLatLng);
        }
    },


    /***
     * spin up the map into the containing div
     * and set its center
     */
    mountMap() {
        //debugger;
        const DEFAULT_MAP_ZOOM = Meteor.settings.public.defaultMapZoom;
        let ctrLatlng = this.getActorLatLng();


        if (!featureMap) {

            console.log('about to render a new feature map at ' + ctrLatlng.toString());

            L.mapbox.accessToken = Meteor.settings.public.mapboxAccessToken;
            featureMap = L.mapbox.map('feature-map', 'mapbox.streets', {zoomControl: true})
                .setView(ctrLatlng, DEFAULT_MAP_ZOOM);

            this.renderMarkers();
        }

    },

    /**
     * once animation is finished, resize the map to cause it
     * to paint to the correct size
     */
    invalidateMapSize(){
        //debugger;
        console.log('resize the feature map');
        featureMap.invalidateSize();
    },

    /***
     * call the mount and get the damn thing to fit
     */
    componentDidMount(){
        console.log('feature map mounted');
        this.mountMap();
        this.invalidateMapSize();

    },

    /***
     * cleanup the map
     */
    componentWillUnmount() {
        featureMap = null;
    },

    /***
     * draw the collection of actors onto the map
     */
    renderMarkers(){
        //debugger;
        console.log('rendering markers');

        let aMarks = this.data.currentActorMarker;
        Object.keys(aMarks).forEach((m)=>{
            let marker = aMarks[m];
            if (!featureMap.hasLayer(marker)) {
                // map doesn't have this marker
                // add, along with an info pop up
                marker.on('click', (e)=> {
                    // popup some details??
                    MapUtilities.addTrackedActorPopup(e.target.options.actor, featureMap)
                });
                featureMap.addLayer(marker);
            }

        });



    },

    render() {
        showLoadingMessage = () => {
            if (!this.data.subsReady) {
                return (
                        <LoadingMessage message="getting crowd map data.."/>
                );
            }


        };

            return  (
                    <div id="feature-map" style={this.styles}>
                        {showLoadingMessage()}
                    </div>
            );

    }
});








