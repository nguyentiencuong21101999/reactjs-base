/**
 * Created By Nguyen Cong Thanh on 07/24/2020 11:40.
 *
 * Copyright intelIn 2020.
 */

import Config from 'config'
import Action from 'reduxStore/action'
import Logger from 'service/logger'
import Helper from 'service/helper'
import Auth from 'service/auth'

class  BaseAction {

  static version = Config.version
  static api = Config.api
  static api2 = Config.api2
  static thirdParty = Config.thirdParty
  static action = Action
  static logger = Logger

  static token = null;

  static getToken() { return this.token }
  static setToken(token) { this.token = token }

}

export default BaseAction