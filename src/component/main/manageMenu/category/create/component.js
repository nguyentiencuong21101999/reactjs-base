import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import MenuEnum from "service/enum/menu";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import ModelTable from 'core/table/model'
import Localize from "service/localize";

class CreateCategoryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleGetListCategorySuccess: this.handleGetListCategorySuccess.bind(this),

        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleCreateCategorySuccess: this.handleCreateCategorySuccess.bind(this),
        handleCreateCategoryFailed: this.handleCreateCategoryFailed.bind(this),
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
        isUpdate: false
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 3,
        upload: 1,
        create: 2,
        getListCategory: 3
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnchangeType = this.handleOnchangeType.bind(this);
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChangeCategory = this.handleOnChangeCategory.bind(this)
  }

  handleGetListCategorySuccess(response) {
    try {
      Logger.info("LoadingListPostComponent execute handleGetListCategorySuccess");
      Logger.debug("LoadingListPostComponent execute handleGetListCategorySuccess receive list", response);
      const { ui, timeout, req, data } = this.state;
      timeout.setTimeout(false);
      const listCategory = []
      if (response.list.length > 0) {
        response.list.map(item => {
          listCategory.push({ text: item.menuCategoryName, value: item.menuCategoryId })
        })
      }
      ui.listCategory = listCategory
      ui.defaultCategory = ui.listCategory.length > 0 ? ui.listCategory[0] : ""

      data['menuCategoryParentId'] = !Helper.isEmpty(ui.defaultCategory.value) ? ui.defaultCategory.value : ""
      req.current = req.create;
      this.setState({ ui });
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleGetListCategorySuccess ${e.toString()}`);
    }
  }

  handleUploadImageSuccess(response) {
    try {
      Logger.info("CreateCategoryComponent execute handleUploadImageSuccess");
      Logger.debug("CreateCategoryComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { createCategory } = this.props;
      const srcImg = response.path;
      const payloadCreate = new ModelRequest()
        .setPhotos(srcImg)
        .setMenuCategoryName(data['menuCategoryName'])
        .setDescription(!Helper.isEmpty(data['description']) ? data['description'] : undefined)
        .setMenuCategoryType(data["menuCategoryType"])
        .setMenuCategoryParentId(ui.defaultType.value === MenuEnum.CATEGORY_TYPE.CLASSIFICATION ? data['menuCategoryParentId'] : undefined)

      Logger.debug("CreateCategoryComponent execute handleRequest receive payload", payloadCreate);
      createCategory(timeout.key, payloadCreate)
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }

  handleCreateCategorySuccess() {
    try {
      Logger.info("CreateCategoryComponent execute handleCreateCategorySuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") });
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
      if (!Helper.isEmpty(data["photos"])) {
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
      const { ui, data, timeout } = this.state;
      ui.defaultType = ui.listType[0];

      data['menuCategoryType'] = ui.defaultType.value
      //!Helper.isEmpty(ui.data.gender) ? ui.gender.find(item => item.value === ui.data.gender) : ui.gender[0]
      timeout.setTimeout()
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
      const { upload, getListCategory, createCategory } = this.props;
      switch (req.current) {
        case req.getListCategory:
          const payload = new ModelTable()
            .setFrom(0)
            .setLimit(0)
            .setOrder("modifiedAt")
            .setBy("desc")
          payload.menuCategoryType = MenuEnum.CATEGORY_TYPE.CATEGORY
          getListCategory(timeout.key, payload)
          break;
        case req.upload:
          upload(timeout.key, data["photos"]);
          break;
        case req.create:
          const payloadCreate = new ModelRequest()
            .setMenuCategoryName(data['menuCategoryName'])
            .setDescription(!Helper.isEmpty(data['description']) ? data['description'] : undefined)
            .setMenuCategoryType(data["menuCategoryType"])
            .setMenuCategoryParentId(ui.defaultType.value === MenuEnum.CATEGORY_TYPE.CLASSIFICATION ? data['menuCategoryParentId'] : undefined)

          createCategory(timeout.key, payloadCreate)
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

      delete temp['photos']
      delete temp['description']
      if (ui.defaultType.value === MenuEnum.CATEGORY_TYPE.CATEGORY) {
        delete temp['menuCategoryParentId']
      }
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



  handleOnchangeType(name, value) {
    try {
      Logger.info("CreateCategoryComponent execute handleOnchangeType");
      Logger.debug("CreateCategoryComponent execute handleOnchangeType receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultType = ui.listType.find((item) => {
        return item.value == value;
      });

      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleOnchangeType ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeCategory(event, value) {
    try {
      Logger.info("CreateCategoryComponent execute handleOnChangeCategory");
      Logger.debug("CreateCategoryComponent execute handleOnChangeCategory receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultCategory = ui.listCategory.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange('menuCategoryParentId', value);
    } catch (e) {
      Logger.error(`CreateCategoryComponent handleOnChangeCategory ${e.toString()}`);
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
      req.current = req.upload;
      this.handleOnChange("photos", ui.photos);
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
    const { ui, timeout, data, req } = this.state;
    return req.current !== req.getListCategory ? (<View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit}
      data={data} handleOnRef={this.handleOnRef}
      handleOnChange={this.handleOnChange}
      handleOnChangeShow={this.handleOnChangeShow}
      handleOnchangeType={this.handleOnchangeType}
      handleOnChangeImage={this.handleOnChangeImage}
      handleOnBack={this.handleOnBack}
      handleOnChangeCategory={this.handleOnChangeCategory}
    />) : null;
  }
}

export default BaseComponent(CreateCategoryComponent);
