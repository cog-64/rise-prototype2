//
//Meteor.publish("currentCrowdMood", function(actionId) {
//
//    check(actionId, String);
//    check(this.userId, String);
//
//    // maybe have a custom attribute that confirms that they're able to look at stats
//    // want actors to have submitted their own estimate before consume the group total
//    // so as to avoid information cascaade biasing
//    //todo: confirm this behaviour
//    // es6 arrow functions should manage thisObj, so shouldn't need to
//    // explicitly cache this within the closure
//
//
//    /***
//     * useful docs:
//     * disco me, p259
//     * http://docs.meteor.com/#/full/meteor_publish
//     *
//     */
//
//
//
//    // prevent the initial messages from being propagated to the client
//    // while we are running up the initial stuff
//    let sub = this
//        , initalizing = true
//        ;
//
//    // a function to manage the stats in live time as they come in
//    let calculateCrowdMoodStatistics = ()=>{
//        rtn = {};
//        // average the subjectively assessed mood of the crowd
//
//        return rtn;
//    };
//
//    let handle = CrowdEstimates.find({actionId: actionId}).observeChanges({
//        added:(id, fields)=>{
//            let mood = this.calculateCrowdMoodStatistics();
//
//            // clients will reactively monitor their mood collection to emit stats to the ui
//            sub.changed("mood", actionId, {mood:mood})
//        },
//        changed:(id, fields)=>{
//            // no imp
//            console.log('mood changed')
//        },
//        removed:(id)=>{
//            // no imp
//            console.log('mood remove')
//        }
//
//    });
//
//    initalizing = false;
//
//    sub.ready();
//
//    sub.onStop(
//        ()=>{ handle.stop(); }
//    );
//
//});