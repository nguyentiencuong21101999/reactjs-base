/**
 * Created By Nguyen Cong Thanh on 07/23/2020 16:47.
 *
 * Copyright intelIn 2020.
 */

import { all, takeLatest, takeEvery } from 'redux-saga/effects'

import BaseSaga from 'base/saga'
import WorkerSaga from './worker'
import MessageCenterModel from 'reduxStore/reducer/messageCenter/model'
import Validator from 'service/validator'

class Saga extends BaseSaga {

  static * commonRequest(action) {
    try {
      this.logger.info(`Saga execute commonRequest`)
      this.logger.debug(`Saga execute commonRequest receive action`, action)
      const response = yield this.request(action)
      this.logger.debug(`Saga execute commonRequest receive response`, response)
      Validator.isNotEmpty('response', response, `request RESPONSE with action name ${action.name} is ${response}`)
      yield WorkerSaga.putMessageCenterUpdate(new MessageCenterModel(action.key, response.code, response.data))
    } catch (e) {
      yield WorkerSaga.systemError(action.key)
      // throw `Saga execute commonRequest ${e.toString()} ${JSON.stringify(action)}`
    }
  }

  static * thirdPartyRequest(action) {
    try {
      this.logger.info(`Saga execute thirdPartyRequest`)
      this.logger.debug(`Saga execute thirdPartyRequest receive action`, action)
      const response = yield this.requestThirdParty(action)
      this.logger.debug(`Saga execute thirdPartyRequest receive response`, response)
      Validator.isNotEmpty('response', response, `request RESPONSE with action name ${action.name} is ${response}`)
      yield WorkerSaga.putMessageCenterUpdate(new MessageCenterModel(action.key, response.code, response.data))
    } catch (e) {
      yield WorkerSaga.systemError(action.key)
      // throw `Saga execute thirdPartyRequest ${e.toString()} ${JSON.stringify(action)}`
    }
  } 

  static * getRoot() {
    try {
      this.logger.info(`Saga execute getRoot`)
      yield all([
        function* () { yield takeEvery(Saga.action.TYPE.COMMON.REQUEST, Saga.commonRequest.bind(Saga)) }(),
        function* () { yield takeEvery(Saga.action.TYPE.THIRD_PARTY.REQUEST, Saga.thirdPartyRequest.bind(Saga)) }(),
      ])
    } catch (e) {
      this.logger.error(`Saga execute getRoot ${e.toString()}`)
      // throw e
    }
  }

}

export default Saga