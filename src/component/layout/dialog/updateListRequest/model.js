/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    requestId;
    status;

    set requestId(val) {
        this.requestId = val
    }

    set status(val) {
        this.status = val
    }
}

class ModelRequest extends BaseModel {    
    
}

export {ModelView, ModelRequest}