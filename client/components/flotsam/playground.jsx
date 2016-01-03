AppBodyPlayground = React.createClass({
    componentDidMount(){
        $('.rise.proto .ui.sidebar')
            .sidebar({
                context: $('.rise.proto .bottom.segment'),
                transition: 'push',
                dimPage: true

            })
            .sidebar('attach events', '.rise.proto .menu .item')
        ;
    },


    render() {
        return (
            <div className="rise proto">
                <SegTopAttMenu />

                <div className="ui top attached container segment">
                    <div className="ui inverted labeled icon left inline vertical sidebar menu">
                        <MenuHome/>
                        <SegTopic />
                        <SegSmile />
                        <SegHisto />
                        <SegFlyOut />
                        <SegTestSemanticElts />

                    </div>
                    <div className="ui bottom attached segment">
                        <div className="pusher">
                            <div className="mapbox full height">
                                {/* render the dashboard*/}
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        );
    }
});

const MenuHome = React.createClass({
    render() {
        return (
            <Link to={"/flyout"} className="item">
                <i className="home icon"></i>
                Home
            </Link>


        );
    }
});
const SegTestSemanticElts = React.createClass({
    render() {
        return (
            <Link to={"/semanticelts"} state={{ modal: true, returnTo: "/" }} className="item">
                <i className="idea icon"></i>
                Topics
            </Link>
        );
    }
});

/**
 * popup is placed in same container as the thing it's click event is attached to.
 *
 * */

const SegFlyOut = React.createClass({
    componentDidMount(){
        console.log('mounting segflyout');

        //$('.admission.popup').popup();
        $('.myflyout .browse')
            .popup({
                inline   : true,
                hoverable: true,
                position : 'bottom left',
                delay: {
                    show: 300,
                    hide: 800
                }
            })
        ;
    },
    render() {
        return (
            <div className="myflyout">

                <a className="browse item">
                    Browse
                    <i className="lab icon"></i>
                </a>


                <div className="ui fluid popup bottom left transition hidden">
                    <div className="ui four column relaxed divided grid">
                        <div className="column">
                            <h4 className="ui header">Fabrics</h4>
                            <div className="ui link list">
                                <a className="item">Cashmere</a>
                                <a className="item">Linen</a>
                                <a className="item">Cotton</a>
                                <a className="item">Viscose</a>
                            </div>
                        </div>
                        <div className="column">
                            <h4 className="ui header">Size</h4>
                            <div className="ui link list">
                                <a className="item">Small</a>
                                <a className="item">Medium</a>
                                <a className="item">Large</a>
                                <a className="item">Plus Sizes</a>
                            </div>
                        </div>
                        <div className="column">
                            <h4 className="ui header">Colors</h4>
                            <div className="ui link list">
                                <a className="item">Neutrals</a>
                                <a className="item">Brights</a>
                                <a className="item">Pastels</a>
                            </div>
                        </div>
                        <div className="column">
                            <h4 className="ui header">Types</h4>
                            <div className="ui link list">
                                <a className="item">Knitwear</a>
                                <a className="item">Outerwear</a>
                                <a className="item">Pants</a>
                                <a className="item">Shoes</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

const SegTopic = React.createClass({
    render() {
        return (
            <Link to={"/modal"} state={{ modal: true, returnTo: "/" }} className="item">
                <i className="block layout icon"></i>
                Topics
            </Link>
        );
    }
});

const SegSmile = React.createClass({

    componentDidMount(){
        console.log('mounting segsmile');
        //debugger;
        $('.smiley .test.modal')
            .modal('attach events', '.button.smilelauncher', 'show')
        ;
    },
    render() {
        return (
            <div className="smiley">


                <button className="ui icon button smilelauncher item">
                    <i className="cloud icon"></i>
                </button>


                <div className="ui inverted test modal">
                    <div className="header">
                        Select a Photo
                    </div>
                    <div className="image content">
                        <div className="ui medium image">
                            <img src="/img/Rise.png"/>
                        </div>
                        <div className="description">
                            <div className="ui header">Default Profile Image</div>
                            <p>We've found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a>
                                image associated with your e-mail address.</p>

                            <p>Is it okay to use this photo?</p>
                        </div>
                    </div>
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

                {/*
                 // the sidebar icon is just not there
                 <factorMyButts />
                 <factorMeOutScotty />
                 */}


            </div>
        );
    }
});

/**
 * sadly factoring out seems to break the attach events :(
 */
const factorMyButts = React.createClass({
    componentDidMount(){
        console.log('mounting my butts');
        debugger;
    },
    render() {
        return (
            <div className="my butts">
                <button className="ui icon button smilelauncher item">
                    <i className="cloud icon"></i>
                </button>
            </div>
        );
    }
});

const factorMeOutScotty = React.createClass({
    componentDidMount(){
        console.log('mounting scotty');
        debugger;
        $('.smiley .test.modal')
            .modal('attach events', '.button.smilelauncher', 'show')
        ;
    },
    render() {
        return (
            <div className="ui inverted test modal">
                <div className="header">
                    Select a Photo
                </div>
                <div className="image content">
                    <div className="ui medium image">
                        <img src="/img/Rise.png"/>
                    </div>
                    <div className="description">
                        <div className="ui header">Default Profile Image</div>
                        <p>We've found the following <a href="https://www.gravatar.com" target="_blank">gravatar</a>
                            image associated with your e-mail address.</p>

                        <p>Is it okay to use this photo?</p>
                    </div>
                </div>
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

const SegHisto = React.createClass({
    componentDidMount(){
        console.log('mounting seghisto');
        //debugger;
        $('.histo .test.modal')
            .modal('attach events', '.histolaunch.item', 'show')
        ;
    },
    render() {
        return (
            <div className="histo">


                <a className="histolaunch item">
                    <i className="map icon"></i>
                </a>
                {/*
                 <button className="ui icon button histolaunch item">
                 <i className="map icon"></i>
                 </button>*/}


                <div className="ui inverted test modal">
                    <TestGroupedCheckboxes />
                    <actungButts />
                </div>


            </div>
        );
    }
});

const SegTopAttMenu = React.createClass({
    render() {
        return (

            <div className="ui top attached demo menu">
                <a className="item">
                    <i className="sidebar icon"></i>
                    Rise
                </a>

                <a className="ui red right corner label">v 0.1</a>
            </div>

        );
    }
});

const TestMapbox = React.createClass({


    render() {
        return (

            <div className="image">
                <img src="/img/Rise.png"/>
            </div>


        );
    }
});

ModalBox = React.createClass({
    componentDidMount(){

        // selector cache
        var
            $modalDlg = $('.ok.dude .ui.modal'),
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
                    {/*
                     <div className="actions">
                     <div className="ui black deny button">
                     Nope
                     </div>
                     <Link to={this.props.returnTo} className="ui positive right labeled icon button">
                     Yep, that's me
                     <i className="checkmark icon"></i>
                     </Link>

                     <Link to={"/"}>
                     back
                     </Link>
                     </div>*/}
                    <actungButts />
                </div>
            </div>
        );
    }
});