class ModelView {
    // challengeId = "";
    missionType = "";
    missionTitle = "";
    resultType = "";
    missionPoint = ""
    questions = [];
    action = [];
    goalWater = "";
    correctPoint = ""
    wrongPoint=""


    // get challengeId() { return this.challengeId; }
    // set challengeId(val) { this.challengeId = val; }

    get missionType() { return this.missionType; }
    set missionType(val) { this.missionType = val; }

    get missionTitle() { return this.missionTitle; }
    set missionTitle(val) { this.show = val; }

    get resultType() { return this.resultType; }
    set resultType(val) { this.resultType = val; }

    get missionPoint() { return this.missionPoint; }
    set missionPoint(val) { this.missionPoint = val; }

    get questions() { return this.questions; }
    set questions(val) { this.questions = val; }

    get action() { return this.action; }
    set action(val) { this.action = val; }

    get goalWater() { return this.goalWater; }
    set goalWater(val) { this.goalWater = val; }

}

class ModelRequestAction {
    challengeId;
    missionType;
    missionTitle;
    missionPoint;
    resultType;
    actions;


    setChallengeId(val) { this.challengeId = val; return this; }

    setMissionType(val) { this.missionType = val; return this; }

    setMissionPoint(val) { this.missionPoint = val; return this; }

    setMissionTitle(val) { this.missionTitle = val; return this; }

    setResultType(val) { this.resultType = val; return this; }

    setActions(val) { this.actions = val; return this; }
}

class ModelRequestWater {
    challengeId;
    missionType;
    missionPoint;
    missionTitle;
    resultType;
    goalWater;


    setChallengeId(val) { this.challengeId = val; return this; }

    setMissionType(val) { this.missionType = val; return this; }

    setMissionPoint(val) { this.missionPoint = val; return this; }

    setMissionTitle(val) { this.missionTitle = val; return this; }

    setResultType(val) { this.resultType = val; return this; }

    setGoalWater(val) { this.goalWater = val; return this; }
}
class ModelRequestQuestion {
    challengeId;
    missionType;
    missionTitle;
    resultType;
    questions;
    correctPoint;
    wrongPoint;


    setChallengeId(val) { this.challengeId = val; return this; }

    setMissionType(val) { this.missionType = val; return this; }

    setMissionTitle(val) { this.missionTitle = val; return this; }

    setResultType(val) { this.resultType = val; return this; }

    setQuestions(val) { this.questions = val; return this; }

    setCorrectPoint(val) { this.correctPoint = val; return this; }

    setWrongPoint(val) { this.wrongPoint = val; return this; }
}
class ModelRequestClipOrPicture {
    challengeId;
    missionType;
    missionPoint;
    missionTitle;
    resultType;


    setChallengeId(val) { this.challengeId = val; return this; }

    setMissionType(val) { this.missionType = val; return this; }

    setMissionPoint(val) { this.missionPoint = val; return this; }

    setMissionTitle(val) { this.missionTitle = val; return this; }

    setResultType(val) { this.resultType = val; return this; }
}
export { ModelView, ModelRequestAction, ModelRequestWater, ModelRequestQuestion, ModelRequestClipOrPicture }