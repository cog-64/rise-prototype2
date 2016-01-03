const {
    Link // the primary mechanism of navigation; link will render a fully accessible anchor with a proper href
    } = ReactRouter


RiseVersionLabel = React.createClass({



    render() {
        return (

                <Link to="https://github.com/cog-64/Rise" className="ui large red left corner label">
                    v 0.1
                </Link>

        );
    }
});