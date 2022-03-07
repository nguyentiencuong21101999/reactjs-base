/**
 * Created By Nguyen Cong Thanh on 19/11/2019 13:36.
 *
 * Copyright intelIn 2019.
 */

import React, { useEffect, useState } from 'react'

import Localize from 'service/localize'
import Validator from 'service/validator'

import InputComponent from 'core/input'

const UsernameHook = props => {

  const { } = props

  const [name, setName] = useState('username')
  const [ref, setRef] = useState(React.createRef())
  const [username, setUsername] = useState('')
  const [errorKey, setErrorKey] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (errorKey) {
      setError(Localize.getLocalize(errorKey))
    }
  }, [Localize.langCurrent])

  useEffect(() => {
    if (ref && ref.current !== null) {
      props.onRef(name, ref)
    }
  }, [ref])

  useEffect(() => {
    setName(props.name)
  }, [props.name])

  useEffect(() => {
    setUsername(props.value)
  }, [props.value])

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
      setErrorKey('')
      setUsername(temp)
      Validator.isNotEmpty(name, temp, 'LYT_EMPTY_USERNAME_ERROR')
      Validator.isAccount(name, temp, 'LYT_INVALID_USERNAME_ERROR')
      props.onChange(name, temp)
    } catch (e) {
      setErrorKey(e.message)
      setError(Localize.getLocalize(e.message))
      props.onChange(name, "")
    }
  }

  return (
    <InputComponent
      style={props.style}
      type={"text"}
      label={props.label}
      name={name}
      value={username}
      error={error}
      maxLength={50}
      disabled={props.disabled}
      onRef={onRef}
      onChange={onChange}
      placeholder={props.placeholder}
      required={props.required}
      testId={props.testId}
      testMessageId={props.testMessageId}
    />
  )

}

export default UsernameHook
