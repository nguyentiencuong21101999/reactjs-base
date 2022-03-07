import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import Helper from 'service/helper'
import AdapterDateFns from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePicker from '@material-ui/lab/DateRangePicker'; 
import moment from 'moment'
import { TextField, InputAdornment, Typography, Stack, Box } from '@material-ui/core';

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
    value
  } = props

  const [rangeDate, setRangeDate] = React.useState([null, null]);

  useEffect(() => {
    const temp = !Helper.isEmpty(value[0]) ? value[0] : null
    const temp1 = !Helper.isEmpty(value[1]) ? value[1] : null
    setRangeDate([temp, temp1])
  }, [value])
  
  return (
    <Stack direction={isRow ? "row" : "column"} spacing={1} sx={ isRow ? { alignItems: 'center' } : {justifyContent: 'center'} }>
    { label ? <Typography style={{color: '#6b778c'}}>{label}</Typography> : null}
    <LocalizationProvider dateAdapter={AdapterDateFns}>      
      <DateRangePicker
        // startText="Check-in"
        // endText="Check-out"
        value={rangeDate}
        onChange={(newValue) => {
          props.onChange(newValue);
          setRangeDate(newValue)
        }}
        renderInput={(startProps, endProps) => {
          let temp = {...startProps}
          let temp2 = {...endProps}
          delete temp['label']
          delete temp2['label']
          return (
          <React.Fragment>
            <TextField {...temp} />
            <Box sx={{ mx: 2 }}> đến </Box>
            <TextField {...temp2} />
          </React.Fragment>
          )
        }}
      />
    </LocalizationProvider>
    </Stack>
  )

}

Input.defaultProps = {
  disabled: false,
}

Input.propTypes = {
  onChange:PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

export default Input
