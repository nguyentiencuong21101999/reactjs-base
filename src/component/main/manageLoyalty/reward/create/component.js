import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import ChallengeEnum from "service/enum/challenge";
import RewardEnum from "service/enum/reward";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import HelperService from "service/helper";
import Localize from "service/localize";

class CreateRewardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleCreateRewardSuccess: this.handleCreateRewardSuccess.bind(this),
        handleCreateRewardFailed: this.handleCreateRewardFailed.bind(this),
      },
      data: new ModelView(),
      ui: {
        data: {},
        listShow: [
          {
            text: RewardEnum.PROMOTION_TYPE_PARSE[RewardEnum.PROMOTION_TYPE.GIFT],
            value: RewardEnum.PROMOTION_TYPE.GIFT,
          },
        ],
        defaultShow: {},
        rewardCount: [
          {
            text: RewardEnum.PROMOTION_LIMIT_PARSE[RewardEnum.PROMOTION_LIMIT.UNLIMITED],
            value: RewardEnum.PROMOTION_LIMIT.UNLIMITED,
          },
          {
            text: RewardEnum.PROMOTION_LIMIT_PARSE[RewardEnum.PROMOTION_LIMIT.LIMITED],
            value: RewardEnum.PROMOTION_LIMIT.LIMITED,
          },
        ],
        currentRewardCount: {},
        bonusCount: [
          {
            text: RewardEnum.PROMOTION_BONUS_LIMIT_PARSE[RewardEnum.PROMOTION_BONUS_LIMIT.UNLIMITED],
            value: RewardEnum.PROMOTION_BONUS_LIMIT.UNLIMITED,
          },
          {
            text: RewardEnum.PROMOTION_BONUS_LIMIT_PARSE[RewardEnum.PROMOTION_BONUS_LIMIT.LIMITED],
            value: RewardEnum.PROMOTION_BONUS_LIMIT.LIMITED,
          },
        ],
        currentBonusCount: {},
        isShowBtn: true,
        photos: "",
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
    this.handleOnChangeRewardCount = this.handleOnChangeRewardCount.bind(this);
    this.handleOnChangeBonusCount = this.handleOnChangeBonusCount.bind(this);
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
  }
  handleUploadImageSuccess(response) {
    try {
      Logger.info("CreateRewardComponent execute handleUploadImageSuccess");
      Logger.debug("CreateRewardComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { createReward } = this.props;
      const srcImg = response.path;
      let payload = new ModelRequest()
        .setPhotos(srcImg)
        .setProName(data["proName"])
        .setProType(data["proType"])
        .setExchangeLimit(Number(data["exchangeLimit"]))
        .setExchangeCount(Number(data["exchangeCount"]))
        .setIsLimit(data["isLimit"])
        .setRequirement(data["requirement"])
        .setNote(data["note"]);

      Logger.debug("CreateRewardComponent execute handleRequest receive payload", payload);
      createReward(timeout.key, payload);
    } catch (e) {
      Logger.error(`CreateRewardComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }

  handleCreateRewardSuccess() {
    try {
      Logger.info("CreateRewardComponent execute handleCreateRewardSuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") });
      this.handleOnBack();
    } catch (e) {
      Logger.error(`CreateRewardComponent handleCreateRewardSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleCreateRewardFailed() {
    try {
      Logger.info("CreateRewardComponent execute handleCreateRewardFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateRewardComponent handleCreateRewardFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("CreateRewardComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      const { toast } = this.props;
      if (!Helper.isEmpty(data["photos"])) {
        req.current = req.upload;
      } else {
        req.current = req.create;
      }
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateRewardComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("CreateRewardComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      ui.currentRewardCount = ui.rewardCount[0];
      ui.currentBonusCount = ui.bonusCount[0];
      ui.defaultShow = ui.listShow[0];
      //!Helper.isEmpty(ui.data.gender) ? ui.gender.find(item => item.value === ui.data.gender) : ui.gender[0]

      data["exchangeLimit"] = 0;
      data["exchangeCount"] = 0;
      data["isLimit"] = ui.currentBonusCount.value; //left
      data["proType"] = ui.defaultShow.value;
    } catch (e) {
      Logger.error(`CreateRewardComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("CreateRewardComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`CreateRewardComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("CreateRewardComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { upload } = this.props;
      upload(timeout.key, data["photos"]);
    } catch (e) {
      Logger.error(`CreateRewardComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("CreateRewardComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreateRewardComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`CreateRewardComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("CreateRewardComponent execute handleOnChange");
      Logger.debug("CreateRewardComponent execute handleOnChange receive name", name);
      Logger.debug("CreateRewardComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("CreateRewardComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      // ui.isDefaultBtn += 1;
      // if (ui.isDefaultBtn == 2) {
      //   this.setState({ ui })
      // }
      delete temp["isLimit"];
      delete temp["exchangeLimit"];
      delete temp["exchangeCount"];

      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      if (ui.currentRewardCount.value === RewardEnum.PROMOTION_LIMIT.LIMITED && ui.currentBonusCount.value === RewardEnum.PROMOTION_LIMIT.LIMITED) {
        status = status && !HelperService.isEmpty(data["exchangeCount"]) && Number(data["exchangeLimit"]) > 0;
      }
      if (ui.currentRewardCount.value === RewardEnum.PROMOTION_LIMIT.UNLIMITED && ui.currentBonusCount.value === RewardEnum.PROMOTION_LIMIT.LIMITED) {
        status = status && Number(data["exchangeLimit"]) > 0;
      }
      if (ui.currentRewardCount.value === RewardEnum.PROMOTION_LIMIT.LIMITED && ui.currentBonusCount.value === RewardEnum.PROMOTION_LIMIT.UNLIMITED) {
        status = status && !HelperService.isEmpty(data["exchangeCount"]);
      }
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`CreateRewardComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }



  handleOnChangeRewardCount(name, value) {
    try {
      Logger.info("CreateRewardComponent execute handleOnChangeRewardCount");
      Logger.debug("CreateRewardComponent execute handleOnChangeRewardCount receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.currentRewardCount = ui.rewardCount.find((item) => {
        return item.value == value;
      });
      if (value === RewardEnum.PROMOTION_LIMIT.UNLIMITED) {
        this.handleOnChange("exchangeCount", 0);
      } else {
        this.handleOnChange("exchangeCount", "");
      }
      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateRewardComponent handleOnChangeRewardCount ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeBonusCount(name, value) {
    try {
      Logger.info("CreateRewardComponent execute handleOnChangeBonusCount");
      Logger.debug("CreateRewardComponent execute handleOnChangeBonusCount receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.currentBonusCount = ui.bonusCount.find((item) => {
        return item.value == value;
      });

      if (value === RewardEnum.PROMOTION_LIMIT.UNLIMITED) {
        this.handleOnChange("exchangeLimit", 0);
      } else {
        this.handleOnChange("exchangeLimit", "");
      }
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateRewardComponent handleOnChangeBonusCount ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeRewardType(name, value) {
    try {
      Logger.info("CreateRewardComponent execute handleOnChangeRewardType");
      Logger.debug("CreateRewardComponent execute handleOnChangeRewardType receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.currentBonusCount = ui.bonusCount.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange(name, value);
    } catch (e) {
      Logger.error(`CreateRewardComponent handleOnChangeRewardType ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeImage(value) {
    try {
      Logger.info("CreateRewardComponent execute handleOnChangeImage");
      Logger.debug("CreateRewardComponent execute handleOnChangeImage receive", value);
      const { ui, timeout, req } = this.state;
      const { handleChangeImage } = this.props;
      ui.photos = value;
      req.current = req.upload;
      this.handleOnChange("photos", ui.photos);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateRewardComponent handleOnChangeImage ${e.toString()}`);
    }
  }


  handleOnBack() {
    try {
      Logger.info("CreateRewardComponent execute handleOnBack");
      this.props.history.goBack();
    } catch (e) {
      Logger.error(`CreateRewardComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return <View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeShow={this.handleOnChangeShow} handleOnChangeRewardCount={this.handleOnChangeRewardCount} handleOnChangeBonusCount={this.handleOnChangeBonusCount} handleOnChangeImage={this.handleOnChangeImage} handleOnBack={this.handleOnBack} />;
  }
}

export default BaseComponent(CreateRewardComponent);
