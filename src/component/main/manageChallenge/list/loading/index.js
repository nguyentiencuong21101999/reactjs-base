import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import Component from "./component";
import ChallengeAction from 'reduxStore/action/challenge';
import Notification from 'reduxStore/action/notify'
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
        getAllChallenge: (key, payload) => {
            dispatch(ChallengeAction.getAllChallenge(key, payload))
        },
        toast: (payload) => {
            dispatch(Notification.update(payload))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))