RiseLeftSidebar = React.createClass({

    componentDidMount() {
        console.log("mounted left sidebar");

    },

    render() {
        return (
            <div id="left-rise-sidebar" className="ui inverted labeled icon left inline vertical sidebar ">

                <MenuActions menu="left" orientation="vertical"/>

            </div>
        );
    }
});