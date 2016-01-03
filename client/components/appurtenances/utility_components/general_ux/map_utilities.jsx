MapUtilities = React.createClass({

    statics: {

        /**
         * standard determination of whether we should move a marker
         * that has been rendered on the map
         * @param currentLatLng
         * @param previousLatLng
         * @returns {boolean}
         */
        shouldUpdatePosition: (currentLatLng, previousLatLng)=> {
            const tolerance = 2; //m
            //  move the maker if there has been a significant change to the latlng
            let delta = geolib.getDistance(currentLatLng, previousLatLng);
            //console.log(`move by ${delta} m`)
            return delta > tolerance;
        },

        /**
         * convert geolocation object to ll array
         * @param geoloc
         * @returns {Array}
         */
        convertGeoLocObjToLatLng: (geoloc)=> {
            let rtn = [];
            rtn.push(geoloc.lat);
            rtn.push(geoloc.lng);

            return rtn;
        },

        /***
         * convert array of ll to geolocation object
         * @param latLng
         */
        convertLatLngToGeoLoc: (latLng)=> {
            let rtn = {};

            rtn.latitude = latLng[0];
            rtn.longitude = latLng[1];
        },

        /***
         * flip the latlng to lnglat for mongo
         * careful! this is flipping the real array
         * you'll want to slice into a new array
         * if you don't want the original data changed
         * @param latLng
         * @returns {Array.<number>|*}
         */
        convertLatLngToLngLat: (latLng)=> {
            return latLng.reverse();
        },

        /***
         * custom image to locate the action
         * @param action
         * @param map
         */
        addRiseActionLocationLayer: (action, map)=> {
            let
                riseAction = L.mapbox.featureLayer().addTo(map)
                , actionLngLat = MapUtilities.convertLatLngToLngLat(action.latLng)
                ;

            var geoJson = [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": actionLngLat
                },
                "properties": {
                    "title": action.name,
                    "icon": {
                        "iconUrl": "/img/actionLocation32x32.png",
                        "iconSize": [50, 50], // size of the icon
                        "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                        "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
                        "className": "dot"
                    }
                }


            }];

            //console.log(JSON.stringify(geoJson));

            riseAction.on('layeradd', function (e) {
                var marker = e.layer
                    , feature = marker.feature;

                marker.setIcon(L.icon(feature.properties.icon));

            });

            // Add features to the map.
            riseAction.setGeoJSON(geoJson);
        },



        /***
         * name of the action with an url
         * @param action
         * @param map
         */
        addActionNameLayer: (action, map)=> {

            //debugger;
            let
                riseAction = L.mapbox.featureLayer().addTo(map)
                , actionLngLat = MapUtilities.convertLatLngToLngLat(action.latLng)
                ;

            iconColour = Dashboard.actionIsOnNow(action)?"#16C21A":"#0F4FFF";
            iconType = Dashboard.actionIsOnNow(action)?"star":"circle-stroked";

            let geojson = {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {
                        title: action.name,
                        'marker-color': iconColour,
                        'marker-size': 'large',
                        'marker-symbol': iconType,
                        url: action.externalUrl
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: actionLngLat
                    }
                }]
            };

            //console.log(JSON.stringify(geojson));

            // Pass features and a custom factory function to the map
            riseAction.setGeoJSON(geojson);

            // open the popup right away
            riseAction.eachLayer(function(m) {
                m.openPopup();
            });

            riseAction.on('click', function (e) {
                window.open(e.layer.feature.properties.url);
            });


        },

        /**
         * create a popup and add it to a marker
         * @param actor
         * @param map
         */
        addTrackedActorPopup: (actor, map) => {
            console.log('addTrackedActor');
            //debugger;
            let  popup = L.popup()
                .setLatLng(actor.latLng)
                .setContent(MapUtilities.getActorPopUpDescription(actor))
                .openOn(map);

            return popup;

        },


        /**
         * decorate a maker with some random shit about the actor
         * @param actor
         */
        getActorPopUpDescription: (actor) => {
            let description = (actor.lastMessage)? actor.lastMessage:""

                , msg = `<h2 class="ui big blue inverted header"> ${ actor.handleName }</h2>
                         <h3 class="ui large black header"> ${description} </h3>
                         <h3 class="ui large black header"> ${ moment(actor.createdDT).fromNow() } </h3>
                        `;

            return msg;

        },

        addTrackedSituationPopup: (situation, map) => {
            console.log('addTrackedSituation');
            //debugger;
            let  popup = L.popup()
                .setLatLng(situation.latLng)
                .setContent(MapUtilities.getSituationPopUpDescription(situation))
                .openOn(map);

            return popup;

        },

        /**
         * decorate a maker with some random shit about the situation
         * @param situation
         */
        getSituationPopUpDescription: (situation) => {
            let description = !!situation.description ? situation.description: ''
                , msg = `<div class="ui segment" style="{font-size: 200%;} ">
                            <h1 class="ui huge blue inverted header"> ${description}</h1>
                            <h3 class="ui large black header"> reported ${ moment(situation.createdDT).fromNow() } </h3>
                         </div>
                         `;

            return msg;

        },


        /**
         * standard way for how the actor icon gets styled
         * @param actor
         * @param selfActorId
         * @returns {*}
         */
        actorIcon :(actor, selfActorId) => {

            let renderIcon = (size, colour, icon) => {
                if (icon) {
                    return `<i class='${size} ${colour} ${icon} icon'></i>`;
                }
                // fallthrough
                return '';
            };

            // provide some defaults for the actors appearance
            let actorSize = 'huge'
                , actorColour = 'red'
                , actorIcon = 'flag'
                , overlaySize = 'huge'
                , overlayColour = 'red'
                , overlayIcon = ''
                , base = renderIcon(actorSize, actorColour,actorIcon )
                , overlay = ''
                ;

            ;
            //render self differently
            if ( actor._id === selfActorId ) {
                //debugger;
                actorSize = 'huge';
                actorColour = 'blue';
                actorIcon = 'child';
                overlaySize = 'huge';
                overlayColour = 'yellow';
                overlayIcon = 'loading spinner';

                // **sigh** for an animation, the animation must be first
                base = renderIcon(overlaySize, overlayColour,overlayIcon);
                overlay = renderIcon(actorSize, actorColour,actorIcon);
            }

            // if they go offline, give them a disabled look
            if (!actor.online) {
                actorColour = `disabled ${actorColour}`;
                base = renderIcon(actorSize, actorColour,actorIcon )
            }

            // if they're being an ass, mark it thusly
            if (actor.blackballed) {
                overlayColour ='black';
                overlayIcon ='dont';
                overlay = renderIcon(overlaySize,overlayColour, overlayIcon);
            }

            // make SOS very visible
            // render this guy last so even blackballed and offline can send sos
            if (!!actor.SOS) {
                let sos= _.findWhere(RiseSharedConstants.SOS, {key:actor.SOS})
                actorSize = 'big';
                actorColour = sos.colour;
                actorIcon = sos.icon;
                overlaySize = 'huge';
                overlayColour = 'orange';
                overlayIcon = 'loading sun';

                // **sigh** for the loading animation, the animation must be first
                base = renderIcon(overlaySize, overlayColour,overlayIcon);
                overlay = renderIcon(actorSize, actorColour,actorIcon);
            }


            let iconHtml = `<i class="large icons">
                            ${base}
                            ${overlay}

                        </i>`;

            //console.log(iconHtml);

            let mapIcon = L.divIcon({
                // specify a class name that we can refer to in styles
                className: 'fa-icon',
                // html here defines what goes in the div created for each marker
                html: iconHtml,
                // and the marker width and height
                iconSize: [50, 50]
            });

            return mapIcon;
        },


        situationIcon :(situation) => {

            // a little helper
            let renderIcon = (size, colour, icon) => {
            if (icon) {
                return `<i class='${size} ${colour} ${icon} icon'></i>`;
            }
            // fallthrough
            return '';
        };

            // provide some defaults for the actors appearance
            let iconSize = 'huge'
                , iconColour = 'blue'
                , icon = 'bullseye'
                , overlaySize = 'huge'
                , overlayColour = 'yellow'
                , overlayIcon = ''
                , base = ''
                , overlay = ''
                ;

            let currentSituation = _.findWhere(RiseSharedConstants.Situations, {key:situation.type})

            if (currentSituation) {
                icon = currentSituation.icon;
                iconColour = currentSituation.colour;
            }


            base = renderIcon(iconSize, iconColour, icon );


            let iconHtml = `<i class="large icons">
                            ${base}
                            ${overlay}

                        </i>`;


            let mapIcon = L.divIcon({
                // specify a class name that we can refer to in styles
                className: 'fa-icon',
                // html here defines what goes in the div created for each marker
                html: iconHtml,
                // and the marker width and height
                iconSize: [75, 75]
            });

            return mapIcon;

        },

        // a quick and dirty check for debugging the map stuff
        countHash(hash) {

            let rtn = _.reduce(hash, (memo, num) =>{
                return  memo + 1
            }, 0);
            return rtn;


        },
    },

  render() {
    return (
      <div >
      </div>
    );
  }
});

