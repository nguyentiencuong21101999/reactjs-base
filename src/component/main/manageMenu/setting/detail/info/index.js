import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import Component from './component'
import Notification from 'reduxStore/action/notify'
import MenuAction from 'reduxStore/action/menu'
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
    getDetailMenuSetting: (key, payload) => {
      dispatch(MenuAction.getDetailMenuSetting(key, payload))
    }

  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))