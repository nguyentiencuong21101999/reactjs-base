import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
import Localize from 'service/localize'
class LoadingListSettingComponent extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ui: {

      },
      func: {
        handleGetListMenuSettingSuccess: this.handleGetListMenuSettingSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      }
    }
  }
  handleGetListMenuSettingSuccess(response) {
    try {
      Logger.info("LoadingListSettingComponent execute handleGetListMenuSettingSuccess");
      Logger.debug("LoadingListSettingComponent execute handleGetListMenuSettingSuccess receive list", response);
      const { ui, timeout } = this.state;
      const { handleSetData } = this.props

      handleSetData(response)
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoadingListSettingComponent handleGetListMenuSettingSuccess ${e.toString()}`);
    }
  }
  handleSystemError() {
    try {
      Logger.info('LoadingListSettingComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoadingListSettingComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentDidMount() {
    try {
      Logger.info('LoadingListSettingComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`LoadingListSettingComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('LoadingListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
      const { getListSetting, query } = this.props
      getListSetting(timeout.key, query)

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

export default BaseComponent(LoadingListSettingComponent)