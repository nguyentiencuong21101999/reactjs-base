import React from "react";
import { Box, Typography, Tab, Button, Stack, Avatar, Chip, Link, typographyClasses } from "@material-ui/core";
import HelperService from "service/helper";
import ChallengeEnum from "service/enum/challenge";
import style from "core/hook/button/style";
import Localize from "service/localize";
const View = (props) => {
  const { ui, timeout, handleOnBack } = props;

  const renderViewHeader = () => {
    switch (ui.detailMission.missionType) {
      case ChallengeEnum.MISSION_TYPE.ACTION:
        return <Typography>{Localize.getLocalize("LC_TODO_LIST")}</Typography>;
      case ChallengeEnum.MISSION_TYPE.WATER:
        return <Typography>{Localize.getLocalize("LC_QTY")}</Typography>;
      case ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER:
        return <Typography>{Localize.getLocalize("LC_QUESTION_LIST")}</Typography>;
      default:
        break;
    }
  };

  const renderView = () => {
    switch (ui.detailMission.missionType) {
      case ChallengeEnum.MISSION_TYPE.ACTION:
        return ui.detailMission.actions.map((element, index) => {
          return (
            <Stack direction="row" sx={{ marginBottom: "10px" }} key={index} spacing={1}>
              {element.actionName}
            </Stack>
          );
        });
      case ChallengeEnum.MISSION_TYPE.WATER:
        return <Typography>{ui.detailMission.goalWater} {Localize.getLocalize("LC_GLASS")}</Typography>;
      case ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER:
        return ui.detailMission.questions.map((element, index) => {
          return (
            <Stack direction="column" sx={{ marginBottom: "10px" }} key={index} spacing={1}>
              <Typography>{element.question}</Typography>
              {element.answers.map((element, index) => {
                return (
                  <Stack direction="row" sx={{ width: "100%", marginLeft: "20px", marginBottom: "0px" }} key={index} spacing={1}>
                    <Stack direction="row" sx={{ maxWidth: "93%" }}>
                      <Typography sx={{ marginLeft: "20px" }}> {index + 1}.</Typography>
                      <Typography> {element.questionAnswer}</Typography>
                    </Stack>
                    <Stack direction="row" sx={{ width: "7%" }}>
                      <Typography> - {ChallengeEnum.MISSION_QUESTION_RESULT_PARSE[element.isCorrect]}</Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          );
        });
      default:
        break;
    }
  };
  const MissionPointComponent = (value) => {
    return ui.detailMission.missionType === ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER ? (
      <>
        <Typography direction="row" spacing={3}>
          {ui.detailMission.correctPoint} {Localize.getLocalize("LC_POINT_PER_CORRECT")}
        </Typography>
        <Typography direction="row" spacing={3}>
          {ui.detailMission.wrongPoint} {Localize.getLocalize("LC_POINT_PER_WRONG")}
        </Typography>
      </>
    ) : (
      `${value}  ${Localize.getLocalize("LC_POINT")}`
    );
  };
  const keyParse = {
    missionTitle: Localize.getLocalize("LC_DESCRIPTION"),
    missionType: Localize.getLocalize("LC_MISSION_TYPE"),
    resultType: Localize.getLocalize("LC_RESULT_METHOD"),
    missionPoint: Localize.getLocalize("LC_BONUS_POINT"),
  };
  const valueParse = {
    missionTitle: (value) => {
      return value;
    },
    missionType: (value) => {
      return ChallengeEnum.MISSION_TYPE_PARSE[value];
    },
    resultType: (value) => {
      return ChallengeEnum.MISSION_RESULT_TYPE_PARSE[value];
    },
    missionPoint: (value) => {
      return MissionPointComponent(value);
    },
  };

  return (
    <Box>
      <Stack sx={{ ...style, width: "100%", typography: "header", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", position: 'relative' }}>
          <Typography variant="h3" sx={{ marginBottom: "30px" }}>
            {Localize.getLocalize("LC_MISSION")}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack}
              onClick={(e) => { e.preventDefault(); handleOnBack() }}
            >
              {Localize.getLocalize("LC_BUTTON_BACK")}
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: "auto" }}>
        <Stack direction="column" spacing={5} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
          <Stack>
            {Object.keys(keyParse).map((key, index) => {
              return (
                <Stack key={index} direction="row" spacing={2} sx={{ width: "100%", marginBottom: "20px" }}>
                  <Stack direction="column" sx={{ width: "20%" }} spacing={2}>
                    <Typography>{keyParse[key]}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "80%" }} spacing={2}>
                    <Stack> {valueParse[key](ui.detailMission[key])}</Stack>
                  </Stack>
                </Stack>
              );
            })}
            <Stack direction="row" spacing={2} sx={{ width: "100%", marginBottom: "20px" }}>
              <Stack direction="column" sx={{ width: "20%" }} spacing={2}>
                {renderViewHeader()}
              </Stack>
              <Stack direction="column" sx={{ width: "80%" }} spacing={2}>
                <Stack>{renderView()}</Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default View;
