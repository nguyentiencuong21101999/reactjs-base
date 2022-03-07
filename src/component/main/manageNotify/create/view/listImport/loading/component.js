import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
class LoadingListUserComponent extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
            ui: {

            },
            func: {
            }
        }
    }

    componentDidMount() {
        try {
            Logger.info('LoadingListUserComponent execute componentDidMount')
            const { timeout } = this.state
            timeout.setTimeout()
        }
        catch (e) {
            Logger.error(`LoadingListUserComponent componentDidMount ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
            Logger.info('LoadingListUserComponent execute handleRequest')
            const { ui, timeout } = this.state
        } catch (e) {
            Logger.error(`LoadingListUserComponent handleRequest ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }


    render() {
        const { timeout, ui } = this.state

        return <LoadingCore />
    }
}

export default BaseComponent(LoadingListUserComponent)