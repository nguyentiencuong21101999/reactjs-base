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
        handleCreateSubChallengeSuccess: this.handleCreateSubChallengeSuccess.bind(this),
        handleGetListPostAdminSuccess: this.handleGetListPostAdminSuccess.bind(this),
        handleCreateSubChallengeFailed: this.handleCreateSubChallengeFailed.bind(this),


      },
      data: new ModelView(),
      ui: {
        detailChallenge: null,
        listPostAdmin: null,
        isShowBtn: true,
        defaultLinkUrl: [],
        isPostLink: false,
        req: {
          current: 0,
          getList: 0,
          create: 1
        }
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
    this.handleOnchangePostLink = this.handleOnchangePostLink.bind(this)

  }
  handleCreateSubChallengeSuccess(event) {
    try {
      Logger.info('createChallengeChildComponent execute handleCreateSubChallengeSuccess')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") })
      timeout.setTimeout(false)
      this.handleOnBack()
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleCreateSubChallengeSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleCreateSubChallengeFailed() {
    try {
      Logger.info('EditPostComponent execute handleCreateSubChallengeFailed')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleCreateSubChallengeFailed ${e.toString()}`)
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
      ui.detailChallenge = { ...location.state }
      data['mainChallenge'] = ui.detailChallenge.challengeId
      data['point'] = 0
      timeout.setTimeout()
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
  handleOnChange(name, value, error) {
    try {
      Logger.info('CreateSubChallengeComponent execute handleOnChange')
      Logger.debug('CreateSubChallengeComponent execute handleOnChange receive name', name)
      Logger.debug('CreateSubChallengeComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      ui.isPostLink = error
      Logger.debug('CreateSubChallengeComponent execute handleOnChange receive data', data)
      let temp = { ...data }
      delete temp['linkUrl']
      let status = Object.values(temp).findIndex(item => item.toString() === '') == -1 && !ui.isPostLink
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status
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
      //this.props.history.goBack()
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

  handleOnchangePostLink(name, value, error) {
    try {
      Logger.info('createChallengeChildComponent execute handleCreateSubChallengeSuccess')

      const { ui, data } = this.state
      data[name] = !Helper.isEmpty(value) ? JSON.stringify(value) : value
      this.handleOnChange(name, data[name], error)
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleCreateSubChallengeSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleGetListPostAdminSuccess(response) {
    try {
      Logger.info('createChallengeChildComponent execute handleGetListPostAdminSuccess')
      const { ui, timeout } = this.state
      timeout.setTimeout(false)
      ui.listPostAdmin = response
      ui.req.current = ui.req.create
      this.setState({ ui });
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleGetListPostAdminSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleRequest() {
    try {
      Logger.info('createChallengeChildComponent execute handleRequest')
      const { timeout, data, ui } = this.state
      const { createSubChallenge, getListPostLink } = this.props
      switch (ui.req.current) {
        case ui.req.getList:
          getListPostLink(timeout.key)
          break;
        case ui.req.create:
          let payload = new ModelRequest()
            .setMainChallenge(data['mainChallenge'])
            .setTitle(data['title'])
            .setPoint(Number(data['point']))
            .setNote(data['note'])
            .setLinkUrl(!Helper.isEmpty(data['linkUrl']) ? data['linkUrl'] : undefined)
          Logger.debug('CreateSubChallengeComponent execute handleRequest receive payload', payload)
          createSubChallenge(timeout.key, payload)
          break;
        default:
          break;
      }
    } catch (e) {
      Logger.error(`createChallengeChildComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return ui.listPostAdmin ? (<View ui={ui}
      timeout={timeout}
      handleOnRef={this.handleOnRef}
      handleOnChange={this.handleOnChange}
      handleOnBack={this.handleOnBack}
      handleSubmit={this.handleSubmit}
      handleOnchangePostLink={this.handleOnchangePostLink}
    />) : null
  }
}

export default BaseComponent(CreateSubChallengeComponent)
