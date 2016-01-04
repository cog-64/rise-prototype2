/***
 * site the code nicely in the modal
 */

CreateQRCode = React.createClass({

    propTypes: {
        actionURI: React.PropTypes.string.isRequired
    },


    render() {
        return (
            <div className="ui fluid grid container ">
                <div className="ui center aligned column">

                    <div className="ui floating info message">
                        <h1 className="ui header">
                            Let others join the action.
                        </h1>

                        <div className="ui horizontal divider">
                        </div>

                        <h3 className="ui header">
                            Scanning this QR Code allows any web-enabled client to
                            connect to this action.
                        </h3>
                    </div>


                <div className="ui horizontal divider">
                </div>
                        <GenerateQRCode actionURI={this.props.actionURI}/>
                    </div>

            </div>
        );
    }
});