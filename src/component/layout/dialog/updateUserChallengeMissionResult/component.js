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
import MessageCenterModel from "reduxStore/reducer/messageCenter/model";
import ResponseCode from "service/responseCode";
import ChallengeEnum from 'service/enum/challenge';
import Localize from "service/localize";

class UpdateChallengeMissionResult extends Component {

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
                handleUpdateUserChallengeMissionSuccess: this.handleUpdateUserChallengeMissionSuccess.bind(this),
                handleUpdateUserChallengeMissionFailed: this.handleUpdateUserChallengeMissionFailed.bind(this)
            },
            ui: {
                result: [
                    {
                        text: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.UNCOMPLETED],
                        value: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.UNCOMPLETED,
                    },
                    {
                        text: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS_PARSE[ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.COMPLETED],
                        value: ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.COMPLETED,
                    }

                ],
                currentResult: {}
            },
            ref: {
                reason: React.createRef(),
            },

        };
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnRef = this.handleOnRef.bind(this)
        this.handleOnBack = this.handleOnBack.bind(this)
    }

    handleUpdateUserChallengeMissionSuccess(response) {
        Logger.info(`UpdateChallengePostResult execute handleUpdateChallengePostResultSuccess`);
        const { timeout, data, ui } = this.state;
        const { toast } = this.props
        toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
        timeout.setTimeout(false)
        this.handleConfirm(response)
    }

    handleUpdateUserChallengeMissionFailed() {
        Logger.info(`UpdateChallengePostResult execute handleUpdateChallengePostResultSuccess`);
        const { timeout, data, ui } = this.state;
        const { toast, handleClose } = this.props
        toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
        timeout.setTimeout(false)
        handleClose()
    }
    handleSystemError() {
        try {
            Logger.info("CreateNotifyComponent execute handleSystemError");
            const { timeout } = this.state;
            const { toast, handleClose } = this.props
            toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
            timeout.setTimeout(false)
            handleClose()
        } catch (e) {
            Logger.error(`CreateNotifyComponent handleSystemError ${e.toString()}`);
            this.state.timeout.setTimeout(false);
        }
    }
    UNSAFE_componentWillMount() {
        try {
            Logger.info("UpdateChallengePostResult execute UNSAFE_componentWillMount")
            const { ui, data } = this.state
            const { allReducer } = this.props
            const challengeId = allReducer.dialog.data.content.challengeId
            const userId = allReducer.dialog.data.content.userId
            const missionId = allReducer.dialog.data.content.missionId
            data['challengeId'] = challengeId
            data['userId'] = userId
            data['missionId'] = missionId
            data['status'] = ui.result[0].value

            ui.currentResult = ui.result[0]


        } catch (e) {
            Logger.error(`UpdateChallengePostResult UNSAFE_componentWillMount ${e.toString()}`)
        }
    }

    handleOnChange(name, value) {
        try {
            Logger.info('ProfileComponent execute handleOnChange')
            Logger.debug('ProfileComponent execute handleOnChange receive name', name)
            Logger.debug('ProfileComponent execute handleOnChange receive value', value)
            const { data, ui } = this.state
            data[name] = value
            ui.currentResult = ui.result.find(item => item.value == value)
            this.setState({ ui })
        } catch (e) {
            Logger.error(`ProfileComponent handleOnChange ${e.toString()}`)
            const { ui, timeout } = this.state;
            ui.isShowBtn = false
            timeout.setTimeout(false, e.field, e.message)
        }
    }
    handleOnRef(name, element) {
        try {
            Logger.info("UpdateChallengePostResult execute handleOnRef")
            Logger.debug("UpdateChallengePostResult execute handleOnRef receive name", name)
            const { ref, ui } = this.state
            ref[name] = element
            if (name === 'reason') {
                ref[name].current.focus()
            }
        } catch (e) {
            Logger.error(`UpdateChallengePostResult handleOnRef ${e.toString()}`)
        }
    }

    handleConfirm(response) {
        try {
            Logger.info('UpdateChallengePostResult execute handleConfirm')
            const { timeout, ui, data } = this.state;
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()(data['status'], response)
        } catch (e) {
            Logger.error(`UpdateChallengePostResult handleConfirm ${e.toString()}`)
        }
    }
    handleOnBack() {
        try {
            Logger.info('UpdateChallengePostResult execute handleOnBack')
            const { handleClose, allReducer } = this.props;
            allReducer.dialog.getHandleClose()()
            handleClose()
        } catch (e) {
            Logger.error(`UpdateChallengePostResult handleOnBack ${e.toString()}`)
        }
    }
    handleRequest() {
        try {
            Logger.info(`UpdateChallengePostResult execute handleRequest`);
            const { timeout, ui, data } = this.state;
            const { updateUserChallengeMissionResult } = this.props
            updateUserChallengeMissionResult(timeout.key, data)

        } catch (e) {
            Logger.error(`UpdateChallengePostResult execute handleRequest ${e.toString()}`);
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
        const { allReducer } = this.props;

        return (
            <Html timeout={timeout} ui={ui}
                handleClose={this.handleOnBack}
                dialog={allReducer.dialog}
                handleSubmit={this.handleSubmit}
                handleOnChange={this.handleOnChange}
                handleOnRef={this.handleOnRef} />
        )
    }

}
export default BaseComponent(UpdateChallengeMissionResult)