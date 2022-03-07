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
import UserNameHook from "core/hook/admin/userName.hook";
import GenderHook from "core/hook/admin/gender.hook";
import PhoneNumberHook from "core/hook/admin/phoneNumber.hook";
import EmailHook from "core/hook/admin/email.hook";
import FullNameHook from "core/hook/admin/fullName.hook";
import DobHook from "core/hook/admin/dob.hook";
import ButtonHook from "core/hook/button/index.hook"
import Localize from 'service/localize';
import style from "core/hook/button/style"
const EditAdminHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnRef, handleOnChange, handleOnBack } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen((timeout.field === 'all'))
  }, [(timeout.field === 'all')])
  // const [open, setOpen] = React.useState(false);

  // React.useEffect(() => {
  //   setOpen((timeout.field === 'all'))
  // }, [(timeout.field === 'all')])

  return (
    <Box
    // sx={{ backgroundColor: "#fff" }}
    >
      <Stack
        sx={{
          typography: "header",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ marginBottom: "30px" }}>
            {Localize.getLocalize("LC_ADMIN")}
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button
              color="info"
              size="small"
              disabled={timeout.status}
              sx={style.buttonBack}
              onClick={handleOnBack}>
              {Localize.getLocalize("LC_BACK")}
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Stack
        direction="row"
        spacing={5}
        justifyContent="center"
      // sx={{ p: 1 }}
      >
        {/* <Avatar sx={{ bgcolor: 'transparent', boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 10px',
                    boxSizing: 'border-box', width: 'auto', height: 'auto'}} variant="rounded"
                >
                    {ui.data.image ? <img style={{width: '300px', height: '300px', objectFit: "contain"}}
                        src={ui.data.image} alter="Avatar"/> : <AccountBoxIcon sx={{width: '300px', height: '300px'}} />}
                </Avatar> */}
        <Stack
          direction="column"
          spacing={6}
          justifyContent="center"
          sx={{
            p: 3,
            width: "auto",
            bgcolor: "transparent",
            boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px",
            margin: 'auto',
            maxWidth: '1366px'
          }}
        >
          <Stack direction="row" spacing={5}>
            <UserNameHook
              name="username"
              value={ui.data && ui.data.username || ""}
              type="text"
              label={Localize.getLocalize("LC_USERNAME")}
              error={timeout.field === 'username' ? Localize.getLocalize(timeout.message) : ''}
              disabled={ui.data && ui.data.username ? true : false}
              styleFormControl={{ maxWidth: "250px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              required={true}
            />
            <FullNameHook
              name='fullName'
              value={ui.data && ui.data.fullName || ""}
              type="text"
              label={Localize.getLocalize("LC_FULLNAME")}
              disabled={timeout.status}
              styleFormControl={{ maxWidth: "250px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              error={timeout.field === 'fullName' ? timeout.message : ''}
              required={true}
            />
            <DobHook
              name='dob'
              value={ui.data && ui.data.dob || ""}
              label={Localize.getLocalize("LC_DOB")}
              error={timeout.field === 'dob' ? timeout.message : ''}
              disabled
              styleFormControl={{ maxWidth: "250px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              maxDate={new Date()}
              required={true}
              inputFormat='DD-MM-YYYY'
            />
          </Stack>
          <Stack direction="row" spacing={5}>
            <EmailHook
              name="email"
              error={timeout.field === 'email' ? Localize.getLocalize(timeout.message) : ''}
              value={ui.data && ui.data.email || ""}
              type="text"
              label={Localize.getLocalize("LC_EMAIL")}
              disabled={timeout.status}
              styleFormControl={{ maxWidth: "250px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              required={true}
            />
            <PhoneNumberHook
              name="phoneNumber"
              value={ui.data && ui.data.phoneNumber || ""}
              type="text"
              label={Localize.getLocalize("LC_PHONE")}
              disabled={timeout.status}
              styleFormControl={{}}
              onRef={handleOnRef}
              onChange={handleOnChange}
            />
            <Box>
              <GenderHook
                name="gender"
                defaultValue={ui.currentGender.value}
                list={ui.gender}
                onChange={handleOnChange}
                disabled={timeout.status}
                onRef={handleOnRef}
                error={timeout.field === "gender" ? timeout.message : ""}
                label={Localize.getLocalize("LC_GENDER")}
                row={true}
                required={true}
              />
            </Box>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end", margin: '30px auto', maxWidth: '1366px' }}>
            <ButtonHook
              text={Localize.getLocalize('LC_BUTTON_SAVE')}
              color="primary"
              size="small"
              variant="contained"
              disabled={timeout.status || !ui.isShowBtn}
              style={{ backgroundColor: "rgb(253, 94, 93)" }}
              onClick={(e) => { e.preventDefault(); handleSubmit() }}
            />
          </Stack>


        </Stack>
      </Stack>
      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {/* {Localize.getLocalize(timeout.message)} */}
          {timeout.message}
        </Alert>
      ) : null}
      {/* {open ? <Alert color='danger' message={timeout.message} onClose={e=>{e.preventDefault(); setOpen(false)}}/> : null} */}
    </Box>
  );
};

export default EditAdminHTML;
