



/**
 * get the mapBox js loading and load the plugins we want
 */
Meteor.startup( () => {
 //debugger;
    Mapbox.load({
        plugins: [
            "turf",
            "markercluster",
            "omnivore"
        ]
    });
});

var map
    ,  ActorMarkers = {}
    ,  SituationMarkers = {}
    ,  actorMarkers = null
    ,  situationMarkers = null
;


Map = React.createClass({
    propTypes : {
        data: React.PropTypes.object.isRequired
        , selfActorId:  React.PropTypes.string.isRequired
    },

    mixins: [ReactMeteorData],


    /***
     * force the map to fit in semantic containers
     */
    styles: {
        position: 'fixed',
        top: '0%',
        right: '0%',
        bottom: '15%',
        left: '0%',
        padding: 0,
        boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        background: '#000'
    },

    /****
     * observe the changes to the local minimongo client db;
     * server subscriptions were established and guaranteed to be
     * ready in the upstream owner (i.e. currentActions component)
     * @returns {{currentActorMarkers: {}}}
     */
    getMeteorData() {
        //debugger;

        // architecturally possible to be in two or more close by actions
        let selfActor =  this.props.selfActorId;

        Actors.find({actionId: this.props.data.currentAction._id}).observe({

            // don't render here because the map isn't yet ready when the component is first mounted
            added: (actor)=> {
                this.actorAdded(actor, selfActor);
            },

            changed: (beforeActor, currentActor)=> {
                this.actorChanged(beforeActor, currentActor, selfActor);
            },

            removed: (actor)=> {
                this.actorDeleted(actor);
            }


        });

        //map situatations
        Situations.find({actionId: this.props.data.currentAction._id}).observe({
            added: (situation)=> {
                this.situationAdded(situation);
            },

            changed: (beforeSituation, currentSituation)=> {
                this.situationChanged(beforeSituation, currentSituation);
            },

            removed: (situation)=> {
                this.situationDeleted(situation);
            }
        });

        return ({
            currentActorMarkers: ActorMarkers
            , currentSituationMarkers: SituationMarkers
            , panToLocation: Session.get('panToLatLng')
        });
    },




    /**
     * what to do when a new actor arrives at the action
     * @param actor
     * @param selfActorId
     */
    actorAdded(actor, selfActorId) {

        //debugger;

        // wtf behaviour here.
        // the actor always come in as an add from the observe,(wtf!!)
        // so can't assume that this actor doesn't exist as a marker already
        // doesn't duplicate data in minimongo, just here

        let id = actor._id;


        let marker = ActorMarkers[id];

        if (!marker) {
            console.log(`actor ${id} added, map defined is ${!!map}`);
            // create a new marker and add it to the markers hash
            marker = new L.marker(actor.latLng,
                // and the marker's options
                {
                    id: id
                    , icon: MapUtilities.actorIcon(actor, selfActorId)
                    , actor: actor
                    , currentLatLng: actor.latLng
                });

            ActorMarkers[id] = marker;
            this.renderActorMarker(marker)
        } else {
            console.log(`actor ${id} added AGAIN!!!`);
                // effectively this is a changed actor...
                let currentActor = marker.options.actor
                    , newll = actor.latLng
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
                marker.setIcon (MapUtilities.actorIcon(actor, selfActorId));
                marker.options.actor = actor;
                marker.options.currentLatLng = newll;

        }
        //console.log("Markers accumulated :" + this.countHash(ActorMarkers));
    },

    /**
     * what to do when an actor changes
     * @param beforeActor
     * @param currentActor
     */
    actorChanged (updatedActor, currentActor, selfActorId) {


        //.

        let id = updatedActor._id;
        console.log(`actor ${id} changed`);
        let marker = ActorMarkers[id];

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
     * what to do if the actor is removed from the action
     * @param actor
     */
    actorDeleted(actor) {
        let id = actor._id;
        let marker = ActorMarkers[id];
        // remove marker layer from map
        actorMarkers.removeLayer(marker);
        console.log(`delete marker for ${marker.options.id}`)

        // remove from hashtable
        delete ActorMarkers[id];
    },


    /***
     * situation added to the data
     * @param situation
     */
    situationAdded(situation) {
        // add the marker and bling
        // add to the hashtable
        //debugger;
        let id = situation._id;
        let marker = SituationMarkers[id];
        if (!marker) {
            // create a new marker and add it to the markers hash
            console.log(`situation ${id} added`);
            marker = new L.marker(situation.latLng,
                // and the marker's options
                {
                    id: id
                    , icon: MapUtilities.situationIcon(situation)
                    , situation: situation
                    , currentLatLng: situation.latLng
                    , situationOwner: situation.actorId
                    , draggable: (situation.actorId === this.props.selfActorId)
                });


            // add some drag functionality to the marker
            let setSituationPosition = () => {
                let m = marker
                    , ll = m.getLatLng()
                    , latLng = [ll.lat, ll.lng]
                    ;
                debugger;
                Meteor.call('setSituationPosition', Meteor.userId(), m.options.situation, latLng);
            };
            marker.on('dragend', setSituationPosition)

            // update the module wide hash
            SituationMarkers[id] = marker;
            this.renderSituationMarker(marker);
            console.log(`situation ${situation.type} added`)
        } else {
            // the observe is treating  fires from getMeteorData pub as added records
            // so must look for marker here too.

            let currentSituation = marker.options.situation
                ,newll = situation.latLng
                , oldll = currentSituation.latLng
                ;
            //console.log(JSON.stringify(updatedActor));
            if ( MapUtilities.shouldUpdatePosition(newll, oldll) ) {
                marker.setLatLng(newll);
            }
            // update bling (iif perf issues, then consider a change check)
            marker.setIcon ( MapUtilities.situationIcon(situation) );
            marker.options.situation = situation;
            marker.options.currentLatLng = newll;
    }


    },

    /***
     * deal with changes to a situation
     * @param updatedSituation
     * @param currentSituation
     */
    situationChanged (updatedSituation, currentSituation) {
        console.log(`situation changed`);
        let id = updatedSituation._id;
        let marker = SituationMarkers[id];

        if (!!marker) {
            let newll = updatedSituation.latLng
                , oldll = currentSituation.latLng
                ;
            //console.log(JSON.stringify(updatedActor));
            if ( MapUtilities.shouldUpdatePosition(newll, oldll) ) {
                marker.setLatLng(newll);
            }
            // update bling (iif perf issues, then consider a change check)
            marker.setIcon ( MapUtilities.situationIcon(updatedSituation) );
            marker.options.situation = updatedSituation;
            marker.options.currentLatLng = newll;
        }
    },

    /***
     * situation has been removed
     * @param situation
     */
    situationDeleted(situation) {
        let id = situation._id;
        let marker = SituationMarkers[id];
        // remove marker layer from map
        map.removeLayer(marker);

        // remove from hashtable
        delete SituationMarkers[id];
    },



    /***
     * spin up the map into the containing div
     * and set its center
     */
    mountMap() {
        //debugger;
        const DEFAULT_MAP_ZOOM = Meteor.settings.public.defaultMapZoom;
        let ctrLatlng = this.props.data.currentAction.latLng;
        console.log('about to render the currentAction object at ' + ctrLatlng.toString());

        L.mapbox.accessToken = Meteor.settings.public.mapboxAccessToken;
        map = L.mapbox.map('map', 'mapbox.streets', {zoomControl: false})
            .setView(ctrLatlng, DEFAULT_MAP_ZOOM);


        situationMarkers = new L.MarkerClusterGroup();

        // render the markers when the map loads
        this.renderMarkers();

    },

    /**
     * wrap the passed in prop
     * @returns {*}
     */
    getSelfActorId() {
        return this.props.selfActorId;
    },

    /***
     * draw the collection of actors onto the map
     */
    renderMarkers(){
        //debugger;
        console.log('rendering markers');
        this.renderActorMarkers();
        this.renderSituationMarkers();
    },

    renderActorMarkers() {
        // getting duplicated markers; clean out the existing layer
        // not very optimized, but will get rid of this issue
        //if (map.hasLayer(actorMarkers)) {
        //    map.removeLayer(actorMarkers);
        //    actorMarkers = null;
        //    console.log(`actorMarkers layer removed`);
        //}

        actorMarkers = new L.MarkerClusterGroup();
        let aMarks = this.data.currentActorMarkers;
        Object.keys(aMarks).forEach((m)=> {
            let marker = aMarks[m];
            this.renderActorMarker(marker)
        });

        map.addLayer(actorMarkers);

    },

    /***
     * render an individual marker
     * @param marker
     */
    renderActorMarker(marker){
        //debugger;
        if (map && actorMarkers) {
            if (!actorMarkers.hasLayer(marker)) {
                // map doesn't have this marker
                // add, along with an info pop up
                marker.on('click', (e)=> {
                    // popup some details??
                    MapUtilities.addTrackedActorPopup(e.target.options.actor, map)
                });

                actorMarkers.addLayer(marker);
                console.log(`rendered marker for ${marker.options.id}`);
            }
        }
    },

    renderSituationMarkers() {
        //debugger;
        if (map.hasLayer(situationMarkers)) {
            map.removeLayer(situationMarkers);
            situationMarkers = null;
        }

        situationMarkers = new L.MarkerClusterGroup();
        let sMarks = this.data.currentSituationMarkers;
        Object.keys(sMarks).forEach((m)=> {
            let marker = sMarks[m];
            this.renderSituationMarker(marker);
            });
        map.addLayer(situationMarkers);
    },

    renderSituationMarker(marker) {
        if (map && situationMarkers) {
            if (!map.hasLayer(marker)) {
                // map doesn't have this marker
                // add, along with an info pop up
                marker.on('click', (e)=> {
                    // popup some details??
                    MapUtilities.addTrackedSituationPopup(e.target.options.situation, map)
                });

                situationMarkers.addLayer(marker);
            }
        }
    },

    componentWillUnmount () {
        //debugger;
        ActorMarkers = {};
        SituationMarkers = {};
        map = null;
    },

    /***
     * call the mount and get the damn thing to fit
     */
    componentDidMount(){
        //debugger;
        //console.log('Mounted the Map component.  self is ' +  this.props.selfActorId);

        this.mountMap();
        map.invalidateSize();

    },

    panToLatLng() {
        if (this.data.panToLocation){
            debugger;
            map.panTo(this.data.panToLocation);
            //map.setZoom(21);
            console.log(`panned to location`);
            IntercomponentComs.setPanToLatLng(null);
        }

    },

    /**
     * the core reactive piece
     * @returns {XML}
     */
    render() {

        if (!!map) {
            //console.log(`rendered ${Object.keys(this.data.currentActorMarkers).length} markers in render event`);
            //this.renderMarkers();
            this.panToLatLng();
        }

       // console.log('action map rendered');
        return (
            <div id="map" className="mapbox" style={this.styles}>

            </div>

        );
    }

});


