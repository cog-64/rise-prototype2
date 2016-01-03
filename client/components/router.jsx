/**
 * 1.0 api objects destructured into vars
 * when the history changes, router will match the change to one of its children (i.e. a route) and render the
 * configured components.  The component is  nested into the parent component
 */

// destructure the router into variables
const {
    Router // primary components to keep ui and url in sync
    , Route  // child prop of router: declarative mapper of url to components hierarchy
    , Link
    , Redirect
    , IndexRoute
    } = ReactRouter
    ;

// create an independent history that the router to listen to
const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();

// router should look like the site currentAction
// we want to pass the actionid as a query parm so that people can
// go straight to their action
const RiseAppRoutes = (
    <Router history={history}>
        <Route  path="/" name="root" component={AppBody}>
            <IndexRoute component={GeolocateUser} />

            <Route path="signin" component={SignInWrapper} />
            <Route path="organizer" component={OrganizerWrapper} />
            <Route path="about" component={About} />



            <Route path="/actions/:actionId" component={GeolocateUser} >

                <Route path="mood" component={CrowdMoodWrapper} />
                <Route path="foreboding" component={ForebodingWrapper} />

                <Route path="broadcast" component={BroadcastMessageWrapper} />
                <Route path="situation" component={ReportSituationWrapper} />
                <Route path="uploadpic" component={UploadPicWrapper} />

                <Route path="crowdsize" component={CrowdSizeWrapper} />
                <Route path="idea" component={SuggestIdeaWrapper} />
                <Route path="whatnext" component={WhatNextWrapper} />

                <Route path="qrcode" component={CreateQRWrapper} />
                <Route path="leave" component={LeaveActionWrapper} />

                <Route path="handle" component={ActorHandleWrapper} />
                <Route path="actormood" component={ActorMoodWrapper} />
                <Route path="sos" component={ActorSOSWrapper} />


            </Route>

            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);


// debugging
//const RiseAppRoutes = (
//    <Router history={history}>
//        <Route  path="/" name="root" component={AppBody}>
//            <IndexRoute component={TopRiseMenu} />
//            <Route path= "/:actionId" component={CreateLogin} />
//            <Route path="about" component={About} />
//
//            <Route path="*" component={NotFound} />
//        </Route>
//    </Router>
//);

/**
 * render the router when meteor starts on the client
 */
Meteor.startup(function() {

    //debugger;
    ReactDOM.render(RiseAppRoutes, document.getElementById("app-container"));
});



/**
 * a composable class to separate pure views from meteor data
 *
 */
MeteorData = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        //debugger;
        const sub = this.props.subscribe();
        const data = this.props.fetch();
        data.loading = !sub.ready();
        return data;
    },
    render() {
        return this.props.render(this.data)
    }
});
