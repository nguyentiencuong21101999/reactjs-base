/**
 * Created By Nguyen Cong Thanh on 07/24/2020 14:11.
 *
 * Copyright intelIn 2020.
 */

import Action from 'reduxStore/action'
import Model from './model'

const dialogReducer = (state = new Model(), action) => {
  switch (action.type) {
    case Action.TYPE.STORE_UPDATE.DIALOG:
      return action.payload;
    default:
      return state
  }
}

export default dialogReducer