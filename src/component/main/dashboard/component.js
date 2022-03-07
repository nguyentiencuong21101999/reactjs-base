/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from 'react'
import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import Localize from "service/localize";

class DashboardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleGetDetailDashBoardSuccess: this.handleGetDetailDashBoardSuccess.bind(this)
      },
      ui: {
        detailDashBoard: null
      },
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
  handleGetDetailDashBoardSuccess(response) {
    try {
      Logger.info('InfoChallengeComponent execute handleGetDetailDashBoardSuccess')
      const { ui, timeout, data } = this.state
      ui.detailDashBoard = response
      this.setState({ ui });
      this.state.timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleGetDetailDashBoardSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentWillUnmount() {
    try {
      Logger.info('DashboardComponent execute componentWillUnmount')
    } catch (e) {
      Logger.error(`DashboardComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('DashboardComponent execute UNSAFE_componentWillMount')
    } catch (e) {
      Logger.error(`DashboardComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('InfoChallengeComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`InfoChallengeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('InfoChallengeComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { getDetailDashBoard } = this.props
      getDetailDashBoard(timeout.key)

    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  render() {
    const { ui } = this.state
    return ui.detailDashBoard ? (
      <View ui={ui} />
    ) : null
  }
}

export default BaseComponent(DashboardComponent)
