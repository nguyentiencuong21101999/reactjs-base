import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import PostEnum from "service/enum/post";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import CategoryEnum from "service/enum/category"
import Localize from "service/localize";

class CreateCategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleCreateCategorySuccess: this.handleCreateCategorySuccess.bind(this),
        handleCreateCategoryFailed: this.handleCreateCategoryFailed.bind(this),
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
    this.handleOnChangeStatus = this.handleOnChangeStatus.bind(this);
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this)
  }
  handleUploadImageSuccess(response) {
    try {
      Logger.info("CreateCategoryComponent execute handleUploadImageSuccess");
      Logger.debug("CreateCategoryComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { createCategory } = this.props;
      const srcImg = response.path;
      let payload = new ModelRequest()
        .setIcon(srcImg)
        .setName(data['name'])
        .setStatus(data['status'])
        .setTargetMeijiId(data['targetMeijiId'])

      Logger.debug("CreateCategoryComponent execute handleRequest receive payload", payload);
      createCategory(timeout.key, payload);
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }

  handleCreateCategorySuccess() {
    try {
      Logger.info("CreateCategoryComponent execute handleCreateCategorySuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") });
      timeout.setTimeout(false);
      this.handleOnBack();
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleCreateCategorySuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleCreateCategoryFailed() {
    try {
      Logger.info("CreateCategoryComponent execute handleCreateCategoryFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleCreateCategoryFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("CreateCategoryComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      const { toast } = this.props;
      if (!Helper.isEmpty(data["icon"])) {
        req.current = req.upload;
      } else {
        req.current = req.create;
      }
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("CreateCategoryComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      ui.defaultStatus = ui.listStatus[0];
      ui.defaultCategory = ui.listCategory[0];

      data['status'] = ui.defaultStatus.value
      data['targetMeijiId'] = ui.defaultCategory.value

    } catch (e) {
      Logger.error(`CreateCategoryComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("CreateCategoryComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`CreateCategoryComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("CreateCategoryComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { upload, createCategory } = this.props;
      switch (req.current) {
        case req.upload:
          upload(timeout.key, data["icon"]);
          break;
        case req.create:
          let payload = new ModelRequest()
            .setName(data['name'])
            .setStatus(data['status'])
            .setTargetMeijiId(data['targetMeijiId'])

          Logger.debug("CreateCategoryComponent execute handleRequest receive payload", payload);
          createCategory(timeout.key, payload);
          break;
        default:
          break;
      }
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("CreateCategoryComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`CreateCategoryComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("CreateCategoryComponent execute handleOnChange");
      Logger.debug("CreateCategoryComponent execute handleOnChange receive name", name);
      Logger.debug("CreateCategoryComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("CreateCategoryComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      delete temp['icon']
      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }


  handleOnChangeStatus(name, value) {
    try {
      Logger.info("CreateCategoryComponent execute handleOnChangeStatus");
      Logger.debug("CreateCategoryComponent execute handleOnChangeStatus receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultStatus = ui.listStatus.find((item) => {
        return item.value == value;
      });
      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleOnChangeStatus ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeTarget(event, value) {
    try {
      Logger.info("CreateCategoryComponent execute handleOnChangeTarget");
      Logger.debug("CreateCategoryComponent execute handleOnChangeTarget receive value", value);
      const { data } = this.state;
      const { ui } = this.state;
      ui.defaultCategory = ui.listCategory.find((item) => {
        return item.value == value;
      });
      this.handleOnChange("targetMeijiId", value);
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeImage(value) {
    try {
      Logger.info("CreateCategoryComponent execute handleOnChangeImage");
      Logger.debug("CreateCategoryComponent execute handleOnChangeImage receive", value);
      const { ui, timeout, req } = this.state;
      const { handleChangeImage } = this.props;
      ui.photos = value;
      if (Helper.isEmpty(value)) {
        req.current = req.create
      } else {
        req.current = req.upload
      }
      this.handleOnChange("icon", ui.photos);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleOnChangeImage ${e.toString()}`);
    }
  }
  handleOnBack() {
    try {
      Logger.info("CreateCategoryComponent execute handleOnBack");
      this.props.history.goBack();
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return <View ui={ui} timeout={timeout}
      handleSubmit={this.handleSubmit} data={data}
      handleOnRef={this.handleOnRef}
      handleOnChange={this.handleOnChange}
      handleOnChangeShow={this.handleOnChangeShow}
      handleOnChangeImage={this.handleOnChangeImage}
      handleOnBack={this.handleOnBack}
      handleOnChangeTarget={this.handleOnChangeTarget}
      handleOnChangeStatus={this.handleOnChangeStatus}
    />;
  }
}

export default BaseComponent(CreateCategoryComponent);
