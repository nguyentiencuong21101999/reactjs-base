class ModelView {
    userId;
    challengeId;

    get userId() { return this.userId; }
    set userId(val) { this.userId = val; }

    get challengeId() { return this.challengeId; }
    set challengeId(val) { this.challengeId = val; }
}

class ModelRequest {

}

export { ModelView, ModelRequest }