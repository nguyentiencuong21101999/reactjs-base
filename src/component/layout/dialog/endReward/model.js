/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

 import BaseModel from 'base/model'

 class ModelView {
     proId;
     status;
     set proId(val) {
         this.proId = val
     }
 
   
 }
 
 class ModelRequest extends BaseModel {
 }
 
 export { ModelView, ModelRequest }