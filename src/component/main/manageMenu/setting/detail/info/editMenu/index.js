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
        updateMenu: (key, payload) => {
            dispatch(MenuAction.updateMenu(key, payload))
        }, 
        getListFood: (key,payload) => {
            dispatch(MenuAction.getListFood(key,payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))