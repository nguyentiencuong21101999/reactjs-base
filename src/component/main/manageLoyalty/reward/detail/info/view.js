import React, { Fragment } from "react";
import { Box, Typography, Tab, Button, Stack, Divider, Grid } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import Helper from "service/helper";
import ButtonHook from "core/hook/button/index.hook"
import Alert from "@material-ui/core/Alert";
import Localize from "service/localize";
import ListRequestComponent from "./listRequest";
import HelperService from "service/helper";
import RewardEnum from "service/enum/reward";
import ImageSlideComponent from 'core/slideImage'
import style from "core/hook/button/style"
import RenderContent from "core/ckEditor/render"
const DetailRewardHtml = (props) => {
  const { ui, timeout, handleOnBack, handleEdit, handleChangeTab, data, handleApplyReward, handleEndReward, handleSendNotification } = props;
  const keyParse = {
    photos: Localize.getLocalize("LC_IMAGE"),
    proName: Localize.getLocalize("LC_REWARD_NAME"),
    exchangeLimit: Localize.getLocalize("LC_REDEMPTION_LIMIT"),
    requirement: Localize.getLocalize("LC_POINT_REQUIRED"),
    proType: Localize.getLocalize("LC_REWARD_TYPE"),
    createdBy: Localize.getLocalize("LC_CREATED_BY"),
    modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
    status: Localize.getLocalize("LC_STATUS"),
  };
  const valueParse = {
    photos: (value) => {
      return <ImageSlideComponent item={[value]} />
    },
    proName: (value) => {
      return value;

    },
    exchangeLimit: (value) => {
      return value > 0 ? `${value} ${Localize.getLocalize("LC_LIMIT_USER_MONTH")}` : Localize.getLocalize("LC_UNLIMIT");
    },
    requirement: (value) => {
      return value;
    },
    proType: (value) => {
      return RewardEnum.PROMOTION_TYPE_PARSE[value];
    },
    createdBy: (value) => {
      return !HelperService.isEmpty(value) ? HelperService.handleDateTime(ui.detailReward.promotionResp.createdBy, ui.detailReward.promotionResp.createdAt) : "-";
    },
    modifiedBy: (value) => {
      return !HelperService.isEmpty(value) ? HelperService.handleDateTime(ui.detailReward.promotionResp.modifiedBy, ui.detailReward.promotionResp.modifiedAt) : "-";
    },
    status: (value) => {
      return RewardEnum.PROMOTION_STATUS_PARSE[value];
    },
  };
  const handleShowBtn = (ui, timeout) => {
    switch (ui.tab.current) {
      case ui.tab.detail:
        switch (ui.detailReward.promotionResp.status) {
          case RewardEnum.PROMOTION_STATUS.NEW:
          case RewardEnum.PROMOTION_STATUS.POSTPONE:
            return (
              <>
                <Button color="info" size="small" variant="outlined" disabled={timeout.status} style={style.buttonOutlined} onClick={(e) => { e.preventDefault(); handleApplyReward() }} >
                  {Localize.getLocalize("LC_APPLY")}
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
              </>
            );
          case RewardEnum.PROMOTION_STATUS.APPLIED:
            return (
              <>
                <Button color="error" size="small" variant="outlined" disabled={timeout.status} style={style.buttonOutlined} onClick={(e) => { e.preventDefault(); handleEndReward() }} >
                  {Localize.getLocalize("LC_PAUSE")}
                </Button>
              </>
            );
          default:
            break;
        }
        break;
      default:
        break;
    }

  };
  const detailChallenge = () => {
    return (
      <Box>

        <Grid container spacing={3} sx={{ padding: "10px" }}>
          <Grid item lg={12} sm={12} xl={12} xs={12} sx={{ mb: "30px" }}>
            <Stack sx={{ margin: "15px 0px 0px 15px" }} direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{ui.detailReward.promotionResp.isLimit === RewardEnum.PROMOTION_LIMIT.LIMITED ? ui.detailReward.totalExchange : ui.detailReward.totalUserExchange}</Typography>
                <Typography>{Localize.getLocalize("LC_TOTAL_REWARD")}</Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{ui.detailReward.totalUserExchange}</Typography>
                <Typography>{Localize.getLocalize("LC_TOTAL_REWARD_REDEEM")}</Typography>
              </Stack>
              <Stack direction="column" spacing={1}>
                <Typography sx={{ fontWeight: 600, fontSize: "18px" }}>{ui.detailReward.promotionResp.isLimit === RewardEnum.PROMOTION_LIMIT.LIMITED ? ui.detailReward.promotionResp.exchangeCount : `Không giới hạn`}</Typography>
                <Typography>{Localize.getLocalize("LC_REWARD_REST")}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
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
                    <Stack> {valueParse[key](ui.detailReward.promotionResp[key])}</Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
            <Typography variant="h4">{Localize.getLocalize("LC_CONTENT_REWARD")}</Typography>
            {/* {!Helper.isEmpty(ui.detailReward.promotionResp.note) ? <div style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: ui.detailReward.promotionResp.note }} /> : <Typography>-</Typography>} */}
            <RenderContent styleFormControl={{width:"784px"}} value={ui.detailReward.promotionResp.note} />
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
              {Localize.getLocalize("LC_REWARD")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }}>
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>

              {handleShowBtn(ui, timeout)}
            </Stack>
          </Box>
        </Stack>
        <TabContext value={`${ui.tab.current}`}>
          <Box sx={{ borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label={Localize.getLocalize("LC_INFO")} value={`${ui.tab.detail}`} />
              <Tab label={Localize.getLocalize("LC_REQUEST_LIST")} value={`${ui.tab.requestList}`} />
            </TabList>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.detail}`}>
              {detailChallenge()}
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.requestList}`}>
              {" "}
              <ListRequestComponent detailReward={ui.detailReward} />
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

export default DetailRewardHtml;
