/***
 * Things that are effectively standard keys in mongo that would
 * be represented by lov_id's in a relational world
 * @type {{}}
 */
RiseSharedConstants = {};
RiseSharedConstants.Emotions = {};
RiseSharedConstants.Intelligence = {};
RiseSharedConstants.Situations = {};
RiseSharedConstants.SOS = {};
RiseSharedConstants.Propositions = {};
RiseSharedConstants.ActionMessages = {};
RiseSharedConstants.ActionMessages.Categories = {};

// singleton items (sensibly reduceable to one for the whole crowd)
RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_WELLBEING = "SUBJECTIVE_CROWD_WELLBEING";  // good cheer, happiness, stuff like that
RiseSharedConstants.Emotions.SUBJECTIVE_CROWD_MOTIVATION = "SUBJECTIVE_CROWD_MOTIVATION" // Enthusiasm, courage, traits like that
RiseSharedConstants.Emotions.SUBJECTIVE_FOREBODING = "SUBJECTIVE_FOREBODING" // A sense of impending stress/negative event

RiseSharedConstants.Intelligence.SUBJECTIVE_CROWD_SIZE_ESTIMATE = "SUBJECTIVE_CROWD_SIZE_ESTIMATE" // Guess the size of the crowd



// maybe implement in mongo
//situations
RiseSharedConstants.Situations.UNIFORMED_POLICE = {key:'UNIFORMED_POLICE', icon:'protect', colour:'blue', description:'uniformed police.'};
RiseSharedConstants.Situations.MILITARIZED_POLICE = {key:'MILITARIZED_POLICE', icon:'bomb', colour:'blue', description:'militarized (riot) police.'};
RiseSharedConstants.Situations.AGENT_PROVOCATEUR = {key:'AGENT_PROVOCATEUR', icon:'spy', colour:'blue', description:'agent provocateur.'};
RiseSharedConstants.Situations.POLICE_VIOLENCE = {key:'POLICE_VIOLENCE', icon:'fire', colour:'blue', description:'police violence.'};
RiseSharedConstants.Situations.MEDIA = {key:'MEDIA', icon:'camera', colour:'black', description:'media.'};
RiseSharedConstants.Situations.CROWD_VIOLENCE = {key:'CROWD_VIOLENCE', icon:'fire', colour:'red', description:'crowd violence.'};
RiseSharedConstants.Situations.MEDICAL_EMERGENCY = {key:'MEDICAL_EMERGENCY', icon:'emergency', colour:'red', description:'medical emergency.'};

// sos
RiseSharedConstants.SOS.DETAINED = {key:'DETAINED', icon:'legal', colour:'blue', description:'detained by police.'};
RiseSharedConstants.SOS.INJURED = {key:'INJURED', icon:'first aid', colour:'red', description:'need medical assistance.'};
RiseSharedConstants.SOS.ATTACKED = {key:'ATTACKED', icon:'lightning', colour:'yellow', description:'under attack.'};

// propositions
RiseSharedConstants.Propositions.MOVE = {key:'MOVE', icon:'marker', colour:'green', description:' move to location proposal:'};
RiseSharedConstants.Propositions.GENERAL = {key:'GENERAL', icon:'idea', colour:'blue', description:' wild idea proposal:'};
RiseSharedConstants.Propositions.CHANT = {key:'CHANT', icon:'announcement', colour:'orange', description:' group chant proposal:'};

// action messages
RiseSharedConstants.ActionMessages.Categories.EMOTION = {key:'EMOTION', icon:'heart', colour:'red', description:'the crowd feels that...'};
RiseSharedConstants.ActionMessages.Categories.INTELLIGENCE = {key:'INTELLIGENCE', icon:'diamond', colour:'blue', description:'the crowd guesses that...'};
RiseSharedConstants.ActionMessages.Categories.ENVIRONMENT = {key:'ENVIRONMENT', icon:'world', colour:'green', description:'the crowd observes that...'};
RiseSharedConstants.ActionMessages.Categories.EVOLUTION = {key:'EVOLUTION', icon:'rocket', colour:'orange', description:'the action is evolving by...'};
RiseSharedConstants.ActionMessages.Categories.EMERGENCY = {key:'EMERGENCY', icon:'warning sign', colour:'yellow', description:'the actor has an emergency...'};
RiseSharedConstants.ActionMessages.Categories.ACTOR = {key:'ACTOR', icon:'child', colour:'grey', description:'an actor is telling us...'};
RiseSharedConstants.ActionMessages.Categories.ORGANIZER = {key:'ORGANIZER', icon:'flag', colour:'yellow', description:'the organizers are telling us...'};



