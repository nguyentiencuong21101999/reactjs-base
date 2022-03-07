/**
 * Created By Nguyen Cong Thanh on 30/09/2019 11:00.
 *
 * Copyright intelIn 2019.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import ConfirmComponent from './component'

const mapStateToProps = (allReducer) => {
  return {
    allReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ConfirmComponent))
