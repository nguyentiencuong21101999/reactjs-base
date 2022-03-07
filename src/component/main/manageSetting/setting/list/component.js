import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
import ModelTable from 'core/table/model'
import ChallengeEnum from 'service/enum/challenge'
import SearchEnum from 'service/enum/search'

import DialogModel from 'component/layout/dialog/model'
import DialogEnum from 'service/enum/dialog'

import Helper from 'service/helper'
import { ModelView } from './model'
import HelperService from 'service/helper'
class ListSettingComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      ui: {
        
        resetPage: true,
        dataTable: null,
        searchInput: null,
        list: null,
        searchValue: "",
        tab: {
          current: 1,
          user: 1,
          admin: 2,
        },
        total: 3,
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


    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleSetData = this.handleSetData.bind(this)
    this.handleUpdateSetting = this.handleUpdateSetting.bind(this)
    this.handleRedirectDetail = this.handleRedirectDetail.bind(this)
    this.handleUpdateSettingSuccess = this.handleUpdateSettingSuccess.bind(this)
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ListSettingComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      ui.dataTable = new ModelTable()
        .setWhat(undefined)
        .setOrder(undefined)
        .setBy(undefined)
      data['search'] = "challenge.title"
      data['filterValue'] = undefined
    }
    catch (e) {
      Logger.error(`ListSettingComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('ListSettingComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`ListSettingComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ListSettingComponent execute handleRequest')
      const { ui, timeout } = this.state
    } catch (e) {
      Logger.error(`ListSettingComponent handleRequest ${e.toString()}`)
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
      Logger.error(`ListSettingComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ListSettingComponent execute handleOnChange')
      Logger.debug('ListSettingComponent execute handleOnChange receive name', name)
      Logger.debug('ListSettingComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      switch (name) {
        case 'by':
        case 'filter':
        case 'filterValue':
          data[name] = value
          break;
        case 'search':
        case 'searchValue':
          data[name] = value
          break;
          break;
      }
    } catch (e) {
      Logger.error(`ListSettingComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleSetData(data) {
    try {
      Logger.info("ListSettingComponent execute handleSetData");
      Logger.debug("ListSettingComponent execute handleSetData receive list", data);
      const { ui, timeout } = this.state;
      ui.list = data.config;
      ui.total = data.total;
      Logger.debug("ListSettingComponent execute handleSetData receive list", ui.list);
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ListSettingComponent handleSetData ${e.toString()}`);
    }
  }

  handleUpdateSetting(item,index) {
    try {
      Logger.info('ListSettingComponent execute handleUpdateSetting')
      const { ui } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.UPDATE_SETTING)
      dialog.setContent({configId:item.configId})
      dialog.setHandleConfirm((value) => {
        this.handleUpdateSettingSuccess(value,index)
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`ListSettingComponent handleUpdateSetting ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleUpdateSettingSuccess(item,index){
    try {
      Logger.info('ListSettingComponent execute handleUpdateSettingSuccess')
      const { ui } = this.state
      ui.list[index] = item;
      this.setState({ ui })
    } catch (e) {
      Logger.error(`ListSettingComponent handleUpdateSetting ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleRedirectDetail(item) {
    try {
      Logger.info('ListSettingComponent execute handleRedirectDetail')
      Logger.debug('ListSettingComponent execute handleRedirectDetail recieve item', item)
      const { ui } = this.state
    } catch (e) {
      Logger.error(`ListSettingComponent handleRedirectDetail ${e.toString()}`)
      const { ui, timeout } = this.state;
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  render() {
    const { ui, timeout } = this.state
    return (
      <View ui={ui}
        timeout={timeout}
        handleOnRef={this.handleOnRef} handleSetData={this.handleSetData}
         handleCreate={this.handleCreate}
        handleRedirectDetail={this.handleRedirectDetail}
        handleUpdateSetting={this.handleUpdateSetting}
        />
    )
  }
}

export default BaseComponent(ListSettingComponent)