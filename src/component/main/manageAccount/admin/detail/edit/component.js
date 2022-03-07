import React, { Component } from 'react'
import moment from 'moment'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Helper from 'service/helper'
import AdminEnum from 'service/enum/admin'
import RouteEnum from 'service/enum/route'
import Localize from 'service//localize'

import View from './view'
import { ModelView, ModelRequest } from './model'

class EditAdminComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleUpdateProfileAdminSuccess: this.handleUpdateProfileAdminSuccess.bind(this),
        handleUserNotExisted: this.handleUserNotExisted.bind(this),
        handleForbidden: this.handleForbidden.bind(this),
        handleExistedEmail: this.handleExistedEmail.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
      data: new ModelView(),
      ui: {
        data: {},
        gender: [
          {
            text: AdminEnum.GENDER_PARSE[AdminEnum.GENDER.MALE],
            value: AdminEnum.GENDER.MALE,
          },
          {
            text: AdminEnum.GENDER_PARSE[AdminEnum.GENDER.FEMALE],
            value: AdminEnum.GENDER.FEMALE,
          }
        ],
        currentGender: {

        },
        isShowBtn: false,
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      }
    }

    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)

  }

  handleUpdateProfileAdminSuccess(response) {
    try {
      Logger.info('EditAdminComponent execute handleUpdateProfileAdminSuccess')
      Logger.debug('EditAdminComponent execute handleUpdateProfileAdminSuccess receive response', response)
      const { ui, timeout, data } = this.state
      const { toast } = this.props
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ACCOUNT_UPDATE_SUCCESS") })
      timeout.setTimeout(false)
      const route = RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.DETAIL
      const path = route.replace(':id', ui.data.userId)
      this.handleRedirectWithState(path, { ...ui.data, ...response })

    } catch (e) {
      Logger.error(`EditAdminComponent handleUpdateProfileAdminSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSystemError() {
    try {
      Logger.info('EditAdminComponent execute handleSubmit')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`EditAdminComponent handleSubmit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleUserNotExisted() {
    try {
      Logger.info('EditAdminComponent execute handleUserNotExisted')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditAdminComponent handleUserNotExisted ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleForbidden() {
    try {
      Logger.info('EditAdminComponent execute handleForbidden')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditAdminComponent handleForbidden ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleExistedEmail() {
    try {
      Logger.info('EditAdminComponent execute handleExistedEmail')
      const { ui, timeout, ref } = this.state
      timeout.setTimeout(false, 'email', "LC_EMAIL_EXISTED");
      setTimeout(() => {
        ref.email.focus()
      })
    } catch (e) {
      Logger.error(`EditAdminComponent handleExistedEmail ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('EditAdminComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      ui.data = { ...location.state }

      Logger.debug('EditAdminComponent execute UNSAFE_componentWillMount receive data', ui.data)
      ui.currentGender = !Helper.isEmpty(ui.data.gender) ? ui.gender.find(item => item.value === ui.data.gender) : ui.gender[0]

      Object.keys(data).forEach(
        key => {
          switch (key) {
            case 'gender':
              data[key] = !Helper.isEmpty(ui.data[key]) ? ui.data[key] : ui.currentGender.value
              break;
            case 'dob':
              data[key] = !Helper.isEmpty(ui.data[key]) ? moment(ui.data[key]).utc(true).valueOf() : moment().utc(true).valueOf()
              break;
            default:
              data[key] = !Helper.isEmpty(ui.data[key]) ? ui.data[key] : ""

          }
        }
      )
      Logger.debug('EditAdminComponent execute UNSAFE_componentWillMount receive data', data)
    }
    catch (e) {
      Logger.error(`EditAdminComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('EditAdminComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`EditAdminComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('EditAdminComponent execute handleRequest')
      const { ui, timeout, data } = this.state
      const { update } = this.props
      const payload = new ModelRequest()
        .setGender(data['gender'])
        .setDob(data['dob'])
        .setUserName(data['username'])
        .setEmail(data['email'])
        .setFullName(data['fullName'])
        .setPhoneNumber(data['phoneNumber'])
        .setUserId(ui.data['userId'])
      Logger.debug('EditAdminComponent execute handleRequest receive payload', payload)
      update(timeout.key, payload)
    } catch (e) {
      Logger.error(`EditAdminComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault()
      }
      Logger.info('EditAdminComponent execute handleSubmit')
      const { ui, timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`EditAdminComponent handleSubmit ${e.toString()}`)
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
      Logger.error(`EditAdminComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('EditAdminComponent execute handleOnChange')
      Logger.debug('EditAdminComponent execute handleOnChange receive name', name)
      Logger.debug('EditAdminComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      if (name == 'gender') {
        ui.currentGender = ui.gender.find(item => item.value == value)
        this.setState({ ui })
      }
      let temp = { ...data }
      delete temp['phoneNumber']
      const status = (Object.values(temp).findIndex(item => item.toString() === '') == -1)
      if (status !== ui.isShowBtn) {
        ui.isShowBtn = status
        this.setState({ ui })
      }
    } catch (e) {
      Logger.error(`EditAdminComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  handleOnBack() {
    try {
      Logger.info('InfoAdminComponent execute handleOnBack')
      const { ui, data } = this.state
      const route = RouteEnum.PAGE.MANAGE_ACCOUNT.ADMIN.DETAIL
      const path = route.replace(':id', ui.data.userId)

      this.handleRedirectWithState(path, { ...ui.data })
    } catch (e) {
      Logger.error(`InfoAdminComponent handleAdminIsBan ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  render() {
    const { ui, timeout } = this.state
    return <View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit}
      handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange}
      handleOnBack={this.handleOnBack}
    />
  }
}

export default BaseComponent(EditAdminComponent)