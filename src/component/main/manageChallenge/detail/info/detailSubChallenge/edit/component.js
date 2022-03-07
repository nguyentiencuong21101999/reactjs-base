/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from 'react'
import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from 'component/main/manageChallenge/detail/info/createSubChallenge/view'
import { ModelView, ModelRequest } from './model'
import RouteEnum from 'service/enum/route'
import Helper from 'service/helper'
import Localize from "service/localize";
class EditComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleUpdateSubChallengeSuccess: this.handleUpdateSubChallengeSuccess.bind(this),
        handleGetListPostAdminSuccess: this.handleGetListPostAdminSuccess.bind(this),
        handleUpdateSubChallengeFailed: this.handleUpdateSubChallengeFailed.bind(this)
      },
      data: new ModelView(),
      ui: {
        detailSubChallenge: null,
        isShowBtn: true,
        listPostAdmin: null,
        defaultLinkUrl: [],
        req: {
          current: 0,
          getList: 0,
          update: 1
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
  handleUpdateSubChallengeSuccess(response) {
    try {
      Logger.info('EditComponent execute handleUpdateSubChallengeSuccess')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
      timeout.setTimeout(false);
      this.handleOnBack()
    } catch (e) {
      Logger.error(`EditComponent handleUpdateSubChallengeSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleUpdateSubChallengeFailed() {
    try {
      Logger.info('EditPostComponent execute handleUpdateSubChallengeFailed')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleUpdateSubChallengeFailed ${e.toString()}`)
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
      Logger.info('EditComponent execute componentWillUnmount')
    } catch (e) {
      Logger.error(`EditComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('EditComponent execute UNSAFE_componentWillMount')
      const { data, timeout, ui } = this.state
      const { location } = this.props

      ui.detailSubChallenge = { ...location.state }


      data['challengeId'] = ui.detailSubChallenge.challengeId


      Object.keys(data).map(key => {
        data[key] = ui.detailSubChallenge[key]
      })
      ui.defaultLinkUrl = ui.detailSubChallenge.posts.map(element => {
        return `${element.postId}.${element.title}`
      })
    } catch (e) {
      Logger.error(`EditComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('EditComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`EditComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('EditComponent execute handleRequest')
      const { ui, timeout, data } = this.state
    } catch (e) {
      Logger.error(`EditComponent handleRequest ${e.toString()}`)
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
      Logger.error(`EditComponent handleOnRef ${e.toString()}`)
    }
  }
  handleOnChange(name, value) {
    try {
      Logger.info('EditComponent execute handleOnChange')
      Logger.debug('EditComponent execute handleOnChange receive name', name)
      Logger.debug('EditComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value

      Logger.debug('EditComponent execute handleOnChange receive data', data)
      let temp = { ...data }
      const status = Object.values(temp).findIndex(item => item.toString() === '') == -1
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status
        this.setState({ ui })
      }
    } catch (e) {
      Logger.error(`EditComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnBack() {
    try {
      Logger.info('EditComponent execute handleOnBack')
      //this.props.history.goBack()
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL_SUB_CHALLENGE
      const path = route.replace(':id', ui.detailSubChallenge.mainChallenge)
      this.handleRedirectWithState(path, ui.detailSubChallenge)
    } catch (e) {
      Logger.error(`EditComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault()
      }
      Logger.info('EditComponent execute handleSubmit')
      const { ui, timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`EditComponent handleSubmit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnchangePostLink(name, value) {
    try {
      Logger.info('EditComponent execute handleCreateSubChallengeSuccess')
      const { ui, data } = this.state
      data[name] = !Helper.isEmpty(value) ? JSON.stringify(value) : value
      this.handleOnChange(name, data[name])
    } catch (e) {
      Logger.error(`EditComponent handleCreateSubChallengeSuccess`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleRequest() {
    try {
      Logger.info('EditComponent execute handleRequest')
      const { timeout, data, ui } = this.state
      const { updateSubChallenge, getListPostLink } = this.props
      switch (ui.req.current) {
        case ui.req.getList:
          getListPostLink(timeout.key)
          break;
        case ui.req.update:
          let payload = new ModelRequest()
            .setChallengeId(data['challengeId'])
            .setTitle(data['title'])
            .setPoint(Number(data['point']))
            .setNote(data['note'])
            .setLinkUrl(data['linkUrl'])
          Logger.debug('EditComponent execute handleRequest receive payload', payload)
          updateSubChallenge(timeout.key, payload)
          break;
        default:
          break;
      }
    } catch (e) {
      Logger.error(`EditComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleGetListPostAdminSuccess(response) {
    try {
      Logger.info('EditComponent execute handleGetListPostAdminSuccess')
      const { ui, timeout } = this.state
      timeout.setTimeout(false)
      ui.listPostAdmin = response
      ui.req.current = ui.req.update
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditComponent handleGetListPostAdminSuccess ${e.toString()}`)
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

export default BaseComponent(EditComponent)
