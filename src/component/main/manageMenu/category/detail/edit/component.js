import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import MenuEnum from "service/enum/menu";
import View from "component/main/manageMenu/category/create/view";
import { ModelView, ModelRequest } from "./model";
import ModelTable from "core/table/model";
import Config from "config";
import Localize from "service/localize";

class EditCategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleGetListCategorySuccess: this.handleGetListCategorySuccess.bind(this),

        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleUpdateCategorySuccess: this.handleUpdateCategorySuccess.bind(this),
        handleUpdateCategoryFailed: this.handleUpdateCategoryFailed.bind(this),
      },
      data: new ModelView(),
      ui: {
        listCategory: null,
        defaultCategory: {},
        data: {},
        listType: [
          {
            text: MenuEnum.CATEGORY_TYPE_PARSE[MenuEnum.CATEGORY_TYPE.CLASSIFICATION],
            value: MenuEnum.CATEGORY_TYPE.CLASSIFICATION,
          },
          {
            text: MenuEnum.CATEGORY_TYPE_PARSE[MenuEnum.CATEGORY_TYPE.CATEGORY],
            value: MenuEnum.CATEGORY_TYPE.CATEGORY,
          },
        ],
        defaultType: {},
        isShowBtn: true,
        photos: "",
        detailCategory: null,
        isUpdate: true
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 3,
        upload: 1,
        update: 2,
        getListCategory: 3,
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnchangeType = this.handleOnchangeType.bind(this);
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChangeCategory = this.handleOnChangeCategory.bind(this);
  }

  handleGetListCategorySuccess(response) {
    try {
      Logger.info("LoadingListPostComponent execute handleGetListCategorySuccess");
      Logger.debug("LoadingListPostComponent execute handleGetListCategorySuccess receive list", response);
      const { ui, timeout, req, data } = this.state;
      timeout.setTimeout(false);
      const listCategory = [];

      if (response.list.length > 0) {
        response.list.map((item) => {
          listCategory.push({ text: item.menuCategoryName, value: item.menuCategoryId });
        });
      }
      ui.listCategory = listCategory;
      ui.defaultCategory = !Helper.isEmpty(ui.detailCategory.menuCategoryParentId) ? ui.listCategory.find((item) => item.value === ui.detailCategory.menuCategoryParentId) : ui.listCategory[0];

      data["menuCategoryParentId"] = !Helper.isEmpty(ui.defaultCategory.value) ? ui.defaultCategory.value : ""
      req.current = req.update;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleGetListCategorySuccess ${e.toString()}`);
    }
  }

  handleUploadImageSuccess(response) {
    try {
      Logger.info("EditCategoryComponent execute handleUploadImageSuccess");
      Logger.debug("EditCategoryComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { updateCategory } = this.props;
      const srcImg = response.path;
      const payloadUpload = new ModelRequest()
        .setMenuCategoryId(ui.detailCategory.menuCategoryId)
        .setPhotos(srcImg)
        .setMenuCategoryName(data["menuCategoryName"])
        .setDescription(!Helper.isEmpty(data["description"]) ? data["description"] : "")
        .setMenuCategoryType(data["menuCategoryType"])
        .setMenuCategoryParentId(ui.defaultType.value === MenuEnum.CATEGORY_TYPE.CLASSIFICATION ? data["menuCategoryParentId"] : undefined);
      updateCategory(timeout.key, payloadUpload);

    } catch (e) {
      Logger.error(`EditCategoryComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }

  handleUpdateCategorySuccess() {
    try {
      Logger.info("EditCategoryComponent execute handleUpdateCategorySuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") });
      this.handleOnBack();
    } catch (e) {
      Logger.error(`EditCategoryComponent handleUpdateCategorySuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUpdateCategoryFailed() {
    try {
      Logger.info("EditCategoryComponent execute handleUpdateCategoryFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`EditCategoryComponent handleUpdateCategoryFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("EditCategoryComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      if (!Helper.isEmpty(data["photos"])) {
        req.current = req.upload;
      } else {
        req.current = req.update;
      }
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`EditCategoryComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("EditCategoryComponent execute UNSAFE_componentWillMount");
      const { ui, data, timeout } = this.state;
      const { location } = this.props;
      ui.detailCategory = location.state;
      ui.defaultType = ui.listType.find((item) => item.value === ui.detailCategory.menuCategoryType);

      data["menuCategoryType"] = ui.defaultType.value;
      data["photos"] = ui.detailCategory && !Helper.isEmpty(ui.detailCategory.photos) ? ui.detailCategory.photos : "";
      data["menuCategoryName"] = ui.detailCategory.menuCategoryName;
      data["description"] = !Helper.isEmpty(ui.detailCategory.description) ? ui.detailCategory.description : "";

      //!Helper.isEmpty(ui.data.gender) ? ui.gender.find(item => item.value === ui.data.gender) : ui.gender[0]
      timeout.setTimeout();
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
      const { upload, getListCategory, updateCategory } = this.props;
      switch (req.current) {
        case req.getListCategory:
          const payload = new ModelTable().setFrom(0).setLimit(0).setOrder("modifiedAt").setBy("desc");
          payload.menuCategoryType = MenuEnum.CATEGORY_TYPE.CATEGORY;
          getListCategory(timeout.key, payload);
          break;
        case req.upload:
          upload(timeout.key, data["photos"]);
          break;
        case req.update:
          const photos = !Helper.isEmpty(data["photos"]) ? data["photos"].replace(Config.urlStatic, "") : "";
          const payloadUpload = new ModelRequest()
            .setMenuCategoryId(ui.detailCategory.menuCategoryId)
            .setPhotos(photos)
            .setMenuCategoryName(data["menuCategoryName"])
            .setDescription(!Helper.isEmpty(data["description"]) ? data["description"] : "")
            .setMenuCategoryType(data["menuCategoryType"])
            .setMenuCategoryParentId(ui.defaultType.value === MenuEnum.CATEGORY_TYPE.CLASSIFICATION ? data["menuCategoryParentId"] : undefined);
          updateCategory(timeout.key, payloadUpload);
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

      delete temp["photos"];
      delete temp["description"];
      if (ui.defaultCategory.value === MenuEnum.CATEGORY_TYPE.CATEGORY) {
        delete temp["menuCategoryParentId"];
      }
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



  handleOnchangeType(name, value) {
    try {
      Logger.info("EditCategoryComponent execute handleOnchangeType");
      Logger.debug("EditCategoryComponent execute handleOnchangeType receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultType = ui.listType.find((item) => {
        return item.value == value;
      });

      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditCategoryComponent handleOnchangeType ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeCategory(event, value) {
    try {
      Logger.info("EditCategoryComponent execute handleOnChangeCategory");
      Logger.debug("EditCategoryComponent execute handleOnChangeCategory receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultCategory = ui.listCategory.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange("menuCategoryParentId", value);
    } catch (e) {
      Logger.error(`EditCategoryComponent handleOnChangeCategory ${e.toString()}`);
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
        req.current = req.update;
      } else {
        req.current = req.upload;
      }
      this.handleOnChange("photos", ui.photos);
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
    return ui.listCategory ? <View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeShow={this.handleOnChangeShow} handleOnchangeType={this.handleOnchangeType} handleOnChangeImage={this.handleOnChangeImage} handleOnBack={this.handleOnBack} handleOnChangeCategory={this.handleOnChangeCategory} /> : null;
  }
}

export default BaseComponent(EditCategoryComponent);
