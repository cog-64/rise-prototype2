GeolocateUser = React.createClass({

  mixins: [ReactMeteorData],

  // set up an empty object for login errors
  getInitialState () {
    return {
      errors: null

    };
  },


  getMeteorData() {
    console.log('in the meatier ctx for GeolocateUser');
    // debugger;
    let
       currentLoc = this.currentGeoLocObjToLatLng(Geolocation.latLng())
        , locError = Geolocation.error()
        ;

    return ({
       loc: currentLoc
      , locErr: locError
    })
  },

  /**
   * conversion wrapper for reactive geolocation of user
   * @returns {*|Array}
   */
  currentGeoLocObjToLatLng: (geoloc)  => {

    if (!!geoloc) {
        rtn = MapUtilities.convertGeoLocObjToLatLng(geoloc);
    } else {
        rtn = false;
    }

    console.log (`geolocation is ${rtn}`);
    return rtn;

  },

  /**
   * we might have been passed and action id in the url
   * @returns {*|params|any|Object}
   */
  getActionId () {
    //debugger;
    return this.props && this.props.params && this.props.params.actionId;
  },

  render() {

      if (this.data.locErr) {
          return <GeolocErr geoError={this.data.locErr} />
        } else if (this.data.loc) {
          //debugger;
          return (<CreateLogin latLng={this.data.loc}
                              actionId={this.getActionId()}
                              location={this.props.location}
                              children={this.props.children}
          />);
      } else {
          return <LoadingMessage message="attempting to locate your position ..."/>
      };

  }
});

