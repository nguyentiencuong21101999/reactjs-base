import React, { Fragment } from 'react'

import {
  Box,
  Typography,
  Tab,
  Button,
  Stack,
  Avatar,
  Chip,
} from '@material-ui/core';
import Helper from 'service/helper'
import AdminEnum from 'service/enum/admin'
import ButtonHook from "core/hook/button/index.hook"
import Localize from 'service/localize';
import style from "core/hook/button/style"
const DetailAdminHtml = (props) => {
  const {
    ui, timeout,
    handleResetPassword,
    handleEdit,
    handleChangeStatus,
    handleOnBack
  } = props

  return (
    <Box>
      <Stack
        sx={{
          width: "100%",
          typography: "header",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ marginBottom: "30px" }}>
            {Localize.getLocalize("LC_ADMIN")}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              color="info"
              size="small"
              disabled={timeout.status}
              sx={style.buttonBack}
              onClick={handleOnBack}>
              {Localize.getLocalize("LC_BACK")}
            </Button>
            {ui.data.status !== AdminEnum.ADMIN_TEMP_STATUS.INIT && ui.profile.userType === AdminEnum.USER_TYPE.ROOT && <Button
              color={
                ui.data.status !== AdminEnum.ADMIN_STATUS.ACTIVE
                  ? "info"
                  : "error"
              }
              size="small"
              variant="outlined"
              disabled={timeout.status}
              style={style.buttonOutlined}
              onClick={(e) => {
                e.preventDefault();
                handleChangeStatus(ui.data.status);
              }}
            >
              {ui.data.status === AdminEnum.ADMIN_STATUS.ACTIVE
                ? Localize.getLocalize("LC_BUTTON_BLOCK")
                : Localize.getLocalize("LC_BUTTON_UNBLOCK")}
            </Button>}
            <>
              {(ui.data.status === AdminEnum.ADMIN_STATUS.ACTIVE || ui.data.status === AdminEnum.ADMIN_TEMP_STATUS.INIT) &&
                <ButtonHook
                  color="error"
                  size="small"
                  variant="contained"
                  disabled={timeout.status}
                  style={{ backgroundColor: "#FFE8E6", border: "none", color: "#FD5E5D" }}
                  onClick={(e) => { e.preventDefault(); handleResetPassword() }}
                  text={Localize.getLocalize("LC_BUTTON_RESET_PASS")}
                />
              }
              {ui.data.status === AdminEnum.ADMIN_STATUS.ACTIVE && ui.profile.userType === AdminEnum.USER_TYPE.ROOT && <ButtonHook
                color="primary"
                size="small"
                variant="contained"
                disabled={timeout.status}
                style={{ backgroundColor: "#FD5E5D" }}
                onClick={(e) => { e.preventDefault(); handleEdit() }}
                text={Localize.getLocalize("LC_BUTTON_EDIT")}
              />

              }
            </>
          </Stack>
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={5}
        sx={{
          p: 4,
          width: "100%",
          bgcolor: "transparent",
          boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography>{Localize.getLocalize("LC_ID_ACCOUNT")}</Typography>
          <Typography>{Localize.getLocalize("LC_USERNAME")}</Typography>
          <Typography>{Localize.getLocalize("LC_FULLNAME")}</Typography>
          <Typography>{Localize.getLocalize("LC_DOB")}</Typography>
          <Typography>{Localize.getLocalize("LC_GENDER")}</Typography>
          <Typography>{Localize.getLocalize("LC_PHONE")}</Typography>
          <Typography>{Localize.getLocalize("LC_EMAIL")}</Typography>
          <Typography>{Localize.getLocalize("LC_CREATED_BY")}</Typography>
          <Typography>{Localize.getLocalize("LC_MODIFIED_BY")}</Typography>
          <Typography>{Localize.getLocalize("LC_STATUS")}</Typography>
        </Stack>

        <Stack direction="column" spacing={2}>
          <Typography>{ui.data.userId || "-"}</Typography>
          <Typography>{ui.data.username || "-"}</Typography>
          <Typography>{ui.data.fullName || "-"}</Typography>
          <Typography>
            {ui.data.dob
              ? Helper.getDate(ui.data.dob)
              : "-"}
          </Typography>
          <Typography>
            {!Helper.isEmpty(ui.data.gender)
              ? AdminEnum.GENDER_PARSE[ui.data.gender]
              : "-"}
          </Typography>
          <Typography>{ui.data.phoneNumber || "-"}</Typography>
          <Typography>{ui.data.email || "-"}</Typography>
          <Typography>
            {ui.data.createdAt
              ? Helper.handleDateTime(ui.data.createdBy, ui.data.createdAt)
              : "-"}
          </Typography>
          <Typography>
            {ui.data.modifiedAt
              ? Helper.handleDateTime(ui.data.modifiedBy, ui.data.modifiedAt)
              : "-"}
          </Typography>
          <Typography>{ui.data.status !== AdminEnum.ADMIN_TEMP_STATUS.INIT ? AdminEnum.ADMIN_STATUS_PARSE[ui.data.status] : "-"}</Typography>
        </Stack>
      </Stack>

    </Box>
  );
}

export default DetailAdminHtml
