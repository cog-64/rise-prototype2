/***
 * mutates the dom, even with detachable set false,
 * which causes react to react badly...
 */

const { Link } = ReactRouter;
SemanticModal = React.createClass({
    PropTypes:{
        actionId: React.PropTypes.string.isRequired
        , actorId:  React.PropTypes.string.isRequired
        , returnTo: React.PropTypes.string.isRequired
    },



    componentDidMount(){
        console.log('mounting modal');
        //debugger;

        // selector cache.
        // hardwired in selector path, so kinda tightly coupled for now.  todo: fix,
        let $MoodModal = $('.crowd-actions.modal')
            ;

        //debugger;
        // the modal is still fucking detaching!!
        // this causes react to throw
        $MoodModal.modal({detachable: false})
            .modal({
                onDeny: ()=> {
                    console.log('denied');
                    return false;
                }
                , onApprove: ()=> {
                    console.log('approved')
                }
                , closable: true //no x-out: force a choice
                // , transition: 'fly top'
            })
            .modal('show')
        ;


        ;

    },

    render() {
        debugger;
        let returnTo = this.props.returnTo;
        return (
            <div className="crowd-actions ui inverted options modal">
                <p><Link to={returnTo}>Back</Link></p>
                <span> action is {this.props.actionId} </span>
                <span> actor is {this.props.actorId} </span>
                {this.props.children}
            </div>
        )
    }
})