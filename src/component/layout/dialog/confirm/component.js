/**
 * Created By Nguyen Cong Thanh on 29/09/2019 18:34.
 *
 * Copyright intelIn 2019.
 */

import React, { Component, Fragment } from 'react'

import Logger from 'service/logger'

import ConfirmHtml from './html'

class ConfirmComponent extends Component {

  constructor(props) {
    super(props)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleConfirm() {
    try {
      Logger.info('ConfirmComponent execute handleConfirm')
      const { handleClose, allReducer } = this.props;
      handleClose()
      allReducer.dialog.getHandleConfirm()()
    } catch (e) {
      Logger.error(`ConfirmComponent handleConfirm ${e.toString()}`)
    }
  }

  render() {

    const { handleClose, allReducer } = this.props;
    return (
      <ConfirmHtml handleClose={handleClose} dialog={allReducer.dialog} handleConfirm={this.handleConfirm} />
    )
  }

}
export default ConfirmComponent