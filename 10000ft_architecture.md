RISE = realtime information (for) social empowerment
====================================================

- a _tactical tool_, rather than a strategic one, but with interesting ability to understand what
people do/need for a successful action.


architecture at 10, 000 ft
--------------------------

- want to have **ephemeral data**; the user data should in no way be able to identify an individual outside the
application, and the raw data is not kept, but working data is updated as changes occur.

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



roadmap
-------


propagation and admin
---------------------
- The app-as-web-app should be spread person to person by QRcode  scan or possibly as an emailed qr code, or standard url.
- There is no way of knowing who you got your invite from _thru the app_'s data.  email leaves its own trail.

- The intention is for actions to be created on the fly and have virtually no administration.  On action's end, the admin's
decides what data to donate and what to delete.

- In a similar vein, administration privilege is granted by other administrators.  This requires creation of accounts with
user generated passwords.  The referring admins user id is attached to the new admins user record.  Limits could be placed on
the number of referals an administrator can make.

- an array of usernames (organizers) is associated with each action.  all the admins have equal power.
