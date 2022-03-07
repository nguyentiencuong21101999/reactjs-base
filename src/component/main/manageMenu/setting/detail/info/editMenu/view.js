import React, { Fragment } from "react";

import { Box, Typography, Tab, Button, Stack, Avatar, Chip } from "@material-ui/core";
import Alert from "@material-ui/core/Alert";
import MultiSelectRequired from "core/hook/menu/setting/multiSelectSearch/select.required.hook";
import MultiSelect from "core/hook/menu/setting/multiSelectSearch/select.hook";
import Select from "core/select";
import ButtonHook from "core/hook/button/index.hook";
import style from "core/hook/button/style"
import Localize from 'service/localize'
import HeaderComponent from 'component/layout/header'
const EditMenuHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnBack, handleOnRef, handleOnChangeSelect, handleOnChangeRewardType, handleOnChangeTarget } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(timeout.field === "all");
  }, [timeout.field === "all"]);
  return (
    <Box>

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
          <Typography variant="h4"> {Localize.getLocalize("LC_CONFIG_MENU")} </Typography>
          <Stack direction="column" spacing={3} >
            <Stack direction="column" spacing={3} >
              <Select label={Localize.getLocalize("LC_MENU_FOR_DAY")}
                list={ui.listShow}
                defaultValue={ui.defaultShow}
                onChange={handleOnChangeRewardType}
                styleFormControl={null} disabled={true}
                notOutline={false} isRow={false} required={true}
                styleFormControl={{ maxWidth: "250px" }} />
            </Stack>
            <Stack direction="column" spacing={3} >
              <MultiSelectRequired
                label={Localize.getLocalize("LC_BREAKFAST")}
                list={ui.listBreakfast}
                defaultValue={ui.defaultBreakfast}
                onChange={handleOnChangeSelect}
                disabled={timeout.status}
                styleFormControl={{ minWidth: "250px" }}
                notOutline={false}
                // fullWidth={true}
                isRow={false}
                required={true}
                name="breakfast"
                msgErr={Localize.getLocalize("LC_CHOOSE_FOOD_EMPTY")}
              />

            </Stack>
            <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
              <MultiSelectRequired
                label={Localize.getLocalize("LC_LUNCH")}
                list={ui.listLunch}
                defaultValue={ui.defaultLunch}
                onChange={handleOnChangeSelect}
                disabled={timeout.status}
                styleFormControl={{ minWidth: "250px", whiteSpace: "inherit" }}
                notOutline={false}
                // fullWidth={true}
                isRow={false}
                required={true}
                name="lunch"
                msgErr={Localize.getLocalize("LC_CHOOSE_FOOD_EMPTY")}
              />
            </Stack>
            <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
              <MultiSelectRequired
                label={Localize.getLocalize("LC_DINNER")}
                list={ui.listDinner}
                defaultValue={ui.defaultDinner}
                onChange={handleOnChangeSelect}
                disabled={timeout.status}
                styleFormControl={{ minWidth: "250px" }}
                notOutline={false}
                // fullWidth={true}
                isRow={false}
                required={true}
                name="dinner"
                msgErr={Localize.getLocalize("LC_CHOOSE_FOOD_EMPTY")}
              />
            </Stack>
            <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
              <MultiSelect
                label={Localize.getLocalize("LC_SNACKS_1")}
                name="firstSnack"
                list={ui.listFirstSnack}
                defaultValue={ui.defaultFirstSnack}
                onChange={handleOnChangeSelect}
                disabled={timeout.status}
                styleFormControl={{ minWidth: "250px", whiteSpace: "inherit" }}
                notOutline={false}
                // fullWidth={true}
                isRow={false}
                required={false}
              />
            </Stack>
            <Stack direction="column" spacing={3} sx={{ width: "100%" }}>
              <MultiSelect
                label={Localize.getLocalize("LC_SNACKS_2")}
                list={ui.listSecondSnack}
                defaultValue={ui.defaultSecondSnack}
                onChange={handleOnChangeSelect}
                disabled={timeout.status}
                styleFormControl={{ minWidth: "250px", whiteSpace: "inherit" }}
                notOutline={false}
                // fullWidth={true}
                isRow={false}
                required={false}
                name="secondSnack"
              />
            </Stack>

          </Stack>
        </Stack>
      </Stack>
      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {/* {Localize.getLocalize(timeout.message)} */}
          {timeout.message}
        </Alert>
      ) : null}
      {/* {open ? <Alert color='danger' message={timeout.message} onClose={e=>{e.preventDefault(); setOpen(false)}}/> : null} */}
    </Box>
  );
};

export default EditMenuHTML;
