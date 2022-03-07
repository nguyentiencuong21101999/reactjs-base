import React, { Fragment } from "react";

import { Box, Typography, Tab, Button, Stack, Avatar, Chip } from "@material-ui/core";
import Alert from "@material-ui/core/Alert";
import MultiSelect from "core/select/multi";
import Select from "core/select";
import ButtonHook from "core/hook/button/index.hook";
import FromAge from "core/hook/menu/setting/fromAge.hook";
import ToAge from "core/hook/menu/setting/toAge.hook";
import ConditionMultiSelectHook from "core/hook/menu/setting/condition.multiSelect.hook"
import MenuEnum from "service/enum/menu";
import style from "core/hook/button/style"
import Localize from "service/localize"
import HelperService from "service/helper";
import HeaderComponent from 'component/layout/header'

const EditTargetSettingHtml = (props) => {
  const { ui, timeout, handleSubmit, handleOnBack, handleOnRef, handleOnChange, handleOnChangeBmi, handleOnChangeTarget,
    handleOnChangeCondition,
    data,
    handleOnChangeFor,
    field
  } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(timeout.field === "all");
  }, [timeout.field === "all"]);

  const renderView = () => {
    switch (ui.defaultFor.value) {
      case MenuEnum.MENU_SETTING_TARGET_TYPE.MOM:
        return (
          <>
            <Stack direction="row">
              <Stack direction="row" spacing={3} sx={{ width: "49%" }}>
                <Select
                  label={Localize.getLocalize("LC_BMI")}
                  list={ui.listBmi}
                  defaultValue={ui.defaultBmi}
                  onChange={handleOnChangeBmi}
                  styleFormControl={null} disabled={timeout.status}
                  notOutline={false} isRow={false}
                  required={true}
                  styleFormControl={{ minWidth: "250px" }}
                />
              </Stack>
              <Stack direction="row" spacing={3} sx={{ width: "51%" }}>
                <MultiSelect
                  label={Localize.getLocalize("LC_OBJECT")}
                  list={ui.listTarget}
                  defaultValue={ui.defaultTarget}
                  onChange={handleOnChangeTarget}
                  disabled={timeout.status}
                  styleFormControl={{ minWidth: "250px" }}
                  notOutline={false}
                  // fullWidth={true}
                  isRow={false}
                  required={true}
                />
              </Stack>
            </Stack>
            <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
              <ConditionMultiSelectHook
                label={Localize.getLocalize("LC_PHYSICAL_CONDITION")}
                list={ui.listCondition}
                defaultValue={ui.defaultCondition}
                onChange={handleOnChangeCondition}
                disabled={timeout.status}
                styleFormControl={{ minWidth: "250px", whiteSpace: "inherit" }}
                notOutline={false}
                // fullWidth={true}
                isRow={false}
                required={false}
              />
            </Stack>
          </>
        )
      case MenuEnum.MENU_SETTING_TARGET_TYPE.BABY:
        return (
          <>
            <Stack direction="row">
              <Stack direction="row" spacing={3} sx={{ width: "50%" }}>
                <Select
                  label={Localize.getLocalize("LC_BMI")}
                  list={ui.listBmi}
                  defaultValue={ui.defaultBmi}
                  onChange={handleOnChangeBmi}
                  styleFormControl={null} disabled={timeout.status}
                  notOutline={false} isRow={false}
                  required={true}
                  styleFormControl={{ minWidth: "250px" }}
                />
              </Stack>
              <Stack direction="row" spacing={3} sx={{ width: "50%" }}>
                <Stack direction="row" spacing={3}>
                  <FromAge
                    name="monthFrom"
                    value={ui.detailTarget && data['monthFrom'].toString() || ""}
                    type="text"
                    label={Localize.getLocalize("LC_MONTH_OLD_FROM")}
                    error={timeout.field === 'monthFrom' ? timeout.message : ''}
                    disabled={(!HelperService.isEmpty(data['monthFrom']) && !HelperService.isEmpty(data['monthTo'])) ||
                      (!HelperService.isEmpty(data['monthFrom']) && field['monthTo'] || timeout.status)}
                    styleFormControl={{ margin: 0 }}
                    onRef={handleOnRef}
                    onChange={handleOnChange}
                    fullWidth={true}
                    required={true}
                  />
                </Stack>
                <Stack direction="row" spacing={3}>
                  <ToAge
                    name="monthTo"
                    value={ui.detailTarget && data['monthTo'].toString() || ""}
                    valueCheck={!HelperService.isEmpty(data[['monthFrom']]) ? data[['monthFrom']] : null}
                    type="text"
                    label={Localize.getLocalize("LC_TO")}
                    error={timeout.field === 'monthTo' ? timeout.message : ''}
                    disabled={HelperService.isEmpty(data['monthFrom']) || timeout.status}
                    styleFormControl={{ margin: 0 }}
                    onRef={handleOnRef}
                    onChange={handleOnChange}
                    fullWidth={true}
                    required={false}
                  />
                </Stack>
              </Stack>
            </Stack>
          </>
        )
      default:
        break;
    }
  }
  return (
    <Box>
      <Stack
        sx={{
          typography: "header",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <HeaderComponent
          html={
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h3" sx={{ marginBottom: "30px" }}>
                {Localize.getLocalize("LC_CONFIG")}
              </Typography>
              <Stack direction="row" spacing={3}>
                <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }}>
                  {Localize.getLocalize("LC_BUTTON_BACK")}
                </Button>
                <ButtonHook text={Localize.getLocalize("LC_BUTTON_SAVE")} color="primary" size="small" variant="contained" disabled={ui.isShowBtn || timeout.status} style={{ backgroundColor: "rgb(253, 94, 93)" }} onClick={(e) => { e.preventDefault(); handleSubmit() }} />
              </Stack>
            </Box>
          }
        />

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
          width: "800px",
          marginTop: "84px"
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h4"> {Localize.getLocalize("LC_CONFIG_OBJECT")} </Typography>
          <Stack direction="column" spacing={3}>
            <Stack direction="row" spacing={3} >
              <Select
                label={Localize.getLocalize("LC_CONFIG_FOR")}
                list={ui.listFor}
                defaultValue={ui.defaultFor}
                onChange={handleOnChangeFor}
                styleFormControl={null} disabled={timeout.status}
                notOutline={false} isRow={false}
                required={true}
                styleFormControl={{ minWidth: "250px" }}
              />
            </Stack>
            {renderView()}
          </Stack>
        </Stack>
      </Stack>
      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {/* {Localize.getLocalize(timeout.message)} */}
          {timeout.message}
        </Alert>
      ) : null}
    </Box>
  );
};

export default EditTargetSettingHtml;
