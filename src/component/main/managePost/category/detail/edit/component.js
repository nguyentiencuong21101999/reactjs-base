import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import PostEnum from "service/enum/post";
import RouteEnum from "service/enum/route";
import View from "component/main/managePost/category/create/view";
import { ModelView, ModelRequest } from "./model";
import CategoryEnum from "service/enum/category";
import Config from "config";
import Localize from "service/localize";
class EditCategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleUpdateCategorySuccess: this.handleUpdateCategorySuccess.bind(this),
        handleUpdateCategoryFailed: this.handleUpdateCategoryFailed.bind(this),
      },
      data: new ModelView(),
      ui: {
        data: {},
        listCategory: [
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
        defaultCategory: {},
        listStatus: [
          {
            text: CategoryEnum.STATUS_PARSE[CategoryEnum.STATUS.NEW],
            value: CategoryEnum.STATUS.NEW,
          },
          {
            text: CategoryEnum.STATUS_PARSE[CategoryEnum.STATUS.APPLIED],
            value: CategoryEnum.STATUS.APPLIED,
          },
        ],
        defaultStatus: {},
        detailCategory: null,
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
        update: 2,
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this);
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this);
  }
  handleUploadImageSuccess(response) {
    try {
      Logger.info("EditCategoryComponent execute handleUploadImageSuccess");
      Logger.debug("EditCategoryComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { updateCategory } = this.props;
      const srcImg = response.path;
      let payload = new ModelRequest()
        .setCategoryId(ui.detailCategory.categoryId)
        .setIcon(srcImg)
        .setName(data["name"])
        .setStatus(data["status"])
        .setTargetMeijiId(data["targetMeijiId"]);
      updateCategory(timeout.key, payload)
      Logger.debug("EditCategoryComponent execute handleRequest receive payload", payload);
    } catch (e) {
      Logger.error(`EditCategoryComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }

  handleUpdateCategorySuccess() {
    try {
      Logger.info("EditCategoryComponent execute handleUpdateCategorySuccess");
      const { ui, timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") });
      let route = RouteEnum.PAGE.MANAGE_POST.CATEGORY.DETAIL
      timeout.setTimeout(false);
      const path = route.replace(':id', ui.detailCategory.categoryId)
      this.handleRedirectWithState(path, ui.detailCategory)
    } catch (e) {
      Logger.error(`EditCategoryComponent handleUpdateCategorySuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUpdateCategoryFailed() {
    try {
      Logger.info("EditCategoryComponent execute handleCreateCategoryFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditCategoryComponent handleUpdateCategoryFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("EditCategoryComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      const { toast } = this.props;
      if (!Helper.isEmpty(data["icon"])) {
        req.current = req.upload;
      } else {
        req.current = req.update;
      }
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditCategoryComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
   
      Logger.info("EditCategoryComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props;
      ui.detailCategory = {...location.state}

      ui.defaultStatus = ui.detailCategory.status === CategoryEnum.STATUS.NEW ? ui.listStatus[0] : ui.listStatus[1];
      ui.defaultCategory = ui.listCategory.find((item) => { return item.value === ui.detailCategory.targetMeijiId });

      Object.keys(data).forEach((key) => {
        switch (key) {
          default:
            data[key] = ui.detailCategory[key];
        }
      });
    } catch (e) {
      Logger.error(`EditCategoryComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("EditCategoryComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`EditCategoryComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("EditCategoryComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { upload, updateCategory } = this.props;
      switch (req.current) {
        case req.upload:
          upload(timeout.key, data['icon'])
          break;
        case req.update:

          let payload = new ModelRequest()
            .setCategoryId(ui.detailCategory.categoryId)
            .setIcon(!Helper.isEmpty(data['icon']) ? data['icon'].replace(Config.urlStatic, "") : "")
            .setName(data["name"])
            .setStatus(data["status"])
            .setTargetMeijiId(data["targetMeijiId"]);
          updateCategory(timeout.key,  payload )
          break;

        default:
          break;
      }
    } catch (e) {
      Logger.error(`EditCategoryComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("EditCategoryComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`EditCategoryComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`EditCategoryComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("EditCategoryComponent execute handleOnChange");
      Logger.debug("EditCategoryComponent execute handleOnChange receive name", name);
      Logger.debug("EditCategoryComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("EditCategoryComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      delete temp['icon']
      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`EditCategoryComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleSystemError() {
    try {
      Logger.info("EditCategoryComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      if (!Helper.isEmpty(data["icon"])) {
        req.current = req.upload;
      } else {
        req.current = req.update;
      }
      timeout.setTimeout(false, "all", Localize.getLocalize("LC_SYSTEM_BUSY"));
    } catch (e) {
      Logger.error(`EditCategoryComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnChangeStatus(name, value) {
    try {
      Logger.info("EditCategoryComponent execute handleOnChangeStatus");
      Logger.debug("EditCategoryComponent execute handleOnChangeStatus receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultStatus = ui.listStatus.find((item) => {
        return item.value == value;
      });
      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditCategoryComponent handleOnChangeStatus ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeTarget(event, value) {
    try {
      Logger.info("EditCategoryComponent execute handleOnChangeTarget");
      Logger.debug("EditCategoryComponent execute handleOnChangeTarget receive value", value);

      const { data } = this.state;
      const { ui } = this.state;
      ui.defaultCategory = ui.listCategory.find((item) => {
        return item.value == value;
      });
      this.handleOnChange("targetMeijiId", value);
    } catch (e) {
      Logger.error(`EditCategoryComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeImage(value) {
    try {
      Logger.info("EditCategoryComponent execute handleOnChangeImage");
      Logger.debug("EditCategoryComponent execute handleOnChangeImage receive", value);
      const { ui, timeout, req } = this.state;
      const { handleChangeImage } = this.props;
      ui.photos = value;
      if (Helper.isEmpty(value)) {
        req.current = req.update
      } else {
        req.current = req.upload
      }
      this.handleOnChange("icon", ui.photos);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditCategoryComponent handleOnChangeImage ${e.toString()}`);
    }
  }

  handleOnBack() {
    try {
      Logger.info("EditCategoryComponent execute handleOnBack");
      this.props.history.goBack();
    } catch (e) {
      Logger.error(`EditCategoryComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return <View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeShow={this.handleOnChangeShow} handleOnChangeImage={this.handleOnChangeImage} handleOnBack={this.handleOnBack} handleOnChangeTarget={this.handleOnChangeTarget} handleOnChangeStatus={this.handleOnChangeStatus} />;
  }
}

export default BaseComponent(EditCategoryComponent);
