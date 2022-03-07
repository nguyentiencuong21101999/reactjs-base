/**
 * Created By Nguyen Cong Thanh on 30/09/2019 11:00.
 *
 * Copyright intelIn 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import DeclineStampComponent from './component'
import NotifyAction from "reduxStore/action/notify";
import MessageCenterAction from "reduxStore/action/messageCenter";
import MenuAction from 'reduxStore/action/menu'

const mapStateToProps = (allReducer) => {
    return {
        allReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toast:(payload)=>{
            dispatch(NotifyAction.update(payload))
        },
        messageCenterUpdate: (payload) => {
            dispatch(MessageCenterAction.update(payload))
        },
        createMenuSetting: (key, payload) => {
            dispatch(MenuAction.createMenuSetting(key, payload))
        },
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeclineStampComponent))
