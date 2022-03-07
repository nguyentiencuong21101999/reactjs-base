/**
 * Created By Nguyen Cong Thanh on 02/25/2020 10:43.
 *
 * Copyright intelIn 2020.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withSnackbar } from "notistack";
import ToastComponent from './component'

import NotifyAction from "reduxStore/action/notify";

const mapStateToProps = (allReducer) => {
  return {
    allReducer: allReducer,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toast: (status, message) => {
      dispatch(NotifyAction.update({ status, message }))
    },
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(ToastComponent)))
