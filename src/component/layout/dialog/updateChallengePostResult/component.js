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
import PostEnum from 'service/enum/post'

class UpdateChallengePostResult extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeout: new Timeout(
                this.setState.bind(this),
                this.handleRequest.bind(this),
            ),
            data: new ModelView(),
            func: {
                handleUpdateChallengePostResultSuccess: this.handleUpdateChallengePostResultSuccess.bind(this),
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

    UNSAFE_componentWillMount() {
        try {
            Logger.info("UpdateChallengePostResult execute UNSAFE_componentWillMount")
            const { ui, data } = this.state
            const { allReducer } = this.props
            const postId = allReducer.dialog.data.content.postId
            const valid = allReducer.dialog.data.content.valid
            data['valid'] = valid
            data['postId'] = postId


        } catch (e) {
            Logger.error(`UpdateChallengePostResult UNSAFE_componentWillMount ${e.toString()}`)
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

    handleConfirm() {
        try {
            Logger.info('UpdateChallengePostResult execute handleConfirm')
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()()
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
            const { updateChallengePostResult } = this.props
            updateChallengePostResult(timeout.key, data)

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

    handleUpdateChallengePostResultSuccess() {
        Logger.info(`UpdateChallengePostResult execute handleUpdateChallengePostResultSuccess`);
        const { timeout, data, ui } = this.state;
        const { toast, messageCenterUpdate } = this.props
        timeout.setTimeout(false)
        this.handleConfirm()
    }

    render() {
        const { timeout, ui } = this.state
        const { handleClose, allReducer } = this.props;

        return (
            <Html timeout={timeout} ui={ui} handleClose={this.handleOnBack} dialog={allReducer.dialog} handleSubmit={this.handleSubmit} handleOnRef={this.handleOnRef} />
        )
    }

}
export default BaseComponent(UpdateChallengePostResult)