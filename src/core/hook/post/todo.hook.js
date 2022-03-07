 import React, { useEffect, useState, createRef } from 'react'
 import SearchIcon from '@material-ui/icons/Search';
 import Validator from 'service/validator'
 import Localize from 'service/localize'
 import Helper from 'service/helper'
 import Input from 'core/input'
 
 const TodoHook = props => {
 
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
       Validator.isNotEmpty(name, temp, Localize.getLocalize('LC_TODO_LIST_EMPTY'))
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
        maxLength={100}
    />
   )
 
 }
 
 export default TodoHook
 