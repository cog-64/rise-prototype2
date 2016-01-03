/***
 * generate the actual qr code for the action
 */
GenerateQRCode = React.createClass({

    PropTypes:{
        actionURI: React.PropTypes.string.isRequired
        , description: React.PropTypes.string
    },

    componentDidMount() {
        // let options = {};
        //options.render = 'div';
        //options.size = 500; // causes the image to be unreadable
        //options.text = this.props.actionURI;
        //options.label = this.props.description;

        let options = {
            "color": "#3a3"
            , "text": this.props.actionURI
            , "label":this.props.description
        }

      $('#qr-code').qrcode(options)

    },

    render() {
        return (<div id="qr-code" > </div>);
    }
});


