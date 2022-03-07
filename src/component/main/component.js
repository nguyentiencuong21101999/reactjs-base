/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

 import React, { Component } from 'react'
 import BaseUserComponent from 'base/component/user'
 import Timeout from 'base/component/timeout'
 import Logger from 'service/logger'
 import RouteEnum from 'service/enum/route'
 import DialogEnum from 'service/enum/dialog'
 import DialogModel from 'component/layout/dialog/model'
 import Localize from 'service/localize'


import View from './view';


 class MainComponent extends Component {
 
   constructor(props) {
     super(props)
     this.state = {
       timeout: new Timeout(this.setState.bind(this)),
       func: {
        handleTokenExpired: this.handleTokenExpired.bind(this)
       },
       ui: {},
     }
   }
 
   componentWillUnmount() {
     try {
       Logger.info('MainComponent execute componentWillUnmount')
     } catch (e) {
       Logger.error(`MainComponent componentWillUnmount ${e.toString()}`)
     }
   }
 
   UNSAFE_componentWillMount() {
     try {
       Logger.info('MainComponent execute UNSAFE_componentWillMount')
     } catch (e) {
       Logger.error(`MainComponent UNSAFE_componentWillMount ${e.toString()}`)
     }
   }

   componentDidMount() { }

   handleTokenExpired(response) {
     try {
       Logger.info('MainComponent execute handleTokenExpired')
       Logger.debug('MainComponent execute handleTokenExpired receive response', response)
       const { ref, timeout } = this.state
       const { updateModal } = this.props;
       const dialog = new DialogModel()
       dialog.setView(DialogEnum.VIEW.NOTIFY)
       dialog.setTitle(Localize.getLocalize('COMMON_TOKEN_EXPIRED_TITLE'))
       dialog.setContent(Localize.getLocalize('COMMON_TOKEN_EXPIRED_CONTENT'))
       dialog.setIcon(IconLogout)
       dialog.setHandleConfirm(() => {
         Auth.handleLogout()
         Auth.setRole()
         this.handleRedirectWithState(`${RouteEnum.PAGE.LOGIN}`)
       })
       updateModal(dialog)
     } catch (e) {
       Logger.error(`MainComponent handleTokenExpired ${e.toString()}`)
     }
   }
 
 
   render() {
     const { history } = this.props
     return (
         <View history={history}/>
     
     )
   }
 }
 
 export default BaseUserComponent(MainComponent)
 