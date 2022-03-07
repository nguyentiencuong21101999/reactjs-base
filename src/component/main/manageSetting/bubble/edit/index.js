import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import SettingAction from 'reduxStore/action/setting'
import NotifyAction from 'reduxStore/action/notify'
import UploadAction from 'reduxStore/action/upload'
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
        updateBubble: (key, payload) => {
            dispatch(SettingAction.updateBubble(key, payload))
        },
        upload: (key, payload) => {
            dispatch(UploadAction.uploadImage(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))