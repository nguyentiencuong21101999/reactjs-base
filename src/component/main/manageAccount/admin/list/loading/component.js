import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import LoadingCore from 'core/loading'
import toast from 'component/layout/toast'
import Localize from 'service/localize'
class LoadingListAdminComponent extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
            ui: {

            },
            func: {
                handleGetListAdminSuccess: this.handleGetListAdminSuccess.bind(this),
                handleGetListAdminNotActiveSuccess: this.handleGetListAdminSuccess.bind(this),
                handleSystemError: this.handleSystemError.bind(this),
            }
        }
    }
    handleGetListAdminSuccess(response) {
        try {
            Logger.info("LoadingListAdminComponent execute handleGetListAdminSuccess");
            Logger.debug("LoadingListAdminComponent execute handleGetListAdminSuccess receive list", response);
            const { ui, timeout } = this.state;
            const { handleSetData } = this.props
            handleSetData(response)
            timeout.setTimeout(false)
        } catch (e) {
            Logger.error(`LoadingListAdminComponent handleGetListAdminSuccess ${e.toString()}`);
        }
    }

    handleSystemError(response) {
        try {
            Logger.info('LoadingListAdminComponent execute handleAccountDoNotHaveRole')
            Logger.debug('LoadingListAdminComponent execute handleAccountDoNotHaveRole receive response', response)
            const { ref, timeout } = this.state
            const { toast } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            timeout.setTimeout(false)
        } catch (e) {
            Logger.error(`LoadingListAdminComponent handleAccountDoNotHaveRole ${e.toString()}`)
        }
    }
    componentDidMount() {
        try {
            Logger.info('LoadingListAdminComponent execute componentDidMount')
            const { timeout } = this.state
            timeout.setTimeout()
        }
        catch (e) {
            Logger.error(`LoadingListAdminComponent componentDidMount ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
            Logger.info('LoadingListAdminComponent execute handleRequest')
            const { ui, timeout } = this.state
            const { getList, getListNotActive, query, tab } = this.props
            switch (tab.current) {
                case tab.active:
                    getList(timeout.key, query)
                    break;
                case tab.notActive:
                    getListNotActive(timeout.key, query)
                    break;
            }
        } catch (e) {
            Logger.error(`LoadingListAdminComponent handleRequest ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }



    render() {
        const { timeout, ui } = this.state

        return <LoadingCore />
    }
}

export default BaseComponent(LoadingListAdminComponent)