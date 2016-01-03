RiseRightSidebar = React.createClass({

    componentDidMount() {
       console.log("mounted main sidebar");

    },

    render() {
        return (
            <div id="right-rise-sidebar" className="ui labeled icon right inline vertical sidebar ">

                <MenuActions menu="right" orientation="vertical"/>

            </div>
        );
    }
});