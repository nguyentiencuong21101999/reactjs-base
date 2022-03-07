import React, {Component} from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
class ListUserComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            ui: {
            },
            func:{
            },
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
        }        
    }

    UNSAFE_componentWillMount(){
        try {
            Logger.info('ListUserComponent execute UNSAFE_componentWillMount')
            const { ui } = this.state
        } 
        catch (e) {
        Logger.error(`ListUserComponent UNSAFE_componentWillMount ${e.toString()}`)
        this.state.timeout.setTimeout(false)
        }
    }

    componentDidMount(){
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
          const { ui , timeout } = this.state
        } catch (e) {
          Logger.error(`ListUserComponent handleRequest ${e.toString()}`)
          this.state.timeout.setTimeout(false)
        }
    }

    render(){
        const { ui, timeout } = this.state
        return (
            <View/>
        )
    }
}

export default BaseComponent(ListUserComponent)