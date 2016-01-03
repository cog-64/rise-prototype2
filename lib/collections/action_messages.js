/***
 * meta messages to be displayed.  Situations, actor messages, ideas, quick changes in mood etc are cherry picked
 * and placed into this bucket for simple dissemination to the actors
 *
 * Would be nice to add updates on crowd-averaged phenomenon when the change in avg is at a high enough rate.
 *
 * Also nice to count how many nodes up
 */

ActionMessages = new Mongo.Collection('actionMessages');

//schema
ActionMessages.schema = new SimpleSchema({
    actionId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: false, label: "action Id"}
    , actorId: {type: String, regEx: SimpleSchema.RegEx.Id, optional: true, label: "actor Id"} // originator, used to blackball trolls
    , category: {type: String,  label:"category"} // crowd emo, crowd int, sit int, etc.  Used to style the message.
    , isAdministrative: {type: Boolean, defaultValue: false,  label:"is Administrative"}
    , icon: {type: String, optional: true, label:"icon"}
    , msgBody: {type: String, optional: false, label:"message body"}
    , upVotes:  {type: Number,  optional: true, defaultValue: 0, label: "up Votes"}
    , downVotes: {type: Number,  optional: true, defaultValue: 0, label: "down Votes"}
    , createdDT: {type: Date, defaultValue: new Date(), optional: true, label: "Created Date"}
});

ActionMessages.attachSchema(ActionMessages.schema);

if (Meteor.isServer)
{
    ActionMessages._ensureIndex({ actionId: 1, createdDT: -1 });
}


Meteor.methods({

    "createActionMessage": (userId, messageDatum)  => {
        //debugger;
        check(Meteor.userId(), String);

        check(messageDatum, {
            actionId: String
            , actorId: String
            , category: String
            , msgBody: String
        });

        let {actorId, actionId} = messageDatum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {
            ActionMessageUtilities.createActionMessage(actorId, messageDatum)
        }

    },

    "voteUpMessage": (userId, messageDatum) => {

        check(Meteor.userId(), String);

        check(messageDatum, {
            messageId: String
            , actionId: String
            , actorId: String
        });

        let {actorId, actionId, messageId} = SOSDatum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {

            let  selector = {_id: messageId}
                , modifier = { $inc: {upVotes:1} }
            ;

            ActionMessages.update(selector, modifier);
        }


    },


    "voteDownMessage": (userId, messageDatum) => {

        check(Meteor.userId(), String);

        check(messageDatum, {
            messageId: String
            , actionId: String
            , actorId: String
        });

        let {actorId, actionId, messageId} = SOSDatum;
        let actor = ActorUtilities.getConfirmedActor(actorId, actionId, userId);

        if (actor) {

            let  selector = {_id: messageId}
                , modifier = { $inc: {downVotes:1} }
                ;

            ActionMessages.update(selector, modifier);
        }


    },

});

ActionMessageUtilities = {};

/***
 * implementation for writing the message doc
 * ** pretty sure ** that this will run inside a fiber when called from Meteor method on server
 * todo: confirm that behaviour
 * @param actorId
 * @param messageDatum
 */
ActionMessageUtilities.createActionMessage = (actorId, messageDatum) => {
    debugger;
    let { msgBody } = messageDatum;
    messageDatum.createdDT = new Date();
    ActionMessages.insert( messageDatum );
    ActorUtilities.updateLastMsg(actorId, msgBody );
};

ActionMessageUtilities.createStandardActionMessage = (featureObj, datumObj, categoryObj) => {
    let { actorId, actionId, type, description, isAdministrative } = datumObj;

    let feature = _.findWhere(featureObj, {key: type} )
        ,stdMsg =  (feature && feature.description) || ''
        , icon = (feature && feature.icon) || 'info circle'
        , userMsg = description || ''
        , msg = `${stdMsg}  \n ${userMsg}`

        ;

    let msgDatum = ActionMessageUtilities.createMsgDatum(actorId, actionId, msg, categoryObj, icon, !!isAdministrative ) ;

    ActionMessageUtilities.createActionMessage(actorId, msgDatum);
};


ActionMessageUtilities.createMsgDatum = (actorId, actionId, msg, category, icon, isAdministrative) => {
   let msgDatum = {};
    msgDatum.actorId = actorId;
    msgDatum.actionId = actionId;
    msgDatum.msgBody = msg;
    msgDatum.category = category.key;
    msgDatum.icon = icon
    msgDatum.isAdministrative = !!isAdministrative

    return msgDatum;

};
