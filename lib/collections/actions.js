/**
 * this is the thing that defines where and what we're doing
 * and is the thing that actors are attached to.
 *
 *
 */
const _maxRadius = Meteor.settings.public.maxRadius;
const _maxActors = Meteor.settings.public.maxActors;
Actions = new Mongo.Collection('actions');

//schema
//https://github.com/aldeed/meteor-simple-schema
Actions.schema = new SimpleSchema({
    name: {type: String, label:"Action Name"}
    , description: {type: String, label:"Action description"}
    , stealthy: {type: Boolean, label:"private", defaultValue:false}
    , latLng:  {type: [Number], minCount: 2, maxCount: 2, decimal:true, label:"LatLng"}
    , location:  {type: [Number], minCount: 2, maxCount: 2, decimal:true, label:"location"}
    , externalUrl: {type: String, label:"External URL", regEx: SimpleSchema.RegEx.Url, optional: true}
    , maxRadius: {type: Number, min: 10, max: _maxRadius , label:"max Radius"}
    , maxActors: {type: Number, min: 3, max:_maxActors,  label:"max Actors"}
    , startDT: {type: Date, label:"start date"}
    , endDT: {type: Date, label:"end date"}
    , createdDT: {type: Date, label:"created date", optional: true, defaultValue: new Date() }
    , organizers:{type: [String], optional: true}
    //, externalStorageLocation: {type: String}
    //, avatarUrl: {type: String}

});

Actions.attachSchema(Actions.schema);

if (Meteor.isServer)
{
    Actions._ensureIndex({ location: "2dsphere" });
}


Meteor.methods({
    "createAction": (actionDatum) => {

        check(Meteor.userId(), String);

        // todo: check that the user has enough privilege
        //ActionUtilities.createAction(actionDatum)
    },

    /***
     * a simple action based on the user's current latlng
     * @param actionDatum
     */
    "createSimpleAction": (name) => {
        debugger;
        check(Meteor.userId(), String);

        // on the server use the latLng from the login.  on the client, get it from a session
        // var that is set by createLogin
        let userLatLng;
        if (Meteor.isServer) {
            let userQuery = {_id: Meteor.userId()}
                , user = Meteor.users.findOne(userQuery)
                ;
            userLatLng = user.latLng
        } else {
            userLatLng = IntercomponentComs.getCurrentLatLng()
        }

            let actionDatum = {
                name: name
                , description: `a test action for ${name}`
                , stealthy: false
                , latLng: userLatLng
                , maxRadius: 500
                , maxActors: 20
                , startDT: new Date()
                , endDT: moment().add(2, 'hours').toDate()
            };

            let actionId = ActionUtilities.createAction(actionDatum);

            console.log(`simple action ${actionId} created`);
            // allow the client to know about this so that we can
            // navigate directly to it.  Feels Sorta dirty...
            if (Meteor.isClient){
                IntercomponentComs.setCurrentAction(actionId);
            }

        }


});

ActionUtilities={};
ActionUtilities.getActionDescription = (actionId) => {
    let action = Actions.findOne({_id:actionId})
        , rtn = "RISE Action";

    if ( !!action ){
        rtn = action.description;
    }

    return rtn;

};
ActionUtilities.createAction = (actionDatum) => {

    debugger;


    check(actionDatum, {
        name: String
        , description: String
        , stealthy: Boolean
        , latLng: [Number]
        , externalUrl: Match.Optional(String)
        , maxRadius: Number
        , maxActors: Number
        , startDT: Date
        , endDT: Date
    });

    let {latLng} = actionDatum
        , lngLat = latLng.slice(0).reverse()
        , organizers = [];

    organizers.push(Meteor.userId());

    actionDatum.location = lngLat;
    actionDatum.organizers = organizers;

    Actions.schema.validate(actionDatum);

    return  Actions.insert(actionDatum);

}





