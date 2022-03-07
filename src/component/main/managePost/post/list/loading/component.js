import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import SearchEnum from 'service/enum/search'
import LoadingCore from 'core/loading'
import Localize from 'service/localize'
class LoadingListPostComponent extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)), //call request => set Timeout
      ui: {

      },
      func: {
        handleGetListPostSuccess: this.handleGetListPostSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      }
    }
  }
  handleGetListPostSuccess(response) {
    try {
      Logger.info("LoadingListPostComponent execute handleGetListPostSuccess");
      Logger.debug("LoadingListPostComponent execute handleGetListPostSuccess receive list", response);
      const { ui, timeout } = this.state;
      const { handleSetData } = this.props
      handleSetData(response)
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleGetListPostSuccess ${e.toString()}`);
    }
  }

  handleSystemError() {
    try {
      Logger.info('EditPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentDidMount() {
    try {
      Logger.info('LoadingListPostComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`LoadingListPostComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('LoadingListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
      const { getListAdmin, query, tab, getListUser } = this.props

      switch (tab.current) {
        case tab.user:
          getListUser(timeout.key, query)
          break;
        case tab.admin:
          getListAdmin(timeout.key, query)
          break;
      }
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

export default BaseComponent(LoadingListPostComponent)