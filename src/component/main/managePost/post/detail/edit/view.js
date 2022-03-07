import React, { Fragment } from "react";

import {
  Box,
  Typography,
  Tab,
  Button,
  Stack,
  Checkbox
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Alert from '@material-ui/core/Alert';
import CloseIcon from '@material-ui/icons/Close';

import Helper from "service/helper";
import TitleHook from "core/hook/post/title.hook";
import SummaryHook from "core/hook/post/summary.hook";
import style from "core/hook/button/style"
import ContentHook from "core/hook/post/content.hook";
import Select from "core/select"
import MultiSelect from "core/select/multi"
import TodoHook from "core/hook/post/todo.hook";
import StartDateHook from "core/hook/post/startDate.hook";
import EndDateHook from "core/hook/post/endDate.hook";
import DragAndDrop from "core/dragAndDrop/resize";
import PostEnum from 'service/enum/post'
import ButtonHook from "core/hook/button/index.hook"
import Localize from "service/localize";
import HeaderComponent from 'component/layout/header'
import TopicHook from "core/hook/post/topic.hook";
const EditPostHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnRef, handleOnChange, handleOnChangeCategoryId, handleOnChangeShow, handleOnChangeImage,
    handleOnChangeTodo, handleAddTodo, handleRemoveTodo, handleOnChangeTarget, handleOnChangeDate, handleOnBack, handleOnCheck,
    data, handleOnClick, handleOnCheckShowInInjectSchedule,handleOnChangeTopic,handleOnChangeChallenge
  } = props;
  const disabledStartDate = ui.defaultShow.value === PostEnum.SHOW.SHOW_BY_START_AND_END_DATE ?
    ((!Helper.isEmpty(data['startDate']) && !Helper.isEmpty(data['endDate'])) ||
      (!Helper.isEmpty(data['startDate']) && ui.isShowStartDate)) ? true : false : false
  return (
    <Box>
      <HeaderComponent
        html={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_POST")}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button
                color="info"
                size="small"
                disabled={timeout.status}
                sx={style.buttonBack}
                onClick={handleOnBack}
              >
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>

              <ButtonHook
                text={Localize.getLocalize("LC_BUTTON_SAVE")}
                color="primary"
                size="small"
                variant="contained"
                disabled={!ui.isShowBtn}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={handleSubmit}
              />
            </Stack>
          </Box>
        }
      />
      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        alignItems="center"
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
            <DragAndDrop testMessageId="msgImage" src={ui.photo || null} widthResize={328} heightResize={229} onChange={(fileUpload) => { handleOnChangeImage(fileUpload) }} />
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
            value={ui.detailPost && ui.detailPost.title || ""}
            type="text"
            label={Localize.getLocalize("LC_TITLE")}
            error={timeout.field === 'title' ? timeout.message : ''}
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
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <SummaryHook
            name="summary"
            value={ui.detailPost && ui.detailPost.summary || ""}
            type="text"
            label={Localize.getLocalize("LC_SUMMARY")}
            error={timeout.field === 'summary' ? timeout.message : ''}
            disabled={timeout.status}
            styleFormControl={{}}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={true}
          />
        </Stack>
        <Stack
          direction="row"
          sx={{ width: '100%' }}
        >
              <TopicHook
                name="topic"
                defaultValue={ui.defaultTopic.value}
                list={ui.listTopic}
                onChange={handleOnChangeTopic}
                disabled={timeout.status}
                onRef={handleOnRef}
                error={timeout.field === "gender" ? timeout.message : ""}
               label={Localize.getLocalize("LC_TOPIC")}
              row={true}
                styleRadio={{ marginTop: "10px" }}
                required={true}
              />
          </Stack>
        {/* KNOW */}
        {ui.defaultTopic.value === PostEnum.TOPIC.KNOW  && (
            <Stack
            direction="row"
            spacing={3}
            justifyContent="flex-start"
            sx={{ width: '100%' }}
            >
            <Select
              label={Localize.getLocalize("LC_POST_TYPE")}
              list={ui.listCategoryId}
              defaultValue={ui.defaultCategoryId}
              onChange={handleOnChangeCategoryId}
              styleFormControl={{ maxWidth: "250px", minWidth: "250px" }}
              disabled={timeout.status}
              styleMenuItem={{ width: "250px" }}
              notOutline={false}
              isRow={false}
              required={true}
              menuProps={true}
              maxWidthMenuItem={300}
            />

          <Select
            label={Localize.getLocalize("LC_DISPLAY")}
            list={ui.listShow}
            defaultValue={ui.defaultShow}
            onChange={handleOnChangeShow}
            styleFormControl={null}
            disabled={timeout.status}
            notOutline={false}
            isRow={false}
            menuProps={true}
            required={true}
          />
            <Stack
              direction="row"
              spacing={2}
            >
              {ui.defaultShow.value !== PostEnum.SHOW.HIDDEN && <StartDateHook
                name='startDate'
                label={Localize.getLocalize("LC_FROM")}
                value={data["startDate"] || null}
                // label="Thời gian"
                disabled={disabledStartDate || timeout.status}
                styleFormControl={{width:"130px"}}
                onRef={handleOnRef}
                onChange={handleOnChangeDate}
                required={true}
                onClick={handleOnClick}
              />}
              {ui.defaultShow.value === PostEnum.SHOW.SHOW_BY_START_AND_END_DATE && <EndDateHook
                name='endDate'
                label={Localize.getLocalize("LC_TO")}
                value={data['endDate'] || null}
                // label="Thời gian"
                disabled={Helper.isEmpty(data["startDate"]) || timeout.status}
                styleFormControl={{}}
                onRef={handleOnRef}
                onChange={handleOnChangeDate}
                required={true}
                minDate={new Date(data['startDate'])}
                isHiddenErr={ui.isHiddenErr}
                error={timeout.error === "endDate" ? timeout.message : ""}
              />}
            </Stack>
          </Stack>
        )}
       {
         ui.defaultTopic.value === PostEnum.TOPIC.CHALLENGE && (
          <Stack
          direction="row"
          spacing={3}
          justifyContent="flex-start"
          sx={{ width: '100%' }}
          >
          <Select
          label={Localize.getLocalize("LC_CHALLENGE")}
          list={ui.listChallenge}
          defaultValue={ui.defaultChallenge}
          onChange={handleOnChangeChallenge}
          styleFormControl={null}
          disabled={timeout.status}
          notOutline={false}
          isRow={false}
          menuProps={true}
          required={true}
         fullWidth={true}
         tooltip={true}
         titleTooltip={Localize.getLocalize("LC_POST_CHALLENGE_HINT")}
        />
        </Stack>
         )
       }

        {!ui.isEdit && <Stack
          direction="row"
          spacing={3}
          justifyContent="space-between"
          sx={{width:"100%"}}
        >
          <MultiSelect
            label={Localize.getLocalize("LC_OBJECT")}
            list={ui.listTarget}
            defaultValue={ui.defaultTarget}
            onChange={handleOnChangeTarget}
            disabled={ ui.defaultTopic.value === PostEnum.TOPIC.CHALLENGE ||timeout.status}
            notOutline={false}
            menuProps={true}
            fullWidth={true}
            isRow={false}
            required={true}
          />
        </Stack>}

        <Stack direction="row" spacing={3}
          justifyContent="flex-start"
          sx={{ width: '100%' }}
        >
          <ContentHook
            name="content"
            value={ui.detailPost && ui.detailPost.content || ""}
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
          />

        </Stack>
        { ui.defaultTopic.value === PostEnum.TOPIC.KNOW  && (<>
          <Stack direction="row" spacing={3}
          justifyContent="flex-start"
          sx={{ width: '100%', marginBottom: "-20px" }}
        >
          <Checkbox
            checked={ui.checkedShowInInjectSchedule}  //{checked}
            onChange={handleOnCheckShowInInjectSchedule}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography style={{ fontSize: '1rem', color: '#6b778c', marginLeft: "0px", marginTop: "10px" }}>{Localize.getLocalize("LC_POST_IN_INJECT_SCHEDULE")}</Typography>
        </Stack>
        <Stack direction="row" spacing={3}
          justifyContent="flex-start"
          sx={{ width: '100%', marginBottom: "-20px" }}
        >
          <Checkbox
            checked={ui.checked}  //{checked}
            onChange={handleOnCheck}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography style={{ fontSize: '1rem', color: '#6b778c', marginLeft: "0px", marginTop: "10px" }}>{Localize.getLocalize("LC_HAVE_TODO_LIST")}</Typography>
        </Stack>
        {ui.checked ? <Stack direction="column" spacing={2}
          justifyContent="flex-start"
          sx={{ width: '100%' }}
        >
          <Stack direction="column" spacing={2}
            justifyContent="flex-start"
            sx={{ width: "100%" }}
          >
            {ui.toDoList.map((item, index) => (
              <Stack direction="row" spacing={2}
                justifyContent="flex-start"
                alignItems='center'
                key={index}
                sx={{ width: "100%" }}
              >
                <TodoHook
                  name="toDoList"
                  value={data['toDoList'][index]}
                  type="text"
                  label={null}
                  error={timeout.field === 'todo' ? timeout.message : ''}
                  disabled={timeout.status}
                  styleFormControl={{ width: "740px" }}
                  onRef={handleOnRef}
                  fullWith={true}
                  onChange={(name, value) => handleOnChangeTodo(name, value, index)}
                />

                {index > 0 && index + 1 === ui.toDoList.length ? <Button
                  color="primary"
                  size="small"
                  variant="text"
                  disabled={timeout.status}
                  sx={{ height: "36px", marginLeft: '30px' }}
                  onClick={event => { event.preventDefault(); handleRemoveTodo(index) }}
                >
                  <CloseIcon />
                </Button> : null}
              </Stack>
            ))}
          </Stack>
          {ui.toDoList.length < 100 ? <Button
            color="primary"
            size="small"
            variant="outlined"
            disabled={!(data['toDoList'].findIndex(element => element === '') === -1) || timeout.status}
            sx={{ height: "36px", width: '100px' }}
            onClick={handleAddTodo}
          >
            {Localize.getLocalize("LC_BUTTON_ADD")}
          </Button> : null}

        </Stack> : null}
        </>)
       
          }
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
