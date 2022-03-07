/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    missionId;


    set missionId(val) {
        this.missionId = val
    }
}

class ModelRequest extends BaseModel {
    missionId;

    setMissionId(val) { this.missionId = val; return this; }
}

export { ModelView, ModelRequest }