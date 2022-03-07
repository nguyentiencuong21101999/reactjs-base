/**
 * Created By Nguyen Cong Thanh on 07/24/2020 10:57.
 *
 * Copyright intelIn 2020.
 */

import 'regenerator-runtime/runtime'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import Logger from 'service/logger'

import combineReducers from './reducer'
import Saga from './saga'

class AppStore {

  static create() {
    try {
      Logger.info(`AppStore execute create`)
      // Logger.debug(`AppStore execute create receive combineReducers`, combineReducers)
      // Logger.debug(`AppStore execute create receive rootSaga`, rootSaga)
      // const sagaMiddleware = createSagaMiddleware({
      //   context: {},
      //   onError: (error, errorInfo) => {
      //     Logger.info('AppStore execute createSagaMiddleware onError')
      //     Logger.error(error)
      //     Logger.error(errorInfo.sagaStack)
      //   },
      // })
      const sagaMiddleware = createSagaMiddleware({})
      let store = createStore(combineReducers, applyMiddleware(sagaMiddleware));
      store.subscribe(() => {
        Logger.info(`AppStore execute create func subscribe`)
        Logger.log(store.getState())
      })
      sagaMiddleware.run(Saga.getRoot.bind(Saga))
      return store
    } catch (e) {
      Logger.error(`AppStore execute create ${e.toString()}`)
      throw e
    }
  }

}

export default AppStore
