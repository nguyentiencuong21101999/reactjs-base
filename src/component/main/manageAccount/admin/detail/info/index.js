import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import Component from './component'
import AdminAction from 'reduxStore/action/admin'
import PasswordAction from 'reduxStore/action/password';
import NotifyAction from "reduxStore/action/notify";
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
        update: (key, payload) => {
            dispatch(AdminAction.update(key, payload))
        },
        resetPassword: (key, payload) => {
            dispatch(PasswordAction.forgot(key, payload))
        },
        banAccount: (key, payload) => {
            dispatch(AdminAction.banAccount(key, payload))
        },
        unbanAccount: (key, payload) => {
            dispatch(AdminAction.unbanAccount(key, payload))
        },
        forgot: (key, payload) => {
            dispatch(PasswordAction.forgot(key, payload))
        },
        forgotNotActive: (key, payload) => {
            dispatch(PasswordAction.forgotNotActive(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))