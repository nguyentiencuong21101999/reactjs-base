import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Localize from "service/localize";
import LoadingCore from 'core/loading'
class LoadingListUserComponent extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
            ui: {

            },
            func: {
                handleGetListParticipantSuccess: this.handleGetListParticipantSuccess.bind(this),
                handleSystemError: this.handleSystemError.bind(this)
            }
        }
    }
    handleGetListParticipantSuccess(response) {
        try {
            Logger.info("LoadingListUserComponent execute handleGetListParticipantSuccess");
            Logger.debug("LoadingListUserComponent execute handleGetListParticipantSuccess receive list", response);
            const { ui, timeout } = this.state;
            const { handleSetData } = this.props
            handleSetData(response)
            timeout.setTimeout(false)
        } catch (e) {
            Logger.error(`LoadingListUserComponent handleGetListParticipantSuccess ${e.toString()}`);
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
            const { getListParticipant, query } = this.props
            getListParticipant(timeout.key, query)
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