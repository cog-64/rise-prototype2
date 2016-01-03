MenuActions = React.createClass({

    propTypes: {
        menu: React.PropTypes.string.isRequired
        , orientation: React.PropTypes.string.isRequired
    },

    statics: {
        /***
         * check all the sidebars and close any that are open
         */
        closeOpenSidebars()  {
            MenuActions.closeSidebar($('#right-rise-sidebar'));
            MenuActions.closeSidebar($('#top-rise-sidebar'));
            MenuActions.closeSidebar($('#left-rise-sidebar'));

            //$('#main-rise-sidebar').sidebar('toggle');
            //$('#top-rise-sidebar').sidebar('toggle');
            //$('#left-rise-sidebar').sidebar('toggle');
        },

        /***
         * take a jquery object that represents a sidebar and hide it
         * @param sidebar
         */
        closeSidebar(sidebar) {
            if ( sidebar.sidebar('is visible') ) {
                // debugger;
                sidebar.sidebar('hide');
            }

        },

        /***
         * hook the sidebar in an orientation
         * to an event
         * Partial implementation; not opinion free yet
         * @param orientation
         */
        hookSidebarToMenuButton(orientation) {
            let  buttonSelector = '#main-menu-button'
                , sidebar // a jquery object
            ;

            switch (orientation) {
                case 'top':
                    sidebar =$('#top-rise-sidebar');
                    break;

                case 'right':
                    sidebar =$('#right-rise-sidebar');
                    break;

                case 'left':
                    sidebar =$('#left-rise-sidebar');
                    break;
            }
            if (!!sidebar) {
                sidebar.sidebar('attach events', buttonSelector)
                console.log(`attached events for ${orientation} sidebar`)
            }

        },

        /***
         * want to unhook the existing menubutton clicks
         * to get a cleaner behaviour on the navigation back to home
         * let's see if that works...
         *
         */
        unHookAllSidebarToMenuButtonEvents() {
            //debugger;
            $('#main-menu-button').off('click.sidebar');
        }




    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        console.log('in the ctx mixin for MenuActions');
        let actionId =  Session.get('currentActionId')
            , actorId = Session.get('currentActorId')
            , isOrganizer = Session.get('isOrganizer')
            , showTopMenu = Session.get('topMenuIsEnabled')
            , showLeftMenu = Session.get('leftMenuIsEnabled')
            , showRightMenu = Session.get('rightMenuIsEnabled')
            ;


        return {
            currentActionId:actionId
            , selfActorId: actorId
            , isOrganizer: isOrganizer
            , showTopMenu: showTopMenu
            , showLeftMenu: showLeftMenu
            , showRightMenu: showRightMenu

        };
    },

    getMenuContent() {
        //debugger;
        let rtn = null;
        switch (this.props.menu) {
            case "top":
                if (this.data.showTopMenu) {
                    //debugger;
                    MenuActions.hookSidebarToMenuButton('top');
                    rtn = <UserInteractionMenu actionId={this.data.currentActionId}
                                               actorId={this.data.selfActorId}
                                               isOrganizer={this.data.isOrganizer}
                                               orientation="horizontal"/>;
                }
                break;
            case "right":
                if (this.data.showRightMenu) {
                    MenuActions.hookSidebarToMenuButton('right');
                    rtn = <CrowdWisdomMenu actionId={this.data.currentActionId}
                                           actorId={this.data.selfActorId}
                                           orientation="vertical"/>;
                }
                break;
            case "left":
                    if (this.data.showLeftMenu) {
                        MenuActions.hookSidebarToMenuButton('left');
                        rtn =
                            <CrowdCommunicationMenu actionId={this.data.currentActionId}
                                                    actorId={this.data.selfActorId}
                                                    orientation="vertical"/>;
                    }
                break;
        }

        return rtn;
    },


    render() {



        return (
            <div className="menu-actions">

                { this.getMenuContent() }

            </div>
        );
    }
});
