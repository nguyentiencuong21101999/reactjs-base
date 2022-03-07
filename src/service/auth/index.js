/**
 * Created By Nguyen Cong Thanh on 08/05/2019 10:25.
 *
 * Copyright intelIn 2019.
 */

import Config from 'config'
import BaseAction from 'base/action'

import Cookies from 'service/cookies'
import Logger from 'service/logger'
import Helper from 'service/helper'

import { AuthModel, PAYMENT_WITH_TOKEN_STATUS, PaymentWithTokenModel } from './model'
import AuthEnum from 'service/enum/auth'
import RouteEnum from 'service/enum/route'

import ResponseCode from 'service/responseCode'
import MessageCenterModel from 'reduxStore/reducer/messageCenter/model'

class AuthService {

  constructor() {
    if (!AuthService.instance) {

      this.role = AuthEnum.ROLE.NOT_LOGIN
      this.roleRedirect = {
        [AuthEnum.ROLE.NOT_LOGIN]: RouteEnum.PAGE.LOGIN,
        [AuthEnum.ROLE.USER]: RouteEnum.PAGE.MAIN,
      }
      this.routes = []

      this.setRoutes = this.setRoutes.bind(this)
      this.getRoutes = this.getRoutes.bind(this)

      this.getRole = this.getRole.bind(this)
      this.setRole = this.setRole.bind(this)
      this.getRedirect = this.getRedirect.bind(this)

      this.setPackageExpired = this.setPackageExpired.bind(this)
      this.getPackageExpired = this.getPackageExpired.bind(this)

      this.setPackageAuth = this.setPackageAuth.bind(this)
      this.getPackageAuth = this.getPackageAuth.bind(this)

      this.setPackageProfile = this.setPackageProfile.bind(this)
      this.getPackageProfile = this.getPackageProfile.bind(this)

      this.setPackageRole = this.setPackageRole.bind(this)
      this.getPackageRole = this.getPackageRole.bind(this)

      this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
      this.handleLogout = this.handleLogout.bind(this)

      this.funcTimeoutTokenExpired = null
      this.handleSetTimeoutTokenExpired = this.handleSetTimeoutTokenExpired.bind(this)

      AuthService.instance = this
    }
    return AuthService.instance
  }

  setRoutes(routes) {
    try {
      Logger.info('AuthService execute setRoutes')
      Logger.debug('AuthService execute setRoutes routes', routes)
      this.routes = routes
    } catch (e) {
      Logger.error(`AuthService execute setRoutes error ${e.toString()}`)
      throw e
    }
  }

  getRoutes() {
    try {
      Logger.info('AuthService execute getRoutes')
      return this.routes
    } catch (e) {
      Logger.error(`AuthService execute getRoutes error ${e.toString()}`)
      throw e
    }
  }

  getRole() {
    try {
      Logger.info('AuthService execute getRole')
      Logger.debug('AuthService execute getRole current', this.role)
      return this.role
    } catch (e) {
      Logger.error(`AuthService execute getRole error ${e.toString()}`)
      throw e
    }
  }

  setRole(role = AuthEnum.ROLE.NOT_LOGIN) {
    try {
      Logger.info('AuthService execute setRole')
      Logger.debug('AuthService execute setRole receive role', role)
      let route = this.roleRedirect[role]
      if (Helper.isEmpty(route)) throw `Role ${role} not defined in enum`
      this.role = role
    } catch (e) {
      Logger.error(`AuthService execute setRole error ${e.toString()}`)
      throw e
    }
  }

  getRedirect() {
    try {
      Logger.info('BaseUserComponent execute UNSAFE_componentWillReceiveProps new message center')
      let route = this.roleRedirect[this.role]
      Logger.debug('AuthService execute getRedirect route current route', route)
      if (!Helper.isEmpty(route)) return route
      return this.roleRedirect[AuthEnum.ROLE.NOT_LOGIN]
    } catch (e) {
      Logger.error(`AuthService execute getRedirect error ${e.toString()}`)
      throw e
    }
  }

  setPackageExpired(expiredAt, expiredAtTime) {
    try {
      Logger.info(`AuthService execute setPackageExpired`)
      Logger.debug(`AuthService execute setPackageExpired receive expiredAt`, expiredAt)
      Logger.debug(`AuthService execute setPackageExpired receive expiredAtTime`, expiredAtTime)
      Cookies.set(Config.cookies.expiredAt, expiredAtTime, expiredAt)
    } catch (e) {
      Logger.error(`AuthService execute setPackageExpired ${e.toString()}`)
      throw e
    }
  }

  getPackageExpired() {
    try {
      Logger.info(`AuthService execute getPackageExpired`)
      const expiredAt = Cookies.get(Config.cookies.expiredAt)
      Logger.debug(`AuthService execute getPackageExpired receive expiredAt`, expiredAt)
      return expiredAt
    } catch (e) {
      Logger.error(`AuthService execute getPackageExpired ${e.toString()}`)
      throw e
    }
  }

  setPackageAuth(expiredAt, auth) {
    try {
      Logger.info(`AuthService execute setPackageAuth`)
      Logger.debug(`AuthService execute setPackageAuth receive expiredAt`, expiredAt)
      Logger.debug(`AuthService execute setPackageAuth receive auth`, auth)
      let data = JSON.stringify(auth)
      window.localStorage.setItem(Config.cookies.auth, data)
      // Cookies.set(Config.cookies.auth, auth, expiredAt)
    } catch (e) {
      Logger.error(`AuthService execute setPackageAuth ${e.toString()}`)
      throw e
    }
  }

  getPackageAuth() {
    try {
      Logger.info(`AuthService execute getPackageAuth`)
      // const auth = Cookies.get(Config.cookies.auth)
      let data = window.localStorage.getItem(Config.cookies.auth)
      const auth = (Helper.isEmpty(data)) ? null : JSON.parse(data)
      Logger.debug(`AuthService execute getPackageAuth receive auth`, auth)
      return auth
    } catch (e) {
      Logger.error(`AuthService execute getPackageAuth ${e.toString()}`)
      throw e
    }
  }

  setPackageProfile(expiredAt, profile) {
    try {
      Logger.info(`AuthService execute setPackageProfile`)
      Logger.debug(`AuthService execute setPackageProfile receive expiredAt`, expiredAt)
      Logger.debug(`AuthService execute setPackageProfile receive profile`, profile)
      Cookies.set(Config.cookies.profile, profile, expiredAt)
    } catch (e) {
      Logger.error(`AuthService execute setPackageProfile ${e.toString()}`)
      throw e
    }
  }

  getPackageProfile() {
    try {
      Logger.info(`AuthService execute getPackageProfile`)
      const profile = Cookies.get(Config.cookies.profile)
      Logger.debug(`AuthService execute getPackageProfile receive profile`, profile)
      return profile
    } catch (e) {
      Logger.error(`AuthService execute getPackageProfile ${e.toString()}`)
      throw e
    }
  }

  setPackageRole(expiredAt, role) {
    try {
      Logger.info(`AuthService execute setPackageRole`)
      Logger.debug(`AuthService execute setPackageRole receive expiredAt`, expiredAt)
      Logger.debug(`AuthService execute setPackageRole receive role`, role)
      Cookies.set(Config.cookies.role, role, expiredAt)
    } catch (e) {
      Logger.error(`AuthService execute setPackageRole ${e.toString()}`)
      throw e
    }
  }

  getPackageRole() {
    try {
      Logger.info(`AuthService execute getPackageRole`)
      const role = Cookies.get(Config.cookies.role)
      Logger.debug(`AuthService execute getPackageRole receive role`, role)
      return role
    } catch (e) {
      Logger.error(`AuthService execute getPackageRole ${e.toString()}`)
      throw e
    }
  }


  handleLoginSuccess(response) {
    try {
      Logger.info(`AuthService execute handleLoginSuccess`)
      Logger.debug(`AuthService execute handleLoginSuccess receive auth`, response.auth)
      Logger.debug(`AuthService execute handleLoginSuccess receive profile`, response.userInfo)
      Logger.debug(`AuthService execute handleLoginSuccess receive role`, response.role)
      const auth = response.auth
      const profile = response.userInfo
      let expireAt = new Date(auth.expireAt)
      this.setPackageExpired(expireAt, expireAt.getTime())
      this.setPackageAuth(expireAt, auth)
      this.setPackageRole(expireAt, response.role)
      this.setPackageProfile(expireAt, profile)
      this.setRole(response.role)
      BaseAction.setToken(auth.token)
    } catch (e) {
      Logger.error(`AuthService execute handleLoginSuccess ${e.toString()}`)
      throw e
    }
  }

  handleLogout() {
    try {
      Logger.info(`AuthService execute handleLogout`)
      Cookies.remove(Config.cookies.expired)
      // Cookies.remove(Config.cookies.auth)
      window.localStorage.removeItem(Config.cookies.auth)
      Cookies.remove(Config.cookies.merchantInfo)
      Cookies.remove(Config.cookies.profile)
      Cookies.remove(Config.cookies.role)
      window.localStorage.removeItem(Config.localStorage.language)
      window.localStorage.removeItem(Config.localStorage.viewCard)
      window.localStorage.removeItem(Config.localStorage.switchViewCard)
      window.localStorage.removeItem(Config.localStorage.paymentWithToken)
      BaseAction.setToken(null)
      this.setRoutes([])
      this.roleRedirect[AuthEnum.ROLE.USER] = RouteEnum.PAGE.MAIN
      clearTimeout(this.funcTimeoutTokenExpired)
    } catch (e) {
      Logger.error(`AuthService execute handleLogout ${e.toString()}`)
      throw e
    }
  }

  handleSetTimeoutTokenExpired(messageCenterUpdate) {
    try {
      Logger.info(`AuthService execute handleSetTimeoutTokenExpired`)
      const auth = this.getPackageAuth()
      const time = auth.expireAt - new Date().getTime()
      if (time < 2147483647) {
        this.funcTimeoutTokenExpired = setTimeout(() => {
          const messageCenterModel = new MessageCenterModel()
          messageCenterModel.setCode(ResponseCode.REQUEST.AUTH_4002)
          messageCenterModel.setData({})
          messageCenterUpdate(messageCenterModel.getInfo())
        }, time)
      }
    } catch (e) {
      Logger.error(`AuthService execute handleSetTimeoutTokenExpired ${e.toString()}`)
    }
  }

}

export default new AuthService()
