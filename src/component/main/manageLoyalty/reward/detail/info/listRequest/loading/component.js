import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
import Localize from "service/localize";
class LoadingListRequestComponent extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
            ui: {

            },
            func: {
                handleGetListRequestSuccess: this.handleGetListRequestSuccess.bind(this),
                handleSystemError: this.handleSystemError.bind(this)
            }
        }
    }
    handleGetListRequestSuccess(response) {
        try {
            Logger.info("LoadingListRequestComponent execute handleGetListRequestSuccess");
            Logger.debug("LoadingListRequestComponent execute handleGetListRequestSuccess receive list", response);
            const { ui, timeout } = this.state;
            const { handleSetData } = this.props
            handleSetData(response)
            timeout.setTimeout(false)
        } catch (e) {
            Logger.error(`LoadingListRequestComponent handleGetListRequestSuccess ${e.toString()}`);
        }
    }

    handleSystemError() {
        try {
            Logger.info('LoadingListRequestComponent execute handleSystemError')
            const { ui, timeout } = this.state
            const { toast } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            timeout.setTimeout(false);
        } catch (e) {
            Logger.error(`LoadingListRequestComponent handleSystemError ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }

    componentDidMount() {
        try {
            Logger.info('LoadingListRequestComponent execute componentDidMount')
            const { timeout } = this.state
            timeout.setTimeout()
        }
        catch (e) {
            Logger.error(`LoadingListRequestComponent componentDidMount ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
            Logger.info('LoadingListRequestComponent execute handleRequest')
            const { ui, timeout } = this.state
            const { getListRequired, query } = this.props
            getListRequired(timeout.key, query)
        } catch (e) {
            Logger.error(`LoadingListRequestComponent handleRequest ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }


    render() {
        const { timeout, ui } = this.state

        return <LoadingCore />
    }
}

export default BaseComponent(LoadingListRequestComponent)