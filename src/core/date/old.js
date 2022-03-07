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
import Logger from "service/logger";
import HelperService from "service/helper";
import Styles from '../input/style'
import styled from '@emotion/styled'
import FONT from "core/font";
import {GENERAL, PRIMARY, SECONDARY} from "core/color";
import Localize from "service/localize";

const Input = styled(Cleave)`
  width: 100%;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: ${props => `${props.paddingleft}px`};
        padding-right: ${props => `${props.paddingright}px`};
        border: 1px solid ${props => props.error ? SECONDARY.DE1715 : GENERAL.GRAY1};
        background: ${GENERAL.WHITE};
        box-sizing: border-box;
        font-size: 16px;
        letter-spacing: 0.32px;
        color: ${GENERAL.BLACK};
        font-family: ${FONT.MEDIUM};
        border-radius: 8px;
        transition: all 0.25s ease-in-out;
        &:focus {
          outline: 0;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          border-color: ${PRIMARY["D1CFFF"]};
        }
        &:disabled{
          color: ${GENERAL.GRAY};
          cursor: no-drop;
          background-color: ${GENERAL.GRAY1};
        }
        &::placeholder,
        &::-webkit-input-placeholder {
          color: ${GENERAL.GRAY};
          font-family: ${FONT.REGULAR};
        }
        &:-ms-input-placeholder {
          color: ${GENERAL.GRAY};
          font-family: ${FONT.REGULAR};
        }
`

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      now: new Date().getTime(),
      valueInput: null,
      errorMessage: "",
      dateValue: {
        min: null,
        max: null,
      }
    }

    this.picker = null

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.value !== nextProps.value) {
      this.setState({ valueInput: HelperService.getDate(nextProps.value) })
    }
  }

  componentDidMount() {
    try {
      const { now, errorMessage, dateValue } = this.state;
      const { minDate, maxDate = new Date(), lang, value, onChange, id = `InputDate_${now}`, error = "" } = this.props
      dateValue.min = minDate
      dateValue.max = maxDate

      this.picker = new Lightpick({
        field: document.getElementById(id),
        singleDate: true,
        dropdowns: {
          years: {
            min: new Date(dateValue.min).getFullYear(),
            max: new Date(maxDate).getFullYear(),
          },
          months: true
        },
        minDate: dateValue.min,
        maxDate: dateValue.max,
        lang: lang,
        onSelect: (date) => {
          if (date) {
            onChange(date.utc(true).valueOf())
            this.setState({ valueInput: HelperService.getDate(date.utc(true).valueOf()) })
            this.setState({ errorMessage: ""  })
          } else {
            onChange(null)
            this.setState({ valueInput: '' })
          }
        },
        onOpen: () => {
          setTimeout(() => {
            const input = document.getElementById(id)
            input.focus()
          }, 0)
        }
      });
      this.setState({ errorMessage: error  })
      if (value) {
        const date = moment(value)
        this.picker.setDate(date.utc(true).valueOf())
        onChange(date.utc(true).valueOf())
        this.setState({ valueInput: HelperService.getDate(date.utc(true).valueOf()) })
      }
    } catch (e) {
      Logger.error(`DatePicker ${e.toString()}`)
    }
  }

  handleOnChange(event) {
    const date = moment(event.target.value, 'DD/MM/YYYY', true).local()
    const now = new Date()
    const {dateValue} = this.state

    if (date.isValid())
    {
      this.picker.setDate(HelperService.getDate(date.valueOf()))
      if(( dateValue.max && date.valueOf() > dateValue.max.getTime() ) || ( dateValue.min && date.valueOf() < dateValue.min.getTime() ) ){
        this.setState({ errorMessage: Localize.getLocalize('LYT_DATE_INVALID_ERROR_2') })
        this.picker.setDate(null)
        this.props.onChange(null)
        return
      }
      this.setState({ errorMessage: ""  })
    }
    else{
      this.setState({ errorMessage: Localize.getLocalize('LYT_DATE_EMPTY_ERROR') })
      this.picker.setDate(null)
      this.props.onChange(null)
    }
   }

  handleOnBlur(event) {
  }


  render() {
    const { now, valueInput, errorMessage } = this.state
    const {
      type = 'text',
      id = `InputDate_${now}`,
      label = `InputDate_${now}`,
      name = `InputDate_${now}`,
      placeholder,
      disabled,
      onRef=(name,ref)=>{},
      iconEnd,
      readOnly,
      style,
      iconStart,
      index,
      required,
      styleInput,
    } = this.props

    const option = {
      date: true,
      delimiter: '/',
      datePattern: ['d', 'm', 'Y']
    }

    return (

        <Styles.fill style={style}>
          <Styles.label htmlFor={id}>{label}{required ? <Styles.sub>*</Styles.sub> : null}</Styles.label>
          <Styles.container>
            {
              iconStart ? (
                  <Styles.iconStart>
                    {iconStart}
                  </Styles.iconStart>
              ) : null
            }
            <Input
                type={type}
                id={id}
                onChange={this.handleOnChange}
                onBlur={this.handleOnBlur}
                options={option}
                value={valueInput}
                disabled={disabled}
                placeholder={placeholder}
                ref={(input)=>onRef(name, input)}
                name={name}
                readOnly={readOnly}
                index={index}
                paddingright={iconEnd ? 60 : 15}
                paddingleft={iconStart ? 60 : 15}
                error={errorMessage}
                autoComplete='off'
                data-test-id={this.props.testId}
                style={styleInput}
            />
            {
              iconEnd ? (
                  <Styles.iconEnd>
                    {iconEnd}
                  </Styles.iconEnd>
              ) : null
            }
            {this.props.children}
          </Styles.container>
          <Styles.error data-test-id={this.props.testMessageId}>{errorMessage}</Styles.error>
        </Styles.fill>

      // <div className={classField} style={styleFormControl}>
      //   <label htmlFor={id} className={Styles['field-label']}>{label}</label>
      //   <div className={classInput}>
      //     <Cleave
      //       type={type}
      //       id={id}
      //       onChange={this.handleOnChange}
      //       onBlur={this.handleOnBlur}
      //       options={option}
      //       value={valueInput}
      //       disabled={disabled}
      //       placeholder={placeholder}
      //       ref={onRef}
      //       name={name}
      //       autoComplete='off'
      //       readOnly={readOnly}
      //     />
      //     {
      //       iconEnd ? (
      //         <div className={Styles['adorment']} onClick={event => { event.preventDefault(); this.picker.show() }}>
      //           {iconEnd}
      //         </div>
      //       ) : null
      //     }
      //   </div>
      //   {helperText ? <p className={Styles['helper-text']}>{helperText}</p> : null}
      //   <p className={Styles['field-error']}>{errorMessage}</p>
      // </div>
    )
  }

}

export default DatePicker
