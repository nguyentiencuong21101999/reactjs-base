import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import Component from "./component";
import PostAction from 'reduxStore/action/post';
import Notification from 'reduxStore/action/notify'

const mapStateToProps = (allReducer) => {
    return {
        allReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toast: (payload) => {
            dispatch(Notification.update(payload))
          },
        updateModal: (data) => {
          dispatch(DialogAction.update(data))
        },
        messageCenterupdate: (payload) => {
            dispatch(MessageCenterAction.update(payload))
        },
        getListAdmin: (key, payload) => {
            dispatch(PostAction.getListAdmin(key, payload))
        },
        getListUser: (key, payload) => {
            dispatch(PostAction.getListUser(key, payload))
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))