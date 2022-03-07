import React from 'react';
import { Helmet } from 'react-helmet';
import { Box, Button, Container, Link, Typography, CssBaseline, Avatar, FormHelperText, Stack } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LockOutlined } from '@material-ui/icons';
import style from "core/hook/button/style"

import UsernameHook from 'core/hook/login/username.hook';
import PasswordHook from 'core/hook/login/password.hook';
import Localize from 'service/localize';
import Copyright from 'core/hook/footer'
import ButtonHook from "core/hook/button/index.hook"
const styles = {
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
      width: "324px"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(5)
    },
    submit: {
      margin: `${theme.spacing(3, 0, 2)} !important`
    },
    container: {
      width: "470px",
      position: "absolute",
      backgroundColor: "white",
      borderRadius: "8px",
      transition: " opacity 0.2s linear",
      display: 'flex',
      justifyContent: 'center',
    },
  });
});


const Login = (props) => {
  const classes = useStyles();
  const { ui, handleOnRef, handleOnSubmit, handleOnChange, timeout } = props;
  return (
    <>
      <Helmet><title>Login | Intelin Co., Ltd.</title></Helmet>
      <Box sx={styles.box}>
        <Container sx={styles.container} component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" sx={{ color: "#FD5E5D", fontFamily: 'Roboto-Regular', fontWeight: 800, fontSize: "28px" }} variant="h3">
              {Localize.getLocalize('LC_BUTTON_LOGIN')}
            </Typography>
            <Typography className={classes.content}>
            </Typography>
            <form className={classes.form} noValidate>
              <Stack direction="column" spacing={3} >
                <UsernameHook
                  styleLabel={{ fontWeight: 500, fontSize: "18px" }}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="username"
                  label={Localize.getLocalize('LC_USERNAME')}
                  autoComplete="username"
                  autoFocus
                  value=""
                  onChange={handleOnChange}
                  disabled={timeout.status}
                  onRef={handleOnRef}
                  error={timeout.field === "username" ? Localize.getLocalize(timeout.message) : null}

                />
                <PasswordHook
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={Localize.getLocalize('LC_PASSWORD')}
                  type="password"
                  autoComplete="current-password"
                  value=""
                  onChange={handleOnChange}
                  disabled={timeout.status}
                  onRef={handleOnRef}
                  error={timeout.field === "password" ? Localize.getLocalize(timeout.message) : null}
                  styleLabel={{ fontWeight: 500, fontSize: "18px" }}
                />
              </Stack>
              {timeout.field === 'all' && (
                <FormHelperText error style={{ textAlign: 'center', marginTop: "10px" }}>
                  {Localize.getLocalize(timeout.message)}
                </FormHelperText>
              )}
              <Stack sx={{ marginTop: "20px", marginBottom: "15px", }} direction="column" spacing={3} >
                <ButtonHook
                  type="submit"
                  color="primary"
                  size="small"
                  variant="contained"
                  disabled={ui.isShowBtn || timeout.status}
                  style={{ height: '48px', backgroundColor: "#FD5E5D" }}
                  onClick={(e) => { e.preventDefault(); handleOnSubmit() }}
                  text={Localize.getLocalize("LC_BUTTON_LOGIN")}
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
  );
};

export default Login;
