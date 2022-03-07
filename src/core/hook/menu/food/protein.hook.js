import React, { useEffect, useState, createRef } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import Validator from 'service/validator'
import Localize from 'service/localize'
import Helper from 'service/helper'
import Input from 'core/input/cleave'

const TitleHook = props => {

  const { name, placeholder, value, type, label, disabled, styleFormControl, isRow } = props;

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


  const onChange = val => {
    try {

      setError("");
      setPassword(val.value);
      if (!Helper.isEmpty(val.floatValue)) {
        Validator.isValueNutritionFood(name, val.floatValue, Localize.getLocalize("LC_VALUE_INVALID"))
      }
      props.onChange(name, val.floatValue, false)
    } catch (e) {
      setError(e.message)
      props.onChange(name, "", true)
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
    <Input
      InputProps={{
        style: { height: `${props.heightInput}` },
      }}
      type={type}
      name={name}
      id={`${name}#${new Date().getTime()}`}
      value={password}
      error={error}
      onChange={onChange}
      onRef={onRef}
      label={label}
      variant={props.variant}
      margin={props.margin}
      required={props.required}
      fullWidth={props.fullWidth}
      id={props.id}
      placeholder={placeholder}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      disabled={disabled}
      styleFormControl={styleFormControl}
      isRow={isRow}
    />
  )

}

export default TitleHook
