/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    configId;
    value;

    set configId(val) {
        this.configId = val
    }

    set value(val) {
        this.value = val
    }
}

class ModelRequest extends BaseModel {    
    
}

export {ModelView, ModelRequest}