/**
 * Created By Nguyen Cong Thanh on 02/14/2020 17:33.
 *
 * Copyright intelIn 2020.
 */

import React, { useEffect, useState, createRef } from 'react'

import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import InputComponent from 'core/input'
import Validator from 'service/validator'
import Localize from 'service/localize'
import Logger from 'service/logger'

const PasswordHook = props => {

  const { name, placeholder, value, iconStart, iconEnd, type } = props;

  const [ref, setRef] = useState(createRef())
  const [password, setPassword] = useState('')
  const [error, setError] = useState(props.error)

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


  const onChange = event => {
    try {
      const { value, maxLength } = event.target
      setError('')
      const temp = value.slice(0, maxLength)
      setPassword(temp)
      Validator.isNotEmpty(name, temp, Localize.getLocalize('LYT_EMPTY_PASSWORD_ERROR'))
      Validator.isPasswordAccount(name, temp, Localize.getLocalize('LYT_INVALID_PASSWORD_ERROR'))
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
    <InputComponent
      style={props.style}
      type={type}
      label={props.label}
      name={name}
      value={password}
      error={error}
      maxLength={100}
      disabled={props.disabled}
      onRef={onRef}
      onChange={onChange}
      iconStart={iconStart}
      iconEnd={iconEnd}
      placeholder={placeholder}
      required={props.required}
      testId={props.testId}
      testMessageId={props.testMessageId}
    />
  )

}

export default PasswordHook
