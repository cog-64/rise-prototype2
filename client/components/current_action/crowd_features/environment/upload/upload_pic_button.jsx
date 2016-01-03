
UploadPicButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },

     render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="uploadpic"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="camera retro"
                                      linkText="Upload Picture"
            />


        );
    }
});