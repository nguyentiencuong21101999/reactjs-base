import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
import Localize from "service/localize";
class LoadingListNotifyReceivedComponent extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ui: {

      },
      func: {
        handleGetListNotifyReceivedSuccess: this.handleGetListNotifyReceivedSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      }
    }
  }

  handleGetListNotifyReceivedSuccess(response) {
    try {
      Logger.info("LoadingListNotifyReceivedComponent execute handleGetListNotifyReceivedSuccess");
      Logger.debug("LoadingListNotifyReceivedComponent execute handleGetListNotifyReceivedSuccess receive list", response);
      const { ui, timeout } = this.state;
      const { handleSetData } = this.props
      handleSetData(response)
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoadingListNotifyReceivedComponent handleGetListNotifyReceivedSuccess ${e.toString()}`);
    }
  }

  handleSystemError() {
    try {
      Logger.info('LoadingListNotifyReceivedComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoadingListNotifyReceivedComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentDidMount() {
    try {
      Logger.info('LoadingListNotifyReceivedComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`LoadingListNotifyReceivedComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('LoadingListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
      const { getListNotificationReceived, query } = this.props
      getListNotificationReceived(timeout.key, query)
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

export default BaseComponent(LoadingListNotifyReceivedComponent)