/**
 * Created By Nguyen Cong Thanh on 04/14/2020 16:50.
 *
 * Copyright intelIn 2020.
 */

 import React, { Fragment, useState, createRef, useEffect } from 'react'
 import Textarea from "core/textarea";
 import Validator from 'service/validator'
 import Localize from "service/localize";
 const ReasonHook = props => {
 
     const { styleStack,style, styleFormControl,required, services, id, label, name, placeholder, value, disabled, index } = props
 
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
             const temp = value
                
             setPhone(temp)
             props.onChange(name, temp)
         } catch (e) {
             setError(e.message)
             props.onChange(name, "")
         }
     }
 
     return (
         <Textarea
             style={style}
             styleFormControl={styleFormControl}
             id={id}
             label={label}
             name={name}
             placeholder={placeholder}
             onRef={ref}
             value={phone}
             error={error}
             maxLength={200}
             disabled={disabled}
             onChange={onChange}
             index={index}
             testId={props.testId}
             testMessageId={props.testMessageId}
             fullWidth={props.fullWidth}
             required={required}
             styleStack={styleStack}
         />
     )
 
 }
 
 export default ReasonHook