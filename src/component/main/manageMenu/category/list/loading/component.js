import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import LoadingCore from "core/loading";
import Localize from 'service/localize'

class LoadingListCategoryComponent extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      ui: {},
      func: {
        handleGetListCategorySuccess: this.handleGetListCategorySuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
      },
    };
  }
  handleGetListCategorySuccess(response) {
    try {
      Logger.info("LoadingListCategoryComponent execute handleGetListCategorySuccess");
      Logger.debug("LoadingListCategoryComponent execute handleGetListCategorySuccess receive list", response);
      const { ui, timeout } = this.state;
      const { handleSetData } = this.props;

      handleSetData(response);
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`LoadingListCategoryComponent handleGetListCategorySuccess ${e.toString()}`);
    }
  }

  handleSystemError(response) {
    try {
      Logger.info('LoadingListAdminComponent execute handleAccountDoNotHaveRole')
      Logger.debug('LoadingListAdminComponent execute handleAccountDoNotHaveRole receive response', response)
      const { ref, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`LoadingListAdminComponent handleAccountDoNotHaveRole ${e.toString()}`)
    }
  }

  componentDidMount() {
    try {
      Logger.info("LoadingListCategoryComponent execute componentDidMount");
      const { timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`LoadingListCategoryComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("LoadingListCategoryComponent execute handleRequest");
      const { ui, timeout } = this.state;
      const { getListCategory, query } = this.props;
      getListCategory(timeout.key, query);
    } catch (e) {
      Logger.error(`LoadingListCategoryComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }


  render() {
    const { timeout, ui } = this.state;

    return <LoadingCore />;
  }
}

export default BaseComponent(LoadingListCategoryComponent);
