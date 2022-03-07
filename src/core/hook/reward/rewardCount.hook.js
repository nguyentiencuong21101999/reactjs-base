/**
 * Created By Nguyen Cong Thanh on 07/27/2020 10:53.
 *
 * Copyright intelIn 2020.
 */

 import React, { useEffect, useState, createRef, Fragment } from 'react';

 import Radio from 'core/radio'
 import Helper from 'service/helper'
 
 const RewardCountHook = props => {
 
   const { label, name, placeholder, disabled, list, defaultValue, row } = props;
 
   const [ref, setRef] = useState(createRef())
   const [status, setStatus] = useState(defaultValue)
   const [error, setError] = useState(props.error)
 
   useEffect(() => {
     setStatus(defaultValue)
   }, [defaultValue])
 
   useEffect(() => {
     setError(props.error)
   }, [props.error])
 
   useEffect(() => {
     if (ref && ref.current !== null) {
       props.onRef(name, ref)
     }
   }, [ref])
 
   const onChange = (e, value) => {
     try {
       setError('')
       setStatus(value)
       const temp = Number(value)
       props.onChange(name, temp)
     } catch (e) {
       setError(e.message)
       props.onChange(name, "")
     }
   }
 
   const onRef = (name, element) => {
     try {
       if (element) {
         setRef(element)
       }
     } catch (e) {
 
     }
   }
 
   return (
     <Fragment>
       <Radio
         label={label}
         name={name}
         error={error}
         list={list}
         defaultValue={status}
         onRef={onRef}
         onChange={onChange}
         disabled={disabled}
         row={row}
         testItems={props.testItems}
         required={props.required}
         styleFromControl={props.styleFromControl}
         styleRadio={props.styleRadio}
         styleChild={props.styleChild}
       />
     </Fragment>
 
 
   )
 
 }
 
 export default RewardCountHook
 