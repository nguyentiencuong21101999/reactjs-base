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

class ExpiredTokenComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeout: new Timeout(
                this.setState.bind(this),
            ),
            func: {},
            ui: {
                isShowBtn: true,
            },
            ref: {
                reason: React.createRef(),
            },

        };
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    handleConfirm() {
        try {
            Logger.info('ExpiredTokenComponent execute handleConfirm')
            const { handleClose, allReducer } = this.props;
            handleClose()
            allReducer.dialog.getHandleConfirm()()
        } catch (e) {
            Logger.error(`ExpiredTokenComponent handleConfirm ${e.toString()}`)
        }
    }

    render() {
        const {timeout,ui} = this.state
        const { handleClose, allReducer } = this.props;

        return (
            <Html timeout={timeout} ui={ui} handleClose={handleClose} dialog={allReducer.dialog}
                handleConfirm={this.handleConfirm} />
        )
    }

}
export default BaseComponent(ExpiredTokenComponent)