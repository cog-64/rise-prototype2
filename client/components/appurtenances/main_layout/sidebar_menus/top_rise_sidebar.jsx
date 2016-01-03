
RiseTopSidebar = React.createClass({

    componentDidMount() {
        console.log("mounted top sidebar");

    },



    render() {
        return (
            <div id="top-rise-sidebar" className="ui inverted labeled icon top sidebar ">

                    <MenuActions menu="top" orientation="horizontal"/>

            </div>
        );
    }
});