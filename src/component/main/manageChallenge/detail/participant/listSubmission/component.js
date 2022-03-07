import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'

import Helper from 'service/helper'
import { ModelView } from './model'

class ListSubmissionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {
        list: null,
        total: 0,
        detailParticipant: null,
        dataTable: null,
        index: 0


      },
      func: {
      },
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ref: {
        type: React.createRef(),
        filter: React.createRef(),
        search: React.createRef(),
      }
    }
    this.handleOnChangeTableValue = this.handleOnChangeTableValue.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListSubmissionComponent execute UNSAFE_componentWillMount')
      const { ui } = this.state
      const { location } = this.props
      ui.detailParticipant = { ...location.state }
      ui.dataTable = new ModelTable()
        .setWhat('post')
        .setOrder("createdAt")
        .setBy("desc")
      ui.dataTable.challengeId = ui.detailParticipant.challengeId
      ui.dataTable.userId = ui.detailParticipant.userId
    }
    catch (e) {
      Logger.error(`ListSubmissionComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListSubmissionComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListSubmissionComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListSubmissionComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListSubmissionComponent handleRequest ${e.toString()}`)
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
      Logger.error(`ListSubmissionComponent handleOnRef ${e.toString()}`)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListSubmissionComponent execute handleSetData");
      Logger.debug("ListSubmissionComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.list;
      ui.total = data.total;
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListSubmissionComponent handleSetData ${e.toString()}`);
    }
  }

  handleOnChangeTableValue(query) {
    try {
      Logger.info("ListPostComponent execute handleOnChangeTableValue");
      Logger.debug("ListPostComponent execute handleOnChangeTableValue receive query", query);
      const { ui } = this.state
      ui.list = null
      ui.dataTable.limit = query.limit
      ui.dataTable.from = query.from
      this.setState({ ui: ui });
    } catch (e) {
      Logger.error(`ListPostComponent handleOnChangeTableValue ${e.toString()}`);
    }
  }

  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleOnChangeTableValue={this.handleOnChangeTableValue}
      />
    )
  }
}

export default BaseComponent(ListSubmissionComponent)