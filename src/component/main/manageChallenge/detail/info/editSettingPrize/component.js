/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from 'react'
import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from 'component/main/manageChallenge/detail/info/createSettingPrize/view'
import { ModelView, ModelRequest } from './model'
import RouteEnum from 'service/enum/route'
import Helper from 'service/helper'
import Localize from "service/localize";
class CreateSubChallengeComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleUpdateSettingPrizeSuccess: this.handleUpdateSettingPrizeSuccess.bind(this),
        handleUpdateSettingPrizeFailed: this.handleUpdateSettingPrizeFailed.bind(this),
        handleRankExisted: this.handleRankExisted.bind(this),
        handleResultInvalid: this.handleResultInvalid.bind(this)
      },
      data: new ModelView(),
      ui: {
        detailChallenge: null,
        isShowBtn: false,
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      }
    }
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleUpdateSettingPrizeSuccess(event) {
    try {
      Logger.info('createChallengeChildComponent execute handleUpdateSettingPrizeSuccess')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
      timeout.setTimeout(false)
      this.handleOnBack()
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleUpdateSettingPrizeSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleUpdateSettingPrizeFailed(event) {
    try {
      Logger.info('createChallengeChildComponent execute handleUpdateSettingPrizeFailed')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      ui.isShowBtn = false
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleUpdateSettingPrizeFailed ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleRankExisted(event) {
    try {
      Logger.info('createChallengeChildComponent execute handleRankExisted')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_TOAST_PRIZE_DUP_RANK") })
      ui.isShowBtn = false
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleRankExisted ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleResultInvalid(event) {
    try {
      Logger.info('createChallengeChildComponent execute handleResultInvalid')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_TOAST_PERFORM_ACTION_WHEN_CHALLENGE_PUBLISHED_RESULT") })
      ui.isShowBtn = false
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleResultInvalid ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSystemError() {
    try {
      Logger.info('CreateSubChallengeComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      ui.isShowBtn = false
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`CreateSubChallengeComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentWillUnmount() {
    try {
      Logger.info('CreateSubChallengeComponent execute componentWillUnmount')
    } catch (e) {
      Logger.error(`CreateSubChallengeComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('CreateSubChallengeComponent execute UNSAFE_componentWillMount')
      const { data, timeout, ui } = this.state
      const { location } = this.props
      ui.detailChallenge = location.state
      Object.keys(data).map(key => {
        if (key !== 'reward') {
          data[key] = ui.detailChallenge[key]
        } else {
          data[key] = !Helper.isEmpty(ui.detailChallenge[key]) ? ui.detailChallenge[key] : ""
        }
      })
    } catch (e) {
      Logger.error(`CreateSubChallengeComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('CreateSubChallengeComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`CreateSubChallengeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('CreateSubChallengeComponent execute handleRequest')
      const { ui, timeout, data } = this.state
    } catch (e) {
      Logger.error(`CreateSubChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleOnRef(name, element) {
    try {
      const { ref } = this.state
      ref[name] = element
      if (name === 'username') {
        ref[name].focus()
      }
    } catch (e) {
      Logger.error(`createMissionComponent handleOnRef ${e.toString()}`)
    }
  }
  handleOnChange(name, value) {
    try {
      Logger.info('CreateSubChallengeComponent execute handleOnChange')
      Logger.debug('CreateSubChallengeComponent execute handleOnChange receive name', name)
      Logger.debug('CreateSubChallengeComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      Logger.debug('CreateSubChallengeComponent execute handleOnChange receive data', data)
      let temp = { ...data }

      delete temp['reward']
      const status = Object.values(temp).findIndex(item => item.toString() === '') == -1
      if (status !== ui.isShowBtn) {
        ui.isShowBtn = status
        this.setState({ ui })
      }
    } catch (e) {
      Logger.error(`CreateSubChallengeComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnBack() {
    try {
      Logger.info('createChallengeChildComponent execute handleOnBack')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL
      const path = route.replace(':id', ui.detailChallenge.challengeId)
      this.handleRedirectWithState(path, ui.detailChallenge)
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault()
      }
      Logger.info('createChallengeChildComponent execute handleSubmit')
      const { ui, timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleSubmit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('createChallengeChildComponent execute handleRequest')
      const { timeout, data, ui } = this.state
      const { updateSettingPrize } = this.props
      let payload = new ModelRequest()
        .setChallengeId(ui.detailChallenge.challengeId)
        .setRewardId(ui.detailChallenge.rewardId)
        .setTitle(data['title'])
        .setPoint(Number(data['point']))
        .setRank(ui.detailChallenge.rank != Number(data['rank']) ? Number(data['rank']) : undefined)
        .setReward(!Helper.isEmpty(data['reward']) ? data['reward'] : "")
      Logger.debug('CreateSubChallengeComponent execute handleRequest receive payload', payload)
      updateSettingPrize(timeout.key, payload)
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return <View ui={ui}
      timeout={timeout}
      handleOnRef={this.handleOnRef}
      handleOnChange={this.handleOnChange}
      handleOnBack={this.handleOnBack}
      handleSubmit={this.handleSubmit}
    />
  }
}

export default BaseComponent(CreateSubChallengeComponent)

