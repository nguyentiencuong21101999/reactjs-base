import React, { Fragment } from "react";
import { Box, Typography, Tab, Button, Stack, Divider, Grid } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import Alert from "@material-ui/core/Alert";
import Localize from "service/localize";
import ListRequestComponent from "./listRequest";
import HelperService from "service/helper";
import style from "core/hook/button/style"
const DetailMemberHtml = (props) => {
  const { ui, timeout, handleOnBack, handleChangeTab, data } = props;
  const keyParse = {
    userId: Localize.getLocalize("LC_ID_ACCOUNT"),
    fullName: Localize.getLocalize("LC_FULLNAME"),
    email: Localize.getLocalize("LC_EMAIL"),
    phoneNumber: Localize.getLocalize("LC_PHONE"),
  };
  const valueParse = {
    userId: (value) => {
      return value;
    },
    fullName: (value) => {
      return value;
    },
    email: (value) => {
      return value;
    },
    phoneNumber: (value) => {
      return !HelperService.isEmpty(value) ? value : "-"
    },
  };
  const detailChallenge = () => {
    return (
      <Box>
        <Grid container spacing={3} sx={{ padding: "10px" }}>
          <Grid item lg={12} sm={12} xl={12} xs={12} sx={{ mb: "30px" }}>
            <Stack sx={{ margin: "15px 0px 0px 15px" }} direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{ui.detailMember.availablePoint + ui.detailMember.usedPoint}</Typography>
                <Typography>{Localize.getLocalize("LC_TOTAL_POINT")}</Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{ui.detailMember.availablePoint}</Typography>
                <Typography>{Localize.getLocalize("LC_AVAILABLE_POINT")}</Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{ui.detailMember.usedPoint}</Typography>
                <Typography>{Localize.getLocalize("LC_USED_POINT")}</Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{ui.detailMember.totalExchangeTime}</Typography>
                <Typography>{Localize.getLocalize("LC_TOTAL_REWARD_REDEEM")}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: "auto" }}>
          <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
            <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
            {Object.keys(keyParse).map((key, index) => {
              return (
                <Stack key={index} direction="row" spacing={2} sx={{ width: "100%" }}>
                  <Stack direction="column" sx={{ width: "15%" }} spacing={2}>
                    <Typography>{keyParse[key]}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "85%" }} spacing={2}>
                    <Typography> {valueParse[key](ui.detailMember[key])}</Typography>
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
      <Box
      // sx={{ backgroundColor: "#fff" }}
      >
        <Stack sx={{ width: "100%", typography: "header", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_MEMBER")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }} >
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>
            </Stack>
          </Box>
        </Stack>
        <TabContext value={`${ui.tab.current}`}>
          <Box sx={{ borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label={Localize.getLocalize("LC_OVERVIEW")} value={`${ui.tab.detail}`} />
              <Tab label={Localize.getLocalize("LC_HISTORY_POINT")} value={`${ui.tab.requestList}`} />
            </TabList>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.detail}`}>
              {detailChallenge()}
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.requestList}`}>
              <ListRequestComponent detailMember={ui.detailMember} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>

      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {Localize.getLocalize(timeout.message)}
        </Alert>
      ) : null}
    </>
  );
};

export default DetailMemberHtml;
