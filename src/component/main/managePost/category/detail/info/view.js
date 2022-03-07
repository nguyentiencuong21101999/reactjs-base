import React, { Fragment } from "react";
import { Box, Typography, Tab, Button, Stack, Divider, Grid } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import PostEnum from "service/enum/post";
import Alert from "@material-ui/core/Alert";
import Localize from "service/localize";
import HelperService from "service/helper";
import CategoryEnum from "service/enum/category";
import ImageSlideComponent from "core/slideImage";
import ButtonHook from "core/hook/button/index.hook";
import style from "core/hook/button/style";
import { ImageModel } from "core/slideImage/model";
const DetailChallengeHtml = (props) => {
  const { ui, timeout, handleOnBack, handleEdit, data } = props;
  const keyParse = {
    icon: Localize.getLocalize("LC_IMAGE"),
    name: Localize.getLocalize("LC_CATEGORY_NAME"),
    targetMeijiId: Localize.getLocalize("LC_OBJECT"),
    createdBy: Localize.getLocalize("LC_CREATED_BY"),
    modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
    status: Localize.getLocalize("LC_STATUS"),
  };

  const valueParse = {
    icon: (value) => {
      return !HelperService.isEmpty(value) ? <ImageSlideComponent item={[value]} /> : "-";
    },
    name: (value) => {
      return value;
    },
    targetMeijiId: (value) => {
      return PostEnum.TARGET_PARSE[value];
    },
    createdBy: (value) => {
      return !HelperService.isEmpty(value) ? HelperService.handleDateTime(value, ui.detailCategory.createdAt) : "-";
    },
    modifiedBy: (value) => {
      return !HelperService.isEmpty(value) ? HelperService.handleDateTime(value, ui.detailCategory.modifiedAt) : "-";
    },
    status: (value) => {
      return CategoryEnum.STATUS_PARSE[value];
    },
  };

  const detailChallenge = () => {
    return (
      <Box>
        <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: "auto" }}>
          <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
            <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
            {Object.keys(keyParse).map((key, index) => {
              return (
                <Stack key={index} direction="row" spacing={2} sx={{ width: "100%" }}>
                  <Stack direction="column" sx={{ width: "13%" }} spacing={2}>
                    <Typography>{keyParse[key]}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "87%" }} spacing={2}>
                    <Stack> {valueParse[key](ui.detailCategory[key])}</Stack>
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
              <Button
                size="small"
                disabled={timeout.status}
                onClick={(e) => {
                  e.preventDefault();
                  handleOnBack();
                }}
                sx={style.buttonBack}
              >
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>
              <ButtonHook
                text={Localize.getLocalize("LC_BUTTON_EDIT")}
                color="primary"
                size="small"
                variant="contained"
                disabled={timeout.status}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit();
                }}
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
