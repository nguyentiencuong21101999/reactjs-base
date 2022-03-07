import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

const ButtonHook = props => {

  const { color, size, variant, disabled, style, onClick, text, type = "submit" } = props;
  const styles = { height: '36px', padding: "0px 16px 0px 16px", textTransform: "unset", fontWeight: 700, opacity: 0.8, ...style }
  const useStyles = makeStyles(theme => ({
    textarea: {
      "&:hover": {
        ...styles,
        opacity: 1
      }
    },
  }));
  const classes = useStyles();
  return (
    <Button
      type={type}
      color={color}
      size={size}
      variant={variant}
      disabled={disabled}
      sx={styles}
      onClick={onClick}
      className={classes.textarea}
    >
      {text}
    </Button>
  )

}

export default ButtonHook