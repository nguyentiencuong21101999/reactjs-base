/**
 * Created By Nguyen Cong Thanh on 02/14/2020 17:33.
 *
 * Copyright intelIn 2020.
 */

import React, { useEffect, useState, createRef } from 'react'
import AdapterDateFns from '@material-ui/lab/AdapterMoment';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from 'core/time';
import { TextField, InputAdornment, Typography, Stack } from '@material-ui/core';
import moment from 'moment'

import Validator from 'service/validator'
import Localize from 'service/localize'
import Helper from 'service/helper'

const FromTimeHook = props => {

    const { name, placeholder, value, type, label, disabled, styleFormControl, isRow,valueCheck ,onClick=()=>{} } = props;

    const [ref, setRef] = useState(createRef())
    const [date, setDate] = useState(null)
    const [error, setError] = useState("")

    useEffect(() => {
        const temp = value
        setDate(temp)
    }, [value])

    useEffect(() => {
        setError(props.error)
    }, [props.isHiddenErr])

    useEffect(() => {
        if (ref && ref.current !== null) {
            props.onRef(name, ref)
        }
    }, [ref])


    const onChange = value => {
        try {
            setError('')
            // const temp = value.slice(0, maxLength)       
            setDate(value);
            const temp = !Helper.isEmpty(value) ? moment(value).utc(true).valueOf() : null;
            Validator.isNotEmpty(name, temp, Localize.getLocalize("LC_VALUE_EMPTY"))
            Validator.isNotNaN(name, temp, Localize.getLocalize("LC_VALUE_INVALID"))
            Validator.isCompareTimeStartAndEnd(name,valueCheck,value,Localize.getLocalize("LC_TIME_SLOT_INVALID"))
            props.onChange(name, value,false)
        } catch (e) {
            setError(e.message)
            props.onChange(name, !Helper.isEmpty(value) ? value : "",!Helper.isEmpty(value))
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
        <TimePicker
            // label={placeholder}
            required={props.required}
            value={date}
            onChange={(newValue) => {
                onChange(newValue);
            }}
            onClick={onClick}
            error={error}
            isRow={isRow}
            label={label}
            styleFormControl={styleFormControl}
            disabled={disabled}
            // inputFormat={props.inputFormat}
            maxDate={props.maxDate}

        />
    )

}

export default FromTimeHook
