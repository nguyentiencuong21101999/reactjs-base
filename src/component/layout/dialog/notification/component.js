/**
 * Created By Nguyen Cong Thanh on 07/25/2020 16:37.
 *
 * Copyright svtech 2020.
 */

import React, { Component } from 'react';

import Logger from 'service/logger'
import Html from './html'

class NotificationComponent extends Component {

  constructor(props) {
    super(props);

    this.handleConfirm = this.handleConfirm.bind(this)

  }

  handleConfirm() {
    try {
      Logger.info(`NotificationComponent execute handleConfirm`)
      const { handleClose, allReducer } = this.props;
      handleClose()
      allReducer.dialog.getHandleConfirm()()
    } catch (e) {
      Logger.error(`NotificationComponent execute handleConfirm ${e.toString()}`)
    }
  }

  render() {
    return (<Html handleClose={this.props.handleClose} dialog={this.props.allReducer.dialog} handleConfirm={this.handleConfirm} />)
  }

}

export default NotificationComponent;