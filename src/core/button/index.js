/**
 * Created By Nguyen Cong Thanh on 07/25/2020 11:20.
 *
 * Copyright intelIn 2020.
 */

import React from 'react'
import PropTypes from 'prop-types'
import Styles from './style'

import { CircularProgress } from '@material-ui/core';

const Button = props => {
  const {
    style,
    className,
    type,
    text,
    tabIndex,
    id,
    name,
    onClick,
    disabled,
    loading,
    variant,
    iconStart,
    borderLeft,
    borderRight,
  } = props


  const BUTTON = {
    ['outline-primary']: Styles.outlinePrimary,
    ['outline-secondary']: Styles.outlineSecondary,
    primary: Styles.primary,
    secondary: Styles.secondary,
    light: Styles.light
  }

  const RENDER = BUTTON[variant]

  const detectIcon = () => {
    return iconStart ? <>
      <Styles.icon style={{ marginRight: 10 }}>{iconStart}</Styles.icon>
      {text}
    </> : text
  }
  const styles = disabled ? { color: "rgba(0, 0, 0, 0.26)", backgroundColor: "rgba(0, 0, 0, 0.12", boxShadow: "none" } : {}
  return (
    <RENDER
      style={{ ...styles, ...style }}
      type={type}
      id={id}
      name={name}
      disabled={disabled}
      onClick={onClick}
      className={className}
      tabIndex={tabIndex}
      borderLeft={borderLeft}
      borderRight={borderRight}
      data-test-id={props.testId}
    >
      {loading ? <CircularProgress size={24} /> : detectIcon()}
    </RENDER>
  )
}

Button.defaultProps = {
  variant: 'primary' || 'secondary' || 'light' || 'outline-primary' || 'outline-secondary',
  loading: false,
  disabled: false,
  borderLeft: true,
  borderRight: true
}

Button.propTypes = {
  style: PropTypes.object,
  className: PropTypes.any,
  type: PropTypes.string,
  text: PropTypes.string.isRequired,
  tabIndex: PropTypes.number,
  id: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  variant: PropTypes.string,
  iconStart: PropTypes.any,
  borderLeft: PropTypes.bool,
  borderRight: PropTypes.bool,
}

export default Button
