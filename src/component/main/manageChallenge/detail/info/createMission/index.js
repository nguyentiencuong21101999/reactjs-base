import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import MissionAction from 'reduxStore/action/mission'
import UploadAction from 'reduxStore/action/upload'
import NotifyAction from 'reduxStore/action/notify'

import Component from './component'
import ChallengeAction from 'reduxStore/action/challenge'

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
        createMission: (key, payload) => {
            dispatch(MissionAction.createMission(key, payload))
        },
        toast: (payload) => {
            dispatch(NotifyAction.update(payload))
        },

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))