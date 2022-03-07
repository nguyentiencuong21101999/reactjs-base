/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Component from './component'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import PasswordAction from 'reduxStore/action/password';
import AuthAction from 'reduxStore/action/auth';
import DialogAction from 'reduxStore/action/dialog'

const mapStateToProps = (allReducer) => {
  return {
    allReducer: allReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateModal: (data) => {
      dispatch(DialogAction.update(data))
    },
    messageCenterUpdate: (payload) => {
      dispatch(MessageCenterAction.update(payload))
    },
    getToken: (key, payload) => {
      dispatch(PasswordAction.getToken(key, payload))
    },
    reset: (key, payload) => {
      dispatch(PasswordAction.reset(key, payload))
    },
    logout: (key, payload) => {
      dispatch(AuthAction.logout(key, payload))
    },
   
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
