import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
import Localize from 'service/localize'
class LoadingListMenuSettingComponent extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ui: {

      },
      func: {
        handleGetListMenuSuccess: this.handleGetListMenuSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      }
    }
  }
  handleGetListMenuSuccess(response) {
    try {
      Logger.info("LoadingListMenuSettingComponent execute handleGetListMenuSuccess");
      Logger.debug("LoadingListMenuSettingComponent execute handleGetListMenuSuccess receive list", response);
      const { ui, timeout } = this.state;
      const { handleSetData } = this.props

      handleSetData(response)
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoadingListMenuSettingComponent handleGetListMenuSuccess ${e.toString()}`);
    }
  }

  handleSystemError() {
    try {
      Logger.info('LoadingListMenuSettingComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`LoadingListMenuSettingComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentDidMount() {
    try {
      Logger.info('LoadingListMenuSettingComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`LoadingListMenuSettingComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('LoadingListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
      const { getListMenu, query } = this.props

      getListMenu(timeout.key, query)

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

export default BaseComponent(LoadingListMenuSettingComponent)