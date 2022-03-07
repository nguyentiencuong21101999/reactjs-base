/**
 * Created By Nguyen Cong Thanh on 07/30/2020 10:38.
 *
 * Copyright intelIn 2020.
 */

import React from 'react';
import PropTypes from 'prop-types'
import Styles from './style'
import {svg_checkbox} from "core/icon";

const CheckBox = props => {

  const {
    status,
    name,
    label,
    disabled,
    onChange,
    error,
  } = props;

  const [state, setState] = React.useState(false);

  React.useEffect(()=>{
      setState(status)
  },[status])

  const handleChange = (event) => {
    setState(event.target.checked);
    onChange(name, event.target.checked)
  };

  return (
      <>
          <Styles.container disabled={disabled} data-test-id={props.testId}>{label}
              <Styles.input type="checkbox" checked={state} onChange={handleChange} disabled={disabled}/>
              <Styles.checkmark checked={state} error={error}>{state ? svg_checkbox : null}</Styles.checkmark>
          </Styles.container>
      </>
  );
}

CheckBox.defaultProps = {
    label: 'checkbox'
}

CheckBox.prototype = {
    status: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    error: PropTypes.bool
}

export default CheckBox
