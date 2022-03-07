/**
 * Created By Nguyen Cong Thanh on 07/24/2020 11:38.
 *
 * Copyright intelIn 2020.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Component from './component'
import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import SubChallengeAction from 'reduxStore/action/subChallenge'
import NotifyAction from 'reduxStore/action/notify'  
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
    getListPostLink: (key) => {
      dispatch(SubChallengeAction.getListPostLink(key))
    },
    messageCenterupdate: (payload) => {
      dispatch(MessageCenterAction.update(payload))
    },
    updateSubChallenge: (key, payload) => {
      dispatch(SubChallengeAction.updateSubChallenge(key, payload))
    },
    toast: (payload) => {
      dispatch(NotifyAction.update(payload))
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
