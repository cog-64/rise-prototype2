/**
 * note that we want to export the component (so don't limit component scope with const)
 */
NotFound = React.createClass({
    render() {
        return (
            <div className="page not-found">
                <nav>
                    <MenuOpenToggle />
                </nav>
                <div className="content-scrollable">
                    <div className="wrapper-message">
                        <div className="title-message">Page not found</div>
                    </div>
                </div>
            </div>
        );
    }
});
