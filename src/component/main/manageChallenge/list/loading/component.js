import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'

class LoadingListChallengeComponent extends Component {
  constructor(prop) {
    super(prop)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ui: {

      },
      func: {
        handleGetAllChallengeSuccess: this.handleGetAllChallengeSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      }
    }
  }
  handleGetAllChallengeSuccess(response) {
    try {
      Logger.info("LoadingListChallengeComponent execute handleGetAllChallengeSuccess");
      Logger.debug("LoadingListChallengeComponent execute handleGetAllChallengeSuccess receive list", response);
      const { ui, timeout } = this.state;
      const { handleSetData } = this.props
      handleSetData(response)
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoadingListChallengeComponent handleGetAllChallengeSuccess ${e.toString()}`);
    }
  }

  handleSystemError() {
    try {
      Logger.info('LoadingListChallengeComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoadingListChallengeComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentDidMount() {
    try {
      Logger.info('LoadingListChallengeComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`LoadingListChallengeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('LoadingListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
      const { getAllChallenge, query } = this.props
      getAllChallenge(timeout.key, query)

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

export default BaseComponent(LoadingListChallengeComponent)