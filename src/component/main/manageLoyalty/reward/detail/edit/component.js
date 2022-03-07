import React, { Component } from "react";
import moment from "moment";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import RewardEnum from "service/enum/reward";
import View from "component/main/manageLoyalty/reward/create/view";
import { ModelView, ModelRequest } from "./model";
import HelperService from "service/helper";
import Localize from "service/localize";
const HOST = "https://static.intelin.vn"
class EditRewardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleUpdateRewardSuccess: this.handleUpdateRewardSuccess.bind(this),
        handleUpdateRewardFailed: this.handleUpdateRewardFailed.bind(this)
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
        detailReward: null,
        photos: "",
        isDefaultBtn: 0,
        isShowBtn: true
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 2,
        upload: 1,
        update: 2,
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
  handleUpdateRewardSuccess(response) {
    try {
      Logger.info("EditRewardComponent execute handleUpdateRewardSuccess");
      Logger.debug("EditRewardComponent execute handleUpdateRewardSuccess receive", response);
      const { timeout } = this.state
      const { toast } = this.props
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") });
      timeout.setTimeout(false)
      this.handleOnBack();
    } catch (e) {
      Logger.error(`EditRewardComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }
  handleUpdateRewardFailed(response) {
    try {
      Logger.info("EditRewardComponent execute handleUpdateRewardSuccess");
      Logger.debug("EditRewardComponent execute handleUpdateRewardSuccess receive", response);
      const { timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`EditRewardComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }

  handleSystemError() {
    try {
      Logger.info("EditRewardComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      const { toast } = this.props
      if (!Helper.isEmpty(data["photos"])) {
        req.current = req.upload;
      } else {
        req.current = req.create;
      }
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`EditRewardComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUploadImageSuccess(response) {
    try {
      Logger.info("EditRewardComponent execute handleUploadImageSuccess");
      Logger.debug("EditRewardComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { updateReward } = this.props;
      const srcImg = response.path;
      let payload = new ModelRequest()
        .setProId(ui.detailReward.proId)
        .setPhotos(srcImg)
        .setProName(data["proName"])
        .setProType(data["proType"])
        .setExchangeLimit(Number(data["exchangeLimit"]))
        .setExchangeCount(Number(data["exchangeCount"]))
        .setIsLimit(data["isLimit"])
        .setRequirement(data["requirement"])
        .setNote(data["note"]);

      Logger.debug("EditRewardComponent execute handleRequest receive payload", payload);
      updateReward(timeout.key, payload)
    } catch (e) {
      Logger.error(`EditRewardComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("EditRewardComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;

      ui.detailReward = location.state.promotionResp;
      ui.currentRewardCount = ui.rewardCount.find((item) => item.value === ui.detailReward.isLimit); //ui.rewardCount[0];
      ui.currentBonusCount = ui.bonusCount.find((item) => item.value === (ui.detailReward.exchangeLimit > 0 ? RewardEnum.PROMOTION_LIMIT.LIMITED : RewardEnum.PROMOTION_LIMIT.UNLIMITED)); // ui.bonusCount[0];
      ui.defaultShow = ui.listShow[0];

      Object.keys(data).forEach((key) => {
        switch (key) {
          default:
            data[key] = ui.detailReward[key];
        }
      });
    } catch (e) {
      Logger.error(`EditRewardComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("EditRewardComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`EditRewardComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("EditRewardComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { updateReward, upload } = this.props;
      switch (req.current) {
        case req.upload:
          upload(timeout.key, data['photos'])
          break;
        case req.update:
          const photos = ui.detailReward.photos.replace(HOST, "")
          let payload = new ModelRequest()
            .setProId(ui.detailReward.proId)
            .setPhotos(photos)
            .setProName(data["proName"])
            .setProType(data["proType"])
            .setExchangeLimit(Number(data["exchangeLimit"]))
            .setExchangeCount(Number(data["exchangeCount"]))
            .setIsLimit(data["isLimit"])
            .setRequirement(data["requirement"])
            .setNote(data["note"]);

          Logger.debug("EditRewardComponent execute handleRequest receive payload", payload);
          updateReward(timeout.key, payload)

          break;
        default:
          break;
      }
      //upload(timeout.key, data["photos"]);
    } catch (e) {
      Logger.error(`EditRewardComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("EditRewardComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`EditRewardComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`EditRewardComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("EditRewardComponent execute handleOnChange");
      Logger.debug("EditRewardComponent execute handleOnChange receive name", name);
      Logger.debug("EditRewardComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("EditRewardComponent execute handleOnChange receive data", data);
      let temp = { ...data };
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
      Logger.error(`EditRewardComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSystemError() {
    try {
      Logger.info("EditRewardComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      if (!Helper.isEmpty(data["photos"])) {
        req.current = req.upload;
      } else {
        req.current = req.create;
      }
      timeout.setTimeout(false, "all", "Hệ thống đang lỗi vui lòng thử lại sau");
    } catch (e) {
      Logger.error(`EditRewardComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnChangeRewardCount(name, value) {
    try {
      Logger.info("EditRewardComponent execute handleOnChangeRewardCount");
      Logger.debug("EditRewardComponent execute handleOnChangeRewardCount receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.currentRewardCount = ui.rewardCount.find((item) => {
        return item.value == value;
      });
      if (value === RewardEnum.PROMOTION_LIMIT.UNLIMITED) {
        this.handleOnChange("exchangeCount", 0);
      } else {
        this.handleOnChange("exchangeCount", "");
        ui.detailReward.exchangeCount = "";
      }
      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditRewardComponent handleOnChangeRewardCount ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeBonusCount(name, value) {
    try {
      Logger.info("EditRewardComponent execute handleOnChangeBonusCount");
      Logger.debug("EditRewardComponent execute handleOnChangeBonusCount receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.currentBonusCount = ui.bonusCount.find((item) => {
        return item.value == value;
      });

      if (value === RewardEnum.PROMOTION_LIMIT.UNLIMITED) {
        this.handleOnChange("exchangeLimit", 0);
      } else {
        this.handleOnChange("exchangeLimit", "");
        ui.detailReward.exchangeLimit = "";
      }
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditRewardComponent handleOnChangeBonusCount ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeRewardType(name, value) {
    try {
      Logger.info("EditRewardComponent execute handleOnChangeRewardType");
      Logger.debug("EditRewardComponent execute handleOnChangeRewardType receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.currentBonusCount = ui.bonusCount.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange(name, value);
    } catch (e) {
      Logger.error(`EditRewardComponent handleOnChangeRewardType ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeImage(value) {
    try {
      Logger.info("EditRewardComponent execute handleOnChangeImage");
      Logger.debug("EditRewardComponent execute handleOnChangeImage receive", value);
      const { ui, req } = this.state;
      ui.photos = value;
      req.current = req.upload;
      this.handleOnChange("photos", ui.photos);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditRewardComponent handleOnChangeImage ${e.toString()}`);
    }
  }



  handleOnBack() {
    try {
      Logger.info("EditRewardComponent execute handleOnBack");
      this.props.history.goBack();
    } catch (e) {
      Logger.error(`EditRewardComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return <View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeShow={this.handleOnChangeShow} handleOnChangeRewardCount={this.handleOnChangeRewardCount} handleOnChangeBonusCount={this.handleOnChangeBonusCount} handleOnChangeImage={this.handleOnChangeImage} handleOnBack={this.handleOnBack} />;
  }
}

export default BaseComponent(EditRewardComponent);
