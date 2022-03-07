import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Component from './component'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import DialogAction from 'reduxStore/action/dialog'
import AuthAction from 'reduxStore/action/auth';

const mapStateToProps = (allReducer) => {
    return {
        allReducer: allReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      messageCenterUpdate: (payload) => {
        dispatch(MessageCenterAction.update(payload));
      },
      updateModal: (data) => {
        dispatch(DialogAction.update(data));
      },
      logout: (key, payload) => {
        dispatch(AuthAction.logout(key, payload));
      },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))