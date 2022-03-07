/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    challengeId;


    set challengeId(val) {
        this.challengeId = val
    }
}

class ModelRequest extends BaseModel {
    challengeId;

    setChallengeId(val) { this.challengeId = val; return this; }
}

export { ModelView, ModelRequest }