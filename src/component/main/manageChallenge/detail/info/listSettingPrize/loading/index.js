import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Component from './component'
import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import SettingPrizeAction from 'reduxStore/action/settingPrize'
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
        getListSettingPrize: (key, payload) => {
            dispatch(SettingPrizeAction.getListSettingPrize(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))