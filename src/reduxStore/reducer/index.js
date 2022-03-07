/**
 * Created By Nguyen Cong Thanh on 07/23/2020 16:57.
 *
 * Copyright intelIn 2020.
 */

import { combineReducers } from 'redux'

import DialogReducer from './dialog'
import MessageReducer from './messageCenter'
import NotifyReducer from './notify'

export default combineReducers({
  messageCenter: MessageReducer,
  dialog: DialogReducer,
  notify: NotifyReducer,
})