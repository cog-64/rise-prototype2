
const {
    Link
    } = ReactRouter


/***
 * todo: this isn't meant for production; just an expedient for prototyping
 */

Simulations = React.createClass({

    componentDidMount() {
        console.log("mounted top sidebar");

    },

    mixins: [ReactMeteorData],

    getMeteorData() {
        console.log('in the ctx mixin for MenuActions');
        let actionId =  Session.get('currentActionId')
            , actorId = Session.get('currentActorId')
            ;


        return {
            currentActionId:actionId
            , selfActorId: actorId


        };
    },




    render() {

        let getActionFeatureSimulations = () => {
            if (!!this.data.currentActionId) {
                return (
                    <div id="action-sims" >

                        <CreateNewActor actionId={this.data.currentActionId}/>

                        <SimulateMotion actionId={this.data.currentActionId}/>

                        <SimulateSituations actionId={this.data.currentActionId}/>

                        <SimulateSOS actionId={this.data.currentActionId}/>

                        <SimulateMessage actionId={this.data.currentActionId}/>

                    </div>
                )
            }
        }

        return (
            <div id="simulations" className="ui vertical container segment">

                <div className="ui huge header">
                    Simulations for testing and demonstration purposes
                </div>

                <LoadSeededAction />

                <CreateSimpleAction />

                {getActionFeatureSimulations()}

            </div>
        );
    }
});


const LoadSeededAction = React.createClass({

    createAction() {
        let name = ActorUtilities.getActorHandle(this.props.actorId)
        Meteor.call("generateSeedData" )
    },

    render() {
        return (
            <div id="load-seed-data" className="ui top attached inverted olive segment">
                    <button className="ui positive button" onClick={this.createAction} >
                        load seed data
                    </button>
            </div>
        );
    }
});

const CreateSimpleAction = React.createClass({

    getInitialState () {
        return {
            actionName: 'simple action'
        };
    },

    setActionName(selector) {
        debugger;
        if ( !!(selector) ) {
            let txtInput = $(selector)
                , msg = txtInput.val();
            this.setState({
                actionName: msg
            });
        }


    },

    createAction(name) {
        debugger;
        console.log(`create action named ${name}`);
        Meteor.call("createSimpleAction", name );
    },

    render() {
        return (
            <div className="ui  top attached inverted teal segment">
                <form className="ui inverted form">
                    <div className="field">
                        <label>Give a name to this action</label>
                    <input type="text" id="simple-action-input" type="text" placeholder="enter a name for this action"
                              onBlur={ this.setActionName.bind(null, '#simple-action-input') } />
                    </div>

                    <button className="ui positive button" onClick={this.createAction.bind(null,  this.state.actionName )} >
                        create simple action
                    </button>
                </form>


            </div>
        );
    }
});


const CreateNewActor = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
    },


    createActor() {
        Meteor.call("createRandomActor", this.props.actionId )
    },

    render() {
        return (
            <div id="simple-action" className="ui  top attached inverted pink segment">
                    <button className="ui  positive button" onClick={this.createActor} >
                        create fake actor
                    </button>

                </div>

        );
    }
});

const SimulateMotion = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
    },



    walkActors() {
        ClientSimulations.startActorMotion( 0.00001, 500, 60 )
    },

    render() {
        return (
            <div id="simulated-motion" className="ui top attached inverted brown segment">
                <button className="ui  positive button" onClick={this.walkActors} >
                    60 second actor walk
                </button>
            </div>
        );
    }
});


const SimulateSituations = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
    },

    createSituation() {
        Meteor.call("createRandomSituation", this.props.actionId )
    },

    render() {
        return (

                <div id="situation-simulation" className="ui top attached inverted purple segment">
                    <button className="ui  positive button" onClick={this.createSituation} >
                        create fake situation
                    </button>

                </div>

        );
    }
});


const SimulateSOS = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
    },

    createSOS() {
        Meteor.call("createRandomSOS", this.props.actionId )
    },

    render() {
        return (
            <div id="sos-simulation" className="ui  top attached inverted yellow segment">
                <button className="ui  positive button" onClick={this.createSOS} >
                    create fake SOS
                </button>

            </div>
        );
    }
});


const SimulateMessage = React.createClass({
    propTypes: {
        actionId: React.PropTypes.string.isRequired
    },

    createSOS() {
        Meteor.call("createRandomMessage", this.props.actionId )
    },

    render() {
        return (
            <div id="sos-simulation" className="ui  top attached inverted orange segment">
                <button className="ui  positive button" onClick={this.createSOS} >
                    create fake message
                </button>

            </div>
        );
    }
});
