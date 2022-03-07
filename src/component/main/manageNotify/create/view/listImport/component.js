import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import RouteEnum from 'service/enum/route'
import NotifyEnum from 'service/enum/notify'
import Helper from 'service/helper'
import { ModelView } from './model'
class ListUserComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {

        tab: {
          current: NotifyEnum.TAB_LIST_DATA.EXISTED,
          existed: NotifyEnum.TAB_LIST_DATA.EXISTED,
          notExists: NotifyEnum.TAB_LIST_DATA.NOT_EXISTS,
        },
        list: {
          [NotifyEnum.TAB_LIST_DATA.EXISTED]: null,
          [NotifyEnum.TAB_LIST_DATA.NOT_EXISTS]: null,
        }
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

    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleChangeTab = this.handleChangeTab.bind(this)
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListUserComponent execute UNSAFE_componentWillMount')
      const { ui } = this.state
      const { list } = this.props
      ui.list[NotifyEnum.TAB_LIST_DATA.EXISTED] = list.existentList
      ui.list[NotifyEnum.TAB_LIST_DATA.NOT_EXISTS] = list.nonExistentList
    }
    catch (e) {
      Logger.error(`ListUserComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListUserComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListUserComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListUserComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListUserComponent handleRequest ${e.toString()}`)
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
      Logger.error(`ListUserComponent handleOnRef ${e.toString()}`)
    }
  }
  handleSetData(data) {
    try {
      Logger.info("ListUserComponent execute handleSetData");
      Logger.debug("ListUserComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list[ui.tab.current] = data.list;
      ui.total[ui.tab.current] = data.total;
      Logger.debug("ListUserComponent execute handleSetData receive list", ui.list[ui.tab.current]);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListUserComponent handleSetData ${e.toString()}`);
    }
  }


  handleCreate(event) {
    try {
      Logger.info('ListUserComponent execute handleCreate')
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.CREATE)
    } catch (e) {
      Logger.error(`ListUserComponent handleCreate ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleChangeTab(event, value) {
    try {
      Logger.info('ListUserComponent execute handleChangeTab')
      Logger.debug('ListUserComponent execute handleChangeTab recieve value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      switch (value) {
        case `${NotifyEnum.TAB_LIST_DATA.EXISTED}`:
          ui.tab.current = ui.tab.existed;
          break;
        case `${NotifyEnum.TAB_LIST_DATA.NOT_EXISTS}`:
          ui.tab.current = ui.tab.notExists;
          break;
      }
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListUserComponent handleChangeTab ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  };
  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui} handleOnChangeTableValue={this.handleOnChangeTableValue}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
        handleCreate={this.handleCreate} handleChangeTab={this.handleChangeTab} />
    )
  }
}

export default BaseComponent(ListUserComponent)