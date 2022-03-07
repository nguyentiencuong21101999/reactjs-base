/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    radio = ""
    challengeId = "";
    userId = "";
    rank = "";
    postId = "";

    set radio(val) {
        this.radio = val
    }
    set challengeId(val) {
        this.challengeId = val
    }

    set userId(val) {
        this.userId = val
    }
    set rank(val) {
        this.rank = val
    }
    set postId(val) {
        this.postId = val
    }
}

class ModelRequest extends BaseModel {
    challengeId;
    userId;
    rank;
    postId

    setChallengeId(val) { this.challengeId = val; return this; }

    setUserId(val) { this.userId = val; return this; }

    setRank(val) { this.rank = val; return this; }

    setPostId(val) { this.postId = val; return this }


}

export { ModelView, ModelRequest }