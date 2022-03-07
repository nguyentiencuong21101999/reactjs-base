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
import ChallengeEnum from 'service/enum/challenge';

class SendNotificationChallenge extends Component {

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
                handleSendNotificationSuccess: this.handleSendNotificationSuccess.bind(this),
                handleSendNotificationFailed: this.handleSendNotificationFailed.bind(this)

            },
            ui: {
                notification: [
                    {
                        text: ChallengeEnum.CHALLENGE_NOTIFICATION_TYPE_PARSE[ChallengeEnum.CHALLENGE_NOTIFICATION_TYPE.ALL],
                        value: ChallengeEnum.CHALLENGE_NOTIFICATION_TYPE.ALL,
                    },
                    {
                        text: ChallengeEnum.CHALLENGE_NOTIFICATION_TYPE_PARSE[ChallengeEnum.CHALLENGE_NOTIFICATION_TYPE.PARTICIPANT],
                        value: ChallengeEnum.CHALLENGE_NOTIFICATION_TYPE.PARTICIPANT,
                    }

                ],
                currentNotification: {},
                isShowBtn: true
            },
            ref: {
                reason: React.createRef(),
            },

        };
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnRef = this.handleOnRef.bind(this)
        this.handleOnBack = this.handleOnBack.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
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
    handleSendNotificationSuccess() {
        Logger.info(`SendNotificationChallenge execute handleSendNotificationSuccess`);
        const { timeout, data, ui } = this.state;
        const { toast, messageCenterUpdate } = this.props
        toast({ status: "success", message: Localize.getLocalize("LC_TOAST_SEND_NOTI_SUCCESS") })
        timeout.setTimeout(false)
        this.handleConfirm()
    }
    handleSendNotificationFailed() {
        Logger.info(`SendNotificationChallenge execute handleSendNotificationFailed`);
        const { timeout } = this.state;
        const { toast } = this.props
        toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
        timeout.setTimeout(false)
        this.handleConfirm()
    }
    UNSAFE_componentWillMount() {
        try {
            Logger.info("SendNotificationChallenge execute UNSAFE_componentWillMount")
            const { ui, data } = this.state
            const { allReducer } = this.props
            const detailChallenge = allReducer.dialog.data.content
            data['challengeId'] = detailChallenge.challengeId
            data['type'] = ui.notification[0].value

            ui.currentNotification = ui.notification[0]

        } catch (e) {
            Logger.error(`SendNotificationChallenge UNSAFE_componentWillMount ${e.toString()}`)
        }
    }
    handleOnRef(name, element) {
        try {
            Logger.info("SendNotificationChallenge execute handleOnRef")
            Logger.debug("SendNotificationChallenge execute handleOnRef receive name", name)
            const { ref, ui } = this.state
            ref[name] = element
            if (name === 'reason') {
                ref[name].current.focus()
            }
        } catch (e) {
            Logger.error(`SendNotificationChallenge handleOnRef ${e.toString()}`)
        }
    }
    handleOnChange(name, value) {
        try {
            Logger.info('ProfileComponent execute handleOnChange')
            Logger.debug('ProfileComponent execute handleOnChange receive name', name)
            Logger.debug('ProfileComponent execute handleOnChange receive value', value)
            const { data, ui } = this.state
            data[name] = value
            const temp = { ...data }
            if (name === 'type') {
                ui.currentNotification = ui.notification.find(item => item.value == value)
                this.setState({ ui });
            }
            let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
            if (!status !== ui.isShowBtn) {
                ui.isShowBtn = !status;
                this.setState({ ui });
            }
        } catch (e) {
            Logger.error(`ProfileComponent handleOnChange ${e.toString()}`)
            const { ui, timeout } = this.state;
            ui.isShowBtn = false
            timeout.setTimeout(false, e.field, e.message)
        }
    }

    handleConfirm() {
        try {
            Logger.info('SendNotificationChallenge execute handleConfirm')
            const { timeout, ui, data } = this.state;
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()()
        } catch (e) {
            Logger.error(`SendNotificationChallenge handleConfirm ${e.toString()}`)
        }
    }
    handleOnBack() {
        try {
            Logger.info('SendNotificationChallenge execute handleOnBack')
            const { handleClose, allReducer } = this.props;
            allReducer.dialog.getHandleClose()()
            handleClose()
        } catch (e) {
            Logger.error(`SendNotificationChallenge handleOnBack ${e.toString()}`)
        }
    }
    handleRequest() {
        try {
            Logger.info(`SendNotificationChallenge execute handleRequest`);
            const { timeout, ui, data } = this.state;
            const { sendNotificationChallenge } = this.props
            sendNotificationChallenge(timeout.key, data)

        } catch (e) {
            Logger.error(`SendNotificationChallenge execute handleRequest ${e.toString()}`);
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
                handleOnRef={this.handleOnRef}
                handleOnChange={this.handleOnChange}
            />
        )
    }

}
export default BaseComponent(SendNotificationChallenge)