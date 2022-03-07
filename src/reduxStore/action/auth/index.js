/**
 * Created By Nguyen Cong Thanh on 07/25/2020 14:15.
 *
 * Copyright intelIn 2020.
 */

 import BaseAction from 'base/action'

 class AuthAction extends BaseAction {
 
   static login(key, payload) {
     try {
       this.logger.info(`AuthAction execute login`)
       this.logger.debug(`AuthAction execute login receive key`, key)
       this.logger.debug(`AuthAction execute login receive payload`, payload)
       return {
         type: this.action.TYPE.COMMON.REQUEST,
         key: key,
         name: 'AuthAction login',
         options: {
           method: 'POST',
           headers: {
            'content-type': 'application/json',
           },
           url: `${this.api.login}`,
           data: payload,
         },
       }
     } catch (e) {
       this.logger.error(`AuthAction execute login ${e.toString()}`)
     }
   }

   static logout(key) {
    try {
      this.logger.info(`AuthAction execute logout`)
      this.logger.debug(`AuthAction execute logout receive key`, key)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'AuthAction logout',
        options: {
          method: 'DELETE',
          headers: {
           'content-type': 'application/json',
           'token': this.getToken(),
          },
          url: `${this.api.login}`,
          data: {},
        },
      }
    } catch (e) {
      this.logger.error(`AuthAction execute logout ${e.toString()}`)
    }
  }

  static updateProfile(key, payload){
    try{
      this.logger.info(`AdminAction execute getList`)
      this.logger.debug(`AdminAction execute getList receive key`, key)
      this.logger.debug(`AdminAction execute getList receive payload`, payload)

      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'AdminAction updateProfile',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.profile}`,
          data: payload,
        }
      }
      
    }catch(e){
      this.logger.error(`AdminAction execute getList ${e.toString()}`)
    }
  }

 }
 
 export default AuthAction
 