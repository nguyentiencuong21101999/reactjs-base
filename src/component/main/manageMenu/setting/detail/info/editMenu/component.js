import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import PostEnum from "service/enum/post";
import RewardEnum from "service/enum/reward";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import ModelTable from "core/table/model";
import MenuEnum from "service/enum/menu";
import Localize from "service/localize";
import RouteEnum from "service/enum/route";

class EditMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleGetListFoodSuccess: this.handleGetListFoodSuccess.bind(this),
        handleUpdateMenuSuccess: this.handleUpdateMenuSuccess.bind(this),
        handleUpdateMenuFailed: this.handleUpdateMenuFailed.bind(this),
      },
      data: new ModelView(),
      ui: {
        listShow: [
          {
            text: MenuEnum.MENU_SETTING_DAY_PARSE[MenuEnum.MENU_SETTING_DAY.MONDAY],
            value: MenuEnum.MENU_SETTING_DAY.MONDAY,
          },
          {
            text: MenuEnum.MENU_SETTING_DAY_PARSE[MenuEnum.MENU_SETTING_DAY.TUESDAY],
            value: MenuEnum.MENU_SETTING_DAY.TUESDAY,
          },
          {
            text: MenuEnum.MENU_SETTING_DAY_PARSE[MenuEnum.MENU_SETTING_DAY.WEDNESDAY],
            value: MenuEnum.MENU_SETTING_DAY.WEDNESDAY,
          },
          {
            text: MenuEnum.MENU_SETTING_DAY_PARSE[MenuEnum.MENU_SETTING_DAY.THURSDAY],
            value: MenuEnum.MENU_SETTING_DAY.THURSDAY,
          },
          {
            text: MenuEnum.MENU_SETTING_DAY_PARSE[MenuEnum.MENU_SETTING_DAY.FRIDAY],
            value: MenuEnum.MENU_SETTING_DAY.FRIDAY,
          },
          {
            text: MenuEnum.MENU_SETTING_DAY_PARSE[MenuEnum.MENU_SETTING_DAY.SATURDAY],
            value: MenuEnum.MENU_SETTING_DAY.SATURDAY,
          },
          {
            text: MenuEnum.MENU_SETTING_DAY_PARSE[MenuEnum.MENU_SETTING_DAY.SUNDAY],
            value: MenuEnum.MENU_SETTING_DAY.SUNDAY,
          },
        ],
        defaultShow: [],
        detailMenuSetting: null,
        data: {},

        listBreakfast: [],
        defaultBreakfast: [],

        listLunch: [],
        defaultLunch: [],

        listDinner: [],
        defaultDinner: [],

        listFirstSnack: [],
        defaultFirstSnack: [],

        listSecondSnack: [],
        defaultSecondSnack: [],

        isShowBtn: true,
        photos: "",
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 1,
        getList: 1,
        update: 2,
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this);
    this.handleOnChangeSelect = this.handleOnChangeSelect.bind(this);
    this.handleListSelect = this.handleListSelect.bind(this);
  }

  handleListSelect(list) {
    try {
      Logger.info("LoadingListPostComponent execute handleListSelect");
      const { ui, timeout, req } = this.state;
      const listSelect = [];
      if (list.length > 0) {
        list.map((item) => {
          listSelect.push({ text: item.foodName, value: item.foodId });
        });
      }

      return listSelect;
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleListSelect ${e.toString()}`);
    }
  }
  handleGetListFoodSuccess(response) {
    try {
      Logger.info("LoadingListPostComponent execute handleGetListFoodSuccess");
      Logger.debug("LoadingListPostComponent execute handleGetListFoodSuccess receive list", response);
      const { ui, timeout, req, data } = this.state;
      timeout.setTimeout(false);
      const listFood = [];
      response.list.map((item) => {
        listFood.push({ text: item.foodName, value: item.foodId });
      });


      ui.listBreakfast = listFood;
      ui.defaultBreakfast = this.handleListSelect(ui.detailMenuSetting.breakfast);
      ui.listLunch = listFood;
      ui.defaultLunch = this.handleListSelect(ui.detailMenuSetting.lunch);
      ui.listDinner = listFood;
      ui.defaultDinner = this.handleListSelect(ui.detailMenuSetting.dinner);
      ui.listFirstSnack = listFood;
      ui.defaultFirstSnack = this.handleListSelect(ui.detailMenuSetting.firstSnack);
      ui.listSecondSnack = listFood;
      ui.defaultSecondSnack = this.handleListSelect(ui.detailMenuSetting.secondSnack);

      Object.keys(data).map((key) => {
        switch (key) {
          case "breakfast":
          case "lunch":
          case "dinner":
          case "firstSnack":
          case "secondSnack":
            data[key] = ui.detailMenuSetting[key].length > 0 ? ui.detailMenuSetting[key] : '';
            break;
          default:
            data[key] = ui.detailMenuSetting[key]
            break;
        }
      });
      req.current = req.update;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleGetListFoodSuccess ${e.toString()}`);
    }
  }
  handleUpdateMenuSuccess() {
    try {
      Logger.info("EditMenuComponent execute handleUpdateMenuSuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") });
      timeout.setTimeout(false);
      this.handleOnBack();
    } catch (e) {
      Logger.error(`EditMenuComponent handleUpdateMenuSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUpdateMenuFailed() {
    try {
      Logger.info("EditMenuComponent execute handleUpdateMenuFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditMenuComponent handleUpdateMenuFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSystemError() {
    try {
      Logger.info("EditMenuComponent execute handleSystemError");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditMenuComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("EditMenuComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;
      ui.detailMenuSetting = { ...location.state };

      ui.defaultShow = ui.listShow.find((item) => {
        return item.value === ui.detailMenuSetting.menuSettingDay;
      });
      //!Helper.isEmpty(ui.data.gender) ? ui.gender.find(item => item.value === ui.data.gender) : ui.gender[0]
    } catch (e) {
      Logger.error(`EditMenuComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("EditMenuComponent execute componentDidMount");
      const { timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`EditMenuComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("EditMenuComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { getListFood, updateMenu } = this.props;
      switch (req.current) {
        case req.getList:
          const payloadGetList = new ModelTable().setOrder("modifiedAt").setBy("desc").setFrom(0).setLimit(0);
          getListFood(timeout.key, payloadGetList);
          break;
        case req.update:
          const payloadUpdate = new ModelRequest()
            .setMenuSettingId(ui.detailMenuSetting.menuSettingId)
            .setMenuSettingDay(ui.detailMenuSetting.menuSettingDay)
            .setBreakfast(data["breakfast"])
            .setLunch(data["lunch"])
            .setDinner(data["dinner"])
            .setFirstSnack(!Helper.isEmpty(data["firstSnack"]) ? data["firstSnack"] : undefined)
            .setSecondSnack(!Helper.isEmpty(data["secondSnack"]) ? data["secondSnack"] : undefined);
          updateMenu(timeout.key, payloadUpdate);
        default:
          break;
      }
    } catch (e) {
      Logger.error(`EditMenuComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("EditMenuComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`EditMenuComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`EditMenuComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("EditMenuComponent execute handleOnChange");
      Logger.debug("EditMenuComponent execute handleOnChange receive name", name);
      Logger.debug("EditMenuComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("EditMenuComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      delete temp["firstSnack"];
      delete temp["secondSnack"];

      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`EditMenuComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }



  handleOnChangeRewardType(name, value) {
    try {
      Logger.info("EditMenuComponent execute handleOnChangeRewardType");
      Logger.debug("EditMenuComponent execute handleOnChangeRewardType receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.currentBonusCount = ui.bonusCount.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange(name, value);
    } catch (e) {
      Logger.error(`EditMenuComponent handleOnChangeRewardType ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnBack() {
    try {
      Logger.info("EditMenuComponent execute handleOnBack");
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_MENU.SETTING.DETAIL;
      const path = route.replace(":id", ui.detailMenuSetting.menuSettingId);
      this.handleRedirectWithState(path, this.props.location.state);
      //this.props.history.goBack();
    } catch (e) {
      Logger.error(`EditMenuComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleOnChangeTarget(event, list) {
    try {
      Logger.info("EditMenuComponent execute handleOnChangeTarget");
      Logger.debug("EditMenuComponent execute handleOnChangeTarget receive list", list);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      const value = list;
      this.handleOnChange("target", value);
    } catch (e) {
      Logger.error(`EditMenuComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeSelect(name, list) {
    try {
      Logger.info("EditMenuComponent execute handleOnChangeSelect");
      Logger.debug("EditMenuComponent execute handleOnChangeSelect receive list", list);

      const { ui } = this.state;
      const value = list;
      this.handleOnChange(name, value);
    } catch (e) {
      Logger.error(`EditMenuComponent handleOnChangeSelect ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  render() {
    const { ui, timeout, data, req } = this.state;
    return req.current !== req.getList ? <View ui={ui} timeout={timeout} handleOnChangeTarget={this.handleOnChangeTarget} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeShow={this.handleOnChangeShow} handleOnChangeImage={this.handleOnChangeImage} handleOnBack={this.handleOnBack} handleOnChangeSelect={this.handleOnChangeSelect} /> : null;
  }
}

export default BaseComponent(EditMenuComponent);
