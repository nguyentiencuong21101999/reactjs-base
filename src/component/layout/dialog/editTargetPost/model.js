/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    postId;
    target;

    set target(val) {
        this.target = val
    }

    set postId(val) {
        this.postId = val
    }
}

class ModelRequest extends BaseModel {    
    postId;
    target;
    
    setPostId(val) { this.postId = val; return this; }
    
    setTarget(val) { this.target = val; return this; }
}

export {ModelView, ModelRequest}