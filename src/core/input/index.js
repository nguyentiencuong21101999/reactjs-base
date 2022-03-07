import React from 'react';
import PropTypes from 'prop-types'
import Styles from './style'
import Helper from 'service/helper'
import styled from '@emotion/styled'

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
    display: ${props => props.required ? 'block' : 'none'}
  }
`
import { TextField, InputAdornment, Typography, Stack } from '@material-ui/core';

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
    className = "",
    styleLabel = {},
    styleStack = {}
  } = props

  const styles = !Helper.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f' } : { fontSize: '1rem', color: '#6b778c' }
  const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
  return (
    <Stack style={{ ...styleStack }} direction={isRow ? "row" : "column"} spacing={1} sx={isRow ? { alignItems: 'center' } : null, props.fullWidth ? { width: '100%' } : null}>
      {label ? <CustomTypography colors={colors} required={props.required} style={{ ...styles, ...styleLabel }}>{label}</CustomTypography> : null}
      <TextField
        InputProps={props.InputProps}
        inputProps={{
          maxLength: props.maxLength,
          className: className
        }}
        type={type}
        name={name}
        value={value}
        error={!Helper.isEmpty(error) ? true : false}
        onChange={onChange}
        inputRef={onRef}
        // label={placeholder}
        variant={props.variant || "outlined"}
        margin={props.margin || "normal"}
        required={props.required}
        fullWidth={props.fullWidth}
        id={props.id}
        placeholder={placeholder}
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        disabled={disabled}
        helperText={error}
        sx={styleFormControl}
      />
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
