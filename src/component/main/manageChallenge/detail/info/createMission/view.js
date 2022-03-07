import React, { Fragment } from "react";

import {
  Box,
  Typography,
  Tab,
  Button,
  Stack,
  Avatar,
  Chip,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Alert from '@material-ui/core/Alert';
import moment from 'moment'
import ChallengeEnum from 'service/enum/challenge'

import Helper from "service/helper";
import AdminEnum from "service/enum/admin";
import DescriptionHook from "core/hook/createMission/description.hook";
import BonusPointHook from "core/hook/createMission/bonusPoint.hook";
import Select from "core/select"
import ButtonHook from "core/hook/button/index.hook"

import ListActiveComponent from './element/listActive'
import DrinkWaterComponent from './element/drinkWater'
import AnswerQuestionComponent from './element/answerQuestion'
import style from "core/hook/button/style"
import HeaderComponent from 'component/layout/header'
import Localize from "service/localize";
const CreateMissionHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnRef, handleOnChange,
    data, handleOnBack,
    handleAddActive,
    handleRemoveActive,
    handleOnChangeMissionType,
    handleOnChangeResult,
    handleAddQuestion,
    handleRemoveQuestion,
    handleAddAnswer,
    handleRemoveAnswer,
    handleOnChangeActive,
    handleOnChangeQuestion,
    handleOnChangeAnswer,
    handleOnChangeAnswerResult
  } = props;

  const renderView = () => {
    switch (ui.defaultMissionType.value) {
      case 1:
        return <ListActiveComponent
          ui={ui}
          data={data}
          timeout={timeout}
          handleOnRef={handleOnRef}
          handleAddActive={handleAddActive}
          handleRemoveActive={handleRemoveActive}
          handleOnChangeActive={handleOnChangeActive}
        />
        break;
      case 2:
        return <DrinkWaterComponent
          ui={ui}
          timeout={timeout}
          handleOnRef={handleOnRef}
          handleOnChange={handleOnChange}
        />
        break;
      case 3:
        return <AnswerQuestionComponent
          ui={ui}
          data={data}
          timeout={timeout}
          handleOnRef={handleOnRef}
          handleAddQuestion={handleAddQuestion}
          handleRemoveQuestion={handleRemoveQuestion}
          handleAddAnswer={handleAddAnswer}
          handleRemoveAnswer={handleRemoveAnswer}
          handleOnChangeQuestion={handleOnChangeQuestion}
          handleOnChangeAnswer={handleOnChangeAnswer}
          handleOnChangeAnswerResult={handleOnChangeAnswerResult}
        />
        break;
      default:
        break;
    }
  }
  return (
    <Box>
      <HeaderComponent
        html={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_MISSION")}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button
                color="info"
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
          margin: 'auto',
          width: '800px',
          marginTop: "84px"
        }}
      >

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <DescriptionHook
            name="missionTitle"
            value={ui.detailChallenge && ui.detailChallenge.title || ""}
            type="text"
            label={Localize.getLocalize("LC_DESCRIPTION")}
            error={timeout.field === 'missionTitle' ? timeout.message : ''}
            disabled={timeout.status}
            styleFormControl={{ margin: 0 }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={true}
            required={true}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="flex-start"
          sx={{ width: '100%' }}
        >
          <Select
            label={Localize.getLocalize("LC_MISSION_TYPE")}
            list={ui.listMissionType}
            defaultValue={ui.defaultMissionType}
            onChange={handleOnChangeMissionType}
            styleFormControl={{ minWidth: "250px" }}
            disabled={timeout.status}
            notOutline={false}
            isRow={false}
            required={true}
          />

          <Select
            label={Localize.getLocalize("LC_RESULT_METHOD")}
            list={ui.listResult}
            defaultValue={ui.defaultResult}
            onChange={handleOnChangeResult}
            styleFormControl={{ minWidth: ui.defaultMissionType.value !== ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER ? "250px" : "100px" }}
            disabled={ui.defaultMissionType.value !== ChallengeEnum.MISSION_TYPE.CLIP_OR_PIC || timeout.status}
            notOutline={false}
            isRow={false}
            required={true}
          />
          {ui.defaultMissionType.value !== ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER ? (
            <BonusPointHook
              name="missionPoint"
              value={ui.detailChallenge && ui.detailChallenge.title || ""}
              type="text"
              label={Localize.getLocalize("LC_BONUS_POINT")}
              error={timeout.field === 'missionPoint' ? timeout.message : ''}
              disabled={timeout.status}
              styleFormControl={{ margin: 0, minWidth: "250px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              fullWidth={false}
              required={true}
            />
          ) : (
            <>
              <BonusPointHook
                name="correctPoint"
                value={ui.detailChallenge && ui.detailChallenge.title || ""}
                type="text"
                label={Localize.getLocalize("LC_POINT_PER_CORRECT")}
                error={timeout.field === 'missionPoint' ? timeout.message : ''}
                disabled={timeout.status}
                styleFormControl={{ margin: 0, }}
                onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={false}
                required={true}
              />
              <BonusPointHook
                name="wrongPoint"
                value={ui.detailChallenge && ui.detailChallenge.title || ""}
                type="text"
                label={Localize.getLocalize("LC_POINT_PER_WRONG")}
                error={timeout.field === 'missionPoint' ? timeout.message : ''}
                disabled={timeout.status}
                styleFormControl={{ margin: 0, }}
                onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={false}
                required={true}
              />
            </>
          )}

        </Stack>
        {renderView()}

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

export default CreateMissionHTML;
