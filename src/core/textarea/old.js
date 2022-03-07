/**
 * Created By Nguyen Cong Thanh on 02/17/2020 13:52.
 *
 * Copyright intelIn 2020.
 */

import React from "react";
import Styles from '../input/style'

import styled from '@emotion/styled'
import FONT from "core/font";
import {GENERAL, PRIMARY, SECONDARY} from "core/color";
const Input = styled.textarea`
        width: 100%;
        padding: 15px;
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

const Textarea = props => {
  const {
    id,
    label,
    error,
    disabled,
    cols,
    rows = 4,
    onChange = () => { },
    onFocus = () => { },
    onBlur = () => { },
    maxLength,
    onRef,
    name,
    value,
    placeholder,
    required,
    style,
  } = props

  return (
      <Styles.fill style={style}>
        <Styles.label htmlFor={id}>{label}{required ? <Styles.sub>*</Styles.sub> : null}</Styles.label>
        <Styles.container>
          <Input
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              disabled={disabled}
              maxLength={maxLength}
              ref={onRef}
              name={name}
              id={id}
              error={error}
              rows={rows} cols={cols}
              data-test-id={props.testId}
          />
          {props.children}
        </Styles.container>
        <Styles.error data-test-id={props.testMessageId}>{error}</Styles.error>
      </Styles.fill>
    // <div className={[Styles['field'], classFormControl].join(' ')} style={styleFormControl}>
    //   <label htmlFor={id}>{label}</label>
    //   <div className={[Styles['input-base'], Styles['textarea'], disabled ? Styles['disabled'] : null, error ? Styles['input-error'] : null].join(' ')}>
    //     <textarea rows={rows} cols={cols}
    //       onChange={onChange}
    //       onFocus={onFocus}
    //       onBlur={onBlur}
    //       disabled={disabled}
    //       maxLength={maxLength}
    //       ref={onRef}
    //       name={name}
    //       id={id}
    //       placeholder={placeholder}
    //       value={value}>
    //     </textarea>
    //   </div>
    //   {helperText ? <p className={Styles['helper-text']}>{helperText}</p> : null}
    //   <p className={Styles['field-error']}>{error}</p>
    // </div>
  )
}

export default Textarea
