/**
 * Created By Nguyen Cong Thanh on 07/23/2020 17:02.
 *
 * Copyright intelIn 2020.
 */

import { put } from 'redux-saga/effects'

import Logger from 'service/logger'
import ResponseCode from 'service/responseCode'
import Action from 'reduxStore/action'
import MessageCenterModel from 'reduxStore/reducer/messageCenter/model'

class WorkerSaga {

  static * systemError(key, code = ResponseCode.REQUEST.SYSTEM_ERROR, data = {}) {
    try {
      Logger.info('WorkerSaga execute systemError')
      Logger.debug('WorkerSaga execute systemError receive key', key)
      yield this.putMessageCenterUpdate(new MessageCenterModel(key, code, data))
    } catch (e) {
      Logger.error(`WorkerSaga systemError ${e.toString()}`)
    }
  }

  static * putMessageCenterUpdate(payload) {
    try {
      Logger.info('WorkerSaga execute putMessageCenterUpdate')
      Logger.debug('WorkerSaga execute putMessageCenterUpdate receive payload', payload)
      yield put({
        type: Action.TYPE.STORE_UPDATE.MESSAGE_CENTER,
        payload: payload
      })
    } catch (e) {
      Logger.error(`WorkerSaga execute putMessageCenterUpdate ${e.toString()}`)
    }
  }

}

export default WorkerSaga