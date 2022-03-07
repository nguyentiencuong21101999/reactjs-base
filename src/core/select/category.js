/**
 * Created By Nguyen Cong Thanh on 02/28/2020 14:34.
 *
 * Copyright intelIn 2020.
 */

import React, { Fragment, useEffect, useState } from 'react';
import { ExpandMore } from '@material-ui/icons'

import InputLabel from '@material-ui/core/InputLabel';
import {
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
  Typography,
  Box,
  Stack,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import styled from '@emotion/styled';
import Helper from 'service/helper'

const CustomTypography = styled(Typography)`
  position: relative;
  width: fit-content;
  &::before{
    content: '*';
    position: absolute;
    top: 0;
    right: -8px;
    font-size: 12px;
    display: ${props => props.required ? 'block' : 'none'}
  }
`

import PropTypes from 'prop-types'

const useStyles = makeStyles({
  customOutline: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: 0
    }
  }
});

const SelectComponent = props => {
  const classes = useStyles();
  const {
    styleFormControl = { minWidth: 120 },
    classFormControl,
    id = `input-${new Date().getTime()}`,
    label,
    error = "",
    list = [{ name: '', categoryId: '' }],
    defaultValue,
    disabled,
    onChange = (e, item) => {
    },
    required,
    notOutline,
    noneValue = false,
    isRow = true,
  } = props
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState('')

  useEffect(() => {
    setVal(defaultValue.categoryId)
  }, [defaultValue])

  const change = (event) => {
    event.preventDefault();
    setVal(event.target.value)
    onChange(event, event.target.value)
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const tempStyle = { color: "#5D7386", fontSize: "1rem" }
  const rowStyle = isRow ? Object.assign({ display: 'flex', justifyContent: "center", alignItems: 'center' }, { ...tempStyle }) : tempStyle
  const styles = !Helper.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f', ...rowStyle } : { fontSize: '1rem', color: '#6b778c', ...rowStyle }

  return (
    <Stack direction={isRow ? "row" : "column"} spacing={1} sx={isRow ? { alignItems: 'center' } : null, props.fullWidth ? { width: '100%' } : null}>
      {label && <CustomTypography required={props.required} style={styles}>{label}</CustomTypography>}
      <FormControl required={required} sx={{ m: 1, minWidth: 120, border: 'none' }}>
        <Select
          onChange={change}
          value={val}
          id={id}
          displayEmpty
          sx={styleFormControl}
          className={classFormControl, notOutline ? classes.customOutline : null}
          disabled={disabled}
          inputProps={{ 'aria-label': `${id}` }}
          MenuProps={MenuProps}
        >
          {noneValue ? <MenuItem value="">
            <em>None</em>
          </MenuItem> : null}
          {list.map((item, key) => <MenuItem key={key} value={item.categoryId}>{item.name}</MenuItem>)}
        </Select>
        {error ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    </Stack>

  )

}

export default SelectComponent