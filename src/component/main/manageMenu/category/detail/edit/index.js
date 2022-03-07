import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import RewardAction from 'reduxStore/action/reward'
import NotifyAction from 'reduxStore/action/notify'
import UploadAction from 'reduxStore/action/upload'
import Component from './component'
import MenuAction from 'reduxStore/action/menu'
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
        updateCategory: (key, payload) => {
            dispatch(MenuAction.updateCategory(key, payload))
        },
        upload: (key, payload) => {
            dispatch(UploadAction.uploadImage(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },
        getListCategory: (key, payload) => {
            dispatch(MenuAction.getListCategory(key, payload))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))