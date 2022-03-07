import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Button, Container, Link, Typography, CssBaseline, Avatar, TextField, Grid, FormHelperText, Checkbox, Stack } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LockOutlined } from '@material-ui/icons';
import PasswordHook from 'core/hook/resetPassword/password.hook';
import Localize from 'service/localize'
import TokenUsedComponent from './element/tokenExpired'
import DialogComponent from 'component/layout/dialog'
import Copyright from 'core/hook/footer'
import ButtonHook from "core/hook/button/index.hook"
const style = {
  box: {
    position: "fixed",
    width: "100vw",
    top: 0,
    left: 0,
    alignItems: "center",
    transition: "background-color 0.2s ease-in-out",
    backgroundColor: '#FFF2F7',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center'
  },
  container: {
    width: "600px",
    position: "absolute",
    backgroundColor: "white",
    borderRadius: "8px",
    transition: " opacity 0.2s linear",
    display: 'flex',
    justifyContent: 'center',
  }
}


const useStyles = makeStyles((theme) => {
  return ({
    paper: {
      marginTop: "15px",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: "324px",
      color: "#6B778C !important"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: `#FD5E5D !important`,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: `${theme.spacing(3, 0, 2)} !important`,
    },
    content: {
      margin: `${theme.spacing(4, 0, 2)}  !important`,

    },

  })
});


const PasswordHtml = (props) => {
  const classes = useStyles();
  const { handleOnRef, handleOnSubmit, handleOnChange, timeout, ui, handleConfirmPopUp } = props


  const renderView = () => {
    switch (ui.isToken.current) {
      case ui.isToken.tokenUsed:
      case ui.isToken.tokenExpired:
        return <TokenUsedComponent handleConfirm={handleConfirmPopUp} />
      default:
        return (
          <>
            <Helmet><title>Login | Intelin Co., Ltd.</title></Helmet>
            <Box sx={style.box}>
              <Container sx={style.container} component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <LockOutlined />
                  </Avatar>
                  <Typography component="h1" sx={{ color: "#FD5E5D", fontFamily: 'Roboto-Regular', fontWeight: 800, fontSize: "28px" }} variant="h3">
                    {Localize.getLocalize("LC_SET_PASSWORD_TITLE")}
                  </Typography>
                  <Typography className={classes.content}>
                    {Localize.getLocalize("LC_SET_PASSWORD_CONTENT")}
                  </Typography>
                  <form className={classes.form} noValidate>
                    <PasswordHook
                      styleLabel={{ fontWeight: 500, fontSize: "18px" }}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label={Localize.getLocalize("LC_PASSWORD")}
                      type="password"
                      autoComplete="current-password"
                      value=""
                      onChange={handleOnChange}
                      disabled={timeout.status}
                      onRef={handleOnRef}
                      error={timeout.field === "password" ? Localize.getLocalize(timeout.message) : null}
                      required={true}
                    />
                    {timeout.field === 'all' && (
                      <FormHelperText error style={{ textAlign: 'center', marginTop: "10px" }}>
                        {Localize.getLocalize(timeout.message)}
                      </FormHelperText>
                    )}
                    <Stack sx={{ marginTop: "20px", marginBottom: "15px", }} direction="column" spacing={3} >
                      <ButtonHook
                        size="small"
                        variant="contained"
                        disabled={!ui.isShowBtn || timeout.status}
                        style={{ height: '48px', backgroundColor: "#FD5E5D" }}
                        onClick={(e) => { e.preventDefault(); handleOnSubmit() }}
                        text={Localize.getLocalize("LC_BUTTON_DONE")}
                      />
                    </Stack>
                    <Stack sx={{ marginTop: "20px", marginBottom: "15px", }} direction="column" spacing={3} >
                      <Copyright />
                    </Stack>
                  </form>
                </div>
              </Container>
            </Box>

          </>
        )
        break;
    }
  }
  return (
    <>
      {renderView()}
      <DialogComponent />
    </>
  );
};

export default PasswordHtml;
