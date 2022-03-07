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

import Alert from '@material-ui/core/Alert';
import moment from 'moment'
import PostEnum from 'service/enum/post'
import Helper from "service/helper";
import TitleHook from "core/hook/challenge/title.hook";
import ContentHook from "core/hook/challenge/content.hook";
import Select from "core/select"
import StartDateHook from "core/hook/post/startDate.hook";
import EndDateHook from "core/hook/post/endDate.hook";
import DragAndDrop from "core/dragAndDrop/resize";
import MultiSelect from "core/select/multi"
import ChallengeEnum from "service/enum/challenge";
import ButtonHook from "core/hook/button/index.hook"
import style from "core/hook/button/style"
import SummaryHook from "core/hook/challenge/summary.hook"
import HandleRankHook from "core/hook/challenge/handleRank.hook";
import HeaderComponent from 'component/layout/header'
import Localize from "service/localize";

const EditPostHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnRef, handleOnChange, handleOnChangeShow, handleOnChangeImage,
    handleOnChangeDate,
    data, handleOnBack,
    handleOnChangeTarget,
    handleOnChangeCategoryId,
    handleOnchangeRank,
    handleOnClick
  } = props;

  const disabledStartDate = ui.defaultShow.value === ChallengeEnum.SHOW.SHOW_BY_TIME ?
    ((!Helper.isEmpty(data['startDate']) && !Helper.isEmpty(data['endDate'])) ||
      (!Helper.isEmpty(data['startDate']) && ui.isShowStartDate)) ? true : false : false
  return (
    <Box>
      <HeaderComponent
        html={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_CHALLENGE")}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }}>
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
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          <Box sx={{ width: '500px', height: '300px', marginBottom: '30px' }}>
            <DragAndDrop disabled={ui.isContentUpdate && ui.detailChallenge.status !== ChallengeEnum.STATUS.NEW || timeout.status} testMessageId="msgImage" src={!Helper.isEmpty(ui.detailChallenge) ? JSON.parse(ui.detailChallenge.photos)[0] : null} widthResize={328} heightResize={229} onChange={(fileUpload) => { handleOnChangeImage(fileUpload) }} />
          </Box>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <TitleHook
            name="title"
            value={ui.detailChallenge && ui.detailChallenge.title || ""}
            type="text"
            label={Localize.getLocalize("LC_CHALLENGE_NAME")}
            error={timeout.field === 'title' ? timeout.message : ''}
            disabled={ui.isContentUpdate && ui.detailChallenge.status !== ChallengeEnum.STATUS.NEW || timeout.status}
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
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <SummaryHook
            name="summary"
            value={ui.detailChallenge && ui.detailChallenge.summary || ""}
            type="text"
            label={Localize.getLocalize("LC_SUMMARY")}
            error={timeout.field === "content" ? timeout.message : ""}
            disabled={ui.isContentUpdate && ui.detailChallenge.status !== ChallengeEnum.STATUS.NEW || timeout.status}
            styleFormControl={{ fontSize: "16px", width: "784px", marginBottom: "10px", maxWidth: "784px" }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={false}
            required={false} />
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          sx={{ width: '52%' }}
        >
          <MultiSelect
            label={Localize.getLocalize("LC_OBJECT")}
            list={ui.listTarget}
            defaultValue={ui.defaultTarget}
            styleFormControl={{ minWidth: "250px" }}
            onChange={handleOnChangeTarget}
            disabled={ui.isContentUpdate && ui.detailChallenge.status !== ChallengeEnum.STATUS.NEW || timeout.status}
            notOutline={false}
            menuProps={true}
            isRow={false}
            required={true}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}

        >  <Stack
          direction="row"
          spacing={3}
          sx={{ width: '48%' }}
        >
            <Select
              label={Localize.getLocalize("LC_CHALLENGE_TYPE")}
              list={ui.listCategoryId}
              defaultValue={ui.defaultCategoryId}
              onChange={handleOnChangeCategoryId}
              styleFormControl={{ width: "250px" }}
              disabled={ui.isContentUpdate || timeout.status}
              notOutline={false}
              menuProps={true}
              isRow={false}
              required={true}
            />
          </Stack>

          <Stack
            direction="row"
            spacing={3}
            sx={{ width: '52%' }}
          >
            {ui.defaultCategoryId.value === ChallengeEnum.CHALLENGE_TYPE.WRITE_POST && (
              <HandleRankHook
                name="resultType"
                defaultValue={ui.defaultRank.value}
                list={ui.listRank}
                onChange={handleOnchangeRank}
                disabled={timeout.status}
                onRef={handleOnRef}
                error={timeout.field === "gender" ? timeout.message : ""}
                label={Localize.getLocalize("LC_RATING_METHOD")}
                row={true}
                styleRadio={{ marginTop: "10px" }}
                required={true}
              />
            )}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          spacing={3}
        >
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            sx={{ width: '48%' }}
          >
            <Select
              label={Localize.getLocalize("LC_DISPLAY")}
              list={ui.listShow}
              defaultValue={ui.defaultShow}
              onChange={handleOnChangeShow}
              styleFormControl={{ width: "250px" }}
              disabled={ui.isContentUpdate && ui.detailChallenge.status !== ChallengeEnum.STATUS.NEW || timeout.status}
              notOutline={false}
              isRow={false}
              menuProps={true}
              required={true}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            sx={{ width: '52%' }}
          >
            <StartDateHook
              name='startDate'
              label={Localize.getLocalize("LC_STARTDATE")}
              value={ui.detailChallenge && data['startDate'] || null}
              // label="Thời gian"
              disabled={disabledStartDate || (ui.isContentUpdate && ui.detailChallenge.status !== ChallengeEnum.STATUS.NEW) || timeout.status}
              styleFormControl={{}}
              onRef={handleOnRef}
              onChange={handleOnChangeDate}
              onClick={handleOnClick}
              required={true}
              minDate={moment(new Date()).add('days', 1)}
              error={timeout.field === 'startDate' ? timeout.message : ''}
            />
            {ui.defaultShow.value === ChallengeEnum.SHOW.SHOW_BY_TIME ? (
              < EndDateHook
                name='endDate'
                label={Localize.getLocalize("LC_ENDDATE")}
                value={ui.detailChallenge && data['endDate'] || null}
                // label="Thời gian"
                disabled={Helper.isEmpty(data["startDate"]) || (ui.isContentUpdate && ui.detailChallenge.status !== ChallengeEnum.STATUS.NEW) || timeout.status}
                styleFormControl={{}}
                onRef={handleOnRef}
                onChange={handleOnChangeDate}
                isHiddenErr={ui.isHiddenErr}
                required={true}
                minDate={new Date(data['startDate'])}
                error={timeout.field === 'endDate' ? timeout.message : ''}
              />) : null
            }
          </Stack>


        </Stack>

        <Stack direction="row" spacing={3}
          justifyContent="flex-start"
          sx={{ width: '100%' }}
        >
          <ContentHook
            name="content"
            value={ui.detailChallenge && ui.detailChallenge.content || ""}
            type="text"
            label={Localize.getLocalize("LC_CONTENT")}
            disabled={timeout.status}
            error={timeout.field === 'content' ? timeout.message : ''}
            styleFormControl={{ maxWidth: '784px' }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            minRows={5}
            maxRows={5}
            fullWidth={true}
            required={true}
            isDefaultBtn={ui.isDefaultBtn}
            isContentUpdate={ui.isContentUpdate}
          />

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

export default EditPostHTML;
