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
import {Help} from '@material-ui/icons';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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
    list = [{ text: '', value: '' }],
    defaultValue,
    disabled,
    onChange = (e, item) => {
    },
    required,
    notOutline,
    noneValue = false,
    isRow = true,
    minWidth = true,
    menuProps = true,
    displayEmpty = true,
    tooltip=false,
    titleTooltip=""
  } = props
  const [open, setOpen] = useState(false)
  const [val, setVal] = useState('')
  useEffect(() => {
    setVal(!Helper.isEmpty(defaultValue) && !Helper.isEmpty(defaultValue.value) ? defaultValue.value : "")
  }, [defaultValue])
  const change = (event) => {
    event.preventDefault();
    setVal(event.target.value)
    onChange(event, event.target.value)
  }
  const ITEM_HEIGHT = 53;
  const ITEM_PADDING_TOP =10 ;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP
        //width: 250,
        ,
        maxWidth: "250px",
        overflow: "auto"
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
  };
  const tempStyle = { color: "#5D7386", fontSize: "1rem" }
  const rowStyle = isRow ? Object.assign({ display: 'flex', justifyContent: "center", alignItems: 'center' }, { ...tempStyle }) : tempStyle
  const styles = !Helper.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f', ...rowStyle } : { fontSize: '1rem', color: '#6b778c', ...rowStyle }
  const minW = minWidth ? { minWidth: 120 } : {}
  const styleMenuItem = { height: ITEM_HEIGHT }
  const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
  const styleIconButton = {padding:0,marginLeft: "10px"}
  return (
    <Stack direction={isRow ? "row" : "column"} spacing={1} sx={isRow ? { alignItems: 'center' } : null, props.fullWidth ? { width: '100%' } : null}>
    
      <Stack direction={"row"}>
        {label && <CustomTypography colors={colors} required={props.required} style={styles}>{label} </CustomTypography>}
        {
        tooltip && <Tooltip  title={titleTooltip} placement='right'>
                    <IconButton sx={styleIconButton}>
                      <Help sx={{fontSize:"16px"}} />
                    </IconButton>
                  </Tooltip>
        }
     </Stack>
      <FormControl required={required} sx={{ m: 1, ...minW, border: 'none' }}>
        <Select
          onChange={change}
          value={val}
          id={id}
          displayEmpty={displayEmpty}
          sx={styleFormControl}
          className={classFormControl, notOutline ? classes.customOutline : null}
          disabled={disabled}
          inputProps={{ 'aria-label': `${id}` }}
          MenuProps={menuProps ? MenuProps : {}}
        >
          {noneValue ? <MenuItem value="">
            <em>None</em>
          </MenuItem> : null}
          {list.length > 0 ? list.map((item, key) => <MenuItem sx={styleMenuItem} key={key} value={item.value}>{item.text}</MenuItem>) : null}
        </Select>
        {error ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    </Stack>
  )

}

export default SelectComponent