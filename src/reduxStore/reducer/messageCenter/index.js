/**
 * Created By Nguyen Cong Thanh on 07/24/2020 13:59.
 *
 * Copyright intelIn 2020.
 */

import Action from 'reduxStore/action'
import Model from './model'

const messageCenterReducer = (state = new Model(), action) => {
  switch (action.type) {
    case Action.TYPE.STORE_UPDATE.MESSAGE_CENTER:
      return action.payload;
    default:
      return state
  }
}

export default messageCenterReducer
