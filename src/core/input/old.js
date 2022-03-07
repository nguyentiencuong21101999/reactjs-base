/**
 * Created By Nguyen Cong Thanh on 02/28/2020 14:34.
 *
 * Copyright intelIn 2020.
 */

import React  from 'react';
import PropTypes from 'prop-types'
import Styles from './style'
const Input = props => {
  const {
    type,
    style,
    id,
    label,
    name,
    placeholder,
    value,
    error,
    maxLength,
    disabled,
    onRef,
    onChange,
    onFocus,
    onBlur,
    iconStart,
    iconEnd,
    index,
    required,
    borderLeft,
    borderRight,
    testId,
    testMessageId,
    isPointer,
    autoComplete
  } = props

  return (
    <Styles.fill style={style}>
      <Styles.label htmlFor={id}>{label}{required ? <Styles.sub>*</Styles.sub> : null}</Styles.label>
      <Styles.container>
        {
          iconStart ? (
            <Styles.iconStart borderLeft={borderLeft}>
              {iconStart}
            </Styles.iconStart>
          ) : null
        }
        <Styles.input
          type={type}
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
          index={index}
          paddingRight={iconEnd ? 45 : 15}
          paddingLeft={iconStart ? 45 : 15}
          error={error}
          borderLeft={borderLeft}
          borderRight={borderRight}
          data-test-id={testId}
          style={isPointer ? {cursor: "pointer"} : null}
          autoComplete={autoComplete}
        />
        {
          iconEnd ? (
            <Styles.iconEnd borderRight={borderRight}>
              {iconEnd}
            </Styles.iconEnd>
          ) : null
        }
        {props.children}
      </Styles.container>
      <Styles.error data-test-id={testMessageId}>{error}</Styles.error>
    </Styles.fill>
  )

}

Input.defaultProps = {
  type: 'text',
  style: {width: '100%'},
  value: '',
  borderLeft: true,
  borderRight: true,
  isPointer: false,
}

Input.propTypes = {
  onChange:PropTypes.func.isRequired,
  type:PropTypes.string,
  style: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  onRef: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  iconStart: PropTypes.element,
  iconEnd: PropTypes.element,
  index: PropTypes.number,
  required: PropTypes.bool,
  children: PropTypes.element,
  borderLeft: PropTypes.bool,
  borderRight: PropTypes.bool,
  isPointer: PropTypes.bool,
  autoComplete: PropTypes.string
}

export default Input
