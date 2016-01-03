
RiseContentPane = React.createClass({
    componentWillMount() {
        //debugger;
    },

    render() {
        return (

            <div>
                {/* render the dashboard or the component that they come in at (specific action*/}
                {this.props.children}

            </div>
        );
    }
});