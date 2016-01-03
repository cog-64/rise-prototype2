MenuButton  = React.createClass({



render() {
    return (
        <div className="ui fluid container">
            <div id="main-menu-button" className="floated right item">
                <div className="ui big black animated button">
                    <i className="huge inverted center aligned sidebar icon"></i>
                </div>
                Menu
            </div>
        </div>
    );
}
});
StickyMenuButton = React.createClass({
  render() {
    return (

        <button id="main-menu-button" className="ui black big right attached fixed button">
            <i className="icons">
                <i className="huge inverted green star icon"></i>
                <i className="black sidebar icon"></i>
            </i>
            Menu
        </button>

    );
  }
});

// this works, but is left
//<div id="main-menu-button" className="floated right item">
//    <div className="ui big black animated button">
//        <i className="huge inverted center aligned sidebar icon"></i>
//    </div>
//    Menu
//</div>




//    render() {
//        return (
//            <button id="main-menu-button" className="ui big black right floated button ">
//                <i className="sidebar icon"></i>
//                Menu
//            </button>
//        );
//    }
//});
//
// <div id="main-menu-button" className="floated right item">
//<div className="ui big black animated button">
//    <i className="huge inverted center aligned sidebar icon"></i>
//</div>
//Menu
//</div>