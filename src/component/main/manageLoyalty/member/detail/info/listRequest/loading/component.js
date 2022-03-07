import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
import Localize from "service/localize";
class LoadingListHistoryPointComponent extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
            ui: {

            },
            func: {
                handleGetHistorySuccess: this.handleGetHistorySuccess.bind(this),
                handleSystemError: this.handleSystemError.bind(this)
            }
        }
    }
    handleGetHistorySuccess(response) {
        try {
            Logger.info("LoadingListHistoryPointComponent execute handleGetHistorySuccess");
            Logger.debug("LoadingListHistoryPointComponent execute handleGetHistorySuccess receive list", response);
            const { ui, timeout } = this.state;
            const { handleSetData } = this.props
            handleSetData(response)
            timeout.setTimeout(false)
        } catch (e) {
            Logger.error(`LoadingListHistoryPointComponent handleGetListRequestSuccess ${e.toString()}`);
        }
    }
    handleSystemError() {
        try {
            Logger.info('EditPostComponent execute handleSystemError')
            const { ui, timeout } = this.state
            const { toast } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            timeout.setTimeout(false);
        } catch (e) {
            Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    componentDidMount() {
        try {
            Logger.info('LoadingListHistoryPointComponent execute componentDidMount')
            const { timeout } = this.state
            timeout.setTimeout()
        }
        catch (e) {
            Logger.error(`LoadingListHistoryPointComponent componentDidMount ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
            Logger.info('LoadingListHistoryPointComponent execute handleRequest')
            const { ui, timeout } = this.state
            const { getListHistory, query } = this.props
            getListHistory(timeout.key, query)
        } catch (e) {
            Logger.error(`LoadingListHistoryPointComponent handleRequest ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }



    render() {
        const { timeout, ui } = this.state

        return <LoadingCore />
    }
}

export default BaseComponent(LoadingListHistoryPointComponent)