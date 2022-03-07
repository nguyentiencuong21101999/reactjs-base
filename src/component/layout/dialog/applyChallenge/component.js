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
class ApplyChallengeResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeout: new Timeout(
                this.setState.bind(this),
                this.handleRequest.bind(this),
            ),
            data: new ModelView(),
            func: {
                handleApplyChallengeSuccess: this.handleApplyChallengeSuccess.bind(this),
                handleApplyChallengeFailed: this.handleApplyChallengeFailed.bind(this),
                handleRemoveOrApplyFailed: this.handleRemoveOrApplyFailed.bind(this),
                handleApplyChallengeFailedByDate: this.handleApplyChallengeFailedByDate.bind(this),
                handleApplyChallengeFailedBySubChallenge: this.handleApplyChallengeFailedBySubChallenge.bind(this),
                handleSystemError: this.handleSystemError.bind(this)
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
    handleApplyChallengeSuccess() {
        Logger.info(`ApplyChallengeResult execute handleUpdateChallengeResultSuccess`);
        const { timeout, data, ui } = this.state
        const { handleClose, toast } = this.props
        handleClose()
        toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
        timeout.setTimeout(false)
        this.handleConfirm()
    }
    handleApplyChallengeFailed(response) {
        try {
            Logger.info('InfoPostComponent execute handleApplyChallengeFailed')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            timeout.setTimeout(false)
            handleClose()
        } catch (e) {
            Logger.error(`InfoPostComponent handleApplyChallengeFailed ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    handleApplyChallengeFailedBySubChallenge(response) {
        try {
            Logger.info('InfoPostComponent execute handleApplyChallengeFailed')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_TOAST_ERROR_APPLY_CHAL_WHEN_NO_SUB_APPLIED") })
            timeout.setTimeout(false)
            handleClose()
        } catch (e) {
            Logger.error(`InfoPostComponent handleApplyChallengeFailed ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    handleRemoveOrApplyFailed(response) {
        try {
            Logger.info('InfoPostComponent execute handleRemoveOrApplyFailed')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_TOAST_ERROR_APPLY_WHEN_NOT_DRAFT") })
            timeout.setTimeout(false)
            handleClose()
        } catch (e) {
            Logger.error(`InfoPostComponent handleRemoveOrApplyFailed ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    handleApplyChallengeFailedByDate(response) {
        try {
            Logger.info('InfoPostComponent execute handleApplyChallengeFailedByDate')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_TOAST_ERROR_APPLY_WHEN_STARTDATE_LESS_CURDATE") })
            timeout.setTimeout(false)
            handleClose()
        } catch (e) {
            Logger.error(`InfoPostComponent handleApplyChallengeFailedByDate ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    UNSAFE_componentWillMount() {
        try {
            Logger.info("ApplyChallengeResult execute UNSAFE_componentWillMount")
            const { ui, data } = this.state
            const { allReducer } = this.props
            const challengeId = allReducer.dialog.data.content.challengeId
            data['challengeId'] = challengeId

        } catch (e) {
            Logger.error(`ApplyChallengeResult UNSAFE_componentWillMount ${e.toString()}`)
        }
    }
    handleOnRef(name, element) {
        try {
            Logger.info("ApplyChallengeResult execute handleOnRef")
            Logger.debug("ApplyChallengeResult execute handleOnRef receive name", name)
            const { ref, ui } = this.state
            ref[name] = element
            if (name === 'reason') {
                ref[name].current.focus()
            }
        } catch (e) {
            Logger.error(`ApplyChallengeResult handleOnRef ${e.toString()}`)
        }
    }

    handleConfirm() {
        try {
            Logger.info('ApplyChallengeResult execute handleConfirm')
            const { timeout, ui, data } = this.state;
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()()
        } catch (e) {
            Logger.error(`ApplyChallengeResult handleConfirm ${e.toString()}`)
        }
    }
    handleOnBack() {
        try {
            Logger.info('ApplyChallengeResult execute handleOnBack')
            const { handleClose, allReducer } = this.props;
            allReducer.dialog.getHandleClose()()
            handleClose()
        } catch (e) {
            Logger.error(`ApplyChallengeResult handleOnBack ${e.toString()}`)
        }
    }
    handleRequest() {
        try {
            Logger.info(`ApplyChallengeResult execute handleRequest`);
            const { timeout, ui, data } = this.state;
            const { applyChallenge } = this.props

            applyChallenge(timeout.key, data)

        } catch (e) {
            Logger.error(`ApplyChallengeResult execute handleRequest ${e.toString()}`);
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
export default BaseComponent(ApplyChallengeResult)