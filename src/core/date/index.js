import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import Helper from 'service/helper'
import AdapterDateFns from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import moment from 'moment'
import { TextField, InputAdornment, Typography, Stack } from '@material-ui/core';
import styled from '@emotion/styled'

const CustomTypography = styled(Typography)`
  position: relative;
  width: fit-content;
  &::before{
    content: '*';
    position: absolute;
    color:${props => props.colors};
    top: 0;
    right: -8px;
    font-size: 12px;
    display: ${props => props.required ? 'block' : 'none'}
  }
`

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
    onClick
  } = props
  const [date, setDate] = React.useState(null)

  useEffect(() => {
    const temp = !Helper.isEmpty(value) ? value : null
    setDate(temp)
  }, [value])

  const styles = !Helper.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f' } : { fontSize: '1rem', color: '#6b778c' }
  const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
  return (
    <Stack direction={isRow ? "row" : "column"} spacing={1} sx={isRow ? { alignItems: 'flex-start+' } : { justifyContent: 'flex-start' }}>
      {label ? <CustomTypography colors={colors} required={props.required} style={styles}>{label}</CustomTypography> : null}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          // label={placeholder}
          value={date}
          onChange={(newValue) => {
            props.onChange(newValue)
            setDate(newValue)
          }}
          renderInput={(params) => {
            let tempParams = { ...params }
            return <TextField
              {...tempParams}
              error={!Helper.isEmpty(props.error) ? true : false}
              helperText={!Helper.isEmpty(props.error) ? props.error : ''}
              onClick={onClick}
            />
          }}
          disabled={disabled}
          errorText={props.error}
          minDate={props.minDate ? moment(props.minDate) : null}
          maxDate={props.maxDate ? moment(props.maxDate) : null}
          inputFormat={props.inputFormat ? props.inputFormat : 'DD-MM-YYYY'}
        />
      </LocalizationProvider>
    </Stack>
  )

}

Input.defaultProps = {
  disabled: false,
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default Input
