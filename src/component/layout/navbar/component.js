import BaseComponent from 'base/component';
import React, {Component} from 'react'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import Auth from 'service/auth'
import RouteEnum from 'service/enum/route'

import View from './html'
import Localize from "service/localize";

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state={
            ui: {
                profile: {}
            },
            func:{
            },
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
        }        
        
        this.handleLogout = this.handleLogout.bind(this)
    }

    UNSAFE_componentWillMount(){
        try {
            Logger.info('ListAdminComponent execute UNSAFE_componentWillMount')
            const { ui } = this.state
            ui.profile = Auth.getPackageProfile()
        } 
        catch (e) {
        Logger.error(`ListAdminComponent UNSAFE_componentWillMount ${e.toString()}`)
        this.state.timeout.setTimeout(false)
        }
    }

    componentDidMount(){
        try {
            Logger.info('ListAdminComponent execute componentDidMount')            
            const { timeout } = this.state
        } 
        catch (e) {
        Logger.error(`ListAdminComponent componentDidMount ${e.toString()}`)
        this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
          Logger.info('ListAdminComponent execute handleRequest')
          const { ui , timeout } = this.state
        } catch (e) {
          Logger.error(`ListAdminComponent handleRequest ${e.toString()}`)
          this.state.timeout.setTimeout(false)
        }
    }

    handleLogout() {
        try {
          Logger.info('ListAdminComponent execute handleLogout')
          const { ui , timeout } = this.state
            const { updateModal, logout } = this.props;
            const dialog = new DialogModel()
            dialog.setView(DialogEnum.VIEW.CONFIRM)
            dialog.setTitle('Đăng xuất')
            dialog.setContent('Bạn có chắc muốn đăng xuất?')
            dialog.setButton('Đồng ý')
            // dialog.setIcon(IconLogout)
            dialog.setHandleConfirm(() => {
                logout(null)
                Auth.handleLogout()
                Auth.setRole()
                this.handleRedirectWithState(RouteEnum.PAGE.LOGIN)
            })
            updateModal(dialog)
        } catch (e) {
          Logger.error(`ListAdminComponent handleLogout ${e.toString()}`)
          this.state.timeout.setTimeout(false)
        }
    }

    render(){
        const { ui, timeout } = this.state
        return (
            <View ui={ui} handleLogout={this.handleLogout} />
        )
    }
}

export default BaseComponent(Navbar)