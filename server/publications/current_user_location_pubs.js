
/**
 * publish own geolocation data back to client
 */
Meteor.publish('currentUserGeolocation', function() {
    if ( this.userId ){
        let query ={_id: this.userId}
            , fields = {fields: {latLng: 1}}
            ;
        // look it up and send back the cursor
        return Meteor.users.find(query, fields);
    } else {
        this.ready() ;
    }
});

