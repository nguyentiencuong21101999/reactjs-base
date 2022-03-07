import React, { Fragment } from "react";
import { Box, Typography, Tab, Button, Stack, Avatar, Chip, Link, typographyClasses } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Helper from "service/helper";
import ChallengeEnum from "service/enum/challenge";
import PostEnum from "service/enum/post";
import Alert from "@material-ui/core/Alert";
import ListParticipantChain from "./listParticipantChain";
import ListParticipantPost from "./listParticipantPost";
import ListSettingPrize from "./listSettingPrize";
import ChallengeChain from "./challengeChain";
import ButtonHook from "core/hook/button/index.hook";
import style from "core/hook/button/style";
import Localize from "service/localize";
import RenderContent from "core/ckEditor/render"



const ShowHtml = (value) => {
  return !Helper.isEmpty(value) ? ChallengeEnum.SHOW_PARSE[value] : <Typography>{"-"}</Typography>;
};
const CheckShowComponent = (value) => {
  return !Helper.isEmpty(value) ? ChallengeEnum.SHOW_PARSE[value] : <Typography>{"-"}</Typography>;
};
const TargetComponent = (listTarget) => {
  let target = [];
  listTarget.forEach((element) => {
    target.push(PostEnum.TARGET_PARSE[element]);
  });
  return target.join(", ");
};

const DetailChallengeHtml = (props) => {
  const { ui, timeout, handleOnBack, handleEdit, handleUpdateChallengeResult, handleChangeTab, handleCreateSubChallenge, handleReloadSubChallenge, data, handleApplyChallenge, handleEndChallenge, handleSendNotification
    , handleCreateSettingPrize
  } = props;

  const TimeStartComponent = (value) => {
    switch (ui.detailChallenge.show) {
      case ChallengeEnum.SHOW.SHOW:
        return `${Localize.getLocalize("LC_FROM")} ${Helper.getDate(value)}`;
      case ChallengeEnum.SHOW.SHOW_BY_TIME:
        return `${Localize.getLocalize("LC_FROM")} ${Helper.getDate(value)} - ${Helper.getDate(ui.detailChallenge.endDate)}`;
    }
  };

  const keyParse = {
    title: Localize.getLocalize("LC_CHALLENGE_NAME"),
    summary: Localize.getLocalize("LC_SUMMARY"),
    targetMeijiId: Localize.getLocalize("LC_OBJECT"),
    challengeType: Localize.getLocalize("LC_CHALLENGE_TYPE"),
    resultType: Localize.getLocalize("LC_RATING_METHOD"),
    show: Localize.getLocalize("LC_DISPLAY"),
    startDate: Localize.getLocalize("LC_STARTTIME"),
    createdBy: Localize.getLocalize("LC_CREATED_BY"),
    modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
    status: Localize.getLocalize("LC_STATUS"),
  };
  const valueParse = {
    title: (value) => {
      return value;
    },
    summary: (value) => {
      return !Helper.isEmpty(value) ? value : "-";
    },
    targetMeijiId: (value) => {
      return TargetComponent(JSON.parse(value));
    },
    challengeType: (value) => {
      return ChallengeEnum.CHALLENGE_TYPE_PARSE[ui.detailChallenge.challengeType];
    },
    show: (value) => {
      return CheckShowComponent(value);
    },
    resultType: (value) => {
      return ChallengeEnum.MISSION_RESULT_TYPE_PARSE[value];
    },
    startDate: (value) => TimeStartComponent(value),
    createdBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailChallenge.createdBy, ui.detailChallenge.createdAt) : "-";
    },
    modifiedBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailChallenge.modifiedBy, ui.detailChallenge.modifiedAt) : "-";
    },
    status: (value) => {
      return !Helper.isEmpty(value) ? ChallengeEnum.STATUS_PARSE[value] : "-";
    },
  };
  if (ui.detailChallenge.challengeType !== ChallengeEnum.CHALLENGE_TYPE.WRITE_POST) {
    delete keyParse["resultType"];
  }
  const handleShowBtn = (ui, timeout) => {
    switch (ui.tab.current) {
      case ui.tab.detail:
        switch (ui.detailChallenge.status) {
          case ChallengeEnum.STATUS.NEW:
            return (
              <>
                <ButtonHook
                  text={Localize.getLocalize("LC_BUTTON_EDIT")}
                  color="primary"
                  size="small"
                  variant="contained"
                  disabled={timeout.status}
                  style={{ backgroundColor: "rgb(253, 94, 93)" }}
                  onClick={(e) => { e.preventDefault(); handleEdit() }}
                />
                <Button
                  color="info"
                  size="small"
                  variant="outlined"
                  disabled={timeout.status}
                  style={style.buttonOutlined}
                  onClick={(e) => { e.preventDefault(); handleApplyChallenge() }}
                >
                  {Localize.getLocalize("LC_APPLY")}
                </Button>
              </>
            );
          case ChallengeEnum.STATUS.START:
            return (
              <>
                <Button color="error"
                  size="small"
                  variant="outlined"
                  disabled={timeout.status}
                  style={style.buttonOutlined}
                  onClick={(e) => { e.preventDefault(); handleEndChallenge() }}
                >
                  {Localize.getLocalize("LC_FINISH")}
                </Button>
                <ButtonHook
                  text={Localize.getLocalize("LC_BUTTON_EDIT")}
                  color="primary"
                  size="small"
                  variant="contained"
                  disabled={timeout.status}
                  style={{ backgroundColor: "rgb(253, 94, 93)" }}
                  onClick={(e) => { e.preventDefault(); handleEdit() }} />
              </>
            );
          case ChallengeEnum.STATUS.FINISHED:
            return (
              <>
                <ButtonHook
                  text={Localize.getLocalize("LC_BUTTON_EDIT")}
                  color="primary"
                  size="small"
                  variant="contained"
                  disabled={timeout.status}
                  style={{ backgroundColor: "rgb(253, 94, 93)" }}
                  onClick={(e) => { e.preventDefault(); handleEdit() }}
                />
                {ui.detailChallenge.challengeType === ChallengeEnum.CHALLENGE_TYPE.WRITE_POST ? (
                  <Button
                    color="error"
                    size="small"
                    variant="outlined"
                    disabled={timeout.status}
                    style={style.buttonOutlined}
                    onClick={(e) => { e.preventDefault(); handleUpdateChallengeResult() }}
                  >
                    {Localize.getLocalize("LC_PUBLISH_RESULT")}
                  </Button>
                ) : null}
              </>
            );
          case ChallengeEnum.STATUS.RESULT:
            break;
          case ChallengeEnum.STATUS.APPLY:
            return (
              <>
                <ButtonHook text={Localize.getLocalize("LC_BUTTON_EDIT")}
                  color="primary"
                  size="small"
                  variant="contained"
                  disabled={timeout.status}
                  style={{ backgroundColor: "rgb(253, 94, 93)" }}
                  onClick={(e) => { e.preventDefault(); handleEdit() }}
                />
                <Button
                  color="error"
                  size="small"
                  variant="outlined"
                  disabled={timeout.status}
                  style={style.buttonOutlined}
                  onClick={(e) => { e.preventDefault(); handleEndChallenge() }}
                >
                  {Localize.getLocalize("LC_FINISH")}
                </Button>
              </>
            );
        }
        break;
      case ui.tab.mission:
        return (
          <>
            <ButtonHook
              text={Localize.getLocalize("LC_BUTTON_ADD")}
              color="primary"
              size="small"
              variant="contained"
              disabled={timeout.status}
              style={{ backgroundColor: "rgb(253, 94, 93)" }}
              onClick={(e) => { e.preventDefault(); handleCreateSubChallenge() }}
            />
          </>
        );
      case ui.tab.participant:
        break;
      case ui.tab.setting:
        return ui.detailChallenge.status != ChallengeEnum.STATUS.RESULT ?
          <ButtonHook text={Localize.getLocalize("LC_BUTTON_ADD")}
            color="primary"
            size="small"
            variant="contained"
            disabled={timeout.status}
            style={{ backgroundColor: "rgb(253, 94, 93)" }}
            onClick={(e) => { e.preventDefault(); handleCreateSettingPrize() }}
          />
          : null
        break;
      default:
        break;
    }
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
                  <Stack direction="column" sx={{ width: "15%" }} spacing={2}>
                    <Typography>{keyParse[key]}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "85%" }} spacing={2}>
                    <Typography> {valueParse[key](ui.detailChallenge[key])}</Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
            <Typography variant="h4">{Localize.getLocalize("LC_CONTENT_CHALLENGE")}</Typography>
            {/* {!Helper.isEmpty(ui.detailChallenge.content) ? <div style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: ui.detailChallenge.content }} /> : <Typography>-</Typography>} */}
            <RenderContent styleFormControl={{width:"784px"}} value={ui.detailChallenge.content} />
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
              {Localize.getLocalize("LC_CHALLENGE")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }} >
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>
              {ui.tab.current == ui.tab.detail ? <ButtonHook
                color="error"
                size="small"
                variant="contained"
                disabled={timeout.status}
                style={{ backgroundColor: "#FFE8E6", border: "none", color: "#FD5E5D" }}
                onClick={(e) => { e.preventDefault(); handleSendNotification() }}
                text={Localize.getLocalize("LC_BUTTON_SEND_NOTI")} />
                : null
              }
              {handleShowBtn(ui, timeout)}
            </Stack>
          </Box>
        </Stack>
        <TabContext value={`${ui.tab.current}`}>
          <Box sx={{ borderColor: "divider" }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label={Localize.getLocalize("LC_INFO")} value={`${ui.tab.detail}`} />
              {ui.detailChallenge.challengeType === ChallengeEnum.CHALLENGE_TYPE.CHALLENGE_CHAIN ? <Tab label={Localize.getLocalize("LC_CHALLENGE_SERIES")} value={`${ui.tab.mission}`} /> : null}
              {ui.detailChallenge.challengeType === ChallengeEnum.CHALLENGE_TYPE.WRITE_POST ? <Tab label={Localize.getLocalize("LC_PRIZE")} value={`${ui.tab.setting}`} /> : null}
              <Tab label={Localize.getLocalize("LC_PARTICIPANT")} value={`${ui.tab.participant}`} />
            </TabList>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.detail}`}>
              {detailChallenge()}
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.mission}`}>
              <ChallengeChain ui={ui} handleReloadSubChallenge={handleReloadSubChallenge} />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.participant}`}>
              {ui.detailChallenge.challengeType === ChallengeEnum.CHALLENGE_TYPE.CHALLENGE_CHAIN ? <ListParticipantChain ui={ui} /> : <ListParticipantPost ui={ui} />}
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.setting}`}>
              <ListSettingPrize ui={ui} />
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

export default DetailChallengeHtml;
