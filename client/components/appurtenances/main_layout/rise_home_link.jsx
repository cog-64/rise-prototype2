const { Link } = ReactRouter;
RiseHomeLink = React.createClass({



    render() {
        return (

                <Link to="/" className="ui big black animated fade button">
                    <div className="hidden content">Rise!</div>
                    <div className="visible content">
                        <i className="ui huge green flag icon"/>
                    </div>


                </Link>

        );
    }
});