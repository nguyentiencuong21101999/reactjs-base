import React, { Fragment } from "react";

import { Box, Typography, Tab, Button, Stack, Avatar, Chip } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Alert from "@material-ui/core/Alert";
import CloseIcon from "@material-ui/icons/Close";
import TitleHook from "core/hook/post/title.hook";

import ContentHook from "core/hook/post/content.hook";
import Select from "core/select";
import MultiSelect from "core/select/multi";
import DragAndDrop from "core/dragAndDrop/file";
import ListImport from "./view/listImport";
import NotifyEnum from "service/enum/notify";
import styled from "@emotion/styled";
import HelperService from "service/helper";
import ButtonHook from "core/hook/button/index.hook"
import ContentSmsHook from "core/hook/notification/contentSms.hook"
import ContentDeviceHook from "core/hook/notification/contentDevice.hook"
import ContentEmailHook from "core/hook/notification/contentEmail.hook"
import Localize from "service/localize";
import style from "core/hook/button/style"
import HeaderComponent from 'component/layout/header'
const CustomTypography = styled(Typography)`
  margin-bottom: -10px;
  color: rgb(93, 115, 134);
  position: relative;
  width: fit-content;
  &::before {
    content: "*";
    position: absolute;
    top: 0;
    right: -8px;
    font-size: 12px;

    display: ${(props) => (props.required ? "block" : "none")};
  }
`;

const CreateNotifyHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnRef, handleOnChange, handleOnChangeChannel, handleOnChangeFile, handleOnChangeTarget, data, handleOnBack, handleSendNotification, handleRemoveFile } = props;

  const renderContent = () => {
    switch (ui.defaultChannel.value) {
      case NotifyEnum.FILTER.SMS:
        return <ContentSmsHook
          name="content"
          value={""}
          type="text" label={Localize.getLocalize("LC_CONTENT")}
          error={timeout.field === "content" ? timeout.message : ""}
          disabled={timeout.status}
          styleFormControl={{ fontSize: "16px", width: "784px", maxWidth: "784px", height: "auto", marginBottom: "10px" }}
          onRef={handleOnRef}
          onChange={handleOnChange}
          fullWidth={false}
          required={true} />
      case NotifyEnum.FILTER.DEVICE:
        return <ContentDeviceHook
          name="content"
          value={""}
          type="text" label={Localize.getLocalize("LC_CONTENT")}
          disabled={timeout.status}
          error={timeout.field === "content" ? timeout.message : ""}
          styleFormControl={{ fontSize: "16px", width: "784px", maxWidth: "784px", height: "auto", marginBottom: "10px" }}
          onRef={handleOnRef}
          onChange={handleOnChange}
          fullWidth={false}
          required={true} />
      case NotifyEnum.FILTER.EMAIL:
        return <ContentEmailHook
          name="content"
          value={(ui.detailPost && ui.detailPost.content) || ""}
          type="text" label={Localize.getLocalize("LC_CONTENT")}
          disabled={timeout.status}
          error={timeout.field === "content" ? timeout.message : ""}
          styleFormControl={{ maxWidth: "784px" }}
          onRef={handleOnRef}
          onChange={handleOnChange}
          minRows={5}
          maxRows={5}
          fullWidth={true}
          required={true} />
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
              {Localize.getLocalize("LC_NOTI")}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button color="info"
                size="small"
                disabled={timeout.status}
                sx={style.buttonBack}
                onClick={(e) => { e.preventDefault(); handleOnBack() }}
              >
                {Localize.getLocalize("LC_BACK")}
              </Button>
              <ButtonHook
                text={Localize.getLocalize("LC_SEND_NOTIFY")}
                color="primary"
                size="small"
                variant="contained"
                disabled={ui.isShowBtn}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={(e) => { e.preventDefault(); handleSendNotification() }}
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
          margin: "auto",
          width: "800px",
          marginTop: "84px"
        }}
      >
        <Stack direction="row" spacing={3} justifyContent="space-around" sx={{ width: "100%" }}>
          <TitleHook name="title"
            value={(ui.detailPost && ui.detailPost.title) || ""}
            type="text" label={Localize.getLocalize("LC_TITLE")}
            error={timeout.field === "title" ? timeout.message : ""}
            disabled={timeout.status} styleFormControl={{ margin: 0 }}
            onRef={handleOnRef} onChange={handleOnChange}
            fullWidth={true}
            required={true} />
        </Stack>
        <Stack direction="row" spacing={3} justifyContent="space-between" sx={{ width: "100%" }}>
          <Stack direction="row" spacing={3} justifyContent="flex-start" sx={{ width: "47%", minWidth: "250px" }}>
            <Select label={Localize.getLocalize("LC_CHANNEL")}
              list={ui.listChannel}
              defaultValue={ui.defaultChannel}
              onChange={handleOnChangeChannel}
              styleFormControl={{ minWidth: "250px" }}
              menuProps={true}
              disabled={timeout.status}
              notOutline={false}
              isRow={false}
              required={true} />
          </Stack>
          <Stack direction="row" spacing={3} justifyContent="flex-start" sx={{ width: "53%" }}>
            <MultiSelect
              label={Localize.getLocalize("LC_OBJECT")}
              list={ui.listTarget}
              defaultValue={ui.defaultTarget}
              onChange={handleOnChangeTarget}
              disabled={timeout.status}
              styleFormControl={{ minWidth: "250px" }}
              notOutline={false}
              // fullWidth={true}
              menuProps={true}
              isRow={false}
              required={true}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3} justifyContent="flex-start" sx={{ width: "100%" }}>
          {renderContent()}
        </Stack>

        {ui.defaultChannel.value !== NotifyEnum.FILTER.DEVICE ? (
          <Stack direction="column" spacing={3} sx={{ width: "100%", marginBottom: "30px" }}>
            <CustomTypography required={false}>{Localize.getLocalize("LC_FILE_IMPORT")}</CustomTypography>
            <Box sx={{ width: "400px", height: "100px" }}>
              <DragAndDrop
                testMessageId="msgImage"
                widthResize={328}
                heightResize={229}
                onChange={(fileUpload) => {
                  handleOnChangeFile(fileUpload);
                }}
                onRemove={handleRemoveFile}
              />
            </Box>
          </Stack>
        ) : null}

        <Stack>{!HelperService.isEmpty(ui.listDataImport) ? <ListImport list={ui.listDataImport} /> : null}</Stack>
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

export default CreateNotifyHTML;
