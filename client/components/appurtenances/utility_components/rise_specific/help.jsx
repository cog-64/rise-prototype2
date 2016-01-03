/****
 * sign in
 * about
 * help
 * view in radius
 * create action
 *
 */

/***
 * some basic instructions in a modal
 */
RiseHelp = React.createClass({

    componentDidMount() {

        IntercomponentComs.enableRightMenu(false);
        IntercomponentComs.enableLeftMenu(false);

    },

    render() {
        return (
            <div className="actor mood">

                <button className="ui big icon button help item">
                    <i className="huge help icon"></i>
                    Help
                </button>
            </div>
        );
    }
});



