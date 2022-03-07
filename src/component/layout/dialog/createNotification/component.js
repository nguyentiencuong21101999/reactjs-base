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
import Localize from 'service/localize';
class createNotification extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeout: new Timeout(
                this.setState.bind(this),
                this.handleRequest.bind(this),
            ),
            data: new ModelView(),
            func: {
                handleCreateNotificationSuccess: this.handleCreateNotificationSuccess.bind(this),
                handleCreateNotificationFailed: this.handleCreateNotificationFailed.bind(this),
                handleSystemError: this.handleSystemError.bind(this),
            },
            ui: {
                payload: null

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
    handleCreateNotificationSuccess() {
        Logger.info(`createNotification execute handleSendNotificationSuccess`);
        const { timeout, data, ui } = this.state;
        const { toast } = this.props
        toast({ status: "success", message: Localize.getLocalize("LC_TOAST_SEND_NOTI_SUCCESS") })
        timeout.setTimeout(false)
        this.handleConfirm()
    }
    handleCreateNotificationFailed() {
        Logger.info(`createNotification execute handleCreateNotificationFailed`);
        const { timeout } = this.state;
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
            Logger.info("createNotification execute UNSAFE_componentWillMount")
            const { ui, data } = this.state
            const { allReducer } = this.props
            ui.payload = allReducer.dialog.data.content

        } catch (e) {
            Logger.error(`createNotification UNSAFE_componentWillMount ${e.toString()}`)
        }
    }
    handleOnRef(name, element) {
        try {
            Logger.info("createNotification execute handleOnRef")
            Logger.debug("createNotification execute handleOnRef receive name", name)
            const { ref, ui } = this.state
            ref[name] = element
            if (name === 'reason') {
                ref[name].current.focus()
            }
        } catch (e) {
            Logger.error(`createNotification handleOnRef ${e.toString()}`)
        }
    }
    handleOnChange(name, value) {
        try {
            Logger.info('createNotification execute handleOnChange')
            Logger.debug('createNotification execute handleOnChange receive name', name)
            Logger.debug('createNotification execute handleOnChange receive value', value)
            const { data, ui } = this.state
            data[name] = value

            ui.currentNotification = ui.notification.find(item => item.value == value)
            this.setState({ ui })
        } catch (e) {
            Logger.error(`createNotification handleOnChange ${e.toString()}`)
            const { ui, timeout } = this.state;
            ui.isShowBtn = false
            timeout.setTimeout(false, e.field, e.message)
        }
    }

    handleConfirm() {
        try {
            Logger.info('createNotification execute handleConfirm')
            const { timeout, ui, data } = this.state;
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()()
        } catch (e) {
            Logger.error(`createNotification handleConfirm ${e.toString()}`)
        }
    }
    handleOnBack() {
        try {
            Logger.info('createNotification execute handleOnBack')
            const { handleClose, allReducer } = this.props;
            allReducer.dialog.getHandleClose()()
            handleClose()
        } catch (e) {
            Logger.error(`createNotification handleOnBack ${e.toString()}`)
        }
    }
    handleRequest() {
        try {
            Logger.info(`createNotification execute handleRequest`);
            const { timeout, ui, data } = this.state;
            const { createNotification } = this.props
            createNotification(timeout.key, ui.payload)

        } catch (e) {
            Logger.error(`createNotification execute handleRequest ${e.toString()}`);
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
export default BaseComponent(createNotification)