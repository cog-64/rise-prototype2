const {
        Link // the primary mechanism of navigation; link will render a fully accessible anchor with a proper href
        , Redirect // a redirect to maintain old urls
        } = ReactRouter
    ;

TestSemanticElts = React.createClass({
    render() {
        return (
            <div>
                {/*<TestCoolButts />
                 <TestNiceButts />
                 <TestSemLoadButts />
                 <TestSemIconicButts />
                 <TestMenuConatiner />
                 <TestLoader />
                 <TestReveal />
                 <TestSemForm />
                 <TestWarningMessage />
                 <TestImageCard />
                 <TestAccordianMenu />
                 <TestCheckArray />
                 <TestGroupedCheckboxes/>
                 <TestFlyOutMenu />
                 <TestBlurrableSegment />
                 <TestEmbedVid />
                 <TestModalBox />
                 <TestSimpleCalledModal />
                 <TestPopup/>
                 <TestMoodRatings />
                 <TestShapeShifting />
                <TestTopAttachedSidebar />*/}
                <TestFlyOutMenu />

            </div>
        );
    }
});

TestCoolButts = React.createClass({


    render() {
        return (
            <div>

                <div className="ui labeled button" tabindex="0">
                    <div className="ui red button">
                        <i className="heart icon"></i> Like
                    </div>
                    <a className="ui basic red left pointing label">
                        1,048
                    </a>
                </div>
                <div className="ui labeled button" tabindex="0">
                    <div className="ui basic blue button">
                        <i className="fork icon"></i> Forks
                    </div>
                    <a className="ui basic left pointing blue label">
                        1,048
                    </a>
                </div>

            </div>
        );
    }
});

TestNiceButts = React.createClass({
    render() {
        return (
            <div>

                <div className="ui buttons">
                    <button className="ui button">un</button>
                    <div className="or" data-text="ou"></div>
                    <button className="ui positive button">deux</button>
                </div>

            </div>
        );
    }
});

TestSelectableTable = React.createClass({
  render() {
    return (
        <table className="ui celled table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Location</th>
                <th>Join</th>

            </tr>
            </thead>
            <tbody>

            <tr>
                <td>
                    <h2 className="ui header">
                        Storm Parliament
                        <div className="sub header">Give the lackies all public spankings</div>
                    </h2>
                </td>
                <td>5 November 2015,  </td>
                <td> <button className="circular ui icon button">
                    <i className="icon map"></i>
                </button> </td>
                <td className="selectable">
                    <a href="#">Join!</a>
                </td>
            </tr>

            <tr>
                <td>
                    <h2 className="ui header">
                        Storm the reserve banks
                        <div className="sub header">Give the bankers all public spankings</div>
                    </h2>
                </td>
                <td>6 November 2015,  </td>
                <td> <button className="circular ui icon button">
                    <i className="icon map"></i>
                </button> </td>
                <td className="selectable">
                    <a href="#">Join!</a>
                </td>
            </tr>
            <tr>
                <td>
                    <h2 className="ui header">
                        Dance naked
                        <div className="sub header">party like it's 1099</div>
                    </h2>
                </td>
                <td>7 November 2015,  </td>
                <td> <button className="circular ui icon button">
                    <i className="icon map"></i>
                </button> </td>
                <td className="selectable">
                    <a href="#">Join!</a>
                </td>
            </tr>
            <tr className="warning">
                <td>
                    <h2 className="ui header">
                        defeat the psychopath's inevitable counter attack
                        <div className="sub header">hopefully not get hung by confused and frightened masses</div>
                    </h2>
                </td>
                <td>8 November 2015,  </td>
                <td> <button className="circular ui icon button">
                    <i className="icon map"></i>
                </button> </td>
                <td className="selectable">
                    <a href="#">Join!</a>
                </td>
            </tr>
            <tr>
                <td>
                    <h2 className="ui header">
                        build a resilient civil society in the ruins
                        <div className="sub header">hopefully not too many ruins</div>
                    </h2>
                </td>
                <td>11 November 2015,  </td>
                <td> <button className="circular ui icon button">
                    <i className="icon map"></i>
                </button> </td>
                <td className="selectable">
                    <a href="#">Join!</a>
                </td>
            </tr>

            </tbody>
        </table>
    );
  }
});
  
 

TestSemLoadButts = React.createClass({
    render() {
        return (
            <div>
                <button className="ui loading button">Loading</button>
                <button className="ui basic loading button">Loading</button>
                <button className="ui primary loading button">Loading</button>
                <button className="ui secondary loading button">Loading</button>
            </div>
        );
    }
});

TestSemIconicButts = React.createClass({
    render() {
        return (
            <div>
                <div className="ui vertical labeled icon buttons">
                    <button className="ui button">
                        <i className="pause icon"></i>
                        Pause
                    </button>
                    <button className="ui button">
                        <i className="play icon"></i>
                        Play
                    </button>
                    <button className="ui button">
                        <i className="shuffle icon"></i>
                        Shuffle
                    </button>
                </div>
            </div>
        );
    }
});


TestMenuConatiner = React.createClass({
    render() {
        return (
            <div>
                <div className="ui vertical attached stackable menu">
                    <div className="ui container">
                        <a className="item">
                            <i className="home icon"></i> Home
                        </a>
                        <a className="item">
                            <i className="grid layout icon"></i> Browse
                        </a>
                        <a className="item">
                            <i className="mail icon"></i> Messages
                        </a>

                        <div className="ui simple dropdown item">
                            More
                            <i className="dropdown icon"></i>

                            <div className="menu">
                                <a className="item"><i className="edit icon"></i> Edit Profile</a>
                                <a className="item"><i className="globe icon"></i> Choose Language</a>
                                <a className="item"><i className="settings icon"></i> Account Settings</a>
                            </div>
                        </div>
                        <div className="right item">
                            <div className="ui input"><input type="text" placeholder="Search..."/></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


TestLoader = React.createClass({
    styles: {
        position: 'fixed',
        top: '0%',
        right: '0%',
        bottom: '0%',
        left: '0%',
        padding: 0,
        boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
        overflow: 'auto',
        background: '#000'
    },
    render() {
        return (
            <div className="full height">
                <div className="ui segment">
                    <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                    </div>
                    <p></p>
                </div>
            </div>
        );
    }
});

TestReveal = React.createClass({
    render() {
        return (
            <div className="ui small circular rotate left reveal image">
                <img src="/img/cog-64-gold.png" className="hidden content"/>
                <img src="/img/cog.png" className="visible content"/>
            </div>
        );
    }
});

TestSemForm = React.createClass({
    render() {
        return (
            <div className="ui form">
                <div className="three fields">
                    <div className="field">
                        <label>First name</label>
                        <input type="text" placeholder="First Name"/>
                    </div>
                    <div className="field">
                        <label>Middle name</label>
                        <input type="text" placeholder="Middle Name"/>
                    </div>
                    <div className="field">
                        <label>Last name</label>
                        <input type="text" placeholder="Last Name"/>
                    </div>
                </div>
            </div>
        );
    }
});

TestWarningMessage = React.createClass({

    componentDidMount() {
        $('.message .close')
            .on('click', function () {
                $(this)
                    .closest('.message')
                    .transition('fade')
                ;
            })
        ;
    },

    render() {
        return (
            <div className="ui warning message">
                <i className="close icon"></i>

                <div className="header">
                    You must register before you can do that!
                </div>
                Visit our registration page, then try again
            </div>
        );
    }
});


TestImageCard = React.createClass({

    componentDidMount() {
        $('.special.cards .image').dimmer({
            on: 'hover'
        });
    },

    render() {
        return (
            <div className="ui special cards">
                <div className="card">
                    <div className="blurring dimmable image">
                        <div className="ui dimmer">
                            <div className="content">
                                <div className="center">
                                    <div className="ui inverted button">Add Friend</div>
                                </div>
                            </div>
                        </div>
                        <img src="/img/cog.png"/>
                    </div>
                    <div className="content">
                        <a className="header">Team Fu</a>

                        <div className="meta">
                            <span className="date">Create in Sep 2014</span>
                        </div>
                    </div>
                    <div className="extra content">
                        <a>
                            <i className="users icon"></i>
                            2 Members
                        </a>
                    </div>
                </div>
                <div className="card">
                    <div className="blurring dimmable image">
                        <div className="ui inverted dimmer">
                            <div className="content">
                                <div className="center">
                                    <div className="ui primary button">Add Friend</div>
                                </div>
                            </div>
                        </div>
                        <img src="/img/Rise.png"/>
                    </div>
                    <div className="content">
                        <a className="header">Team Hess</a>

                        <div className="meta">
                            <span className="date">Create in Aug 2014</span>
                        </div>
                    </div>
                    <div className="extra content">
                        <a>
                            <i className="users icon"></i>
                            2 Members
                        </a>
                    </div>
                </div>
            </div>
        );
    }
});


TestAccordianMenu = React.createClass({
    //todo: fix:  having a hell of a time getting the second checkboxes to respond to checks
    componentDidMount() {

        $('.trigger.example .accordion')
            .accordion({
                selector: {
                    trigger: '.title .icon'
                }
            })
            // .checkbox()
        ;

        //$('.grouped.fields')
        //    .checkbox();

    },

    componentDidUpdate() {
        $('.trigger.example .accordion').accordion('refresh')
            //.checkbox('refresh')
        ;
        //$('.accordion').checkbox('refresh');
    },
    render() {
        return (
            <div className="trigger example">
                <div className="ui vertical fluid accordion menu">
                    <div className="item">
                        <a className="active title">
                            <i className="dropdown icon"></i>
                            Size
                        </a>

                        <div className="active content">
                            <div className="ui form">
                                <div className="grouped fields">
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="size" value="small"/>
                                            <label>Small</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="size" value="medium"/>
                                            <label>Medium</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="size" value="large"/>
                                            <label>Large</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" name="size" value="x-large"/>
                                            <label>X-Large</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <a className="title">
                            <i className="dropdown icon"></i>
                            Colors
                        </a>

                        <div className="content">
                            <div className="ui form">
                                <div className="grouped fields">
                                    <div className="field">
                                        <div className="ui checkbox">
                                            <input type="checkbox" name="small"/>
                                            <label>Red</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui checkbox">
                                            <input type="checkbox" name="medium"/>
                                            <label>Orange</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui checkbox">
                                            <input type="checkbox" name="large"/>
                                            <label>Green</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui checkbox">
                                            <input type="checkbox" name="x-large"/>
                                            <label>Blue</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
});

TestCheckArray = React.createClass({
    componentDidMount() {
        $('.tim .checkbox')
            .checkbox({
                onChange: function () {
                    console.log('onChange called');
                }
            })
        ;
    },

    render() {
        return (
            <div className="tim">
                <div className="ui form">
                    <div className="grouped fields">
                        <label>How often do you use checkboxes?</label>

                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="example2" checked="checked"/>
                                <label>Once a week</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="example2"/>
                                <label>2-3 times a week</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="example2"/>
                                <label>Once a day</label>
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" name="example2"/>
                                <label>Twice a day</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

TestGroupedCheckboxes = React.createClass({
    componentDidMount() {
       // debugger;
        console.log('groupies checked');
        $('.tim .master.checkbox')
            .checkbox({
                // check all children
                onChecked: function () {
                    var
                        $childCheckbox = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
                        ;
                    $childCheckbox.checkbox('check');
                },
                // uncheck all children
                onUnchecked: function () {
                    var
                        $childCheckbox = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
                        ;
                    $childCheckbox.checkbox('uncheck');
                }
            })
        ;
        // child checkboxes
        $('.list .child.checkbox')
            .checkbox({
                // Fire on load to set parent value
                fireOnInit: true,
                // Change parent state on each child checkbox change
                onChange: function () {
                    var
                        $listGroup = $(this).closest('.list'),
                        $parentCheckbox = $listGroup.closest('.item').children('.checkbox'),
                        $checkbox = $listGroup.find('.checkbox'),
                        allChecked = true,
                        allUnchecked = true
                        ;
                    // check to see if all other siblings are checked or unchecked
                    $checkbox.each(function () {
                        if ($(this).checkbox('is checked')) {
                            allUnchecked = false;
                        }
                        else {
                            allChecked = false;
                        }
                    });
                    // set parent checkbox state, but dont trigger its onChange callback
                    if (allChecked) {
                        $parentCheckbox.checkbox('set checked');
                    }
                    else if (allUnchecked) {
                        $parentCheckbox.checkbox('set unchecked');
                    }
                    else {
                        $parentCheckbox.checkbox('set indeterminate');
                    }
                }
            })
        ;
    }
    ,
    render() {
        return (
            <div className="tim">
                <div className="ui celled relaxed list">
                    <div className="item">
                        <div className="ui master checkbox">
                            <input type="checkbox" name="fruits"/>
                            <label>Fruits</label>
                        </div>
                        <div className="list">
                            <div className="item">
                                <div className="ui child checkbox">
                                    <input type="checkbox" name="apple"/>
                                    <label>Apple</label>
                                </div>
                            </div>
                            <div className="item">
                                <div className="ui child checkbox">
                                    <input type="checkbox" name="orange"/>
                                    <label>Orange</label>
                                </div>
                            </div>
                            <div className="item">
                                <div className="ui child checkbox">
                                    <input type="checkbox" name="pear"/>
                                    <label>Pear</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="ui master checkbox">
                            <input type="checkbox" name="vegetables"/>
                            <label>Vegetables</label>
                        </div>
                        <div className="list">
                            <div className="item">
                                <div className="ui child checkbox">
                                    <input type="checkbox" name="lettuce"/>
                                    <label>Lettuce</label>
                                </div>
                            </div>
                            <div className="item">
                                <div className="ui child checkbox">
                                    <input type="checkbox" name="carrot"/>
                                    <label>Carrot</label>
                                </div>
                            </div>
                            <div className="item">
                                <div className="ui child checkbox">
                                    <input type="checkbox" name="spinach"/>
                                    <label>Spinach</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* never gets rendered from the show method*/}
                <actungButts />

                <div className="actions">
                    <div className="ui black deny button">
                        Nope
                    </div>
                    <div className="ui positive right labeled icon button">
                        Yep, that's me
                        <i className="checkmark icon"></i>
                    </div>
                </div>
            </div>
        );
    }
});


TestFlyOutMenu = React.createClass({
    /* -- here's the help doc implementation
     semantic.menu = {};

     // ready event
     semantic.menu.ready = function() {

     // selector cache
     var
     $dropdownItem = $('.main.container .menu .dropdown .item'),
     $popupItem    = $('.main.container .popup.example .browse.item'),
     $menuItem     = $('.main.container .menu a.item, .menu .link.item').not($dropdownItem),
     $dropdown     = $('.main.container .menu .ui.dropdown'),
     // alias
     handler = {

     activate: function() {
     if(!$(this).hasClass('dropdown browse')) {
     $(this)
     .addClass('active')
     .closest('.ui.menu')
     .find('.item')
     .not($(this))
     .removeClass('active')
     ;
     }
     }

     }
     ;

     $dropdown
     .dropdown({
     on: 'hover'
     })
     ;

     $('.main.container .ui.search')
     .search({
     type: 'category',
     apiSettings: {
     action: 'categorySearch'
     }
     })
     ;

     $('.school.example .browse.item')
     .popup({
     popup     : '.admission.popup',
     hoverable : true,
     position  : 'bottom left',
     delay     : {
     show: 300,
     hide: 800
     }
     })
     ;

     $popupItem
     .popup({
     inline   : true,
     hoverable: true,
     popup    : '.fluid.popup',
     position : 'bottom left',
     delay: {
     show: 300,
     hide: 800
     }
     })
     ;

     $menuItem
     .on('click', handler.activate)
     ;

     };


     // attach ready event
     $(document)
     .ready(semantic.menu.ready)
     ;

     -- from the source: http://semantic-ui.com/javascript/menu.js
     */




    componentDidMount() {
        $('.right.dropdown').dropdown({
            on: 'hover'
        });

        //$('.admission.popup').popup();
        $('.school.example .browse.item')
            .popup({
                popup: '.admission.popup',
                hoverable: true,
                position: 'bottom left',
                delay: {
                    show: 300,
                    hide: 800
                }
            })
    },

    render() {
        return (
            <div className="main full height container school example">
                <div className="ui text menu">
                    <div className="item">
                        <img src="/img/Rise.png"/>
                    </div>
                    <a className="browse item">
                        Browse Courses
                        <i className="dropdown icon"></i>
                    </a>

                    <div className="ui right dropdown item">
                        More
                        <i className="dropdown icon"></i>

                        <div className="menu">
                            <div className="item">Applications</div>
                            <div className="item">International Students</div>
                            <div className="item">Scholarships</div>
                        </div>
                    </div>
                </div>
                <div className="ui flowing basic admission popup">
                    <div className="ui three column relaxed divided grid">
                        <div className="column">
                            <h4 className="ui header">Business</h4>

                            <div className="ui link list">
                                <a className="item">Design &amp; Urban Ecologies</a>
                                <a className="item">Fashion Design</a>
                                <a className="item">Fine Art</a>
                                <a className="item">Strategic Design</a>
                            </div>
                        </div>
                        <div className="column">
                            <h4 className="ui header">Liberal Arts</h4>

                            <div className="ui link list">
                                <a className="item">Anthropology</a>
                                <a className="item">Economics</a>
                                <a className="item">Media Studies</a>
                                <a className="item">Philosophy</a>
                            </div>
                        </div>
                        <div className="column">
                            <h4 className="ui header">Social Sciences</h4>

                            <div className="ui link list">
                                <a className="item">Food Studies</a>
                                <a className="item">Journalism</a>
                                <a className="item">Non Profit Management</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


TestBlurrableSegment = React.createClass({

    componentDidMount(){
        // selector cache
        var
            $pageDimmer = $('.demo.page.dimmer'),
            $examples = $('.example'),
            $showButton = $examples.find('.show.button'),
            $pageButton = $examples.find('.page.button'),
            $hideButton = $examples.find('.hide.button'),

        // event handlers
            handler = {
                show: function () {
                    $(this)
                        .closest('.example')
                        .children('.segment:not(.instructive)')
                        .dimmer('show')
                    ;
                },
                hide: function () {
                    $(this)
                        .closest('.example')
                        .children('.segment:not(.instructive)')
                        .dimmer('hide')
                    ;
                },
                page: function () {
                    $('body > .demo.page.dimmer')
                        .dimmer('show')
                    ;
                }
            };

        $pageDimmer
            .dimmer()
        ;

        $pageButton
            .on('click', handler.page)
        ;
        $showButton
            .on('click', handler.show)
        ;
        $hideButton
            .on('click', handler.hide)
        ;
    },

    render() {
        return (
            <div className="demo page dimmer example">
                <div className="ui blurring segment">
                    <div className="ui dimmer"></div>
                    <p></p>

                    <p></p>
                </div>
                <div className="ui ignored ignored icon buttons">
                    <div className="ui show button"><i className="plus icon"></i></div>
                    <div className="ui hide button"><i className="minus icon"></i></div>
                </div>

            </div>
        );
    }
});

TestEmbedVid = React.createClass({
    //if we want to do a custom embed source, would need to extend the
    //fn.embed.settings.sources object.
    // i.e.fn.embed.settings.sources.newshit={name:'newthing', type:'sometype',domain:'foo.com', url:'thing.foo.com' etc...}

    // not really what we want to do for embedding react stuff, but could be cute for sharing vids
    componentDidMount(){
        $('.custom.example .ui.embed').embed({
            source: 'youtube',
            id: 'pfdu_gTry8E',
            placeholder: '/img/Rise.png'
        });
    },

    render() {
        return (
            <div className="custom example">
                <div className="ui embed"></div>
            </div>
        );
    }
});


TestModalBox = React.createClass({
    componentDidMount(){

        // selector cache
        var
            $modalDlg = $('.ui.modal'),
            $acceptButton = $modalDlg.find('.positive.right.labeled.icon.button'),
            $rejectButton = $modalDlg.find('.deny.button')

        // event handlers
        handler = {
            acceptIt: function () {
                console.log('accept It')

                ;
            },
            denyIt: function () {
                console.log('reject It')
                ;
            }
        };

        /* dom classes that trigger approve/deny callbacks are set in the selector
         * selector    : {
         * close    : '.close, .actions .button',
         * approve  : '.actions .positive, .actions .approve, .actions .ok',
         * deny     : '.actions .negative, .actions .deny, .actions .cancel'
         },
         */
        $modalDlg
            .modal({debug: true})
            .modal({
                onDeny: ()=> {
                    console.log('denied');
                    return false;
                }
                , onApprove: ()=> {
                    console.log('approved')
                }
                , closable: false //no x-out: force a choice
                , transition: 'fly left'
            })
            .modal('show');
        ;

        $acceptButton
            .on('click', handler.acceptIt)
        ;
        $rejectButton
            .on('click', handler.denyIt)
        ;


    },

    render() {
        return (
            <div className="ok dude">
                <div className="ui modal">
                    <i className="close icon"></i>

                    <div className="header">
                        Profile Picture
                    </div>
                    <div className="image content">
                        <div className="ui medium image">
                            <img src="/img/Rise.png"/>
                        </div>
                        <div className="description">
                            <div className="ui header">We've auto-chosen a profile image for you.</div>
                            <p>We've grabbed the following image from the <a href="https://www.gravatar.com"
                                                                             target="_blank">gravatar</a> image
                                associated with your registered e-mail address.</p>

                            <p>Is it okay to use this photo?</p>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="ui black deny button">
                            Nope
                        </div>
                        <div  className="ui positive right labeled icon button">
                            Yep, that's me
                            <i className="checkmark icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


TestSimpleCalledModal = React.createClass({

    componentDidMount(){

        // selector cache
        const
            $modalDlg = $('.ui.basic.modal')
        //, $acceptButton = $modalDlg.find('.positive.right.labeled.icon.button')
        //, $rejectButton = $modalDlg.find('.deny.button')
            ;

        // event handlers
        //handler = {
        //    acceptIt: function() {
        //        console.log('accept It')
        //        ;
        //    },
        //    denyIt: function() {
        //        console.log('reject It')
        //        ;
        //    }
        //};

        /* NB: dom classes that trigger approve/deny callbacks are set in the selector
         * selector    : {
         * close    : '.close, .actions .button',
         * approve  : '.actions .positive, .actions .approve, .actions .ok',
         * deny     : '.actions .negative, .actions .deny, .actions .cancel'
         },
         */
        $modalDlg
            .modal({debug: true})
            .modal({
                onDeny: ()=> {
                    console.log('denied');
                    return false;
                }
                , onApprove: ()=> {
                    console.log('approved')
                }
                , closable: false //no x-out: force a choice
                , transition: 'vertical flip'
            })
            // here's the event attached to the button
            .modal('attach events', '.example .ui.button', 'show');
        ;

        //$acceptButton
        //    .on('click', handler.acceptIt)
        //;
        //$rejectButton
        //    .on('click', handler.denyIt)
        //;


    },
    render() {
        return (
            <div className="another example">
                <div className="ui basic modal">
                    <i className="close icon"></i>

                    <div className="header">
                        Can't join this action
                    </div>
                    <div className="image content">
                        <div className="image">
                            <i className="archive icon"></i>
                        </div>
                        <div className="description">
                            <p>Your inbox is getting full, would you like us to enable automatic archiving of old
                                messages?</p>
                        </div>
                    </div>
                    <div className="actions">
                        <div className="two fluid ui inverted buttons">
                            <div className="ui negative red basic inverted button">
                                <i className="remove icon"></i>
                                No
                            </div>
                            <div className="ui positive green basic inverted button">
                                <i className="checkmark icon"></i>
                                Yes
                            </div>
                        </div>
                    </div>
                </div>

                <button className="ui button">new modality</button>

            </div>
        );
    }
});

TestPopup = React.createClass({
    // popup is next sibling, if it's not specified explicitly...
    componentDidMount(){
        $('.yo .green.button')
            .popup({
                popup: $('.custom.popup')
                , on: 'click'
                , title: 'madness takes its toll'
                , target: '.test.image'
                , position: 'right center'
                , transition: 'fly left'
            })
        ;

    },

    render() {
        return (
            <div>
                <div className="yo">
                    <button className="ui green button">pop up</button>

                    <div className='ui horizontal divider'><i className='idea icon'></i></div>

                    <img className='medium ui test image' src="/img/Rise.png" alt=""/>
                </div>

                <div className='ui custom popup top left transition hidden'>
                    yes, it's me
                </div>
            </div>
        );
    }
});


TestMoodRatings = React.createClass({

    // the icons are hard wired in using css :before
    // e.g. .ui.star.rating .active.icon:before {
    //content: '\f005';
    // set in cli lib:
    //\client\lib\semantic-ui\themes\default\modules\rating.overrides.import.less
    // an issue has been filed, ideally would have a css variable(s) for custom ones

    componentDidMount(){

        // selector cache
        var
            $RatingDlg = $('.ui.rating')
            , $upVoteButton = $('.ui.positive.button')
            , $downVoteButton = $('.ui.negative.button')
            ;

        // event handlers
        handler = {
            incrementIt: function () {
                console.log('up vote It');
                let curRate = $RatingDlg.rating('get rating');
                $RatingDlg.rating('set rating', curRate + 1);
                ;
            },
            decrementIt: function () {
                console.log('down vote It');
                let curRate = $RatingDlg.rating('get rating');
                $RatingDlg.rating('set rating', curRate - 1);

                ;
            }
        };


        $RatingDlg
            .rating({
                initialRating: 0
                , maxRating: 10
                // , interactive: false
                , onRate: (value)=> {
                    console.log(`chose ${value} as the rating`, value)
                }
                //, selector  : {
                //    icon : '.icon'
                //}

            })
        ;
        $upVoteButton
            .on('click', handler.incrementIt)
        ;

        $downVoteButton
            .on('click', handler.decrementIt)
        ;

    },

    render() {
        return (

            <div className="example">
                <div className="ui heart rating"></div>

                <button className="ui positive button">upvote</button>
                <button className="ui negative button">downvote</button>
            </div>


        );
    }
});

TestShapeShifting = React.createClass({


    /**
     * the real react way to do this is not to use addClass/remove class but to use state properties
     * and/or to alternatively use a style object (and maybe a util like radium) directly in the function
     *
     */




        componentDidMount(){
        // selector cache
        const
            $demo = $('.demo'),
            $directionButton = $('.direction .button'),
            $shapeButton = $('.type.buttons .button')

            ;

        // event handlers
        const handler = {
            rotate: function () {
                console.log('rotate clicked');
                var
                    $shape = $('#foo'),
                    direction = $(this).data('direction') || false,
                    animation = $(this).data('animation') || false
                    ;
                if (direction && animation) {
                    $shape
                        .shape(animation + '.' + direction)
                    ;
                }
            },

            removeShape: function () {
                var
                    shape = $(this).data('shape') || false
                    ;
                if (shape) {
                    $demo
                        .removeClass(shape)
                    ;
                }
            },

            changeShape: function () {
                console.log('change clicked');
                //debugger;
                var
                    $shape = $(this),
                    $otherShapes = $shape.siblings(),
                    shape = $shape.data('shape')
                    ;
                $shape
                    .addClass('active')
                ;
                $otherShapes
                    .removeClass('active')
                    .each(handler.removeShape)
                ;
                $demo
                    .removeAttr('style')
                    .addClass(shape)
                ;
                //debugger;
            }
        };

        // attach events
        $demo
            .shape()
        ;
        $directionButton
            .on('click', handler.rotate)
            .popup({
                delay: 0,
                position: 'bottom center'
            })
        ;
        $shapeButton
            .on('click', handler.changeShape)
        ;
    },
    render() {
        return (

            <div className="demo">

                <div id='foo' className="ui cube shape">
                    <div className="sides">
                        <div className="active side">
                            <div className="content">
                                <div className="center">
                                    <div className="image">
                                        <img src="/img/cog.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="side">
                            <div className="content">
                                <div className="center">
                                    This is side 2
                                </div>
                            </div>
                        </div>
                        <div className="side">
                            <div className="content">
                                <div className="center">
                                    <div className="image">
                                        <img src="/img/Rise.png"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="side">
                            <div className="content">
                                <div className="center">
                                    <div className="image">
                                        <img src="/img/jungle_forest.jpg"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="side">
                            <div className="content">
                                <div className="center">
                                    <TestPopup/>
                                </div>
                            </div>
                        </div>
                        <div className="side">
                            <div className="content">
                                <div className="center">
                                    <TestMoodRatings/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ui ignored divider"></div>
                <div className="ui ignored icon direction buttons">
                    <div className="ui button" data-animation="flip" title="Flip Left" data-direction="left"><i
                        className="left long arrow icon"></i></div>
                    <div className="ui button" data-animation="flip" title="Flip Up" data-direction="up"><i
                        className="up long arrow icon"></i></div>
                    <div className="ui icon button" data-animation="flip" title="Flip Down" data-direction="down"><i
                        className="down long arrow icon"></i></div>
                    <div className="ui icon button" data-animation="flip" title="Flip Right" data-direction="right"><i
                        className="right long arrow icon"></i></div>
                </div>

                <div className="ui ignored icon direction buttons">
                    <div className="ui button" title="Flip Over" data-animation="flip" data-direction="over"><i
                        className="retweet icon"></i></div>
                    <div className="ui button" title="Flip Back" data-animation="flip" data-direction="back"><i
                        className="flipped retweet icon"></i></div>

                    <div className="ui type buttons">
                        <div className="active ui button" data-shape="auto">Auto</div>
                        <div className="ui button" data-shape="square">Square</div>
                        <div className="ui button" data-shape="irregular">Irregular</div>
                    </div>
                </div>
            </div>




        );
    }


});

/**
 * an object that can be directly manipulated and used to manage the behaviour of the css modules
 * @type {{base: {color: string, :hover: {background: *}}, primary: {background: string}, warning: {background: string}}}
 * e.g. <button style={[
          styles.base,
          styles[this.props.kind]
 */
var styles = {
    base: {
        color: '#fff',

        // Adding interactive state couldn't be easier! Add a special key to your
        // style object (:hover, :focus, :active, or @media) with the additional rules.
        ':hover': {
            background: "color('#0074d9').lighten(0.2).hexString()"
        }
    },

    primary: {
        background: '#0074D9'
    },

    warning: {
        background: '#FF4136'
    }
};


TestTopAttachedSidebar = React.createClass({
    componentDidMount(){
        $('.context.example .ui.sidebar')
            .sidebar({
                context     : $('.context.example .bottom.segment'),
                transition  : 'scale down',
                dimPage     : true

            })
            .sidebar('attach events', '.context.example .menu .item')
        ;
    },


    render() {
        return (
            <div className=" context example">
                <SegTopAttMenu />
                <div className="ui top attached container segment">
                    <div className="ui inverted labeled icon left inline vertical sidebar menu">
                        <SegHome/>
                        <SegTopic />
                        <SegSmile />
                        <SegHisto />

                    </div>
                    <div className="pusher">
                        {
                        /*
                        // <div className="ui basic segment">
                        //    <h3 className="ui header">Application Content</h3>
                        //    <img className="ui wireframe image" src="/img/Rise.png"/>
                        //
                        //</div>
                        */}
                        <TestMapbox />

                        <div className="ui bottom attached segment">
                            <h3 className="ui footer">Application footer</h3>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
});


const SegHome = React.createClass({
  render() {
    return (
        <a className="item">
            <i className="home icon"></i>
            Home
        </a>
    );
  }
});

const SegTopic = React.createClass({
  render() {
    return (
        <a className="item">
            <i className="block layout icon"></i>
            Topics
        </a>
    );
  }
});

const SegSmile = React.createClass({
  render() {
    return (
        <a className="item">
            <i className="smile icon"></i>
            Friends
        </a>
    );
  }
});

 const SegHisto = React.createClass({
   render() {
     return (
         <a className="item">
             <i className="calendar icon"></i>
             History
         </a>
     );
   }
 });



const SegTopAttMenu = React.createClass({
  render() {
    return (
        <div className="ui top attached demo menu">
            <a className="item">
                <i className="sidebar icon"></i>
                Menu component
            </a>
        </div>
    );
  }
});


TestMapbox = React.createClass({



  render() {
    return (
        <MapBoxMap />
    );
  }
});


actungButts = React.createClass({

    componentDidMount() {
        debugger;
        console.log('actung baby');
    },
    render() {
        return (
            <div className="actions">
                <div className="ui black deny button">
                    Nope
                </div>
                <div className="ui positive right labeled icon button">
                    Yep, that's me
                    <i className="checkmark icon"></i>
                </div>
            </div>
        );
    }
});


 





