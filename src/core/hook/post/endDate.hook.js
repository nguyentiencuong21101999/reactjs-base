import React, { useEffect, useState, createRef } from 'react'
import { TextField, InputAdornment, Typography, Stack } from '@material-ui/core';
import moment from 'moment'

import Validator from 'service/validator'
import Localize from 'service/localize'
import Helper from 'service/helper'

import DatePicker from 'core/date'

const EndDateHook = props => {

  const { name, placeholder, value, type, label, disabled, styleFormControl, isRow, isHiddenErr } = props;

  const [ref, setRef] = useState(createRef())
  const [date, setDate] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const temp = value
    setDate(temp)
  }, [value])

  useEffect(() => {
    setError(props.error)
  }, [isHiddenErr])

  useEffect(() => {
    if (ref && ref.current !== null) {
      props.onRef(name, ref)
    }
  }, [ref])


  const onChange = value => {
    try {
      setError('')
      // const temp = value.slice(0, maxLength)       
      setDate(value);
      const temp = !Helper.isEmpty(value) ? moment(value).utc(true).valueOf() : null
      Validator.isNotEmpty(name, temp, Localize.getLocalize("LC_TIME_EMPTY"))
      Validator.isNotNaN(name, temp, Localize.getLocalize("LC_TIME_INVALID"))
      Validator.isCompareDateStartAndEnd(name,props.minDate,new Date(value),Localize.getLocalize("LC_TIME_INVALID"))
      props.onChange(name, temp, false)
    } catch (e) {

      setError(e.message)
      props.onChange(name, "", !Helper.isEmpty(value))
    }
  }

  const onRef = (element) => {
    try {
      if (element) {
        setRef(element)
      }
    } catch (e) {

    }
  }

  return (
    <DatePicker
      // label={placeholder}
      value={date}
      onChange={(newValue) => {
        onChange(newValue);
      }}
      disabled={disabled}
      isRow={isRow}
      label={label}
      required={props.required}
      minDate={props.minDate}
      maxDate={props.maxDate}
      error={error}
    />
  )

}

export default EndDateHook
