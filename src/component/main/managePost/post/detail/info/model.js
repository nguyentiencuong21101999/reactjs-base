class ModelView {
    // detailPost={};
    // targetPost=[];

    // get targetPost() { return this.targetPost; }
    // set targetPost(val) { this.targetPost = val; }

    // get detailPost() { return this.detailPost; }
    // set detailPost(val) { this.detailPost = val; }
}

class ModelRequest{
    postId;

    setPostId(val) { this.postId = val; return this; }
}

export { ModelView, ModelRequest }