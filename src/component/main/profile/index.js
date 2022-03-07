/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ProfileComponent from './component'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import AuthAction from 'reduxStore/action/auth';
import NotifyAction from 'reduxStore/action/notify'

const mapStateToProps = (allReducer) => {
  return {
    allReducer: allReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    messageCenterUpdate: (payload) => {
      dispatch(MessageCenterAction.update(payload))
    },
    updateProfile: (key, payload) => {
      dispatch(AuthAction.updateProfile(key, payload))
    },
    toast: (payload) => {
      dispatch(NotifyAction.update(payload))
  },
    
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileComponent))
