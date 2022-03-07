/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    challengeId;
    userId;
    status;
    missionId;

    set challengeId(val) {
        this.challengeId = val
    }

    set userId(val) {
        this.userId = val
    }
    set missionId(val) {
        this.missionId = val
    }
    set status(val) {
        this.status = val
    }
}

class ModelRequest extends BaseModel {
    challengeId;
    userId;
    status;

    setChallengeId(val) { this.challengeId = val; return this; }

    setUserId(val) { this.userId = val; return this; }

    setStatus(val) { this.status = val; return this; }


}

export { ModelView, ModelRequest }