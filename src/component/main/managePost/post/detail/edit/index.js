import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import UploadAction from 'reduxStore/action/upload'
import NotifyAction from 'reduxStore/action/notify'
import PostAction from 'reduxStore/action/post'
import CategoryAction from 'reduxStore/action/category';
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
        update: (key, payload) => {
            dispatch(PostAction.update(key, payload))
        },
        updateTarget: (key, payload) => {
            dispatch(PostAction.updateTarget(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },
        upload: (key, payload) => {
            dispatch(UploadAction.uploadImage(key, payload))
        },
        getListCategoryAndChallenge: (key) => {
            dispatch(PostAction.getListCategoryAndChallenge(key))
        },
        updateTarget: (key, payload) => {
            dispatch(PostAction.updateTarget(key, payload))
        },

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))