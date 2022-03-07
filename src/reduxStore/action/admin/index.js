import BaseAction from 'base/action'
class AdminAction extends BaseAction  {

    static getList(key, payload){
        try {
            this.logger.info(`AdminAction execute getList`)
            this.logger.debug(`AdminAction execute getList receive key`, key)
            this.logger.debug(`AdminAction execute getList receive payload`, payload)
            return {
              type: this.action.TYPE.COMMON.REQUEST,
              key: key,
              name: 'AdminAction getList',
              options: {
                method: 'POST',
                headers: {
                 'content-type': 'application/json',
                 'token': this.getToken(),
                },
                url: `${this.api.admin.list}`,
                data: payload,
              },
            }
          } catch (e) {
            this.logger.error(`AdminAction execute getList ${e.toString()}`)
          }
    }

    static getListNotActive(key, payload){
        try {
            this.logger.info(`AdminAction execute getListNotActive`)
            this.logger.debug(`AdminAction execute getListNotActive receive key`, key)
            this.logger.debug(`AdminAction execute getListNotActive receive payload`, payload)
            return {
              type: this.action.TYPE.COMMON.REQUEST,
              key: key,
              name: 'AdminAction getListNotActive',
              options: {
                method: 'PUT',
                headers: {
                 'content-type': 'application/json',
                 'token': this.getToken(),
                },
                url: `${this.api.admin.list}`,
                data: payload,
              },
            }
          } catch (e) {
            this.logger.error(`AdminAction execute getList ${e.toString()}`)
          }
    }

    static update(key, payload){
      try{
        this.logger.info(`AdminAction execute getList`)
        this.logger.debug(`AdminAction execute getList receive key`, key)
        this.logger.debug(`AdminAction execute getList receive payload`, payload)

        return {
          type: this.action.TYPE.COMMON.REQUEST,
          key: key,
          name: 'AdminAction update',
          options: {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              'token': this.getToken(),
            },
            url: `${this.api.admin.info}`,
            data: payload,
          }
        }
        
      }catch(e){
        this.logger.error(`AdminAction execute getList ${e.toString()}`)
      }
    }

    static create(key, payload){
      try{
        this.logger.info(`AdminAction execute getList`)
        this.logger.debug(`AdminAction execute getList receive key`, key)
        this.logger.debug(`AdminAction execute getList receive payload`, payload)

        return {
          type: this.action.TYPE.COMMON.REQUEST,
          key: key,
          name: 'AdminAction create',
          options: {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              'token': this.getToken(),
            },
            url: `${this.api.admin.create}`,
            data: payload,
          }
        }
        
      }catch(e){
        this.logger.error(`AdminAction execute getList ${e.toString()}`)
      }
    }

    static banAccount(key, payload){
      try {
          this.logger.info(`AdminAction execute banAccount`)
          this.logger.debug(`AdminAction execute banAccount receive key`, key)
          this.logger.debug(`AdminAction execute banAccount receive payload`, payload)
          return {
            type: this.action.TYPE.COMMON.REQUEST,
            key: key,
            name: 'AdminAction banAccount',
            options: {
              method: 'POST',
              headers: {
               'content-type': 'application/json',
               'token': this.getToken(),
              },
              url: `${this.api.admin.banAccount}`,
              data: payload,
            },
          }
        } catch (e) {
          this.logger.error(`AdminAction execute banAccount ${e.toString()}`)
        }
    }

    static unbanAccount(key, payload){
      try {
          this.logger.info(`AdminAction execute unbanAccount`)
          this.logger.debug(`AdminAction execute unbanAccount receive key`, key)
          this.logger.debug(`AdminAction execute unbanAccount receive payload`, payload)
          return {
            type: this.action.TYPE.COMMON.REQUEST,
            key: key,
            name: 'AdminAction unbanAccount',
            options: {
              method: 'POST',
              headers: {
               'content-type': 'application/json',
               'token': this.getToken(),
              },
              url: `${this.api.admin.unbanAccount}`,
              data: payload,
            },
          }
        } catch (e) {
          this.logger.error(`AdminAction execute unbanAccount ${e.toString()}`)
        }
    }

}

export default AdminAction