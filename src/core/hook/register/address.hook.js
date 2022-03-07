/**
 * Created By Nguyen Cong Thanh on 02/28/2020 14:29.
 *
 * Copyright intelIn 2020.
 */

import React, { useEffect, useState, useRef, createRef } from 'react'

import InputComponent from 'core/input'
import Validator from 'service/validator'
import Localize from "service/localize";

const AddressHook = props => {

    const { style, id, label, name, placeholder, value, disabled } = props

    const [ref, setRef] = useState(createRef())
    const [fullName, setFullName] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setFullName(value)
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
            let { value } = event.target
            setError('')
            setFullName(value)
            value = value.trim()
            if(value){
                Validator.isNotEmpty(name, value, Localize.getLocalize('LYT_EMPTY_MERCHANT_NAME_ERROR'))
                Validator.isCardLocationDescription(name, value, Localize.getLocalize('LYT_INVALID_ADRESS_ERROR'))
            }
            props.onChange(name, value)
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
            value={fullName}
            error={error}
            maxLength={80}
            disabled={disabled}
            onChange={onChange}
            required={props.required}
            testId={props.testId}
            testMessageId={props.testMessageId}
        />
    )

}

export default AddressHook
