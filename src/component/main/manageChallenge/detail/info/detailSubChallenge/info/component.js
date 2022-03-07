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
import RouteEnum from 'service/enum/route'
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import Localize from "service/localize";
import Helper from "service/helper"
class DetailSubChallengeComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleGetDetailSubChallengeSuccess: this.handleGetDetailSubChallengeSuccess.bind(this)

      },
      ui: {
        detailChallengeChain: null,
        detailSubChallenge: null,
        tab: {
          current: 1
        }
      },
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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
  handleGetDetailSubChallengeSuccess(response) {
    try {
      Logger.info('DetailSubChallengeComponent execute handleGetDetailSubChallengeSuccess')
      const { ui, timeout, data } = this.state
      this.state.timeout.setTimeout(false)
      ui.detailSubChallenge = response
      this.setState({ ui });
    } catch (e) {
      Logger.error(`DetailSubChallengeComponent handleGetDetailSubChallengeSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentWillUnmount() {
    try {
      Logger.info('DetailSubChallengeComponent execute componentWillUnmount')
    } catch (e) {
      Logger.error(`DetailSubChallengeComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('DetailSubChallengeComponent execute UNSAFE_componentWillMount')
      const { ui } = this.state
      const { location } = this.props
      const { state } = this.props.location
      ui.detailChallengeChain = { ...location.state }
      ui.tab.current = Helper.isExistedTab(state, ui.tab.current)
    } catch (e) {
      Logger.error(`DetailSubChallengeComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('DetailSubChallengeComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`DetailSubChallengeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('DetailSubChallengeComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { getDetailSubChallenge } = this.props
      getDetailSubChallenge(timeout.key, ui.detailChallengeChain.challengeId)

    } catch (e) {
      Logger.error(`DetailSubChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleEdit() {
    try {
      Logger.info('DetailSubChallengeComponent execute handleEdit')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.EDIT_SUB_CHALLENGE
      const path = route.replace(':id', ui.detailChallengeChain.challengeId)
      this.handleRedirectWithState(path, { ...ui.detailSubChallenge, tab: ui.tab.current })
    } catch (e) {
      Logger.error(`DetailSubChallengeComponent handleEdit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleOnBack() {
    try {
      Logger.info('DetailSubChallengeComponent execute handleOnBack')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL
      const path = route.replace(':id', ui.detailSubChallenge.mainChallenge)
      this.handleRedirectWithState(path, { challengeId: ui.detailSubChallenge.mainChallenge, tab: ui.detailChallengeChain.tab })
    } catch (e) {
      Logger.error(`DetailSubChallengeComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleRemove(value, row) {
    try {
      Logger.info('DetailSubChallengeComponent execute handleUpdateChallengePostResult')
      const { ui } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()

      dialog.setView(DialogEnum.VIEW.REMOVE_SUB_CHALLENGE)
      dialog.setContent({ challengeId: ui.detailSubChallenge.challengeId })
      dialog.setHandleConfirm(() => { this.handleOnBack() })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`DetailSubChallengeComponent handleOnCheck ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return ui.detailSubChallenge ? <View ui={ui} timeout={timeout}
      handleEdit={this.handleEdit}
      handleOnBack={this.handleOnBack}
      handleRemove={this.handleRemove}
    /> : null
  }
}

export default BaseComponent(DetailSubChallengeComponent)
