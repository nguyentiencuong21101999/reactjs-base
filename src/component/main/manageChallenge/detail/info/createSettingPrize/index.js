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
import SettingPrizeAction from 'reduxStore/action/settingPrize'
import NotifyAction from "reduxStore/action/notify";
const mapStateToProps = (allReducer) => {
  return {
    allReducer: allReducer
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    toast: (payload) => {
      dispatch(NotifyAction.update(payload))
    },
    updateModal: (data) => {
      dispatch(DialogAction.update(data))
    },
    messageCenterupdate: (payload) => {
      dispatch(MessageCenterAction.update(payload))
    },
    createSettingPrize: (key, payload) => {
      dispatch(SettingPrizeAction.createSettingPrize(key, payload))
    }

  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))
