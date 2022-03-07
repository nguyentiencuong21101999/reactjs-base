import React, {Component} from 'react'

import BaseComponent from 'base/component';
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import View from './view'

class ManageLoyaltyComponent extends Component {
    constructor(prop){
        super(prop)
        this.state = {
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
            ui: {
            },
            func:{

            }
        }

    }

    UNSAFE_componentWillMount(){
        try {
            Logger.info('ManageLoyaltyComponent execute UNSAFE_componentWillMount')
        } 
        catch (e) {
        Logger.error(`ManageLoyaltyComponent UNSAFE_componentWillMount ${e.toString()}`)
        this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
          Logger.info('ManageLoyaltyComponent execute handleRequest')
        } catch (e) {
          Logger.error(`ManageLoyaltyComponent handleRequest ${e.toString()}`)
          this.state.timeout.setTimeout(false)
        }
    }

    render(){
        const {timeout} = this.state
        
        return (
            <View/>
        )
    }
}

export default BaseComponent(ManageLoyaltyComponent)