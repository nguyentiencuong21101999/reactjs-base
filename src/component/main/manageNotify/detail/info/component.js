import React, { Component } from 'react'
import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import { ModelView, ModelRequest } from './model'
import Localize from "service/localize";
class InfoNotifyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this)
      },
      ui: {
        detailNotify: {},
      },
    }
    this.handleOnBack = this.handleOnBack.bind(this)
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
  UNSAFE_componentWillMount() {
    try {
      Logger.info('InfoNotifyComponent execute UNSAFE_componentWillMount')
      const { ui, req } = this.state
      const { location } = this.props
      ui.detailNotify = location.state
    }
    catch (e) {
      Logger.error(`InfoNotifyComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('InfoNotifyComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`InfoNotifyComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('InfoNotifyComponent execute handleRequest')
      const { ui, timeout, req } = this.state
    } catch (e) {
      Logger.error(`InfoNotifyComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnBack() {
    try {
      Logger.info('InfoNotifyComponent execute handleOnBack')
      this.props.history.goBack()
    } catch (e) {
      Logger.error(`InfoNotifyComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  render() {
    const { ui, timeout, data } = this.state
    return <View ui={ui} data={data} timeout={timeout}
      handleOnBack={this.handleOnBack} />
  }
}

export default BaseComponent(InfoNotifyComponent)