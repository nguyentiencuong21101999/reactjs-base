/**
 * Created By Nguyen Cong Thanh on 29/09/2019 18:34.
 *
 * Copyright intelIn 2019.
 */

import React, { Component, Fragment } from 'react'
import BaseComponent from "base/component";
import Logger from 'service/logger'

import Html from './html'
import Timeout from "base/component/timeout";
import { ModelRequest, ModelView } from "./model";
import Localize from "service/localize";

class UpdateChallengeResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeout: new Timeout(
                this.setState.bind(this),
                this.handleRequest.bind(this),
            ),
            data: new ModelView(),
            func: {
                handleSystemError: this.handleSystemError.bind(this),
                handleUpdateChallengeResultSuccess: this.handleUpdateChallengeResultSuccess.bind(this),
                handleUpdateChallengeResultFail: this.handleUpdateChallengeResultFail.bind(this),
                handleUpdateChallengeResultFailed: this.handleUpdateChallengeResultFailed.bind(this)
            },
            ui: {

            },
            ref: {
                reason: React.createRef(),
            },

        };
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnRef = this.handleOnRef.bind(this)
        this.handleOnBack = this.handleOnBack.bind(this)
    }
    handleUpdateChallengeResultSuccess() {
        try {
            Logger.info(`UpdateChallengeResult execute handleUpdateChallengeResultSuccess`);
            const { timeout, data, ui } = this.state
            const { handleClose, toast } = this.props
            handleClose()
            timeout.setTimeout(false)
            this.handleConfirm()
            toast({ status: "success", message: Localize.getLocalize("LC_TOAST_PUBLISH_RESULT_SUCCESS") })
        } catch (e) {
            Logger.error(`InfoPostComponent handleUpdateChallengeResultFail ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    handleUpdateChallengeResultFail(response) {
        try {
            Logger.info('UpdateChallengeResult execute handleUpdateChallengeResultFail')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            timeout.setTimeout(false)
            handleClose()
            toast({ status: "error", message: Localize.getLocalize("LC_TOAST_PUBLISH_RESULT_WHEN_NO_RANK") })
        } catch (e) {
            Logger.error(`InfoPostComponent handleUpdateChallengeResultFail ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    handleUpdateChallengeResultFailByTime(response) {
        try {
            Logger.info('UpdateChallengeResult execute handleUpdateChallengeResultFailByTime')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            timeout.setTimeout(false)
            handleClose()
            toast({ status: "error", message: Localize.getLocalize("LC_TOAST_PUBLISH_RESULT_WHEN_NOT_ENDED") })
        } catch (e) {
            Logger.error(`InfoPostComponent handleUpdateChallengeResultFail ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    handleUpdateChallengeResultFailed(response) {
        try {
            Logger.info('UpdateChallengeResult execute handleUpdateChallengeResultFailed')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            timeout.setTimeout(false)
            handleClose()
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
        } catch (e) {
            Logger.error(`InfoPostComponent handleUpdateChallengeResultFail ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    handleSystemError() {
        try {
            Logger.info("CreateNotifyComponent execute handleSystemError");
            const { timeout } = this.state;
            const { toast, handleClose } = this.props
            timeout.setTimeout(false)
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            handleClose()
        } catch (e) {
            Logger.error(`CreateNotifyComponent handleSystemError ${e.toString()}`);
            this.state.timeout.setTimeout(false);
        }
    }
    UNSAFE_componentWillMount() {
        try {
            Logger.info("UpdateChallengeResult execute UNSAFE_componentWillMount")
            const { ui, data } = this.state
            const { allReducer } = this.props
            const challengeId = allReducer.dialog.data.content.challengeId
            data['challengeId'] = challengeId

        } catch (e) {
            Logger.error(`UpdateChallengeResult UNSAFE_componentWillMount ${e.toString()}`)
        }
    }
    handleOnRef(name, element) {
        try {
            Logger.info("UpdateChallengeResult execute handleOnRef")
            Logger.debug("UpdateChallengeResult execute handleOnRef receive name", name)
            const { ref, ui } = this.state
            ref[name] = element
            if (name === 'reason') {
                ref[name].current.focus()
            }
        } catch (e) {
            Logger.error(`UpdateChallengeResult handleOnRef ${e.toString()}`)
        }
    }

    handleConfirm() {
        try {
            Logger.info('UpdateChallengeResult execute handleConfirm')
            const { timeout, ui, data } = this.state;
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()()
        } catch (e) {
            Logger.error(`UpdateChallengeResult handleConfirm ${e.toString()}`)
        }
    }
    handleOnBack() {
        try {
            Logger.info('UpdateChallengeResult execute handleOnBack')
            const { handleClose, allReducer } = this.props;
            allReducer.dialog.getHandleClose()()
            handleClose()
        } catch (e) {
            Logger.error(`UpdateChallengeResult handleOnBack ${e.toString()}`)
        }
    }
    handleRequest() {
        try {
            Logger.info(`UpdateChallengeResult execute handleRequest`);
            const { timeout, ui, data } = this.state;
            const { updateChallengeResult } = this.props

            updateChallengeResult(timeout.key, data)

        } catch (e) {
            Logger.error(`UpdateChallengeResult execute handleRequest ${e.toString()}`);
            const { timeout } = this.state;
            timeout.setTimeout(false, e.field, e.message);
        }
    }

    handleSubmit() {
        const { timeout } = this.state;
        timeout.setTimeout()
    }


    render() {
        const { timeout, ui } = this.state
        const { handleClose, allReducer } = this.props;

        return (
            <Html timeout={timeout} ui={ui}
                handleClose={this.handleOnBack}
                dialog={allReducer.dialog}
                handleSubmit={this.handleSubmit}
                handleOnRef={this.handleOnRef} />
        )
    }

}
export default BaseComponent(UpdateChallengeResult)