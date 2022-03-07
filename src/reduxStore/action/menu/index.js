import BaseAction from 'base/action'
import Config from 'config'
class MenuAction extends BaseAction {
  static getListCategory(key, payload) {
    try {
      this.logger.info(`MenuAction execute getListCategory`)
      this.logger.debug(`MenuAction execute getListCategory receive key`, key)
      this.logger.debug(`MenuAction execute getListCategory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getListCategory',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
           'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getListCategory}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getListCategory ${e.toString()}`)
    }
  }
  
  static getDetailCategory(key, payload) {
    try {
      this.logger.info(`MenuAction execute getDetailCategory`)
      this.logger.debug(`MenuAction execute getDetailCategory receive key`, key)
      this.logger.debug(`MenuAction execute getDetailCategory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getDetailCategory',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getDetailCategory}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getDetailCategory ${e.toString()}`)
    }
  }
  static createCategory(key, payload) {
    try {
      this.logger.info(`MenuAction execute createCategory`)
      this.logger.debug(`MenuAction execute createCategory receive key`, key)
      this.logger.debug(`MenuAction execute createCategory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction createCategory',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.createCategory}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute createCategory ${e.toString()}`)
    }
  }
  static updateCategory(key, payload) {
    try {
      this.logger.info(`MenuAction execute updateCategory`)
      this.logger.debug(`MenuAction execute updateCategory receive key`, key)
      this.logger.debug(`MenuAction execute updateCategory receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction updateCategory',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.updateCategory}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute updateCategory ${e.toString()}`)
    }
  }
  // Food
  static getListFood(key, payload) {
    try {
      this.logger.info(`MenuAction execute getListFood`)
      this.logger.debug(`MenuAction execute getListFood receive key`, key)
      this.logger.debug(`MenuAction execute getListFood receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getListFood',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getListFood}`,
          data:payload
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getListFood ${e.toString()}`)
    }
  }
  static getDetailFood(key, payload) {
    try {
      this.logger.info(`MenuAction execute getDetailFood`)
      this.logger.debug(`MenuAction execute getDetailFood receive key`, key)
      this.logger.debug(`MenuAction execute getDetailFood receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getDetailFood',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getDetailFood}/${payload}`,
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getDetailFood ${e.toString()}`)
    }
  }
  static createFood(key, payload) {
    try {
      this.logger.info(`MenuAction execute createFood`)
      this.logger.debug(`MenuAction execute createFood receive key`, key)
      this.logger.debug(`MenuAction execute createFood receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction createFood',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.createFood}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getDetailFood ${e.toString()}`)
    }
  }
  static updateFood(key, payload) {
    try {
      this.logger.info(`MenuAction execute updateFood`)
      this.logger.debug(`MenuAction execute updateFood receive key`, key)
      this.logger.debug(`MenuAction execute updateFood receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction updateFood',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.updateFood}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute updateFood ${e.toString()}`)
    }
  }
  //food list select 
  static getList(key, payload = null) {
    try {
      this.logger.info(`MenuAction execute getList`)
      this.logger.debug(`MenuAction execute getList receive key`, key)
      this.logger.debug(`MenuAction execute getList receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getList',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getList}`,
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getList ${e.toString()}`)
    }
  }
  //setting
  static getListSetting(key, payload) {
    try {
      this.logger.info(`MenuAction execute getListSetting`)
      this.logger.debug(`MenuAction execute getListSetting receive key`, key)
      this.logger.debug(`MenuAction execute getListSetting receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getListSetting',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getListSetting}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getListSetting ${e.toString()}`)
    }
  }
  static createMenuSetting(key, payload) {
    try {
      this.logger.info(`MenuAction execute createMenuSetting`)
      this.logger.debug(`MenuAction execute createMenuSetting receive key`, key)
      this.logger.debug(`MenuAction execute createMenuSetting receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction createMenuSetting',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.createMenuSetting}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute createMenuSetting ${e.toString()}`)
    }
  }
  static updateMenuSetting(key, payload) {
    try {
      this.logger.info(`MenuAction execute updateMenuSetting`)
      this.logger.debug(`MenuAction execute updateMenuSetting receive key`, key)
      this.logger.debug(`MenuAction execute updateMenuSetting receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction updateMenuSetting',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.updateMenuSetting}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute updateMenuSetting ${e.toString()}`)
    }
  }
  static getDetailMenuSetting(key, payload) {
    try {
      this.logger.info(`MenuAction execute getDetailMenuSetting`)
      this.logger.debug(`MenuAction execute getDetailMenuSetting receive key`, key)
      this.logger.debug(`MenuAction execute getDetailMenuSetting receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getDetailMenuSetting',
        options: {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getDetailMenuSetting}/${payload}`,
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getDetailMenuSetting ${e.toString()}`)
    }
  }
  //menu
  static getListMenu(key, payload) {
    try {
      this.logger.info(`MenuAction execute getListMenu`)
      this.logger.debug(`MenuAction execute getListMenu receive key`, key)
      this.logger.debug(`MenuAction execute getListMenu receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getListMenu',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getListMenu}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getListMenu ${e.toString()}`)
    }
  }
  static updateMenu(key, payload) {
    try {
      this.logger.info(`MenuAction execute updateMenu`)
      this.logger.debug(`MenuAction execute updateMenu receive key`, key)
      this.logger.debug(`MenuAction execute updateMenu receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction updateMenu',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.updateMenu}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute updateMenu ${e.toString()}`)
    }
  }
  //target
  static getListTarget(key, payload) {
    try {
      this.logger.info(`MenuAction execute getListTarget`)
      this.logger.debug(`MenuAction execute getListTarget receive key`, key)
      this.logger.debug(`MenuAction execute getListTarget receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction getListTarget',
        options: {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.getListTarget}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute getListTarget ${e.toString()}`)
    }
  }
  static createTarget(key, payload) {
    try {
      this.logger.info(`MenuAction execute createTarget`)
      this.logger.debug(`MenuAction execute createTarget receive key`, key)
      this.logger.debug(`MenuAction execute createTarget receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction createTarget',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.createTarget}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute createTarget ${e.toString()}`)
    }
  }
  static updateTarget(key, payload) {
    try {
      this.logger.info(`MenuAction execute updateTarget`)
      this.logger.debug(`MenuAction execute updateTarget receive key`, key)
      this.logger.debug(`MenuAction execute updateTarget receive payload`, payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'MenuAction updateTarget',
        options: {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'token': this.getToken(),
          },
          baseURL: Config.api2.host,
          url: `${this.api2.admin.menu.updateTarget}`,
          data:payload
         
        },
      }
    } catch (e) {
      this.logger.error(`MenuAction execute updateTarget ${e.toString()}`)
    }
  }
}

export default MenuAction