
WhatNextButton = React.createClass({

    propTypes: {
        actionId: React.PropTypes.string
        , colour: React.PropTypes.string.isRequired
    },


    render() {

        return (
            <StandardActionMenuButton actionId={this.props.actionId}
                                      route="whatnext"
                                      buttonColour={this.props.colour}
                                      iconColour="black"
                                      iconName="puzzle"
                                      linkText="Vote Next Move"
            />


        );
    }
});



