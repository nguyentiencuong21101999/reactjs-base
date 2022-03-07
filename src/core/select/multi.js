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
  ListItemText,
  OutlinedInput,
  Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import PropTypes from 'prop-types'
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
    display: ${props => props.required ? 'block' : 'none'};
    color:${props => props.colors};

  }
`

const useStyles = makeStyles({
  customOutline: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: 0
    }
  }
});

const MultiSelectComponent = props => {
  const classes = useStyles();
  const {
    styleFormControl = { minWidth: 120 },
    classFormControl,
    id = `input-${new Date().getTime()}`,
    label,
    error = "",
    list = [{ text: '', value: '' }],
    defaultValue = [],
    disabled,
    onChange = (e, item) => {
    },
    styleLabel = {},
    required,
    notOutline,
    noneValue = false,
    isRow = true,
    styleMenu = {}
  } = props

  const [open, setOpen] = useState(false)
  const [listValue, setListValue] = useState([])
  let listTemp = {}
  list.forEach(item => {
    listTemp = { ...listTemp, [item.text]: item.value }
  })


  useEffect(() => {
    let tempListText = []
    defaultValue.forEach(item => {
      tempListText.push(item.text)
    })
    setListValue(tempListText)
  }, [defaultValue])

  const change = (event) => {
    event.preventDefault();
    const tempListText = typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
    if (tempListText.length > 0) {
      setListValue(tempListText)
      let tempListValue = []
      tempListText.forEach(
        key => {
          tempListValue = [...tempListValue, listTemp[key]]
        }
      )
      onChange(event, tempListValue)
    }
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

  const tempStyle = { color: "#5D7386", fontSize: "1rem", lineHeight: "20px" }
  const rowStyle = isRow ? Object.assign({ display: 'flex', justifyContent: "center", alignItems: 'center' }, { ...tempStyle }) : tempStyle
  const styles = !Helper.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f', ...rowStyle } : { fontSize: '1rem', color: '#6b778c', ...rowStyle }
  const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
  return (
    <Stack direction={isRow ? "row" : "column"} spacing={1} sx={isRow ? { alignItems: 'center' } : null, props.fullWidth ? { width: '100%' } : null}>
      <CustomTypography colors={colors} required={props.required} style={{ ...styles, ...styleLabel }}>{label}</CustomTypography>
      <FormControl required={required} sx={{ m: 1, minWidth: 120, border: 'none' }}>
        <Select
          labelId={id}
          id={id}
          multiple
          value={listValue}
          sx={styleFormControl}
          className={classFormControl, notOutline ? classes.customOutline : null}
          onChange={change}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          disabled={disabled}
        >

          {list.map((item, key) => (
            <MenuItem key={key} value={item.text}>
              <Checkbox checked={listValue.indexOf(item.text) > -1} />
              <ListItemText primary={item.text} />
            </MenuItem>
          ))}
        </Select>
        {error ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    </Stack>

  )

}

export default MultiSelectComponent