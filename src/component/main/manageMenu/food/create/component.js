import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import MenuEnum from "service/enum/menu";
import RewardEnum from "service/enum/reward";
import View from "./view";
import { ModelView, ModelRequest, ModelViewNotRequired } from "./model";
import Localize from "service/localize";

class CreateFoodComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleCreateFoodSuccess: this.handleCreateFoodSuccess.bind(this),
        handleCreateFoodFailed: this.handleCreateFoodFailed.bind(this),
        handleGetListSuccess: this.handleGetListSuccess.bind(this)
      },
      data: new ModelView(),
      field: new ModelViewNotRequired(),
      ui: {
        //protein
        listProteinUnit: [
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.G],
            value: MenuEnum.FOOD_UNIT.G,
          },
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.MG],
            value: MenuEnum.FOOD_UNIT.MG,
          },
        ],
        defaultProteinUnit: {},
        //lipid
        listLipidUnit: [
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.G],
            value: MenuEnum.FOOD_UNIT.G,
          },
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.MG],
            value: MenuEnum.FOOD_UNIT.MG,
          },
        ],
        defaultLipidUnit: {},
        //Glicid
        listGlucidUnit: [
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.G],
            value: MenuEnum.FOOD_UNIT.G,
          },
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.MG],
            value: MenuEnum.FOOD_UNIT.MG,
          },
        ],
        defaultGlucidUnit: {},
        //canxi
        listCanxiUnit: [
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.G],
            value: MenuEnum.FOOD_UNIT.G,
          },
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.MG],
            value: MenuEnum.FOOD_UNIT.MG,
          },
        ],
        defaultCanxiUnit: {},
        //sắt
        listIronUnit: [
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.G],
            value: MenuEnum.FOOD_UNIT.G,
          },
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.MG],
            value: MenuEnum.FOOD_UNIT.MG,
          },
        ],
        defaultIronUnit: {},
        //muối
        listSaltUnit: [
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.G],
            value: MenuEnum.FOOD_UNIT.G,
          },
          {
            text: MenuEnum.FOOD_UNIT_PARSE[MenuEnum.FOOD_UNIT.MG],
            value: MenuEnum.FOOD_UNIT.MG,
          },
        ],
        defaultSaltUnit: {},
        listEnergyUnit: [
          {
            text: MenuEnum.FOOD_ENERGY_UNIT_PARSE[MenuEnum.FOOD_ENERGY_UNIT.KCAL],
            value: MenuEnum.FOOD_ENERGY_UNIT.KCAL,
          },
        ],
        defaultEnergyUnit: {},

        listFor: [
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.BREAKFAST],
            value: MenuEnum.FOOD.BREAKFAST,
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.LUNCH],
            value: MenuEnum.FOOD.LUNCH,
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.DINNER],
            value: MenuEnum.FOOD.DINNER,
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.FIRST_SNACK],
            value: MenuEnum.FOOD.FIRST_SNACK,
          },
          {
            text: MenuEnum.FOOD_PARSE[MenuEnum.FOOD.SECOND_SNACK],
            value: MenuEnum.FOOD.SECOND_SNACK,
          },
        ],
        defaultFor: [],
        listMenuCategory: [],
        defaultMenuCategory: [],
        listSubFood: [],
        defaultSubFood: [],
        //Đang mang thai
        ListPregnancyTips: [
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.SHOULD],
            value: MenuEnum.FOOD_TIPS_STATUS.SHOULD,
          },
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT],
            value: MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT,
          },
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.CAREFUL],
            value: MenuEnum.FOOD_TIPS_STATUS.CAREFUL,
          },
        ],
        defaultPregnancyTips: {},
        //sau sinh
        ListPostpartumTips: [
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.SHOULD],
            value: MenuEnum.FOOD_TIPS_STATUS.SHOULD,
          },
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT],
            value: MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT,
          },
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.CAREFUL],
            value: MenuEnum.FOOD_TIPS_STATUS.CAREFUL,
          },
        ],
        defaultPostpartumTips: {},
        //cho con bú
        ListBreastfeedingTips: [
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.SHOULD],
            value: MenuEnum.FOOD_TIPS_STATUS.SHOULD,
          },
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT],
            value: MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT,
          },
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.CAREFUL],
            value: MenuEnum.FOOD_TIPS_STATUS.CAREFUL,
          },
        ],
        defaultBreastfeedingTips: {},
        //tre con
        ListYoungChildrenTips: [
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.SHOULD],
            value: MenuEnum.FOOD_TIPS_STATUS.SHOULD,
          },
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT],
            value: MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT,
          },
          {
            text: MenuEnum.FOOD_TIPS_STATUS_PARSE[MenuEnum.FOOD_TIPS_STATUS.CAREFUL],
            value: MenuEnum.FOOD_TIPS_STATUS.CAREFUL,
          },
        ],
        defaultYoungChildrenTips: {},

        isShowBtn: true,
        photos: "",
        data: {},
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 3,
        upload: 1,
        create: 2,
        getList: 3
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeCategory = this.handleOnChangeCategory.bind(this);
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);

    this.handleOnChangeFor = this.handleOnChangeFor.bind(this);
    this.handleOnChangeMenuCategory = this.handleOnChangeMenuCategory.bind(this);
    this.handleOnChangeSubFood = this.handleOnChangeSubFood.bind(this);
    this.handleOnChangeEnergyUnit = this.handleOnChangeEnergyUnit.bind(this);
    this.handleOnChangeUnit = this.handleOnChangeUnit.bind(this);
  }
  handleUploadImageSuccess(response) {
    try {
      Logger.info("CreateFoodComponent execute handleUploadImageSuccess");
      Logger.debug("CreateFoodComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { createFood } = this.props;
      const srcImg = response.path;
      let payload = new ModelRequest()
        .setPhotos(srcImg)
        .setFoodName(data['foodName'])
        .setIngredientsAndPreparation(!Helper.isEmpty(data['ingredientsAndPreparation']) ? data['ingredientsAndPreparation'] : undefined)
        .setSuitableFor(data['suitableFor'])
        .setMenuCategoriesList(!Helper.isEmpty(data['menuCategoriesList']) ? data['menuCategoriesList'] : undefined)
        .setSubFoodList(!Helper.isEmpty(data['subFoodList']) ? data['subFoodList'] : undefined)

        .setEnergy(Number(data['energy']))
        .setEnergyUnit(data['energyUnit'])
        .setProtein(!Helper.isEmpty(data['protein']) ? data['protein'] : undefined)
        .setProteinUnit(!Helper.isEmpty(data['protein']) ? data['proteinUnit'] : undefined)
        .setLipid(!Helper.isEmpty(data['lipid']) ? data['lipid'] : undefined)
        .setLipidUnit(!Helper.isEmpty(data['lipid']) ? data['lipidUnit'] : undefined)
        .setGlucid(!Helper.isEmpty(data['glucid']) ? data['glucid'] : undefined)
        .setGlucidUnit(!Helper.isEmpty(data['glucid']) ? data['glucidUnit'] : undefined)
        .setCanxi(!Helper.isEmpty(data['canxi']) ? data['canxi'] : undefined)
        .setCanxiUnit(!Helper.isEmpty(data['canxi']) ? data['canxiUnit'] : undefined)
        .setIron(!Helper.isEmpty(data['iron']) ? data['iron'] : undefined)
        .setIronUnit(!Helper.isEmpty(data['iron']) ? data['ironUnit'] : undefined)
        .setSalt(!Helper.isEmpty(data['salt']) ? data['salt'] : undefined)
        .setSaltUnit(!Helper.isEmpty(data['salt']) ? data['saltUnit'] : undefined)

        .setAdditionalInfo(!Helper.isEmpty(data['additionalInfo']) ? data['additionalInfo'] : undefined)
        .setPostpartumTips(data["postpartumTips"])
        .setBreastfeedingTips(data["breastfeedingTips"])
        .setYoungChildrenTips(data["youngChildrenTips"])
        .setPregnancyTips(data['pregnancyTips'])
        .setCookingSteps(!Helper.isEmpty(data["cookingSteps"]) ? data["cookingSteps"] : undefined)
        .setTips(!Helper.isEmpty(data["tips"]) ? data["tips"] : undefined)
      Logger.debug("CreateFoodComponent execute handleRequest receive payload", payload);
      createFood(timeout.key, payload);
    } catch (e) {
      Logger.error(`CreateFoodComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }


  handleGetListSuccess(response) {
    try {
      Logger.info("CreateFoodComponent execute handleCreateRewardSuccess");
      const { timeout, req, ui } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
    
      const listMenuCategory = []
      response.classifications.map((item) => {
        listMenuCategory.push({ text: item.menuCategoryName, value: item.menuCategoryId })
      })

      const listSubFood = []
      response.foods.map((item) => {
        listSubFood.push({ text: item.foodName, value: item.foodId })
      })
      ui.listMenuCategory = listMenuCategory
      ui.listSubFood = listSubFood
      req.current = req.create
      this.setState({ ui })
    } catch (e) {
      Logger.error(`CreateFoodComponent handleCreateRewardSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleCreateFoodSuccess() {
    try {
      Logger.info("CreateFoodComponent execute handleCreateFoodSuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") });
      this.handleOnBack();
    } catch (e) {
      Logger.error(`CreateFoodComponent handleCreateFoodSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleCreateFoodFailed() {
    try {
      Logger.info("CreateFoodComponent execute handleCreateFoodFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`CreateFoodComponent handleCreateFoodFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("CreateFoodComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      const { toast } = this.props
      if (!Helper.isEmpty(data["photos"])) {
        req.current = req.upload;
      } else {
        req.current = req.create;
      }
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateFoodComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info("CreateFoodComponent execute UNSAFE_componentWillMount");
      const { timeout, ui, data } = this.state;
      //
      ui.defaultEnergyUnit = ui.listEnergyUnit[0];
      ui.defaultProteinUnit = ui.listProteinUnit[0];
      ui.defaultLipidUnit = ui.listLipidUnit[0];
      ui.defaultGlucidUnit = ui.listGlucidUnit[0];
      ui.defaultCanxiUnit = ui.listCanxiUnit[0];
      ui.defaultIronUnit = ui.listIronUnit[0];
      ui.defaultSaltUnit = ui.listSaltUnit[0];

      data['energyUnit'] = ui.defaultEnergyUnit.value
      data['proteinUnit'] = ui.defaultProteinUnit.value
      data['lipidUnit'] = ui.defaultLipidUnit.value
      data['glucidUnit'] = ui.defaultGlucidUnit.value
      data['canxiUnit'] = ui.defaultCanxiUnit.value
      data['ironUnit'] = ui.defaultIronUnit.value
      data['saltUnit'] = ui.defaultSaltUnit.value

      //
      ui.defaultPregnancyTips = ui.ListPregnancyTips[0];
      ui.defaultPostpartumTips = ui.ListPostpartumTips[0];
      ui.defaultBreastfeedingTips = ui.ListBreastfeedingTips[0];
      ui.defaultYoungChildrenTips = ui.ListYoungChildrenTips[0];

      data['pregnancyTips'] = ui.defaultPregnancyTips.value
      data['postpartumTips'] = ui.defaultPostpartumTips.value
      data['breastfeedingTips'] = ui.defaultBreastfeedingTips.value
      data['youngChildrenTips'] = ui.defaultYoungChildrenTips.value

      timeout.setTimeout()
      //!Helper.isEmpty(ui.data.gender) ? ui.gender.find(item => item.value === ui.data.gender) : ui.gender[0]
    } catch (e) {
      Logger.error(`CreateFoodComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("CreateFoodComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`CreateFoodComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("CreateFoodComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { upload, getList } = this.props;
      switch (req.current) {
        case req.getList:
          getList(timeout.key)
          break;
        case req.upload:
          upload(timeout.key, data["photos"]);
        default:
          break;
      }

    } catch (e) {
      Logger.error(`CreateFoodComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("CreateFoodComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreateFoodComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`CreateFoodComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value, error) {
    try {

      Logger.info("CreateFoodComponent execute handleOnChange");
      Logger.debug("CreateFoodComponent execute handleOnChange receive name", name);
      Logger.debug("CreateFoodComponent execute handleOnChange receive value", value);
      const { data, ui, field } = this.state;
      data[name] = value;
      Logger.debug("CreateFoodComponent execute handleOnChange receive data", data);
      let temp = { ...data };
  
      delete temp['ingredientsAndPreparation']
      delete temp['menuCategoriesList']
      delete temp['subFoodList']
      delete temp["protein"]
      delete temp['lipid']
      delete temp['glucid']
      delete temp['canxi']
      delete temp['iron']
      delete temp['salt']
      delete temp["additionalInfo"]
      delete temp["cookingSteps"]
      delete temp["tips"]

      let fields = field
      fields[name] = error
      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1
        && Object.values(fields).findIndex((item) => item === true) == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`CreateFoodComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }


  handleOnChangeCategory(name, value) {
    try {
      Logger.info("CreateFoodComponent execute handleOnChangeCategory");
      Logger.debug("CreateFoodComponent execute handleOnChangeCategory receive value", value);
      const { data } = this.state;
      const { ui } = this.state;
      switch (name) {
        case "pregnancyTips":
          ui.defaultPregnancyTips = ui.ListPregnancyTips.find((item) => {
            return item.value == value;
          });
          break;
        case "postpartumTips":
          ui.defaultPostpartumTips = ui.ListPostpartumTips.find((item) => {
            return item.value == value;
          });
          break;
        case "breastfeedingTips":
          ui.defaultBreastfeedingTips = ui.ListBreastfeedingTips.find((item) => {
            return item.value == value;
          });
          break;
        case "youngChildrenTips":
          ui.defaultYoungChildrenTips = ui.ListYoungChildrenTips.find((item) => {
            return item.value == value;
          });
          break;

        default:
          break;
      }

      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateFoodComponent handleOnChangeCategory ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeRewardType(name, value) {
    try {
      Logger.info("CreateFoodComponent execute handleOnChangeRewardType");
      Logger.debug("CreateFoodComponent execute handleOnChangeRewardType receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.currentBonusCount = ui.bonusCount.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange(name, value);
    } catch (e) {
      Logger.error(`CreateFoodComponent handleOnChangeRewardType ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeImage(value) {
    try {
      Logger.info("CreateFoodComponent execute handleOnChangeImage");
      Logger.debug("CreateFoodComponent execute handleOnChangeImage receive", value);
      const { ui, timeout, req } = this.state;
      const { handleChangeImage } = this.props;
      ui.photos = value;
      req.current = req.upload;
      this.handleOnChange("photos", ui.photos);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateFoodComponent handleOnChangeImage ${e.toString()}`);
    }
  }

  handleOnBack() {
    try {
      Logger.info("CreateFoodComponent execute handleOnBack");
      this.props.history.goBack();
    } catch (e) {
      Logger.error(`CreateFoodComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnChangeFor(name, list) {
    try {
      Logger.info("CreateFoodComponent execute handleOnChangeFor");
      Logger.debug("CreateFoodComponent execute handleOnChangeFor receive list", list);
      const { ui } = this.state;
      this.handleOnChange(name, list);
    } catch (e) {
      Logger.error(`CreateFoodComponent handleOnChangeFor ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeMenuCategory(name, list) {
    try {
      Logger.info("CreateFoodComponent execute handleOnChangeMenuCategory");
      Logger.debug("CreateFoodComponent execute handleOnChangeMenuCategory receive list", list);
      const { ui } = this.state;
      this.handleOnChange(name, list);
    } catch (e) {
      Logger.error(`CreateFoodComponent handleOnChangeMenuCategory ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeSubFood(name, list) {
    try {
      Logger.info("CreateFoodComponent execute handleOnChangeSubFood");
      Logger.debug("CreateFoodComponent execute handleOnChangeSubFood receive list", list);
      const { ui } = this.state;
      this.handleOnChange(name, list);
    } catch (e) {
      Logger.error(`CreateFoodComponent handleOnChangeSubFood ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeEnergyUnit(name, value) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeEnergyUnit");
      Logger.debug("CreatePostComponent execute handleOnChangeEnergyUnit receive value", value);
      const { ui } = this.state;
      ui.defaultEnergyUnit = ui.listEnergyUnit.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange(name, value);
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeEnergyUnit ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeUnit(name, value) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeEnergyUnit");
      Logger.debug("CreatePostComponent execute handleOnChangeEnergyUnit receive value", value);
      const { ui } = this.state;
      switch (name) {
        case "proteinUnit":
          ui.defaultProteinUnit = ui.listProteinUnit.find((item) => {
            return item.value == value;
          });
          break;
        case "lipidUnit":
          ui.defaultLipidUnit = ui.listProteinUnit.find((item) => {
            return item.value == value;
          });
          break;
        case "glucidUnit":
          ui.defaultGlucidUnit = ui.listGlucidUnit.find((item) => {
            return item.value == value;
          });
          break;
        case "canxiUnit":
          ui.defaultCanxiUnit = ui.listCanxiUnit.find((item) => {
            return item.value == value;
          });
          break;
        case "ironUnit":
          ui.defaultIronUnit = ui.listIronUnit.find((item) => {
            return item.value == value;
          });
          break;
        case "saltUnit":
          ui.defaultSaltUnit = ui.listSaltUnit.find((item) => {
            return item.value == value;
          });
          break;

        default:
          break;
      }
      this.setState({ ui });
      this.handleOnChange(name, value);
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeEnergyUnit ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  render() {
    const { ui, timeout, data, req } = this.state;
    return req.current !== req.getList ? (<View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeCategory={this.handleOnChangeCategory} handleOnChangeImage={this.handleOnChangeImage} handleOnBack={this.handleOnBack} handleOnChangeFor={this.handleOnChangeFor} handleOnChangeMenuCategory={this.handleOnChangeMenuCategory} handleOnChangeSubFood={this.handleOnChangeSubFood} handleOnChangeEnergyUnit={this.handleOnChangeEnergyUnit} handleOnChangeUnit={this.handleOnChangeUnit} />) : null
  }
}

export default BaseComponent(CreateFoodComponent);
