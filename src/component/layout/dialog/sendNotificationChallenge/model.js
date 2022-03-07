/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    challengeId = '';
    title = "";
    content = "";
    type =" ";

    set challengeId(val) {
        this.challengeId = val
    }

    set title(val) {
        this.title = val
    }
    set content(val) {
        this.content = val
    }
    set type (val) {
        this.type = val
    }

}

class ModelRequest extends BaseModel {



}

export { ModelView, ModelRequest }