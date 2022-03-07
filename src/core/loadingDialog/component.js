/**
 * Created By Nguyen Cong Thanh on 04/22/2020 16:03.
 *
 * Copyright intelIn 2020.
 */

import React from "react";
import Logger from 'service/logger'
import Loading from 'core/loading'
import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'

import DialogModel from 'component/layout/dialog/model'
import DialogEnum from 'service/enum/dialog'
import Localize from 'service/localize'

class LoadingDialogComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      timeout: new Timeout(this.setState.bind(this)),
      ui: {
      },
    };

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    try {
      Logger.info(`LoadingDialogComponent execute UNSAFE_componentWillReceiveProps`)      
      if (this.props.timeout.status !== nextProps.timeout.status) {
        const { updateModal } = this.props
        const dialog = new DialogModel()

        switch(nextProps.timeout.status){
          case true:
            dialog.setView(DialogEnum.VIEW.LOADING_DATA)
            dialog.setTitle(Localize.getLocalize('LYT_NOTIFICATION_TITLE'))
            // dialog.setContent(Localize.getLocalize('LYT_RESET_PWD_SUCCESS_POPUP'))
            updateModal(dialog)
            break;
          case false:
            dialog.setView(DialogEnum.VIEW.DEFAULT)
            updateModal(dialog)
            break;
        }
      }
    } catch (e) {
      Logger.error(`LoadingDialogComponent UNSAFE_componentWillReceiveProps ${e.toString()}`)
    }
  }

  componentWillUnmount() {
    try {
      Logger.info("LoadingDialogComponent execute componentWillUnmount");
      const { updateModal } = this.props
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.DEFAULT)
      updateModal(dialog)
    } catch (e) {
      Logger.error(`LoadingDialogComponent componentWillUnmount ${e.toString()}`);
    }
  }

  componentDidMount() {
    try {
      Logger.info("LoadingDialogComponent execute componentDidMount");
      const { updateModal } = this.props
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.LOADING_DATA)
      dialog.setTitle(Localize.getLocalize('LYT_NOTIFICATION_TITLE'))
      // dialog.setContent(Localize.getLocalize('LYT_RESET_PWD_SUCCESS_POPUP'))
      updateModal(dialog)
    } catch (e) {
      Logger.error(`LoadingDialogComponent componentDidMount ${e.toString()}`);
    }
  }

  render() {
    return <></>
  }
}

export default BaseComponent(LoadingDialogComponent);
