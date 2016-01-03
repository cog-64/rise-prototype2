const {
    Link // the primary mechanism of navigation; link will render a fully accessible anchor with a proper href
    } = ReactRouter


ForkLabel = React.createClass({



    render() {
        return (

            <Link to="https://github.com/cog-64/Rise" className="ui large green right corner label">
                Fork on Github
            </Link>

        );
    }
});