/**
 * Created By Nguyen Cong Thanh on 07/24/2020 15:29.
 *
 * Copyright intelIn 2020.
 */

import Logger from 'service/logger'
import ResponseCode from 'service/responseCode'

const BaseComponent = (ChildComponent) => {

  return class extends ChildComponent {

    constructor(props) {
      super(props);

      this.handleRedirectWithState = this.handleRedirectWithState.bind(this)

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      try {
        // Logger.info(`BaseComponent ${ChildComponent.name} execute UNSAFE_componentWillReceiveProps`)
        const { timeout } = this.state
        const { messageCenter } = nextProps.allReducer;
        // Logger.debug('BaseComponent execute UNSAFE_componentWillReceiveProps new message center', messageCenter)
        // Logger.debug('BaseComponent execute UNSAFE_componentWillReceiveProps new message timeout', timeout.key)
        if (this.props.allReducer.messageCenter !== messageCenter && ResponseCode.FRONT_END_PARSE[messageCenter.code]) {
          // Logger.info(`BaseComponent execute UNSAFE_componentWillReceiveProps process FRONT_END code ${messageCenter.code}`)
          ResponseCode.findFrontEnd(messageCenter, this.state)
          return
        }
        if (this.props.allReducer.messageCenter !== messageCenter && messageCenter.key === timeout.key) {
          // Logger.info(`BaseComponent execute UNSAFE_componentWillReceiveProps process code ${messageCenter.code}`)
          ResponseCode.find(messageCenter, this.state)
        }
      } catch (e) {
        Logger.error(`BaseComponent ${ChildComponent.name} UNSAFE_componentWillReceiveProps ${e.toString()}`)
      }
    }

    handleRedirectWithState(pathname, state = {}) {
      try {
        Logger.info(`BaseComponent ${ChildComponent.name} execute handleRedirectWithState`)
        Logger.debug(`BaseComponent ${ChildComponent.name} execute handleRedirectWithState Receive pathname`, pathname)
        Logger.debug(`BaseComponent ${ChildComponent.name} execute handleRedirectWithState Receive state`, state)
        const { history } = this.props;
        history.push({
          pathname: pathname,
          state: state
        })
      } catch (e) {
        Logger.error(`BaseComponent ${ChildComponent.name} handleRedirectWithState ${e.toString()}`)
      }
    }

    render() {
      return (
        super.render()
      )
    }

  }

}

export default BaseComponent