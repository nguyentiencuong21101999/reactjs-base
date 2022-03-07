import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import Component from './component'
import PostAction from 'reduxStore/action/post'
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
        getDetailPost: (key, payload) => {
          dispatch(PostAction.getDetailPost(key, payload))
        },
        getTargetPostByPostId: (key, payload) => {
          dispatch(PostAction.getTargetPostByPostId(key, payload))
        },
        approveAdminPost: (key, payload) => {
          dispatch(PostAction.approveAdminPost(key, payload))
        },
        toast: (payload) => {
          dispatch(NotifyAction.update(payload))
      },
        

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))