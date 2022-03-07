/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import RouteEnum from 'service/enum/route'
import AdminEnum from 'service/enum/admin'
import Helper from 'service/helper'
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import moment from 'moment'
import Auth from 'service/auth'

import View from './view'
import { ModelView, ModelRequest } from './model'
import Localize from 'service/localize'

class ProfileComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleTokenExpired: this.handleTokenExpired.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
        handleUpdateProfileAdminSuccess: this.handleUpdateProfileAdminSuccess.bind(this),
        handleExistedEmail:this.handleExistedEmail.bind(this)
      },
      ui: {
        isShowBtn: false,
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
      },
      ref: {
        fullName: React.createRef(),
      }
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
  }

  handleExistedEmail() {
    try {
      Logger.info('CreateAdminComponent execute handleExistedEmail')
      const { ui , timeout, ref } = this.state
      timeout.setTimeout(false, 'email',Localize.getLocalize("LC_EMAIL_EXISTED"));
      setTimeout(() => {
        ref.email.focus()
      })
    } catch (e) {
      Logger.error(`CreateAdminComponent handleExistedEmail ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
}
  componentWillUnmount() {
    try {
      Logger.info('ProfileComponent execute componentWillUnmount')
      this.state.timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`ProfileComponent componentWillUnmount ${e.toString()}`)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('ProfileComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      ui.data = Auth.getPackageProfile()

      Logger.debug('ProfileComponent execute handleRequest receive data', data)
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
    } catch (e) {
      Logger.error(`ProfileComponent UNSAFE_componentWillMount ${e.toString()}`)
    }
  }

  componentDidMount() { }

  handleUpdateProfileAdminSuccess(response) {
    try {
      Logger.info('ProfileComponent execute handleUpdateProfileAdminSuccess')
      Logger.debug('ProfileComponent execute handleUpdateProfileAdminSuccess receive response', response)
      const { ui, timeout, data } = this.state
      const {toast} = this.props
      timeout.setTimeout(false)
      const expiredAt = new Date(Number(Auth.getPackageExpired()))
      const profile = { ...ui.data, ...data }
      Auth.setPackageProfile(expiredAt, profile)
      toast({status:"success",message:Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS")})
      
      ui.isShowBtn = false
    } catch (e) {
      Logger.error(`ProfileComponent handleUpdateProfileSuccess ${e.toString()}`)
    }
  }

  handleTokenExpired(response) {
    try {
      Logger.info('ProfileComponent execute handleTokenExpired')
      Logger.debug('ProfileComponent execute handleTokenExpired receive response', response)
      const { ref, timeout } = this.state
      timeout.setTimeout(false);
      toast({status:"success",message:Localize.getLocalize("LC_SYSTEM_BUSY")})
    } catch (e) {
      Logger.error(`ProfileComponent handleTokenExpired ${e.toString()}`)
    }
  }

  handleSystemError(response) {
    try {
      Logger.info('ProfileComponent execute handleAccountDoNotHaveRole')
      Logger.debug('ProfileComponent execute handleAccountDoNotHaveRole receive response', response)
      const { ref, timeout } = this.state
      const {toast} = this.props
      timeout.setTimeout(false)
      toast({status:"success",message:Localize.getLocalize("LC_SYSTEM_BUSY")})
    } catch (e) {
      Logger.error(`ProfileComponent handleAccountDoNotHaveRole ${e.toString()}`)
    }
  }

  handleOnRef(name, element) {
    try {
      const { ref } = this.state
      ref[name] = element
      if (name === 'fullName') {
        ref[name].focus()
      }
    } catch (e) {
      Logger.error(`ProfileComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info('ProfileComponent execute handleOnChange')
      Logger.debug('ProfileComponent execute handleOnChange receive name', name)
      Logger.debug('ProfileComponent execute handleOnChange receive value', value)
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
      Logger.error(`ProfileComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnSubmit(event) {
    try {
      Logger.info('ProfileComponent execute handleOnSubmit')
      if (event) event.preventDefault()
      const { timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`ProfileComponent handleOnSubmit ${e.toString()}`)
      const { timeout } = this.state
      timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('ProfileComponent execute handleRequest')
      const { timeout, data } = this.state;
      const { updateProfile } = this.props;
      const payload = new ModelRequest()
        .setFullName(data['fullName'])
        .setEmail(data['email'])
        .setPhoneNumber(data['phoneNumber'])
        .setGender(data['gender'])
        .setDob(data['dob'] || undefined)
      Logger.debug('ProfileComponent execute handleRequest receive payload', payload)
      updateProfile(timeout.key, payload)
    } catch (e) {
      Logger.error(`ProfileComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  render() {
    const { timeout, ui } = this.state
    return (
      <View
        ui={ui}
        timeout={timeout}
        handleOnRef={this.handleOnRef}
        handleOnChange={this.handleOnChange}
        handleOnSubmit={this.handleOnSubmit}
      />
    )
  }
}

export default BaseComponent(ProfileComponent)
