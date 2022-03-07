/**
 * Created By Nguyen Cong Thanh on 30/09/2019 11:00.
 *
 * Copyright intelIn 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import RemoveSubChallengeComponent from './component'
import NotifyAction from "reduxStore/action/notify";
import MessageCenterAction from "reduxStore/action/messageCenter";
import MissionAction from 'reduxStore/action/mission';
const mapStateToProps = (allReducer) => {
  return {
    allReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toast: (payload) => {
      dispatch(NotifyAction.update(payload))
    },
    messageCenterUpdate: (payload) => {
      dispatch(MessageCenterAction.update(payload))
    },
    removeMission: (key, payload) => {
      dispatch(MissionAction.removeMission(key, payload))
    },
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RemoveSubChallengeComponent))
