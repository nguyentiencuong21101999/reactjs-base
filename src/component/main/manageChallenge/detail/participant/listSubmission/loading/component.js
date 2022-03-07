import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import SearchEnum from 'service/enum/search'
import LoadingCore from 'core/loading'
import Localize from "service/localize";
class LoadingListSubmissionComponent extends Component {
    constructor(prop) {
        super(prop)
        this.state = {
            timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
            ui: {

            },
            func: {
                handleGetListPostParticipantSuccess: this.handleGetListPostParticipantSuccess.bind(this),
                handleSystemError: this.handleSystemError.bind(this)
            }
        }
    }
    handleGetListPostParticipantSuccess(response) {
        try {
            Logger.info("LoadingListSubmissionComponent execute handleGetListPostParticipantSuccess");
            Logger.debug("LoadingListSubmissionComponent execute handleGetListPostParticipantSuccess receive list", response);
            const { ui, timeout } = this.state;
            const { handleSetData } = this.props
            handleSetData(response)
            timeout.setTimeout(false)
        } catch (e) {
            Logger.error(`LoadingListSubmissionComponent handleGetListPostParticipantSuccess ${e.toString()}`);
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
            Logger.info('LoadingListSubmissionComponent execute componentDidMount')
            const { timeout } = this.state
            timeout.setTimeout()
        }
        catch (e) {
            Logger.error(`LoadingListSubmissionComponent componentDidMount ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }

    handleRequest() {
        try {
            Logger.info('LoadingListSubmissionComponent execute handleRequest')
            const { ui, timeout } = this.state
            const { getListPostParticipant, query } = this.props
            getListPostParticipant(timeout.key, query)
        }
        catch (e) {
            Logger.error(`LoadingListSubmissionComponent handleRequest ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }



    render() {
        const { timeout, ui } = this.state

        return <LoadingCore />
    }
}

export default BaseComponent(LoadingListSubmissionComponent)