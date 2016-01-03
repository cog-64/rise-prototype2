RISE: Real-time Information (for) Social Empowerment
====================================================

- intended to be used as a _tactical tool_, rather than a strategic one.

- Intrinsic to the application is an interesting potential to understand, (real-time or post-facto)
 what people do/need for an action to be successful.

- Along with reportage of observable, localized facts (i.e. situational awareness), we want to gauge the mood of an
anonymous crowd and stream back their aggregated feeling on certain broad topics.
Subjective, emotional things are analysed for rates of change and rapidly changing
sentiments are considered to be knowledge the group should be made aware of.


architecture at 10, 000 ft
--------------------------
- Implemented using the Meteor 1.2 reactive javascript framework.  ReactJS 0.14 is used to implement the view layer,
Semantic-UI 2.1.6 is used for the *design vocabulary*, React-router 1.0 is used for the routing layer and MapboxJS is
used for the mapping implementation.

- want to have **ephemeral data**; the user data should in no way be able to identify an individual outside the
application, and the raw data is not kept, but working data is updated as changes occur.  Nevertheless, we also
want to protect the integrity of each message, to ensure that there is no message spoofing going on.

- the router sends all non-informational accesses through the geolocateUser component to the
createLogin security component.  Currently this includes the dashboard of running actions, and also any direct
access to an action.   Accesses to general information (like About) don't go thru' geolocation
or security.  That's just straight public access.

- we want to cut down the chatter from the geolocation api.  To do this we stop the geolocation
 passing as high up the react component hierarchy as possible.

- from geolocation, the latLng is passed to createLogin as a prop.  CreateLogin either creates a new random userId or
recycles one, if one is present on the connection.  The latLng prop is directly associated with the user data and its current
actor documents.

- The createLogin receives changes to the users geolocation and updates user and actors only if there has been
a significant change in position.  This is how the geolocation chatter is minimized down the chain.  The checking is
done on the client, rather than do a network trip.

- Features (things that an actor can do while joined to an action) are implemented as child routes of a current action.
 They are presented as modals in the ui.  Conceptually related features are grouped together into containers, which can
 be placed in a menu container (sidebar) whenever and in whatever way makes the best sense.  They are constructed in a
 standard pattern, and as such new features can be created with relative ease and clarity.

- There is the concept of blackballing users who are seen as trolls by their peers in the action.  Partially implemented.


propagation
-----------
- The app-as-web-app should be spread person to person by QRcode  scan or possibly as an emailed qr code, or standard url.
- QR code is the preferred method, since here is no way of knowing who you got your invite from, while email leaves its own
trail and needs a mail server/service.

admin
-----
- The intention is for actions to be created on the fly and have virtually no administration.  On action's end, the admin's
decides what data to donate and what to delete.

- In a similar vein, administration privilege is granted by other administrators.  This requires creation of accounts with
user generated passwords.  The referring admins user id is attached to the new admins user record.  Limits could be placed on
the number of referrals an administrator can make.

- an array of usernames (organizers) is associated with each action.  all the admins have equal power.


roadmap
-------
- Cordova is a possibility, but not sure that the use case for it is strong enough to justify the effort,
since we want this app to be ephemeral, cross-platform and ad-hoc.

- Full version will use a componentized structure.  A structure is already defined, along with some supporting tests.
Current structure factors *features* into separate directories, so the migration should be fairly clear.

- Want to implement an mqtt message queue for some of the transient functionality.

- desire is to make this runable from a device on a local wifi network and not need a full internet connection.  Would
like to ideally have the ability to have the physical server running in a a local wifi network.

-


