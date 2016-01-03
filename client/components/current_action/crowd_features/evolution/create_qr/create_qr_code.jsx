/***
 * site the code nicely in the modal
 */

CreateQRCode = React.createClass({

    propTypes: {
        actionURI: React.PropTypes.string.isRequired
    },


    render() {
        return (
            <div className="ui container grid">
                <div claaName="row">


                    <div className="ui floating info message">
                        <h1 className="ui left aligned header">
                            Let others join the action.
                        </h1>

                        <div className="ui horizontal divider">
                        </div>

                        <h2 className="ui left aligned header">
                            To keep things local and immediate, RISE uses
                            QR codes to propagate the action.

                            Scanning this QR Code allows any web-enabled client to
                            connect in and join this action.

                        </h2>
                    </div>
                </div>

                <div className="ui horizontal divider">
                </div>

                <div className="row">
                    <div className="ui center aligned column">
                        <GenerateQRCode actionURI={this.props.actionURI}/>
                    </div>
                </div>
            </div>
        );
    }
});