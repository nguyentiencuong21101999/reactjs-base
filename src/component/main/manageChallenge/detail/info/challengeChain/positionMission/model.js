class ModelView {
    challengeId = "";
    missions = "";


    get challengeId() { return this.challengeId; }
    set challengeId(val) { this.challengeId = val; }

    get missions() { return this.missions; }
    set missions(val) { this.missions = val; }


}

class ModelRequest {
    challengeId = "";
    missions = [];
    setChallengeId(val) { this.challengeId = val; return this; }

    setMissions(val) { this.missions = val; return this; }
}

export { ModelView, ModelRequest }