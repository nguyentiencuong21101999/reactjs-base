import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Component from './component'
import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import MemberAction from 'reduxStore/action/member'
import NotifyAction from 'reduxStore/action/notify'
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
        getListHistory: (key, payload) => {
            dispatch(MemberAction.getListHistory(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))