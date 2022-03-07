/**
 * Created By Nguyen Cong Thanh on 19/11/2019 13:36.
 *
 * Copyright intelIn 2019.
 */

import React, { useEffect, useState } from 'react'
import { TextField, Stack, Typography } from '@material-ui/core'
import Localize from 'service/localize'
import Validator from 'service/validator'
import Helper from 'service/helper'
import Input from 'core/input'


const UsernameHook = props => {
  const { name, placeholder, value, type, label, disabled, isRow, styleLabel, required } = props;
  const [ref, setRef] = useState(React.createRef())
  const [username, setUsername] = useState('')
  const [error, setError] = useState("")

  useEffect(() => {
    if (ref && ref.current !== null) {
      props.onRef(name, ref)
    }
  }, [ref])

  useEffect(() => {
    setUsername(value)
  }, [value])

  useEffect(() => {
    setError(props.error)
  }, [props.error])

  const onRef = (element) => {
    try {
      if (element) {
        setRef(element)
      }
    } catch (e) {

    }
  }

  const onChange = event => {
    try {
      const { value, maxLength } = event.target
      const temp = value.slice(0, maxLength)
      setError('')
      setUsername(temp)
      Validator.isNotEmpty(name, temp, Localize.getLocalize('LC_USERNAME_EMPTY'))
      props.onChange(name, temp)
    } catch (e) {
      setError(e.message)
      props.onChange(name, "")
    }
  }


  return (
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      value={username}
      error={error}
      onChange={onChange}
      onRef={onRef}
      label={label}
      variant={props.variant || "outlined"}
      margin={props.margin || "normal"}
      required={props.required}
      fullWidth={props.fullWidth}
      id={props.id}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      disabled={disabled}
      helperText={error}
      styleFormControl={props.styleFormControl}
      isRow={isRow}
      maxLength={50}
      styleLabel={styleLabel}
      InputProps={{
        style: { height: `${props.heightInput}` },
      }}
    />
  )

}

export default UsernameHook
