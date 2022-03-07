/**
 * Created By Nguyen Cong Thanh on 02/11/2020 09:44.
 *
 * Copyright intelIn 2020.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import LoginComponent from './component'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import AuthAction from 'reduxStore/action/auth';

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
    login: (key, payload) => {
      dispatch(AuthAction.login(key, payload))
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginComponent))
