/**
 * Created By Nguyen Cong Thanh on 07/24/2020 11:38.
 *
 * Copyright intelIn 2020.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import AppComponent from './component'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import DialogAction from 'reduxStore/action/dialog'

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
    updateModal: (data) => {
      dispatch(DialogAction.update(data))
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppComponent))
