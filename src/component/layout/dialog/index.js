/**
 * Created By Nguyen Cong Thanh on 07/05/2019 17:45.
 *
 * Copyright intelIn 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import DialogComponent from './component'

import DialogAction from 'reduxStore/action/dialog'

const mapStateToProps = (allReducer) => {
  return {
    allReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (data) => {
      dispatch(DialogAction.update(data))
    },
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DialogComponent))
