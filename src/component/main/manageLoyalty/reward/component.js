import React, {Component} from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'
class RewardComponent extends Component {
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
            Logger.info('RewardComponent execute UNSAFE_componentWillMount')
            const { ui } = this.state
        } 
        catch (e) {
        Logger.error(`RewardComponent UNSAFE_componentWillMount ${e.toString()}`)
        this.state.timeout.setTimeout(false)
        }
    }

    componentDidMount(){
        try {
            Logger.info('RewardComponent execute componentDidMount')            
            const { timeout } = this.state
        } 
        catch (e) {
        Logger.error(`RewardComponent componentDidMount ${e.toString()}`)
        this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
          Logger.info('RewardComponent execute handleRequest')
          const { ui , timeout } = this.state
        } catch (e) {
          Logger.error(`RewardComponent handleRequest ${e.toString()}`)
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

export default BaseComponent(RewardComponent)