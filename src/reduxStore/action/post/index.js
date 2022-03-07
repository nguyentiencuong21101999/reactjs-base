import BaseAction from 'base/action'
import Config from 'config'
class PostAction extends BaseAction {

  static getListAdmin(key, payload) {
    try {
      this.logger.info(`PostAction execute getListAdmin`)
      this.logger.debug(`PostAction execute getListAdmin receive key`, key)
      this.logger.debug(`PostAction execute getListAdmin receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction getListAdmin',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.admin.post.list}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`PostAction execute getListAdmin ${e.toString()}`)
    }
  }

  static getListUser(key, payload) {
    try {
      this.logger.info(`PostAction execute getListUser`)
      this.logger.debug(`PostAction execute getListUser receive key`, key)
      this.logger.debug(`PostAction execute getListUser receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction getListUser',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.admin.post.list}`,
          data: payload,
        },
      }
    } catch (e) {
      this.logger.error(`PostAction execute getListUser ${e.toString()}`)
    }
  }

  static update(key, payload) {
    try {
      this.logger.info(`PostAction execute update`)
      this.logger.debug(`PostAction execute update receive key`, key)
      this.logger.debug(`PostAction execute update receive payload`, payload)

      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction update',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.admin.post._}`,
          data: payload,
        }
      }

    } catch (e) {
      this.logger.error(`PostAction execute update ${e.toString()}`)
    }
  }

  static updateTarget(key, payload) {
    try {
      this.logger.info(`PostAction execute updateTarget`)
      this.logger.debug(`PostAction execute updateTarget receive key`, key)
      this.logger.debug(`PostAction execute updateTarget receive payload`, payload)

      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction update',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.admin.post.target}`,
          data: payload,
        }
      }

    } catch (e) {
      this.logger.error(`PostAction execute updateTarget ${e.toString()}`)
    }
  }

  static create(key, payload) {
    try {
      this.logger.info(`PostAction execute create`)
      this.logger.debug(`PostAction execute create receive key`, key)
      this.logger.debug(`PostAction execute create receive payload`, payload)

      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction create',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.admin.post._}`,
          data: payload,
        }
      }

    } catch (e) {
      this.logger.error(`PostAction execute create ${e.toString()}`)
    }
  }

  static getDetailPost(key, payload) {
    try {
      this.logger.info(`PostAction execute getDetailPost`)
      this.logger.debug(`PostAction execute getDetailPost receive key`, key)
      this.logger.debug(`PostAction execute getDetailPost receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction getDetailPost',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.admin.post._}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`PostAction execute getDetailPost ${e.toString()}`)
    }
  }

  static getTargetPostByPostId(key, payload) {
    try {
      this.logger.info(`PostAction execute getTargetPostByPostId`)
      this.logger.debug(`PostAction execute getTargetPostByPostId receive key`, key)
      this.logger.debug(`PostAction execute getTargetPostByPostId receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction getTargetPostByPostId',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.admin.post.target}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`PostAction execute getTargetPostByPostId ${e.toString()}`)
    }
  }

  static approveAdminPost(key, payload){
    try{
      this.logger.info(`PostAction execute approveAdminPost`)
      this.logger.debug(`PostAction execute approveAdminPost receive key`, key)
      this.logger.debug(`PostAction execute approveAdminPost receive payload`, payload)

      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction approveAdminPost',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          url: `${this.api.admin.post._}`,
          data: payload,
        }
      }
      
    }catch(e){
      this.logger.error(`PostAction execute approveAdminPost ${e.toString()}`)
    }
  }
  static sendNotificationPost(key, payload){
    try{
      this.logger.info(`PostAction execute sendNotificationPost`)
      this.logger.debug(`PostAction execute sendNotificationPost receive key`, key)
      this.logger.debug(`PostAction execute sendNotificationPost receive payload`, payload)

      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction sendNotificationPost',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.post.sendNotificationPost}`,
          data: payload,
        }
      }
      
    }catch(e){
      this.logger.error(`PostAction execute sendNotificationPost ${e.toString()}`)
    }
  }
  static getListCategoryAndChallenge(key){
    try{
      this.logger.info(`PostAction execute getListCategoryAndChallenge`)
      this.logger.debug(`PostAction execute getListCategoryAndChallenge receive key`, key)

      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'PostAction getListCategoryAndChallenge',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.post.getListCategoryAndChallenge}`,
        }
      }
      
    }catch(e){
      this.logger.error(`PostAction execute getListCategoryAndChallenge ${e.toString()}`)
    }
  }
}

export default PostAction