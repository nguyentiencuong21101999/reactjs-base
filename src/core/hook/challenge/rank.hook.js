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
 import Input from 'core/input'
 
 const RankHook = props => {
 
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
       const temp = value.slice(0, maxLength)
       
       setPassword(temp)
       Validator.isNotEmpty(name, temp, Localize.getLocalize('LC_VALUE_EMPTY'))
       Validator.isValueRank(name, temp, Localize.getLocalize('LC_VALUE_INVALID'))
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
     <Input
       type={type}
       name={name}
       placeholder={placeholder}
       value={password}
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
       InputProps={{
         style: { height: `${props.heightInput}` },
       }}
       id={`${name}#${new Date().getTime()}`}
     />
   )
 
 }
 
 export default RankHook
 