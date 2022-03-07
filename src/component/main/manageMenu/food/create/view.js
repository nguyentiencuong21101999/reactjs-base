import React, { Fragment } from "react";

import { Box, Typography, Tab, Button, Stack, Avatar, Chip } from "@material-ui/core";
import Alert from "@material-ui/core/Alert";
import DragAndDrop from "core/dragAndDrop/resize";
import Helper from "service/helper";

import InputHook from "core/hook/menu/food/protein.hook"
import ForMultiSelectHook from "core/hook/menu/food/for.multiSelectSearch.hook"
import MenuCategoryMultiSelectHook from "core/hook/menu/food/category.multiSelectSearch.hook";
import SubFoodMultiSelectHook from "core/hook/menu/food/subFood.multiSelectSearch.hook";
import IngredientsAndPreparationHook from "core/hook/menu/food/ingredientsAndPreparation.hook";
import AdditionalInfoHook from "core/hook/menu/food/additionalInfo.hook";
import CookingStepsHook from "core/hook/menu/food/cookingSteps.hook";

import FoodNameHook from "core/hook/menu/food/foodName.hook";
import EnergyHook from 'core/hook/menu/food/energy.hook'
import UnitSelect from "core/hook/menu/food/unit.select.hook";
import Select from "core/select"
import ButtonHook from "core/hook/button/index.hook";
import style from "core/hook/button/style"
import RewardCountHook from "core/hook/reward/rewardCount.hook";
import TipsHooke from "core/hook/menu/food/tips.hook"
import Localize from "service/localize";
import HeaderComponent from 'component/layout/header'
const EditFoodHtml = (props) => {
  const { ui, timeout, handleSubmit, handleOnBack, handleOnRef, handleOnChange, handleOnChangeImage,
    handleOnChangeFor,
    handleOnChangeMenuCategory,
    handleOnChangeSubFood,
    handleOnChangeEnergyUnit,
    handleOnChangeUnit,
    handleOnChangeCategory
  } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(timeout.field === "all");
  }, [timeout.field === "all"]);
  return (
    <Box >
      <HeaderComponent
        html={
          <Stack
            sx={{
              typography: "header",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h3" sx={{}}>
                {Localize.getLocalize("LC_FOOD")}
              </Typography>
              <Stack direction="row" spacing={3}>
                <Button color="info"
                  size="small"
                  disabled={timeout.status}
                  sx={style.buttonBack}
                  onClick={(e) => { e.preventDefault(); handleOnBack() }}
                >
                  {Localize.getLocalize("LC_BUTTON_BACK")}
                </Button>
                <ButtonHook
                  text={Localize.getLocalize("LC_BUTTON_SAVE")}
                  color="primary"
                  size="small"
                  variant="contained"
                  disabled={ui.isShowBtn || timeout.status}
                  style={{ backgroundColor: "rgb(253, 94, 93)" }}
                  onClick={(e) => { e.preventDefault(); handleSubmit() }}
                />
              </Stack>
            </Box>
          </Stack>
        } />

      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        sx={{
          p: 3,
          width: "auto",
          bgcolor: "transparent",
          boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px",
          margin: "auto",
          width: "800px",
          marginTop: "65px"
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeigh: 700 }}>{Localize.getLocalize("LC_GENERAL_INFO")}</Typography>
        <Stack direction="row" justifyContent="center" sx={{ width: "100%" }}>
          <Box sx={{ width: "500px", height: "300px", marginBottom: "30px" }}>
            <DragAndDrop
              disabled={timeout.status}
              testMessageId="msgImage"
              src={!Helper.isEmpty(ui.detailFood) ? ui.detailFood.photos : null}
              widthResize={328}
              heightResize={229}
              onChange={(fileUpload) => {
                handleOnChangeImage(fileUpload);
              }}
            />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <FoodNameHook
            name="foodName"
            value={ui.detailFood && ui.detailFood.foodName || ""}
            type="text" label={Localize.getLocalize("LC_FOOD_NAME")} error={timeout.field === "title" ? timeout.message : ""}
            disabled={timeout.status} styleFormControl={{}} onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={true}
            required={true} />
        </Stack>
        <Stack direction="row" spacing={3} justifyContent="flex-start" sx={{ width: "100%" }}>
          <IngredientsAndPreparationHook
            name="ingredientsAndPreparation"
            placeholder=""
            value={ui.detailFood && ui.detailFood.ingredientsAndPreparation || ""}
            type="text"
            label={Localize.getLocalize("LC_INGREDIENTS_AND_PREPARATION")}
            error={timeout.field === "title" ? timeout.message : ""}
            disabled={timeout.status}
            styleFormControl={{ fontSize: "16px", height: "auto", width: "784px", maxWidth: "784px", marginBottom: "10px" }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={false}
            required={false} />
        </Stack>
        <Stack direction="row" spacing={3} sx={{ width: "100%" }}>
          <ForMultiSelectHook
            label={Localize.getLocalize("LC_SUITABLE")}
            list={ui.listFor}
            defaultValue={ui.defaultFor}
            onChange={handleOnChangeFor}
            disabled={timeout.status}
            styleFormControl={{ minWidth: "250px", whiteSpace: "inherit" }}
            notOutline={false}
            // fullWidth={true}
            isRow={false}
            required={true}
            name="suitableFor"
            msgErr={Localize.getLocalize("LC_SUITABLE_FOR_EMPTY")}
          />
        </Stack>

        <Stack direction="row" spacing={3} justifyContent="flex-start" sx={{ width: "100%" }}>
          <MenuCategoryMultiSelectHook
            label={Localize.getLocalize("LC_CATEGORY")}
            list={ui.listMenuCategory}
            defaultValue={ui.defaultMenuCategory}
            onChange={handleOnChangeMenuCategory}
            disabled={timeout.status}
            styleFormControl={{ minWidth: "250px", whiteSpace: "inherit" }}
            notOutline={false}
            fullWidth={true}
            isRow={false}
            required={false}
            name="menuCategoriesList"
          />
        </Stack>
        <Stack direction="row" spacing={3} justifyContent="flex-start" sx={{ width: "100%" }}>
          <SubFoodMultiSelectHook
            label={Localize.getLocalize("LC_ALTER_FOOD")}
            list={ui.listSubFood}
            defaultValue={ui.defaultSubFood}
            onChange={handleOnChangeSubFood}
            disabled={timeout.status}
            styleFormControl={{ minWidth: "250px", whiteSpace: "inherit" }}
            notOutline={false}
            fullWidth={true}
            isRow={false}
            required={false}
            name="subFoodList"
          />
        </Stack>
      </Stack>

      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        sx={{
          p: 3,
          width: "auto",
          bgcolor: "transparent",
          boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px",
          margin: "auto",
          marginTop: "10px",
          width: "800px",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeigh: 700 }}>{Localize.getLocalize("LC_NUTRITION_INFO")}</Typography>
        <Stack direction="row" spacing={1}>
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
              <EnergyHook
                label={Localize.getLocalize("LC_ENERGY")}
                name="energy"
                value={ui.detailFood && !Helper.isEmpty(ui.detailFood.energy) ? ui.detailFood.energy.toString() : ""}
                type="text" error={timeout.field === "title" ? timeout.message : ""}
                disabled={timeout.status}
                styleFormControl={{}}
                onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={true} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "30%" }}>
              <UnitSelect
                label={Localize.getLocalize("LC_UNIT")}
                name="energyUnit"
                list={ui.listEnergyUnit}
                defaultValue={ui.defaultEnergyUnit}
                onChange={handleOnChangeEnergyUnit}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={false}
                isRow={false}
                required={true} />
            </Stack>
          </Stack>
          {/* ---------------- */}
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
              <InputHook
                label={Localize.getLocalize("LC_PROTEIN")}
                name="protein"
                value={ui.detailFood && !Helper.isEmpty(ui.detailFood.protein) ? ui.detailFood.protein.toString() : ""}
                type="text" error={timeout.field === "title" ? timeout.message : ""}
                disabled={timeout.status} styleFormControl={{}} onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={false} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "30%" }}>
              <UnitSelect
                label={Localize.getLocalize("LC_UNIT")}
                name="proteinUnit"
                list={ui.listProteinUnit}
                defaultValue={ui.defaultProteinUnit}
                onChange={handleOnChangeUnit}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={false}
                isRow={false}
                required={true} />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
              <InputHook
                label={Localize.getLocalize("LC_LIPID")}
                name="lipid"
                value={ui.detailFood && !Helper.isEmpty(ui.detailFood.lipid) ? ui.detailFood.lipid.toString() : ""}
                type="text" error={timeout.field === "title" ? timeout.message : ""}
                disabled={timeout.status} styleFormControl={{}} onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={false} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "30%" }}>
              <UnitSelect
                label={Localize.getLocalize("LC_UNIT")}
                name="lipidUnit"
                list={ui.listLipidUnit}
                defaultValue={ui.defaultLipidUnit}
                onChange={handleOnChangeUnit}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={false}
                isRow={false}
                required={true} />
            </Stack>
          </Stack>
          {/* ---------------- */}
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
              <InputHook
                label={Localize.getLocalize("LC_GLUCID")}
                name="glucid"
                value={ui.detailFood && !Helper.isEmpty(ui.detailFood.glucid) ? ui.detailFood.glucid.toString() : ""}
                type="text" error={timeout.field === "title" ? timeout.message : ""}
                disabled={timeout.status} styleFormControl={{}} onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={false} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "30%" }}>
              <UnitSelect
                label={Localize.getLocalize("LC_UNIT")}
                name="glucidUnit"
                list={ui.listGlucidUnit}
                defaultValue={ui.defaultGlucidUnit}
                onChange={handleOnChangeUnit}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={false}
                isRow={false}
                required={true} />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
              <InputHook
                label={Localize.getLocalize("LC_CAXI")}
                name="canxi"
                value={ui.detailFood && !Helper.isEmpty(ui.detailFood.canxi) ? ui.detailFood.canxi.toString() : ""}
                type="text" error={timeout.field === "title" ? timeout.message : ""}
                disabled={timeout.status} styleFormControl={{}} onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={false} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "30%" }}>
              <UnitSelect
                label={Localize.getLocalize("LC_UNIT")}
                name="canxiUnit"
                list={ui.listCanxiUnit}
                defaultValue={ui.defaultCanxiUnit}
                onChange={handleOnChangeUnit}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={false}
                isRow={false}
                required={true} />
            </Stack>
          </Stack>
          {/* ---------------- */}
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
              <InputHook
                label={Localize.getLocalize("LC_FE")}
                name="iron"
                value={ui.detailFood && !Helper.isEmpty(ui.detailFood.iron) ? ui.detailFood.iron.toString() : ""}
                type="text" error={timeout.field === "title" ? timeout.message : ""}
                disabled={timeout.status} styleFormControl={{}} onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={false} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "30%" }}>
              <UnitSelect
                label={Localize.getLocalize("LC_UNIT")}
                name="ironUnit"
                list={ui.listIronUnit}
                defaultValue={ui.defaultIronUnit}
                onChange={handleOnChangeUnit}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={false}
                isRow={false}
                required={true} />
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <Stack direction="row" spacing={1} sx={{ width: "60%" }}>
              <InputHook
                label={Localize.getLocalize("LC_SALT")}
                name="salt"
                value={ui.detailFood && !Helper.isEmpty(ui.detailFood.salt) ? ui.detailFood.salt.toString() : ""}
                type="text" error={timeout.field === "title" ? timeout.message : ""}
                disabled={timeout.status} styleFormControl={{}} onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={false} />
            </Stack>
            <Stack direction="row" spacing={1} sx={{ width: "30%" }}>
              <UnitSelect
                label={Localize.getLocalize("LC_UNIT")}
                name="saltUnit"
                list={ui.listSaltUnit}
                defaultValue={ui.defaultSaltUnit}
                onChange={handleOnChangeUnit}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={false}
                isRow={false}
                required={true} />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        sx={{
          p: 3,
          width: "auto",
          bgcolor: "transparent",
          boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px",
          margin: "auto",
          marginTop: "10px",
          width: "800px",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeigh: 700 }}>{Localize.getLocalize("LC_ADVICE_FOR_MOM")}</Typography>
        <Stack direction="row" spacing={1}>
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <RewardCountHook
              label={Localize.getLocalize("LC_PREGNANCY")}
              name="pregnancyTips"
              defaultValue={ui.defaultPregnancyTips.value}
              list={ui.ListPregnancyTips}
              onChange={handleOnChangeCategory}
              onChane={() => { }}
              disabled={timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "gender" ? timeout.message : ""}
              row={true}
              styleRadio={{}}
              required={true}
            />
          </Stack>

          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <RewardCountHook
              label={Localize.getLocalize("LC_AFTER_PREGNANCY")}
              name="postpartumTips"
              defaultValue={ui.defaultPostpartumTips.value}
              list={ui.ListPostpartumTips}
              onChange={handleOnChangeCategory}
              onChane={() => { }}
              disabled={timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "gender" ? timeout.message : ""}
              row={true}
              styleRadio={{}}
              required={true}
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <RewardCountHook
              label={Localize.getLocalize("LC_BREASTFEEDING")}
              name="breastfeedingTips"
              defaultValue={ui.defaultBreastfeedingTips.value}
              list={ui.ListBreastfeedingTips}
              onChange={handleOnChangeCategory}
              onChane={() => { }}
              disabled={timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "gender" ? timeout.message : ""}
              row={true}
              styleRadio={{}}
              required={true}
            />
          </Stack>

          <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
            <RewardCountHook
              label={Localize.getLocalize("LC_CHILDREN")}
              name="youngChildrenTips"
              defaultValue={ui.defaultYoungChildrenTips.value}
              list={ui.ListYoungChildrenTips}
              onChange={handleOnChangeCategory}
              onChane={() => { }}
              disabled={timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "gender" ? timeout.message : ""}
              row={true}
              styleRadio={{}}
              required={true}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3} justifyContent="flex-start" sx={{ width: "100%" }}>
          <AdditionalInfoHook
            name="additionalInfo"
            placeholder=""
            value={ui.detailFood && ui.detailFood.additionalInfo || ""}
            type="text"
            label={Localize.getLocalize("LC_MORE_INFO")}
            error={timeout.field === "title" ? timeout.message : ""}
            disabled={timeout.status}
            styleFormControl={{ fontSize: "16px", height: "auto", width: "784px", maxWidth: "784px", marginBottom: "10px" }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={false}
            required={false} />
        </Stack>
      </Stack>

      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        sx={{
          p: 3,
          width: "auto",
          bgcolor: "transparent",
          boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px",
          margin: "auto",
          marginTop: "10px",
          width: "800px",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeigh: 700 }}>{Localize.getLocalize("LC_HOW_TO_GUIDE")}</Typography>
        <Stack direction="row" spacing={3} justifyContent="flex-start" sx={{ width: "100%" }}>
          <CookingStepsHook
            name="cookingSteps"
            placeholder=""
            value={ui.detailFood && ui.detailFood.cookingSteps || ""}
            type="text"
            label={Localize.getLocalize("LC_FOOD_PREPARATION")}
            error={timeout.field === "title" ? timeout.message : ""}
            disabled={timeout.status}
            styleFormControl={{ fontSize: "16px", height: "auto", width: "784px", maxWidth: "784px", marginBottom: "10px" }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={false}
            required={false} />
        </Stack>
        <TipsHooke 
        name="tips"
          value={ui.detailFood && ui.detailFood.tips || "" || ""}
          type="text" label={Localize.getLocalize("LC_TIPS")}
          error={timeout.field === "title" ? timeout.message : ""}
          disabled={timeout.status}
          styleFormControl={{fontSize: "16px", height: "auto", width: "784px", maxWidth: "784px", marginBottom: "10px"}}
          onRef={handleOnRef}
          onChange={handleOnChange}
          fullWidth={true}
          required={false} />
      </Stack>


      {
        timeout.field === "all" ? (
          <Alert severity="error" style={{ fontSize: "18px" }}>
            {/* {Localize.getLocalize(timeout.message)} */}
            {timeout.message}
          </Alert>
        ) : null
      }
      {/* {open ? <Alert color='danger' message={timeout.message} onClose={e=>{e.preventDefault(); setOpen(false)}}/> : null} */}
    </Box >
  );
};

export default EditFoodHtml;
