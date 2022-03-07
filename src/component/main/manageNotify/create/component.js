import React, { Component } from "react";
import moment from "moment";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import NotifyEnum from "service/enum/notify";
import PostEnum from "service/enum/post";
import RouteEnum from "service/enum/route";
import Localize from "service//localize";
import DialogEnum from "service/enum/dialog";
import DialogModel from "component/layout/dialog/model";
import View from "./view";
import { ModelView, ModelRequestUpload } from "./model";
import XLSX from "xlsx";
class CreateNotifyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleCheckDataImportSuccess: this.handleCheckDataImportSuccess.bind(this),
      },
      data: new ModelView(),
      ui: {
        data: {},
        listChannel: [
          {
            text: NotifyEnum.FILTER_PARSE[NotifyEnum.FILTER.EMAIL],
            value: NotifyEnum.FILTER.EMAIL,
          },
          {
            text: NotifyEnum.FILTER_PARSE[NotifyEnum.FILTER.SMS],
            value: NotifyEnum.FILTER.SMS,
          },
          {
            text: NotifyEnum.FILTER_PARSE[NotifyEnum.FILTER.DEVICE],
            value: NotifyEnum.FILTER.DEVICE,
          },
        ],
        defaultChannel: {},
        listTarget: [
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.PLANNING_A_PREGNANCY],
            value: PostEnum.TARGET.PLANNING_A_PREGNANCY,
          },
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.PREGNANCY_TRACKING],
            value: PostEnum.TARGET.PREGNANCY_TRACKING,
          },
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.HAD_A_BABY],
            value: PostEnum.TARGET.HAD_A_BABY,
          },
        ],
        defaultTarget: [],
        fileContent: null,
        isShowBtn: true,
        listDataImport: null,
        req: {
          current: 2,
          upload: 1,
          create: 2,
        },
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeChannel = this.handleOnChangeChannel.bind(this);
    this.handleOnChangeFile = this.handleOnChangeFile.bind(this);
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleSendNotification = this.handleSendNotification.bind(this);
    this.handleRemoveFile = this.handleRemoveFile.bind(this)
  }
  handleSystemError() {
    try {
      Logger.info('EditPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleCheckDataImportSuccess(response) {
    try {
      Logger.info("CreateNotifyComponent execute handleCheckDataImportSuccess");
      Logger.debug("CreateNotifyComponent execute handleCheckDataImportSuccess receive list", response);
      const { ui, data, timeout } = this.state;
      data["fileContent"] = response.existentList;
      ui.listDataImport = response
      timeout.setTimeout(false);
      this.setState({ ui })
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("CreateNotifyComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;
      ui.defaultTarget = [ui.listTarget[0]];
      ui.defaultChannel = ui.listChannel[0];
      data["target"] = [ui.listTarget[0].value];
      data["channel"] = ui.defaultChannel.value;
    } catch (e) {
      Logger.error(`CreateNotifyComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("CreateNotifyComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`CreateNotifyComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("CreateNotifyComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { create, checkListDataImport } = this.props;
      switch (ui.req.current) {
        case ui.req.upload:
          const modelRequestUpload = new ModelRequestUpload().setChannel(data["channel"]).setFileContent(ui.fileContent);
          checkListDataImport(timeout.key, modelRequestUpload);
          break;
        case ui.req.create:
          break;
      }
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("CreateNotifyComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleSubmit ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnRef(name, element) {
    try {
      const { ref } = this.state;
      ref[name] = element;
      if (name === "username") {
        ref[name].focus();
      }
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("CreateNotifyComponent execute handleOnChange");
      Logger.debug("CreateNotifyComponent execute handleOnChange receive name", name);
      Logger.debug("CreateNotifyComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("CreateNotifyComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      delete temp["fileContent"];
      const status = !(Object.values(temp).findIndex((item) => item.toString() === "") == -1);
      if (status !== ui.isShowBtn) {
        ui.isShowBtn = status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }


  handleOnChangeChannel(event, value) {
    try {
      Logger.info("CreateNotifyComponent execute handleOnChangeChannel");
      Logger.debug("CreateNotifyComponent execute handleOnChangeChannel receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui, data } = this.state;
      ui.defaultChannel = ui.listChannel.find((item) => {
        return item.value == value;
      });
      data['content'] = ""
      this.handleOnChange("channel", value);

      this.setState({ data });
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleOnChangeChannel ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOutJson(data) {
    try {
      Logger.info(`ContractComponent execute handleOutJson`);
      const { ui, timeout } = this.state;
      let fileContent = [];
      data.forEach((item, index) => {
        fileContent.push(item[0]);
      });
      ui.fileContent = fileContent;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`ContractComponent execute handleOnImportFile ${e.toString()}`);
    }
  }
  handleOnChangeFile(e) {
    try {
      Logger.info("CreateNotifyComponent execute handleOnChangeFile");
      Logger.info(`ContractComponent execute handleOnImportFile`);
      const { ui, timeout } = this.state;
      const files = e;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const ab = e.target.result;
          const wb = XLSX.read(ab, { type: "array", cellDates: true });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, dateNF: "yyyy-mm-dd" });
          /* Update state */
          this.handleOutJson(data);
        };
        reader.readAsArrayBuffer(files[0]);
        ui.req.current = ui.req.upload;
      }
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleOnChangeFile ${e.toString()}`);
    }
  }
  handleRemoveFile() {
    try {
      Logger.info("CreateNotifyComponent execute handleRemoveFile");
      const { ui, data } = this.state;
      ui.listDataImport = null;
      ui.fileContent = null;
      data["fileContent"] = "";
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleRemoveFile ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeTarget(event, list) {
    try {
      Logger.info("CreateNotifyComponent execute handleOnChangeTarget");
      Logger.debug("CreateNotifyComponent execute handleOnChangeTarget receive list", list);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      const value = list;
      this.handleOnChange("target", value);
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSendNotification() {
    try {
      Logger.info("CreateNotifyComponent execute handleSendNotification");
      const { ui, data } = this.state;
      const { updateModal } = this.props;
      const payload = { ...data };
      if (Helper.isEmpty(data["fileContent"])) {
        delete payload["fileContent"];
      }
      const dialog = new DialogModel();
      dialog.setView(DialogEnum.VIEW.CREATE_NOTIFICATION);
      dialog.setContent(payload);
      dialog.setHandleConfirm(() => { this.handleOnBack() });
      updateModal(dialog);
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleSendNotification ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnBack() {
    try {
      Logger.info("CreateNotifyComponent execute handleOnBack");
      const { tab } = this.props.location.state
      let path = RouteEnum.PAGE.MANAGE_NOTIFY._
      this.handleRedirectWithState(path, { tab: tab })
    } catch (e) {
      Logger.error(`CreateNotifyComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return <View ui={ui} timeout={timeout} handleOnBack={this.handleOnBack} handleRemoveFile={this.handleRemoveFile} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeChannel={this.handleOnChangeChannel} handleOnChangeFile={this.handleOnChangeFile} handleOnChangeTarget={this.handleOnChangeTarget} handleSendNotification={this.handleSendNotification} />;
  }
}

export default BaseComponent(CreateNotifyComponent);
