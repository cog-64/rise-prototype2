/***
 * all roads lead thru appbody
 */

const ShowConnectionIssues = new ReactiveVar(false);

const CONNECTION_ISSUE_TIMEOUT = 5000;


// Only show the connection error box if it has been 5 seconds since
// the app started
setTimeout(function () {
    // Show the connection error box
    ShowConnectionIssues.set(true);
}, CONNECTION_ISSUE_TIMEOUT);

AppBody = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {

        return {
            disconnected: ShowConnectionIssues.get() && (! Meteor.status().connected)
        }
    },

    createRightSidebar: () => {
        //debugger;
        let $sidebar = $('#right-rise-sidebar');

        $($sidebar).sidebar({
                context: $('.rise.proto .bottom.segment')
                , transition: 'overlay'
                , dimPage: false
                , mobileTransition: 'overlay'


            })
            //.sidebar('attach events', '#main-menu-button')
        ;

    },

    createLeftSidebar: () => {
        //debugger;
        let $sidebar = $('#left-rise-sidebar');

        $($sidebar).sidebar({
                context: $('.rise.proto .bottom.segment')
                , transition: 'overlay'
                , dimPage: false
                , mobileTransition: 'overlay'

            })
            //.sidebar('attach events', '#main-menu-button')
        ;

    },

    createTopSidebar: () => {
        //debugger;
        let $sidebar = $('#top-rise-sidebar');

        $($sidebar).sidebar({
                context: $('.rise.proto .bottom.segment')
                , transition: 'overlay'
                , dimPage: false
                , mobileTransition: 'overlay'

            })
            //.sidebar('attach events', '#main-menu-button')
        ;

    },

    componentDidMount() {

        this.createRightSidebar();
        this.createLeftSidebar();
        this.createTopSidebar();

        MenuActions.hookSidebarToMenuButton('top');
    },

    componentWillUnmount() {
        console.log("unmounting app and logging out");
        Meteor.logout();
    },

    containerStyles: {
        position: 'absolute',
        width:'100%',
        height: '100%',
        top: '0%',
        right: '0%',
        bottom: '0%',
        left: '0%',
        padding: 0


    },

    bottomSegmentStyles: {
        position: 'relative',
        top: '0%',
        right: '0%',
        bottom: '0%',
        left: '0%',
        padding: 0

    },

    pusherStyles: {
        position: 'absolute',
        width:'100%',
        height: '100%',
        overflow: 'hidden'
    },

    // using the session to reactively change doesn't work
    // and causes  semantic to fuck with the dom moving pushers
    // and such.  need a plan b
    //showTopSidebar() {
    //    debugger;
    //    if (this.data.showTopMenu) {
    //        return <RiseTopSidebar /> ;
    //    }
    //},
    //
    //showRightSidebar() {
    //    if (this.data.showRightMenu) {
    //        return <RiseRightSidebar /> ;
    //    }
    //},
    //
    //showLeftSidebar() {
    //    if (this.data.showLeftMenu) {
    //        return <RiseLeftSidebar /> ;
    //    }
    //},

    //showSimulationSidebar() {
    //    //debugger;
    //    if ( Meteor.settings.public.showSimulations) {
    //        //debugger;
    //        let $sidebar = $('#simulations-sidebar');
    //
    //        $($sidebar).sidebar({
    //            context: $('.rise.proto .bottom.segment')
    //            , transition: 'overlay'
    //            , dimPage: false
    //            , mobileTransition: 'overlay'
    //
    //        })
    //            .sidebar('attach events', '#main-menu-button')
    //        ;
    //        return <SimulationSidebar />
    //    }
    //},

    render() {

        return (
            <div className="rise proto ui fluid container" style={this.containerStyles}>

                { this.data.disconnected ? <ConnectionIssueDialog /> : ''  }

                <div className="ui bottom attached segment pushable" style={this.bottomSegmentStyles}>

                    {MenuActions.unHookAllSidebarToMenuButtonEvents()}

                    <RiseTopSidebar />
                    <RiseRightSidebar />
                    <RiseLeftSidebar />

                    <StickyMenuButton />


                    <div className="pusher" style={this.pusherStyles}>



                        <div className="ui basic segment">
                            <RiseContentPane children={this.props.children}/>
                        </div>
                    </div>

                </div>

            </div>

        );
    }
});






