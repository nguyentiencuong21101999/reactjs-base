import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
import HelperService from 'service/helper'
import Localize from "service/localize";
class LoadingListTeachingPregnancyComponent extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ui: {

      },
      func: {
        handleGetListTeachingPregnancySuccess: this.handleGetListTeachingPregnancySuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      }
    }
  }
  handleGetListTeachingPregnancySuccess(response) {
    try {
      Logger.info("LoadingListTeachingPregnancyComponent execute handleGetListTeachingPregnancySuccess");
      Logger.debug("LoadingListTeachingPregnancyComponent execute handleGetListTeachingPregnancySuccess receive list", response);
      const { ui, timeout } = this.state;
      const { handleSetData } = this.props
      handleSetData(response)
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoadingListTeachingPregnancyComponent handleGetListCategorySuccess ${e.toString()}`);
    }
  }

  handleSystemError() {
    try {
      Logger.info('LoadingListTeachingPregnancyComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoadingListTeachingPregnancyComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentDidMount() {
    try {
      Logger.info('LoadingListTeachingPregnancyComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`LoadingListTeachingPregnancyComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('LoadingListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
      const { getListTeachingPregnancy, query } = this.props
      getListTeachingPregnancy(timeout.key, query)
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

export default BaseComponent(LoadingListTeachingPregnancyComponent)