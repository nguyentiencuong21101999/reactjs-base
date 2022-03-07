class ModelView {

    challengeId;

    get challengeId() { return this.challengeId; }
    set challengeId(val) { this.challengeId = val; }


}

class ModelRequest {
    postId;

    setPostId(val) { this.postId = val; return this; }
}

export { ModelView, ModelRequest }