/**
 * Created By Nguyen Cong Thanh on 02/14/2020 17:33.
 *
 * Copyright intelIn 2020.
 */

import React, { useEffect, useState, createRef } from 'react'
import { TextField, InputAdornment, Typography, Stack } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Validator from 'service/validator'
import Localize from 'service/localize'
import Helper from 'service/helper'
import CkEditor from 'core/ckEditor'

const ContentHook = props => {

  const { isContentUpdate, isDefaultBtn, name, placeholder, value, type, label, disabled, styleFormControl, isRow, minRows, maxRows } = props;
  const [ref, setRef] = useState(createRef())
  const [password, setPassword] = useState('')
  const [error, setError] = useState("")
  useEffect(() => {
    setPassword(value)
  }, [value])

  useEffect(() => {
    setError(props.error)
  }, [props.error])

  useEffect(() => {
    if (ref && ref.current !== null) {
      props.onRef(name, ref)
    }
  }, [ref])


  const onChange = data => {
    try {

      const value = data
      setError('')
      // const temp = value.slice(0, maxLength)
      const temp = value
      setPassword(temp)
      Validator.isNotEmpty(name, temp, Localize.getLocalize("LC_CONTENT_EMPTY"))
      props.onChange(name, temp)
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
    <CkEditor
      name={name}
      value={password}
      error={error}
      onChange={onChange}
      onRef={onRef}
      fullWidth={props.fullWidth}
      placeholder={placeholder}
      id={props.id}
      disabled={disabled}
      styleFormControl={styleFormControl}
      isRow={isRow}
      label={label}
      minRows={minRows}
      maxRows={maxRows}
      required={props.required}
    />
  )

}

export default ContentHook
