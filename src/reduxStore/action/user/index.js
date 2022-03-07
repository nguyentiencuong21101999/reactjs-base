import BaseAction from 'base/action'
class UserAction extends BaseAction  {

    static getListInfo(key, payload){
        try {
            this.logger.info(`UserAction execute getListInfo`)
            this.logger.debug(`UserAction execute getListInfo receive key`, key)
            this.logger.debug(`UserAction execute getListInfo receive payload`, payload)
            return {
              type: this.action.TYPE.COMMON.REQUEST,
              key: key,
              name: 'UserAction getListInfo',
              options: {
                method: 'POST',
                headers: {
                'content-type': 'application/json',
                'token': this.getToken(),
                },
                url: `${this.api.user.list}`,
                data: payload,
              },
            }
          } catch (e) {
            this.logger.error(`UserAction execute getListInfo ${e.toString()}`)
          }
    }  

    static getListSocial(key, payload){
        try {
            this.logger.info(`UserAction execute getListSocial`)
            this.logger.debug(`UserAction execute getListSocial receive key`, key)
            this.logger.debug(`UserAction execute getListSocial receive payload`, payload)
            return {
              type: this.action.TYPE.COMMON.REQUEST,
              key: key,
              name: 'UserAction getListSocial',
              options: {
                method: 'PUT',
                headers: {
                 'content-type': 'application/json',
                 'token': this.getToken(),
                },
                url: `${this.api.user.list}`,
                data: payload,
              },
            }
          } catch (e) {
            this.logger.error(`UserAction execute getListSocial ${e.toString()}`)
          }
    }  

    static banAccount(key, payload){
      try {
          this.logger.info(`UserAction execute banAccount`)
          this.logger.debug(`UserAction execute banAccount receive key`, key)
          this.logger.debug(`UserAction execute banAccount receive payload`, payload)
          return {
            type: this.action.TYPE.COMMON.REQUEST,
            key: key,
            name: 'UserAction banAccount',
            options: {
              method: 'POST',
              headers: {
               'content-type': 'application/json',
               'token': this.getToken(),
              },
              url: `${this.api.user.banAccount}`,
              data: payload,
            },
          }
        } catch (e) {
          this.logger.error(`UserAction execute banAccount ${e.toString()}`)
        }
    }

    static unbanAccount(key, payload){
      try {
          this.logger.info(`UserAction execute unbanAccount`)
          this.logger.debug(`UserAction execute unbanAccount receive key`, key)
          this.logger.debug(`UserAction execute unbanAccount receive payload`, payload)
          return {
            type: this.action.TYPE.COMMON.REQUEST,
            key: key,
            name: 'UserAction unbanAccount',
            options: {
              method: 'POST',
              headers: {
               'content-type': 'application/json',
               'token': this.getToken(),
              },
              url: `${this.api.user.unbanAccount}`,
              data: payload,
            },
          }
        } catch (e) {
          this.logger.error(`UserAction execute unbanAccount ${e.toString()}`)
        }
    }

}

export default UserAction