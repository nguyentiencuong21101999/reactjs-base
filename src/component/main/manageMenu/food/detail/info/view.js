import React, { Fragment } from "react";
import { Box, Typography, Tab, Button, Stack, Divider, Grid } from "@material-ui/core";

import Helper from "service/helper";
import ButtonHook from "core/hook/button/index.hook";
import Alert from "@material-ui/core/Alert";
import Localize from "service/localize";
import MenuEnum from "service/enum/menu";
import ImageSlideComponent from "core/slideImage";
import style from "core/hook/button/style"
import IconV from 'assets/images/food/Group28026.svg'
import IconI from 'assets/images/food/Group28031.svg'
import IconX from 'assets/images/food/Group28033.svg'
const DetailFoodHtml = (props) => {
  const { ui, timeout, handleOnBack, handleEdit, data } = props;
  const renderIcon = (value) => {
    let link = ""
    switch (value) {
      case MenuEnum.FOOD_TIPS_STATUS.SHOULD:
        link = IconV
        break;
      case MenuEnum.FOOD_TIPS_STATUS.SHOULD_NOT:
        link = IconX
        break;
      case MenuEnum.FOOD_TIPS_STATUS.CAREFUL:
        link = IconI
        break;

      default:
        break;
    }
    return <img style={{ marginRight: "3px" }} src={link} width="20" height="20" />
  }
  const MenuCategoriesListComponent = (list) => {
    let categoryList = []
    list.map((item) => {
      if (categoryList.length === 0) {
        categoryList.push(item.menuCategoryName);
      } else {
        categoryList = [categoryList, item.menuCategoryName].join(", ");
      }
    })
    return categoryList
  }
  const SuitableForComponent = (list) => {
    let subFoodList = []
    list.map((item) => {
      if (subFoodList.length === 0) {
        subFoodList.push(MenuEnum.FOOD_PARSE[item]);
      } else {
        subFoodList = [subFoodList, MenuEnum.FOOD_PARSE[item]].join(", ");
      }
    })
    return subFoodList
  }
  const SubFoodListComponent = (list) => {
    let SuitableFor = []
    list.map((item) => {
      if (SuitableFor.length === 0) {
        SuitableFor.push(item.foodName);
      } else {
        SuitableFor = [SuitableFor, item.foodName].join(", ");
      }
    })
    return SuitableFor
  }
  const keyParse = {
    photos: Localize.getLocalize("LC_IMAGE"),
    foodName: Localize.getLocalize("LC_FOOD_NAME"),
    ingredientsAndPreparation: Localize.getLocalize("LC_INGREDIENTS_AND_PREPARATION"),
    suitableFor: Localize.getLocalize("LC_SUITABLE"),
    menuCategoriesList: Localize.getLocalize("LC_CATEGORY"),
    subFoodList: Localize.getLocalize("LC_ALTER_FOOD"),
    createdBy: Localize.getLocalize("LC_CREATED_BY"),
    modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
  };
  const valueParse = {
    photos: (value) => {
      return <ImageSlideComponent item={[value]} />;
    },
    foodName: (value) => {
      return value || "-";
    },
    ingredientsAndPreparation: (value) => {
      return value || "-";
    },
    suitableFor: (value) => {
      return !Helper.isEmpty(value) ? SuitableForComponent(JSON.parse(value)) : "-"
    },
    menuCategoriesList: (value) => {
      return value.length > 0 ? MenuCategoriesListComponent(value) : "-"
    },
    subFoodList: (value) => {
      return value.length > 0 ? SubFoodListComponent(value) : "-"
    },
    createdBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailFood.createdBy, ui.detailFood.createdAt) : "-"
    },
    modifiedBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailFood.modifiedBy, ui.detailFood.modifiedAt) : "-"
    },
  };
  return (
    <>
      <Box>
        <Stack sx={{ width: "100%", typography: "header", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_FOOD")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }}>
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>

              <ButtonHook text={Localize.getLocalize("LC_BUTTON_EDIT")} color="primary" size="small" variant="contained" disabled={timeout.status} style={{ backgroundColor: "rgb(253, 94, 93)" }} onClick={(e) => { e.preventDefault(); handleEdit() }} />
            </Stack>
          </Box>
        </Stack>
        <Stack direction="row" sx={{ width: "100%" }}>
          <Stack direction="column" sx={{ width: "55%", marginRight: "2%" }}>
            <Stack direction="column" spacing={3} sx={{ height: "fit-content", width: "100%", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
              <Stack spacing={3} sx={{ padding: "20px" }}>
                <Typography variant="h4">{Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
                <Stack direction="row" sx={{ width: "100%" }} spacing={2}></Stack>

                {Object.keys(keyParse).map((key, index) => {
                  return (
                    <Stack key={index} direction="row" spacing={2} sx={{ width: "100%" }}>
                      <Stack direction="column" sx={{ width: "25%" }} spacing={2}>
                        <Typography>{keyParse[key]}</Typography>
                      </Stack>
                      <Stack direction="column" sx={{ width: "75%" }} spacing={2}>
                        <Stack sx={{ wordBreak: "break-word" }}> {valueParse[key](ui.detailFood[key])}</Stack>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
            <Stack direction="column" spacing={3} sx={{ height: "fit-content", width: "100%", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
              <Stack spacing={3} sx={{ padding: "20px" }}>
                <Typography variant="h4"> {Localize.getLocalize("LC_NUTRITION_INFO")} </Typography>
                <Stack direction="row">
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {Localize.getLocalize("LC_ENERGY")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {!Helper.isEmpty(ui.detailFood.energy) ? `${Helper.formatCurrency(ui.detailFood.energy)} ${MenuEnum.FOOD_ENERGY_UNIT_PARSE[ui.detailFood.energyUnit]}` : "-"}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {Localize.getLocalize("LC_PROTEIN")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {!Helper.isEmpty(ui.detailFood.protein) ? `${Helper.formatCurrency(ui.detailFood.protein)} ${MenuEnum.FOOD_UNIT_PARSE[ui.detailFood.proteinUnit]}` : "-"}
                  </Stack>
                </Stack>

                <Stack direction="row">
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {Localize.getLocalize("LC_LIPID")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {!Helper.isEmpty(ui.detailFood.lipid) ? `${Helper.formatCurrency(ui.detailFood.lipid)}  ${MenuEnum.FOOD_UNIT_PARSE[ui.detailFood.lipidUnit]}` : "-"}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {Localize.getLocalize("LC_GLUCID")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {!Helper.isEmpty(ui.detailFood.glucid) ? `${Helper.formatCurrency(ui.detailFood.glucid)} ${MenuEnum.FOOD_UNIT_PARSE[ui.detailFood.glucidUnit]}` : "-"}
                  </Stack>
                </Stack>

                <Stack direction="row">
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {Localize.getLocalize("LC_CAXI")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {!Helper.isEmpty(ui.detailFood.canxi) ? `${Helper.formatCurrency(ui.detailFood.canxi)} ${MenuEnum.FOOD_UNIT_PARSE[ui.detailFood.canxiUnit]}` : "-"}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {Localize.getLocalize("LC_FE")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {!Helper.isEmpty(ui.detailFood.iron) ? `${Helper.formatCurrency(ui.detailFood.iron)} ${MenuEnum.FOOD_UNIT_PARSE[ui.detailFood.ironUnit]}` : "-"}
                  </Stack>
                </Stack>
                <Stack direction="row">
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {Localize.getLocalize("LC_SALT")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {!Helper.isEmpty(ui.detailFood.salt) ? `${Helper.formatCurrency(ui.detailFood.salt)} ${MenuEnum.FOOD_UNIT_PARSE[ui.detailFood.saltUnit]}` : "-"}
                  </Stack>

                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction="column" sx={{ width: "43%" }}>
            <Stack direction="column" spacing={3} style={{ height: "fit-content" }} sx={{ width: "100%", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
              <Stack spacing={3} sx={{ padding: "20px" }}>
                <Typography variant="h4">{Localize.getLocalize("LC_ADVICE_FOR_MOM")} </Typography>
                <Stack direction="row">
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {renderIcon(ui.detailFood.pregnancyTips)} {Localize.getLocalize("LC_PREGNANCY")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {renderIcon(ui.detailFood.postpartumTips)}{Localize.getLocalize("LC_AFTER_PREGNANCY")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {renderIcon(ui.detailFood.breastfeedingTips)} {Localize.getLocalize("LC_BREASTFEEDING")}
                  </Stack>
                  <Stack direction="row" sx={{ width: "25%" }}>
                    {renderIcon(ui.detailFood.youngChildrenTips)} {Localize.getLocalize("LC_CHILDREN")}
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                  <Stack direction="column" sx={{ width: "25%" }} spacing={2}>
                    <Typography>{Localize.getLocalize("LC_MORE_INFO")}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "75%" }} spacing={2}>
                    <Typography sx={{ wordBreak: "break-word" }}>{!Helper.isEmpty(ui.detailFood.additionalInfo) ? ui.detailFood.additionalInfo : "-"}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction="column" spacing={3} style={{ height: "fit-content" }} sx={{ marginTop: "10px", width: "100%", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
              <Stack spacing={3} sx={{ padding: "20px" }}>
                <Typography variant="h4">{Localize.getLocalize("LC_HOW_TO_GUIDE")} </Typography>
                <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                  <Stack direction="column" sx={{ width: "25%" }} spacing={2}>
                    <Typography>{Localize.getLocalize("LC_FOOD_PREPARATION")}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "75%" }} spacing={2}>
                    <Typography sx={{ wordBreak: "break-word" }}>{!Helper.isEmpty(ui.detailFood.cookingSteps) ? ui.detailFood.cookingSteps : "-"}</Typography>
                  </Stack>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                  <Stack direction="column" sx={{ width: "25%" }} spacing={2}>
                    <Typography >{Localize.getLocalize("LC_TIPS")}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "75%" }} spacing={2}>
                    <Typography sx={{ wordBreak: "break-word" }}>{!Helper.isEmpty(ui.detailFood.tips) ? ui.detailFood.tips : "-"}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {
        timeout.field === "all" ? (
          <Alert severity="error" style={{ fontSize: "18px" }}>
            {Localize.getLocalize(timeout.message)}
          </Alert>
        ) : null
      }
    </>
  );
};

export default DetailFoodHtml;
