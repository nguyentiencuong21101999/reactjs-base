import React from 'react';
import PropTypes from 'prop-types'
import Helper from 'service/helper'
import styled from '@emotion/styled'
import { makeStyles } from "@material-ui/styles";
import { Typography, Stack, TextareaAutosize } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  },
  textarea: {
    "&:focus": {
      border: "none",
      outline: "2px solid #ff8585"
    }
  },
  textarea_error: {
    "&:focus": {
      border: "none",
      outline: "2px solid red"
    }
  }

}));
const CustomTypography = styled(Typography)`
  position: relative;
  width: fit-content;
  &::before{
    content: '*';
    position: absolute;
    top: 0;
    right: -8px;
    font-size: 12px;
    color:${props => props.colors};
    display: ${props => props.required ? 'block' : 'none'};
  }
`


const styleError = {
  color: "#d32f2f",
  fontFamily: "Roboto",
  fontFamily: "Helvetica",
  fontFamily: "Arial",
  fontFamily: "sans-serif",
  fontWeight: 400,
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "-3px",
  marginRight: "14px",
  marginBottom: 0,
  marginLeft: "14px"
}

const Input = props => {
  const {
    type,
    heightInput,
    id,
    label,
    name,
    placeholder,
    error,
    disabled,
    onRef,
    onChange,
    styleFormControl,
    isRow,
    value,
    minRows,
    maxRows,
    maxLength,
    styleStack = {}
  } = props
  const classes = useStyles();
  const width = props.fullWidth ? { width: '100%' } : null
  const row = isRow ? { alignItems: 'center' } : null

  const styles = !Helper.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f' } : { fontSize: '1rem', color: '#6b778c' }
  const border = !Helper.isEmpty(error) ? { borderColor: "red" } : {}
  const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
  return (
    <Stack direction={isRow ? "row" : "column"} spacing={1} sx={{ ...row }, { ...width }, { ...styleStack }}>
      {label ? <CustomTypography colors={colors} required={props.required} style={{ ...styles }}>{label}</CustomTypography> : null}
      <TextareaAutosize
        onFocus={() => { }}
        aria-label="minimum height"
        minRows={minRows || 2}
        maxRows={maxRows || 5}
        placeholder={placeholder}
        style={props.fullWidth ? { ...styleFormControl, width: '100%', borderRadius: "5px", padding: '10px', ...border } : { ...styleFormControl, borderRadius: "5px", padding: '10px', ...border }}
        ref={onRef}
        onChange={onChange}
        error={error}
        disabled={disabled}
        value={value}
        className={Helper.isEmpty(error) ? classes.textarea : classes.textarea_error}
        maxLength={maxLength}
      />
      <p style={styleError}>{error}</p>
    </Stack>
  )

}

Input.defaultProps = {
  type: 'text',
  style: { width: '100%' },
  value: '',
  borderLeft: true,
  borderRight: true,
  isPointer: false,
  disabled: false,
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  onRef: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  iconStart: PropTypes.element,
  iconEnd: PropTypes.element,
  index: PropTypes.number,
  required: PropTypes.bool,
  children: PropTypes.element,
  borderLeft: PropTypes.bool,
  borderRight: PropTypes.bool,
  isPointer: PropTypes.bool,
  autoComplete: PropTypes.string
}

export default Input
