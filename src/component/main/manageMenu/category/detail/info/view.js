import React, { Fragment } from "react";
import { Box, Typography, Tab, Button, Stack, Divider, Grid } from "@material-ui/core";

import Helper from "service/helper";
import Alert from "@material-ui/core/Alert";
import Localize from "service/localize";
import ImageSlideComponent from 'core/slideImage'
import ButtonHook from "core/hook/button/index.hook"
import MenuEnum from "service/enum/menu";
import style from "core/hook/button/style"
const DetailChallengeHtml = (props) => {
  const { ui, timeout, handleOnBack, handleEdit, data } = props;

  const keyParse = {
    photos: Localize.getLocalize("LC_IMAGE"),
    menuCategoryType: Localize.getLocalize("LC_TYPE"),
    menuCategoryParentName: Localize.getLocalize("LC_CATALOG"),
    menuCategoryName: Localize.getLocalize("LC_NAME"),
    description: Localize.getLocalize("LC_DESCRIPTION"),
    createdBy: Localize.getLocalize("LC_CREATED_BY"),
    modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
  };
  const valueParse = {
    photos: (value) => {
      return !Helper.isEmpty(value) ? <ImageSlideComponent item={[value]} /> : "-"
    },
    menuCategoryType: (value) => {
      return MenuEnum.CATEGORY_TYPE_PARSE[value];
    },
    menuCategoryParentName: (value) => {
      return value;
    },
    menuCategoryName: (value) => {
      return value;
    },
    description: (value) => {
      return !Helper.isEmpty(value) ? value : "-"
    },
    createdBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailCategory.createdBy, ui.detailCategory.createdAt) : "-"
    },
    modifiedBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailCategory.modifiedBy, ui.detailCategory.modifiedAt) : "-"
    },
  };
  if (ui.detailCategory.menuCategoryType === MenuEnum.CATEGORY_TYPE.CATEGORY) {
    delete keyParse['menuCategoryParentName']
    delete valueParse['menuCategoryParentName']
  }
  const detailChallenge = () => {
    return (
      <Box>
        <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: "auto" }}>
          <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
            <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
            <Stack direction="row" sx={{ width: "100%" }} spacing={2}>

            </Stack>

            {Object.keys(keyParse).map((key, index) => {
              return (
                <Stack key={index} direction="row" spacing={2} sx={{ width: "100%" }}>
                  <Stack direction="column" sx={{ width: "15%" }} spacing={2}>
                    <Typography>{keyParse[key]}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "85%" }} spacing={2}>
                    <Stack> {valueParse[key](ui.detailCategory[key] || null)}</Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    );
  };
  return (
    <>
      <Box>

        <Stack sx={{ width: "100%", typography: "header", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_CATEGORY")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }}>
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>
              <ButtonHook
                text={Localize.getLocalize("LC_BUTTON_EDIT")}
                color="primary"
                size="small"
                variant="contained"
                disabled={timeout.status}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={(e) => { e.preventDefault(); handleEdit() }}
              />
            </Stack>
          </Box>
        </Stack>
        {detailChallenge()}
      </Box>

      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {Localize.getLocalize(timeout.message)}
        </Alert>
      ) : null}
    </>
  );
};

export default DetailChallengeHtml;
