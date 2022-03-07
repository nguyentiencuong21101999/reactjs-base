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
import { ModelView, ModelRequest } from './model'
import Localize from "service/localize";
class DetailTeachingPregnancyComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleGetDetailTeachingPregnancySuccess: this.handleGetDetailTeachingPregnancySuccess.bind(this)

      },
      ui: {
        detailTeachingPregnancy: null,
      },
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
  }
  handleGetDetailTeachingPregnancySuccess(response) {
    try {
      Logger.info('DetailTeachingPregnancyComponent execute handleGetDetailTeachingPregnancySuccess')
      const { ui, timeout, data } = this.state
      this.state.timeout.setTimeout(false)
      ui.detailTeachingPregnancy = response
      this.setState({ ui });
    } catch (e) {
      Logger.error(`DetailTeachingPregnancyComponent handleGetDetailTeachingPregnancySuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSystemError() {
    try {
      Logger.info('DetailTeachingPregnancyComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`DetailTeachingPregnancyComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  componentWillUnmount() {
    try {
      Logger.info('DetailTeachingPregnancyComponent execute componentWillUnmount')
    } catch (e) {
      Logger.error(`DetailTeachingPregnancyComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('DetailTeachingPregnancyComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props

      data["pregnancyPostId"] = location.state.pregnancyPostId

    } catch (e) {
      Logger.error(`DetailTeachingPregnancyComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info('DetailTeachingPregnancyComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`DetailTeachingPregnancyComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('DetailTeachingPregnancyComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { getDetailTeachingPregnancy } = this.props

      getDetailTeachingPregnancy(timeout.key, data['pregnancyPostId'])

    } catch (e) {
      Logger.error(`DetailTeachingPregnancyComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleEdit() {
    try {
      Logger.info('DetailTeachingPregnancyComponent execute handleEdit')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY.EDIT
      const path = route.replace(':id', ui.detailTeachingPregnancy.pregnancyPostId)
      this.handleRedirectWithState(path, ui.detailTeachingPregnancy)
    } catch (e) {
      Logger.error(`DetailTeachingPregnancyComponent handleEdit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleOnBack() {
    try {
      Logger.info('DetailTeachingPregnancyComponent execute handleOnBack')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY._
      this.handleRedirectWithState(route)
    } catch (e) {
      Logger.error(`DetailTeachingPregnancyComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return ui.detailTeachingPregnancy ? <View ui={ui} timeout={timeout}
      handleEdit={this.handleEdit}
      handleOnBack={this.handleOnBack}
    /> : null
  }
}

export default BaseComponent(DetailTeachingPregnancyComponent)
