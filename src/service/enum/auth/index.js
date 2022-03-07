/**
 * Created By Nguyen Cong Thanh on 07/24/2020 13:51.
 *
 * Copyright intelIn 2020.
 */

import RouteEnum from 'service/enum/route'
import Localize from 'service/localize'

const ROLE = {
  NOT_LOGIN: 0,
  USER: 1,
}
const ROLE_REDIRECT = {
  [ROLE.NOT_LOGIN]: RouteEnum.LOGIN,
  [ROLE.USER]: RouteEnum.USER,
}
class AuthEnum {

  static get ROLE() {
    return ROLE
  }
  static get ROLE_REDIRECT() { return ROLE_REDIRECT }
}

export default AuthEnum
