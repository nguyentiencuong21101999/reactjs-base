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
import Localize from "service/localize"

class DeclineStampComponent extends Component {

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
                handleApproveStampSuccess: this.handleApproveStampSuccess.bind(this),
            },
            ui: {
                isShowBtn: false,
            },
            ref: {
                reason: React.createRef(),
            },

        };
        this.handleConfirm = this.handleConfirm.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnRef = this.handleOnRef.bind(this)
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
    handleApproveStampSuccess(response) {
        const { timeout } = this.state;
        const { toast, messageCenterUpdate } = this.props
        timeout.setTimeout(false)
        toast({ status: 'success', message: `${Localize.getLocalize('LYT_REJECTED_STAMP_POPUP')}` })
        const messageCenterModel = new MessageCenterModel();
        messageCenterModel.setCode(ResponseCode.FRONT_END.UPDATE_STAMP_ONLINE);
        messageCenterModel.setData(response);
        messageCenterUpdate(messageCenterModel.getInfo());
        this.handleConfirm()
    }
    handleOnRef(name, element) {
        try {
            Logger.info("DeclineStampComponent execute handleOnRef")
            Logger.debug("DeclineStampComponent execute handleOnRef receive name", name)
            const { ref, ui } = this.state
            ref[name] = element
            if (name === 'reason') {
                ref[name].current.focus()
            }
        } catch (e) {
            Logger.error(`DeclineStampComponent handleOnRef ${e.toString()}`)
        }
    }

    handleConfirm() {
        try {
            Logger.info('DeclineStampComponent execute handleConfirm')
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()()
        } catch (e) {
            Logger.error(`DeclineStampComponent handleConfirm ${e.toString()}`)
        }
    }

    handleOnChange(name, value) {
        try {
            Logger.info("DeclineStampComponent execute handleOnChange");
            Logger.debug("DeclineStampComponent execute handleOnChange receive name", name);
            Logger.debug("DeclineStampComponent execute handleOnChange receive value", value);
            const { data, ui } = this.state;
            data[name] = value;
            const status =
                Object.values(data).findIndex((item) => item.toString() === "") == -1;
            if (status !== ui.isShowBtn) {
                ui.isShowBtn = status;
                this.setState({ ui });
            }
        } catch (e) {
            Logger.error(`InfoComponent handleOnChange ${e.toString()}`);
            const { ui, timeout } = this.state;
            ui.isShowBtn = false;
            timeout.setTimeout(false, e.field, e.message);
        }
    }

    handleRequest() {
        try {
            Logger.info(`DeclineStampComponent execute handleRequest`);
            const { timeout, ui, data } = this.state;
            const { declineStamp, allReducer } = this.props;
            const request = allReducer.dialog.data.content
            let payload = new ModelRequest()
            declineStamp(timeout.key, payload)
        } catch (e) {
            Logger.error(`DeclineStampComponent execute handleRequest ${e.toString()}`);
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
            <Html timeout={timeout} ui={ui} handleClose={handleClose} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} handleOnChange={this.handleOnChange} handleOnRef={this.handleOnRef} />
        )
    }

}
export default BaseComponent(DeclineStampComponent)