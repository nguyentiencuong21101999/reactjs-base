import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import RewardAction from 'reduxStore/action/reward'
import NotifyAction from 'reduxStore/action/notify'
import UploadAction from 'reduxStore/action/upload'
import MenuAction from 'reduxStore/action/menu'
import Component from './component'

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
        createFood: (key, payload) => {
            dispatch(MenuAction.createFood(key, payload))
        },
        upload: (key, payload) => {
            dispatch(UploadAction.uploadImage(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },
        getList: (key) => {
            dispatch(MenuAction.getList(key))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))