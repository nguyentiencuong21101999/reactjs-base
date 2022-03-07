import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import Component from "./component";
import NotifyAction from 'reduxStore/action/notify';
const mapStateToProps = (allReducer) => {
    return {
        allReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateModal: (data) => {
            dispatch(DialogAction.update(data))
        },
        messageCenterupdate: (payload) => {
            dispatch(MessageCenterAction.update(payload))
        },
        getListNotificationReceived: (key, payload) => {
            dispatch(NotifyAction.getListNotificationReceived(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))