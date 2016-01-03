
LoadingMessage = React.createClass({
    PropTypes: {
        message: React.PropTypes.string.isRequired
    },

    styles: {
        position: 'fixed',
        top: '0%',
        right: '0%',
        bottom: '0%',
        left: '0%',
        padding: 0,
        boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
        overflow: 'auto',
        background: '#777'
    },
    render() {
        return (

            <div className="ui segment" style={this.styles}>
                <div className="ui active inverted dimmer">
                    <div className="ui large text loader">
                        <div className="ui large header">
                            {this.props.message}
                        </div>

                    </div>
                </div>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </div>

        );
    }
});