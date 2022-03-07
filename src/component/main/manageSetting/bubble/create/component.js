import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import PostEnum from "service/enum/post";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import SettingEnum from "service/enum/setting";
import Localize from "service/localize";

class CreateBubbleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleCreateBubbleSuccess: this.handleCreateBubbleSuccess.bind(this),
        handleCreateBubbleFailed: this.handleCreateBubbleFailed.bind(this),
      },
      data: new ModelView(),
      ui: {
        data: {},
        listRedirectTo: [
          {
            text: SettingEnum.DIRECT_TO_PARSE[SettingEnum.DIRECT_TO.KNOW],
            value: SettingEnum.DIRECT_TO.KNOW,
          },
          {
            text: SettingEnum.DIRECT_TO_PARSE[SettingEnum.DIRECT_TO.NOTE_BOOK],
            value: SettingEnum.DIRECT_TO.NOTE_BOOK,
          },
          {
            text: SettingEnum.DIRECT_TO_PARSE[SettingEnum.DIRECT_TO.FOLLOW_BABY],
            value: SettingEnum.DIRECT_TO.FOLLOW_BABY,
          },
          {
            text: SettingEnum.DIRECT_TO_PARSE[SettingEnum.DIRECT_TO.TEACHING_PREGNANCY],
            value: SettingEnum.DIRECT_TO.TEACHING_PREGNANCY,
          },
          {
            text: SettingEnum.DIRECT_TO_PARSE[SettingEnum.DIRECT_TO.CHALLENGE],
            value: SettingEnum.DIRECT_TO.CHALLENGE,
          },
          {
            text: SettingEnum.DIRECT_TO_PARSE[SettingEnum.DIRECT_TO.LOYALTY],
            value: SettingEnum.DIRECT_TO.LOYALTY,
          },
        ],
        defaultRedirectTo: {},

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
        isShowBtn: true,
        isShowTimeStart: false,
        photos: "",
        isHiddenErr: false
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 2,
        upload: 1,
        create: 2,
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChangeRedirectTo = this.handleOnChangeRedirectTo.bind(this);
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleCreateBubbleSuccess() {
    try {
      Logger.info("CreateBubbleComponent execute handleCreateBubbleSuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") });
      timeout.setTimeout(false);
      this.handleOnBack();
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleCreateBubbleSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleCreateBubbleFailed() {
    try {
      Logger.info("CreateBubbleComponent execute handleCreateBubbleFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleCreateBubbleFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("CreateBubbleComponent execute handleSystemError");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("CreateBubbleComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      ui.defaultRedirectTo = ui.listRedirectTo[0];
      ui.defaultTarget = [ui.listTarget[0]];

      data["directTo"] = ui.defaultRedirectTo.value;
      data["targetMeijiId"] = [ui.listTarget[0].value];
    } catch (e) {
      Logger.error(`CreateBubbleComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("CreateBubbleComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`CreateBubbleComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("CreateBubbleComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { createBubble } = this.props;
      let payload = new ModelRequest().setTimeStart(Helper.getTimeFormat(data["timeStart"])).setTimeEnd(Helper.getTimeFormat(data["timeEnd"])).setTargetMeijiId(JSON.stringify(data["targetMeijiId"])).setContent(data["content"]).setDirectTo(data["directTo"]);
      Logger.debug("CreateBubbleComponent execute handleRequest receive payload", payload);
      createBubble(timeout.key, payload);
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("CreateBubbleComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`CreateBubbleComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value, error) {
    try {
      Logger.info("CreateBubbleComponent execute handleOnChange");
      Logger.debug("CreateBubbleComponent execute handleOnChange receive name", name);
      Logger.debug("CreateBubbleComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("CreateBubbleComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      if (name === "timeEnd") {
        ui.isShowTimeStart = error;
      }
      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      status = error ? !error : status;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
      }
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleOnChange`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = true;
      timeout.setTimeout(false, name, e.message);
    }
  }

  handleOnChangeRedirectTo(event, value) {
    try {
      Logger.info("CreateBubbleComponent execute handleOnChangeRedirectTo");
      Logger.debug("CreateBubbleComponent execute handleOnChangeRedirectTo receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultRedirectTo = ui.listRedirectTo.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange("directTo", value);
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleOnChangeRedirectTo ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeTarget(event, list) {
    try {
      Logger.info("EditPostComponent execute handleOnChangeTarget");
      Logger.debug("EditPostComponent execute handleOnChangeTarget receive list", list);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      this.handleOnChange("targetMeijiId", list);
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnBack() {
    try {
      Logger.info("CreateBubbleComponent execute handleOnBack");
      this.props.history.goBack();
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnClick() {
    try {
      Logger.info("CreateBubbleComponent execute handleOnClick");

      const { ui, timeout } = this.state;
      ui.isHiddenErr = !ui.isHiddenErr
      timeout.setTimeout(false, 'timeEnd', "");
      this.setState({ ui })
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleOnClick ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return <View ui={ui}
      timeout={timeout}
      handleSubmit={this.handleSubmit}
      data={data}
      handleOnRef={this.handleOnRef}
      handleOnChange={this.handleOnChange}
      handleOnChangeShow={this.handleOnChangeShow}
      handleOnChangeImage={this.handleOnChangeImage}
      handleOnBack={this.handleOnBack}
      handleOnChangeRedirectTo={this.handleOnChangeRedirectTo}
      handleOnChangeTarget={this.handleOnChangeTarget}
      handleOnClick={this.handleOnClick}
    />;
  }
}

export default BaseComponent(CreateBubbleComponent);
