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
class EndChallengeResult extends Component {

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
                handleEndChallengeSuccess: this.handleEndChallengeSuccess.bind(this),
                handleEndChallengeFailed: this.handleEndChallengeFailed.bind(this),
                handleEndChallengeFailedIllegal: this.handleEndChallengeFailedIllegal.bind(this)
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
    handleEndChallengeSuccess() {
        Logger.info(`EndChallengeResult execute handleEndChallengeSuccess`);
        const { timeout, data, ui } = this.state
        const { handleClose, toast } = this.props
        toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
        handleClose()
        timeout.setTimeout(false)
        this.handleConfirm()
    }
    handleEndChallengeFailed(response) {
        try {
            Logger.info('EndChallengeResult execute handleEndChallengeFailed')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            timeout.setTimeout(false)
            handleClose()

        } catch (e) {
            Logger.error(`EndChallengeResult handleEndChallengeFailed ${e.toString()}`)
            this.state.timeout.setTimeout(false)
        }
    }
    handleEndChallengeFailedIllegal(response) {
        try {
            Logger.info('EndChallengeResult execute handleEndChallengeFailedIllegal')
            const { timeout, ui } = this.state
            const { toast, handleClose } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            timeout.setTimeout(false)
            handleClose()

        } catch (e) {
            Logger.error(`EndChallengeResult handleEndChallengeFailedIllegal ${e.toString()}`)
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
            Logger.info("EndChallengeResult execute UNSAFE_componentWillMount")
            const { ui, data } = this.state
            const { allReducer } = this.props
            const challengeId = allReducer.dialog.data.content.challengeId
            data['challengeId'] = challengeId

        } catch (e) {
            Logger.error(`EndChallengeResult UNSAFE_componentWillMount ${e.toString()}`)
        }
    }
    handleOnRef(name, element) {
        try {
            Logger.info("EndChallengeResult execute handleOnRef")
            Logger.debug("EndChallengeResult execute handleOnRef receive name", name)
            const { ref, ui } = this.state
            ref[name] = element
            if (name === 'reason') {
                ref[name].current.focus()
            }
        } catch (e) {
            Logger.error(`EndChallengeResult handleOnRef ${e.toString()}`)
        }
    }

    handleConfirm() {
        try {
            Logger.info('EndChallengeResult execute handleConfirm')
            const { timeout, ui, data } = this.state;
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()()
        } catch (e) {
            Logger.error(`EndChallengeResult handleConfirm ${e.toString()}`)
        }
    }
    handleOnBack() {
        try {
            Logger.info('EndChallengeResult execute handleOnBack')
            const { handleClose, allReducer } = this.props;
            allReducer.dialog.getHandleClose()()
            handleClose()
        } catch (e) {
            Logger.error(`EndChallengeResult handleOnBack ${e.toString()}`)
        }
    }
    handleRequest() {
        try {
            Logger.info(`EndChallengeResult execute handleRequest`);
            const { timeout, ui, data } = this.state;
            const { endChallenge } = this.props
            endChallenge(timeout.key, data)
        } catch (e) {
            Logger.error(`EndChallengeResult execute handleRequest ${e.toString()}`);
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
export default BaseComponent(EndChallengeResult)