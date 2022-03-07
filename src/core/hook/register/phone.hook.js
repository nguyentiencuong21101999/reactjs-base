/**
 * Created By Nguyen Cong Thanh on 02/28/2020 16:32.
 *
 * Copyright intelIn 2020.
 */

import React, { useEffect, useState, createRef } from 'react'

import InputComponent from 'core/input'
import Validator from 'service/validator'
import Localize from "service/localize";

const PhoneHook = props => {

  const { style, id, label, name, placeholder, value, disabled } = props

  const [ref, setRef] = useState(createRef())
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setPhone(value)
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
      setPhone(temp)
      if(temp){
        Validator.isNotEmpty(name, temp, Localize.getLocalize('LYT_PHONE_NO_TITLE_EMPTY_ERROR'))
        Validator.isString(name, temp, Localize.getLocalize('LYT_PHONE_NO_TITLE_INVALID_ERROR'))
        Validator.isPhoneNumber(name, temp, Localize.getLocalize('LYT_PHONE_NO_TITLE_INVALID_ERROR'))
      }
      props.onChange(name, temp)
    } catch (e) {
      setError(e.message)
      props.onChange(name, "")
    }
  }

  return (
    <InputComponent
      style={style}
      id={id}
      label={label}
      name={name}
      placeholder={placeholder}
      onRef={ref}
      value={phone}
      error={error}
      maxLength={12}
      disabled={disabled}
      onChange={onChange}
      required={props.required}
      testId={props.testId}
      testMessageId={props.testMessageId}
    />
  )

}

export default PhoneHook
