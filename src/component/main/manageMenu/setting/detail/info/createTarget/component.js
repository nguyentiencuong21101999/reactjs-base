import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import PostEnum from "service/enum/post";
import View from "./view";
import { ModelView, ModelRequest, ModelRequestNotRequired } from "./model";
import MenuEnum from "service/enum/menu";
import Localize from 'service/localize'
import RouteEnum from "service/enum/route";

class CreateTargetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleCreateTargetSuccess: this.handleCreateTargetSuccess.bind(this),
        handleCreateTargetFailed: this.handleCreateTargetFailed.bind(this),
      },
      field: new ModelRequestNotRequired(),
      data: new ModelView(),
      ui: {
        listFor: [
          {
            text: MenuEnum.MENU_SETTING_TARGET_TYPE_PARSE[MenuEnum.MENU_SETTING_TARGET_TYPE.MOM],
            value: MenuEnum.MENU_SETTING_TARGET_TYPE.MOM,
          },
          {
            text: MenuEnum.MENU_SETTING_TARGET_TYPE_PARSE[MenuEnum.MENU_SETTING_TARGET_TYPE.BABY],
            value: MenuEnum.MENU_SETTING_TARGET_TYPE.BABY,
          },
        ],
        defaultFor: {},
        listBmi: [
          {
            text: MenuEnum.MENU_SETTING_BMI_TARGET_PARSE[MenuEnum.MENU_SETTING_BMI_TARGET.NORMAL],
            value: MenuEnum.MENU_SETTING_BMI_TARGET.NORMAL,
          },
          {
            text: MenuEnum.MENU_SETTING_BMI_TARGET_PARSE[MenuEnum.MENU_SETTING_BMI_TARGET.LIGHT_WEIGHT],
            value: MenuEnum.MENU_SETTING_BMI_TARGET.LIGHT_WEIGHT,
          },
          {
            text: MenuEnum.MENU_SETTING_BMI_TARGET_PARSE[MenuEnum.MENU_SETTING_BMI_TARGET.OVER_WEIGHT],
            value: MenuEnum.MENU_SETTING_BMI_TARGET.OVER_WEIGHT,
          },
          {
            text: MenuEnum.MENU_SETTING_BMI_TARGET_PARSE[MenuEnum.MENU_SETTING_BMI_TARGET.NOT_BASED_ON_BMI],
            value: MenuEnum.MENU_SETTING_BMI_TARGET.NOT_BASED_ON_BMI,
          },
        ],
        defaultBmi: {},
        data: {},
        listCondition: [
          {
            text: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE[MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.HIGH_BLOOD_PRESSURE],
            value: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.HIGH_BLOOD_PRESSURE,
          },
          {
            text: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE[MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.ANEMIA],
            value: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.ANEMIA,
          },
          {
            text: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE[MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.DIABETES],
            value: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.DIABETES,
          },
          {
            text: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE[MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.FIRST_3_MONTHS],
            value: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.FIRST_3_MONTHS,
          },
          {
            text: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE[MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.MIDDLE_3_MONTHS],
            value: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.MIDDLE_3_MONTHS,
          },
          {
            text: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE[MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.LAST_3_MONTHS],
            value: MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION.LAST_3_MONTHS,
          },
        ],
        defaultCondition: {},
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
        isShowBtn: false,
        detailMenuSetting: null,
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
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this);
    this.handleOnChangeFor = this.handleOnChangeFor.bind(this);
    this.handleOnChangeBmi = this.handleOnChangeBmi.bind(this);
    this.handleOnChangeCondition = this.handleOnChangeCondition.bind(this);
  }

  handleCreateTargetSuccess() {
    try {
      Logger.info("CreateTargetComponent execute handleCreateTargetSuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") });
      timeout.setTimeout(false);
      this.handleOnBack();
    } catch (e) {
      Logger.error(`CreateTargetComponent handleCreateTargetSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleCreateTargetFailed() {
    try {
      Logger.info("CreateTargetComponent execute handleCreateTargetFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateTargetComponent handleCreateTargetFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("CreateTargetComponent execute handleSystemError");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateTargetComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("CreateTargetComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props
      ui.detailMenuSetting = { ...location.state }
      ui.defaultCondition = [];
      ui.defaultBmi = ui.listBmi[0];
      ui.defaultTarget = [ui.listTarget[0]];
      ui.defaultFor = ui.listFor[0];

      data["menuSettingTargetType"] = ui.defaultFor.value;
      data["menuSettingBmiTarget"] = ui.defaultBmi.value;
      data["target"] = [ui.listTarget[0].value];
    } catch (e) {
      Logger.error(`CreateTargetComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("CreateTargetComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`CreateTargetComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("CreateTargetComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { createTarget } = this.props;
      switch (ui.defaultFor.value) {
        case MenuEnum.MENU_SETTING_TARGET_TYPE.MOM:
          const payloadMom = new ModelRequest()
            .setMenuSettingId(ui.detailMenuSetting.menuSettingId)
            .setMenuSettingTargetType(data['menuSettingTargetType'])
            .setMenuSettingBmiTarget(data['menuSettingBmiTarget'])
            .setTarget(data['target'])
            .setPhysicalCondition(!Helper.isEmpty(data['physicalCondition']) ? data['physicalCondition'] : undefined)
          createTarget(timeout.key, payloadMom)
          break;
        case MenuEnum.MENU_SETTING_TARGET_TYPE.BABY:
          const payloadBaby = new ModelRequest()
            .setMenuSettingId(ui.detailMenuSetting.menuSettingId)
            .setMenuSettingTargetType(data['menuSettingTargetType'])
            .setMenuSettingBmiTarget(data['menuSettingBmiTarget'])
            .setMonthFrom(data['monthFrom'])
            .setMonthTo(!Helper.isEmpty(data['monthTo']) ? data['monthTo'] : undefined)
          createTarget(timeout.key, payloadBaby)
          break;

      }

    } catch (e) {
      Logger.error(`CreateTargetComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("CreateTargetComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreateTargetComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`CreateTargetComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value, error) {
    try {
      Logger.info("CreateTargetComponent execute handleOnChange");
      Logger.debug("CreateTargetComponent execute handleOnChange receive name", name);
      Logger.debug("CreateTargetComponent execute handleOnChange receive value", value);
      const { data, ui, field } = this.state;
      data[name] = value;
      field[name] = error
      Logger.debug("CreateTargetComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      let fields = { ...field }
      if (!Helper.isEmpty(error)) {
        fields[name] = error
      }
      switch (ui.defaultFor.value) {
        case MenuEnum.MENU_SETTING_TARGET_TYPE.MOM:
          delete temp["physicalCondition"];
          delete temp["monthFrom"];
          delete temp["monthTo"];
          break;
        case MenuEnum.MENU_SETTING_TARGET_TYPE.BABY:
          delete temp["target"];
          delete temp["physicalCondition"];
          delete temp["monthTo"];
          break;
      }
      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1
        && Object.values(fields).findIndex((item) => item === true || item === "monthTo") == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
      }
      this.setState({ ui });
    } catch (e) {

      Logger.error(`CreateTargetComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }



  handleOnChangeBmi(event, value) {
    try {
      Logger.info("CreateTargetComponent execute handleOnChangeBmi");
      Logger.debug("CreateTargetComponent execute handleOnChangeBmi receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultBmi = ui.listBmi.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange("menuSettingBmiTarget", value);
    } catch (e) {
      Logger.error(`CreateTargetComponent handleOnChangeBmi ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeFor(event, value) {
    try {
      Logger.info("CreateTargetComponent execute handleOnChangeFor");
      Logger.debug("CreateTargetComponent execute handleOnChangeFor receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultFor = ui.listFor.find((item) => {
        return item.value == value;
      });
      switch (value) {
        case MenuEnum.MENU_SETTING_TARGET_TYPE.MOM:
          ui.defaultCondition = [];
          ui.defaultTarget = [ui.listTarget[0]];
          data["target"] = [ui.listTarget[0].value];
          data['physicalCondition'] = ""
          break;
        case MenuEnum.MENU_SETTING_TARGET_TYPE.BABY:
          data['monthFrom'] = ""
          data['monthTo'] = ""
          break;
        default:
          break;
      }
      this.setState({ ui });
      this.handleOnChange("menuSettingTargetType", value);
    } catch (e) {
      Logger.error(`CreateTargetComponent handleOnChangeFor ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnBack() {
    try {
      Logger.info("CreateTargetComponent execute handleOnBack");
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_MENU.SETTING.DETAIL;
      const path = route.replace(":id", ui.detailMenuSetting.menuSettingId);
      this.handleRedirectWithState(path, this.props.location.state);
    } catch (e) {
      Logger.error(`CreateTargetComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleOnChangeTarget(event, list) {
    try {
      Logger.info("CreateTargetComponent execute handleOnChangeTarget");
      Logger.debug("CreateTargetComponent execute handleOnChangeTarget receive list", list);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      const value = list;
      this.handleOnChange("target", value);
    } catch (e) {
      Logger.error(`CreateTargetComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeCondition(event, list) {
    try {
      Logger.info("CreateTargetComponent execute handleOnChangeCondition");
      Logger.debug("CreateTargetComponent execute handleOnChangeCondition receive list", list);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      const value = list;
      this.handleOnChange("physicalCondition", value);
    } catch (e) {
      Logger.error(`CreateTargetComponent handleOnChangeCondition ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  render() {
    const { ui, timeout, data, field } = this.state;
    return <View ui={ui} timeout={timeout} handleOnChangeTarget={this.handleOnChangeTarget} handleSubmit={this.handleSubmit} data={data} field={field} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeShow={this.handleOnChangeShow} handleOnChangeImage={this.handleOnChangeImage} handleOnBack={this.handleOnBack} handleOnChangeFor={this.handleOnChangeFor} handleOnChangeBmi={this.handleOnChangeBmi} handleOnChangeCondition={this.handleOnChangeCondition} />;
  }
}

export default BaseComponent(CreateTargetComponent);
