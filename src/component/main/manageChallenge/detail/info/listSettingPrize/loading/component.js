import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import SearchEnum from 'service/enum/search'
import LoadingCore from 'core/loading'
import Localize from "service/localize";
class LoadingListSettingPrizeComponent extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
            ui: {

            },
            func: {
                handleGetListSettingPrizeSuccess: this.handleGetListSettingPrizeSuccess.bind(this),
                handleGetListSettingPrizeFailed: this.handleGetListSettingPrizeFailed.bind(this),
                handleSystemError: this.handleSystemError.bind(this)
            }
        }
    }

    handleGetListSettingPrizeSuccess(response) {
        try {
            Logger.info("LoadingListSettingPrizeComponent execute handleGetListSettingPrizeSuccess");
            Logger.debug("LoadingListSettingPrizeComponent execute handleGetListSettingPrizeSuccess receive list", response);
            const { ui, timeout } = this.state;
            const { handleSetData } = this.props
            handleSetData(response)
            timeout.setTimeout(false)
        } catch (e) {
            Logger.error(`LoadingListSettingPrizeComponent handleGetListSettingPrizeSuccess ${e.toString()}`);
        }
    }
    handleGetListSettingPrizeFailed(response) {
        try {
            Logger.info("LoadingListSettingPrizeComponent execute handleGetListSettingPrizeFailed");
            Logger.debug("LoadingListSettingPrizeComponent execute handleGetListSettingPrizeFailed receive list", response);
            const { ui, timeout } = this.state
            const { toast } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            timeout.setTimeout(false);
        } catch (e) {
            Logger.error(`LoadingListSettingPrizeComponent handleGetListSettingPrizeFailed ${e.toString()}`);
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
            Logger.info('LoadingListSettingPrizeComponent execute componentDidMount')
            const { timeout } = this.state
            timeout.setTimeout()
        }
        catch (e) {
            Logger.error(`LoadingListSettingPrizeComponent componentDidMount ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
            Logger.info('LoadingListSettingPrizeComponent execute handleRequest')
            const { ui, timeout } = this.state
            const { getListSettingPrize, query } = this.props
            getListSettingPrize(timeout.key, query.challengeId)
        } catch (e) {
            Logger.error(`LoadingListSettingPrizeComponent handleRequest ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }

    render() {
        const { timeout, ui } = this.state

        return <LoadingCore />
    }
}

export default BaseComponent(LoadingListSettingPrizeComponent)