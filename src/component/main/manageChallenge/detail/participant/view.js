import React, { Fragment } from "react";
import { Box, Typography, Tab, Button, Stack, Avatar, Chip, Link, typographyClasses } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import Helper from "service/helper";
import ButtonHook from "core/hook/button/index.hook";
import ChallengeEnum from "service/enum/challenge";
import Alert from "@material-ui/core/Alert";
import Localize from "service/localize";
import ListSubmission from "./listSubmission";
import ListMission from "./listMission";
import HelperService from "service/helper";
import style from "core/hook/button/style";
const handleShowBtn = (ui, timeout, handleUpdateUserChallengeRank) => {
  switch (ui.challengeType) {
    case ChallengeEnum.CHALLENGE_TYPE.WRITE_POST:
      return ui.detailParticipant.challengeStatus != ChallengeEnum.STATUS.RESULT ? <ButtonHook color="error" size="small" variant="contained" disabled={timeout.status} style={{ backgroundColor: "#FFE8E6", border: "none", color: "#FD5E5D" }} onClick={handleUpdateUserChallengeRank} text={Localize.getLocalize("LC_UPDATE_RESULT")} /> : null;
      break;
    case ChallengeEnum.CHALLENGE_TYPE.CHALLENGE_CHAIN:
      switch (ui.detailParticipant.result) {
        case ChallengeEnum.USER_CHALLENGE_STATUS.JOINED:
        case ChallengeEnum.USER_CHALLENGE_STATUS.COMPLETE:
        case ChallengeEnum.USER_CHALLENGE_STATUS.UNCOMPLETED:
          break;
        default:
          break;
      }
  }
};

const DetailParticipantHtml = (props) => {
  const { ui, timeout, handleOnBack, handleUpdateUserChallengeRank, handleUpdateChallengeMissionSuccess } = props;
  const renderView = () => {
    switch (ui.challengeType) {
      case ChallengeEnum.CHALLENGE_TYPE.WRITE_POST:
        return <ListSubmission />;
      case ChallengeEnum.CHALLENGE_TYPE.CHALLENGE_CHAIN:
        return <ListMission handleUpdateChallengeMissionSuccess={handleUpdateChallengeMissionSuccess} />;
      default:
        break;
    }
  };
  const keyParse = {
    rank: Localize.getLocalize("LC_RANK"),
    title: Localize.getLocalize("LC_PRIZE"),
    postId: Localize.getLocalize("LC_WINNING_POST_ID"),
    modifiedBy: Localize.getLocalize("LC_RESULT_MODIFIED_BY"),
  };
  const valueParse = {
    rank: (value) => {
      console.log("value_", value);
      return !Helper.isEmpty(value) ? value : "-";
    },
    title: (value) => {
      return !Helper.isEmpty(value) ? value : "-";
    },
    postId: (value) => {
      return !Helper.isEmpty(value) ? value : "-";
    },
    modifiedBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailParticipant.modifiedBy, ui.detailParticipant.modifiedAt) : "-";
    },
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
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={handleOnBack}>
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>
              {handleShowBtn(ui, timeout, handleUpdateUserChallengeRank)}
            </Stack>
          </Box>
        </Stack>

        <Stack direction="column" spacing={2} sx={{ width: "100%", p: 1, backgroundColor: "#fff", margin: "auto" }}>
          {ui.challengeType === ChallengeEnum.CHALLENGE_TYPE.WRITE_POST ? (
            <Stack direction="row">
              <Stack direction="column" spacing={3} sx={{ width: "49%", marginRight: "2%", p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
                <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
                <Stack direction="row" spacing={5}>
                  <Stack direction="column" spacing={2}>
                    <Typography>{Localize.getLocalize("LC_ID_ACCOUNT")}</Typography>
                    <Typography>{Localize.getLocalize("LC_FULLNAME")}</Typography>
                    <Typography>{Localize.getLocalize("LC_JOINED_AT")}</Typography>
                    <Typography>{Localize.getLocalize("LC_STATUS")}</Typography>
                  </Stack>

                  <Stack direction="column" spacing={2}>
                    <Typography>{ui.detailParticipant.userId || "-"}</Typography>
                    <Typography>{ui.detailParticipant.fullName || "-"}</Typography>
                    <Typography>{ui.detailParticipant.joinedAt ? Helper.getFullDate(ui.detailParticipant.joinedAt) : "-"}</Typography>
                    <Typography>{!HelperService.isEmpty(ui.detailParticipant.result) ? ChallengeEnum.USER_CHALLENGE_POST_STATUS_PARSE[ui.detailParticipant.result] : "-"}</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction="column" sx={{ width: "49%" }} spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
                <Typography variant="h4"> {Localize.getLocalize("LC_RESULT")}</Typography>
                {Object.keys(keyParse).map((key, index) => {
                  return (
                    <Stack key={index} direction="row" spacing={2} sx={{ width: "100%" }}>
                      <Stack direction="column" sx={{ width: "210px" }} spacing={2}>
                        <Typography>{keyParse[key]}</Typography>
                      </Stack>
                      <Stack direction="column" sx={{ width: "85%" }} spacing={2}>
                        <Typography> {valueParse[key](ui.detailParticipant[key])}</Typography>
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Stack>
          ) : (
            <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
              <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
              <Stack direction="row" spacing={5}>
                <Stack direction="column" spacing={2}>
                  <Typography>{Localize.getLocalize("LC_ID_ACCOUNT")}</Typography>
                  <Typography>{Localize.getLocalize("LC_FULLNAME")}</Typography>
                  <Typography>{Localize.getLocalize("LC_JOINED_AT")}</Typography>
                  <Typography>{Localize.getLocalize("LC_STATUS")}</Typography>
                </Stack>

                <Stack direction="column" spacing={2}>
                  <Typography>{ui.detailParticipant.userId || "-"}</Typography>
                  <Typography>{ui.detailParticipant.fullName || "-"}</Typography>
                  <Typography>{ui.detailParticipant.joinedAt ? Helper.getFullDate(ui.detailParticipant.joinedAt) : "-"}</Typography>
                  <Typography>{!HelperService.isEmpty(ui.detailParticipant.result) ? ChallengeEnum.USER_CHALLENGE_STATUS_PARSE[ui.detailParticipant.result] : "-"}</Typography>
                </Stack>
              </Stack>
            </Stack>
          )}

          <Stack sx={{ marginTop: "30px" }}>{renderView()}</Stack>
        </Stack>
      </Box>

      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {Localize.getLocalize(timeout.message)}
        </Alert>
      ) : null}
    </>
  );
};

export default DetailParticipantHtml;
