import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
import Localize from 'service/localize'
class LoadingListFoodComponent extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ui: {

      },
      func: {
        handleGetListFoodSuccess: this.handleGetListFoodSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      }
    }
  }
  handleGetListFoodSuccess(response) {
    try {
      Logger.info("LoadingListFoodComponent execute handleGetListFoodSuccess");
      Logger.debug("LoadingListFoodComponent execute handleGetListFoodSuccess receive list", response);
      const { ui, timeout } = this.state;
      const { handleSetData } = this.props
      handleSetData(response)
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoadingListFoodComponent handleGetListFoodSuccess ${e.toString()}`);
    }
  }
  handleSystemError() {
    try {
      Logger.info('LoadingListFoodComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoadingListFoodComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentDidMount() {
    try {
      Logger.info('LoadingListFoodComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`LoadingListFoodComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('LoadingListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
      const { getListFood, query } = this.props
      getListFood(timeout.key, query)
    } catch (e) {
      Logger.error(`LoadingListUserComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  render() {
    const { timeout, ui } = this.state

    return <LoadingCore />
  }
}

export default BaseComponent(LoadingListFoodComponent)