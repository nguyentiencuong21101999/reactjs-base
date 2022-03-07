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

 const EmailNameHook = props => {
 
   const { name, placeholder, value, type, label, disabled, styleFormControl, isRow} = props;
 
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
 
 
   const onChange = event => {
     try {
       const { value, maxLength } = event.target
       setError('')
       // const temp = value.slice(0, maxLength)
       const temp = value
       setPassword(temp)
       // Validator.isNotEmpty(name, temp, Localize.getLocalize('LYT_EMPTY_PASSWORD_ERROR'))
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
     <Stack direction={isRow ? "row" : "column"} spacing={1} sx={ isRow ? { alignItems: 'center' } : null }>
      { label ? <Typography style={{fontSize: '1rem', color: '#6b778c'}}>{label}</Typography> : null}
      <TextField
          InputProps={{
              style:{height: `${props.heightInput}`}
          }}
          type={type}
          name={name}
          value={password}
          error={!Helper.isEmpty(error) ? true : false }
          onChange={onChange}
          onRef={onRef}
          // label={placeholder}
          variant={props.variant || "outlined"}
          margin={props.margin || "normal"}
          required={props.required}
          fullWidth={props.fullWidth}
          id={props.id}
          placeholder={placeholder}
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          disabled={disabled}
          helperText={error}
          sx={styleFormControl}
      />
    </Stack>
   )
 
 }
 
 export default EmailNameHook
 