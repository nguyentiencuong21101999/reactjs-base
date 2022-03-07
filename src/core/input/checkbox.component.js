/**
 * Created By Nguyen Cong Thanh on 02/28/2020 11:16.
 *
 * Copyright intelIn 2020.
 */

import React, { useState, useEffect } from 'react';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Styles from 'core/_app.scss'

const CheckBoxComponent = props => {

  const {
    value = null,
    checked = false,
    name = null,
    label,
    disabled = false,
    onChange = () => { }
  } = props;

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            color="primary"
          />
        }
        label={label}
        className={Styles['checkbox']}
        disabled={disabled}
      />
    </FormGroup>
  );
}

export default CheckBoxComponent