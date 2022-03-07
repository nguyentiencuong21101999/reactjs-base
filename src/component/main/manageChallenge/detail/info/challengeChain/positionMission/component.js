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
import { ModelView, ModelRequest } from './model'
import Localize from "service/localize";
class DashboardComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleChangePositionMissionSuccess: this.handleChangePositionMissionSuccess.bind(this),
        handleChangePositionMissionFailed: this.handleChangePositionMissionFailed.bind(this)


      },
      data: new ModelView(),
      ui: {
        listMission: null,
        isShowBtn: true,
        isShowVertical: false

      },
    }
    this.handleOnchange = this.handleOnchange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleChangePositionMissionSuccess(response) {
    try {
      Logger.info('InfoChallengeComponent execute handleGetDetailDashBoardSuccess')
      const { ui, timeout, data } = this.state
      const { toast, handleChangePositionMissionSuccess } = this.props
      handleChangePositionMissionSuccess()
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
      timeout.setTimeout(false)
      ui.isShowBtn = true
      this.setState({ ui })
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleGetDetailDashBoardSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleChangePositionMissionFailed() {
    try {
      Logger.info('EditPostComponent execute handleChangePositionMissionFailed')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
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
      const { ui, data } = this.state
      const { list, challengeId } = this.props
      ui.listMission = list
      data['challengeId'] = challengeId
    } catch (e) {
      Logger.error(`DashboardComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('InfoChallengeComponent execute componentDidMount')
      const { timeout } = this.state
      // timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`InfoChallengeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('InfoChallengeComponent execute handleRequest')
      const { data, timeout } = this.state
      const { changePositionMission } = this.props
      const modelRequest = new ModelRequest()
        .setChallengeId(data['challengeId'])
      data['missions'].map(element => { modelRequest.missions.push({ missionId: element.missionId }) })
      changePositionMission(timeout.key, data)
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnchange(name, value) {
    try {
      Logger.info('InfoChallengeComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      data[name] = value
      const temp = { ...data }
      const status = Object.values(temp).findIndex(item => item.toString() === '') == -1
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status
        this.setState({ ui })
      }
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSubmit() {
    try {
      Logger.info('InfoChallengeComponent execute handleRequest')
      const { data, timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleClose(name, value) {
    try {
      Logger.info('InfoChallengeComponent execute handleRequest')
      const { ui, data } = this.state
      data[name] = value
      ui.isShowBtn = true
      this.setState({ ui })
    } catch (e) {
      Logger.error(`InfoChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    const { handleHiddenVertical } = this.props
    return <View ui={ui} timeout={timeout}
      handleClose={this.handleClose}
      handleOnchange={this.handleOnchange}
      handleOnSubmit={this.handleSubmit}
      handleHiddenVertical={handleHiddenVertical}
    />


  }
}

export default BaseComponent(DashboardComponent)
