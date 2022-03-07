/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import BaseModel from 'base/model'

class ModelView {
    menuSettingId=""
    menuSettingName="";
   

    set menuSettingName(val) {
        this.menuSettingName = val
    }
    set menuSettingId(val) {
        this.menuSettingId = val
    }


   
}

class ModelRequest extends BaseModel {    
    
}

export {ModelView, ModelRequest}