/**
 * Created By Nguyen Cong Thanh on 02/14/2020 17:33.
 *
 * Copyright intelIn 2020.
 */

import React, { useEffect, useState, createRef } from 'react'
import AdapterDateFns from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from 'core/date';
import { TextField, InputAdornment, Typography, Stack } from '@material-ui/core';
import moment from 'moment'

import Validator from 'service/validator'
import Localize from 'service/localize'
import Helper from 'service/helper'
import HelperService from 'service/helper';

const DOBHook = props => {

  const { name, placeholder, value, type, label, disabled, styleFormControl, heightInput, isRow } = props;

  const [ref, setRef] = useState(createRef())
  const [date, setDate] = useState(null)
  const [error, setError] = useState("")
  useEffect(() => {
    setDate('')
  }, [])

  useEffect(() => {
    setError(props.error)
  }, [props.error])

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
      if (!HelperService.isEmpty(value)) {
        const temp = moment(value).utc(false).valueOf()
        // // if (!HelperService.isEmpty(value)) {
        // //   Validator.isNotNaN(name, temp,"")
        // // }
        if (isNaN(temp)) {
          props.onChange(name, 0)
        } else {
          props.onChange(name, temp)
        }
      } else {
        props.onChange(name, "")
      }


    } catch (e) {
      setError(e.message)
      props.onChange(name, "")
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
      styleFormControl={styleFormControl}
      isRow={isRow}
      label={label}
      required={props.required}
      error={error}
    />
  )

}

export default DOBHook
