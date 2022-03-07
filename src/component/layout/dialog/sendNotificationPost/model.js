/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    postId="";
    title="";
    content="";
    target="";

    set postId(val) {
        this.postId = val
    }

    set title(val) {
        this.title = val
    }
    set content(val) {
        this.content = val
    }
    set target (val) {
        this.target = val
    }

}

class ModelRequest extends BaseModel {



}

export { ModelView, ModelRequest }