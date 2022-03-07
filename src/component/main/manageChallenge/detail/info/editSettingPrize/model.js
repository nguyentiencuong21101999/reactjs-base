class ModelView {
    title = "";
    rank = "";
    point = "";
    reward = "";


    get title() { return this.title; }
    set title(val) { this.title = val; }

    get rank() { return this.rank; }
    set rank(val) { this.rank = val; }

    get point() { return this.point; }
    set point(val) { this.point = val; }

    get reward() { return this.reward; }
    set reward(val) { this.reward = val; }

}

class ModelRequest {
    challengeId;
    rewardId;
    title;
    rank;
    point;
    reward;

    setChallengeId(val){this.challengeId = val; return this}

    setRewardId(val){this.rewardId = val; return this}

    setTitle(val) { this.title = val; return this; }

    setRank(val) { this.rank = val; return this; }

    setPoint(val) { this.point = val; return this; }

    setReward(val) { this.reward = val; return this; }

}

export { ModelView, ModelRequest }