/**
 * Created By Nguyen Cong Thanh on 02/17/2020 15:17.
 *
 * Copyright intelIn 2020.
 */

import React, { Component } from 'react';
import moment from 'moment'
import Cleave from 'cleave.js/react';
import Lightpick from 'assets/js/datepicker/lightpick.js'
import 'assets/js/datepicker/css/lightpick.css'
import Styles from 'core/_app.scss'
import Logger from "service/logger";
import HelperService from "service/helper";

class DateRangePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            now: new Date().getTime(),
            valueInput: null,
        }

        this.picker = null

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnBlur = this.handleOnBlur.bind(this)
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.value !== nextProps.value) {
            this.setState({ valueInput: `${HelperService.getDate(nextProps.value.start.utc(true).valueOf())} - ${HelperService.getDate(nextProps.value.end.utc(true).valueOf())}` })
        }
    }

    handleOnChange(start, end) {
        try{let range = {
            start: start.utc(true).valueOf(),
            end: end.utc(true).valueOf()
        }
        this.props.onChange(range)
        this.setState({ valueInput: `${HelperService.getDate(start.utc(true).valueOf())} - ${HelperService.getDate(end.utc(true).valueOf())}` })
        }catch(e){
            Logger.error(`DateRangePicker execute handleOnChange ${e.toString()}`)
        }
    }

    componentDidMount() {
        try {
            const { now } = this.state;
            const { minDate, maxDate = new Date(), lang, value, onChange, id = `InputRangeDate_${now}` } = this.props
            this.picker = new Lightpick({
                field: document.getElementById(id),
                singleDate: false,
                numberOfMonths:2,
                dropdowns: {
                    years: {
                        min: new Date(minDate).getFullYear(),
                        max: new Date(maxDate).getFullYear(),
                    },
                    months: true
                },
                minDate: minDate,
                maxDate: maxDate,
                lang: lang,
                onSelect: (start, end) => {
                    if (start && end) {
                        this.handleOnChange(start,end)
                    } else {
                        onChange(null)
                        this.setState({ valueInput: null })
                    }
                },
                onOpen: () => {
                    setTimeout(() => {
                        const input = document.getElementById(id)
                        input.focus()
                    }, 0)
                }
            });
            if (value && value.start && value.end) {
                const start = moment(value.start)
                const end = moment(value.end)
                this.picker.setDateRange(start.utc(true).valueOf(), end.utc(true).valueOf())
                this.handleOnChange(start, end)
            }
        } catch (e) {
            Logger.error(`DateRangePicker ${e.toString()}`)
        }
    }

    handleOnBlur(event) {
        // const date = moment(event.target.value, 'DD/MM/YYYY', true).local()
        // if (date.isValid())
        //     this.picker.setDate(HelperService.getDate(date.valueOf()))
        // else {
        //     this.picker.setDate(null)
        // }
    }


    render() {
        const { now, valueInput } = this.state
        const {
            type = 'text',
            styleFormControl = { width: '100%' },
            classFormControl,
            id = `InputRangeDate_${now}`,
            label = `InputRangeDate_${now}`,
            name = `InputRangeDate_${now}`,
            placeholder,
            error = "",
            disabled,
            onRef = () => {
            },
            iconEnd,
            helperText,
        } = this.props

        const option = {
            delimiters: ['/', '/', ' - ', '/', '/'],
            blocks:[2, 2, 4, 2, 2, 4],
            uppercase: true
        }

        const classField = [Styles['field'], classFormControl].join(' ')
        const classInput = [Styles['input-base'], disabled ? Styles['disabled'] : null, error ? Styles['input-error'] : null].join(' ')
        return (
            <div className={classField} style={styleFormControl}>
                <label htmlFor={id} className={Styles['field-label']}>{label}</label>
                <div className={classInput}>
                    <Cleave
                        type={type}
                        id={id}
                        onBlur={this.handleOnBlur}
                        options={option}
                        value={valueInput}
                        disabled={disabled}
                        placeholder={placeholder}
                        ref={onRef}
                        name={name}
                        autoComplete='off'
                    />
                    {
                        iconEnd ? (
                            <div className={Styles['adorment']} onClick={event => { event.preventDefault(); this.picker.show() }}>
                                {iconEnd}
                            </div>
                        ) : null
                    }
                </div>
                {helperText ? <p className={Styles['helper-text']}>{helperText}</p> : null}
                <p className={Styles['field-error']}>{error}</p>
            </div>
        )
    }

}

export default DateRangePicker