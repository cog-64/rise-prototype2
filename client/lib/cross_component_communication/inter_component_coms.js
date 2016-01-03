/***
 * init some of the intercomponent stuff
 */
Meteor.startup( () => {
if ( Meteor.isClient ){

    IntercomponentComs.enableTopMenu(true);
    IntercomponentComs.enableRightMenu(false);
    IntercomponentComs.enableLeftMenu(false);

}

});



/***
 * cheap and cheerful stand-in to flux
 * needed to drive the sidebar behaviour
 * so use a global object of functions to
 * set session that can be  used
 * to modify behaviour reactively
 * @type {{}}
 */


IntercomponentComs = {};


IntercomponentComs.setCurrentLatLng = (latlng) => {
    console.log(`current latlng session set to ${latlng} `);
    Session.set('currentLatLng', latlng)
};
IntercomponentComs.getCurrentLatLng = () => {
    return Session.get('currentLatLng')
};


IntercomponentComs.setCurrentAction = (actionId) => {
    console.log(`currently selected session set to ${actionId} `);
    Session.set('currentActionId', actionId)
};
IntercomponentComs.getCurrentAction = () => {
    return Session.get('currentActionId');
};


IntercomponentComs.setCurrentActorId = (actorId) => {
    console.log(`currently selected actor set to ${actorId} `);
    Session.set('currentActorId', actorId)
};

IntercomponentComs.setAsOrganizer = (isOrganizer) => {
    console.log(`the current user is an organizer is  ${isOrganizer} `);
    Session.set('isOrganizer', isOrganizer)
};

IntercomponentComs.enableTopMenu = (isEnabled) => {
    console.log(`the top menu is  ${isEnabled} `);
    Session.set('topMenuIsEnabled', isEnabled)
};

IntercomponentComs.enableRightMenu = (isEnabled) => {
    console.log(`the right menu is  ${isEnabled} `);
    Session.set('rightMenuIsEnabled', isEnabled)
};
IntercomponentComs.enableLeftMenu = (isEnabled) => {
    console.log(`the left menu is  ${isEnabled} `);
    Session.set('leftMenuIsEnabled', isEnabled)
};

IntercomponentComs.setPanToLatLng = (latLng) => {
    console.log(`currently set to pan to ${latLng} `);
    Session.set('panToLatLng', latLng)
};