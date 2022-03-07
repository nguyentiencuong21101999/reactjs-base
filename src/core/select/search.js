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

import Validator from 'service/validator'
import styled from '@emotion/styled';
import Helper from 'service/helper'
import { svg_arrow_up, svg_arrow_down, svg_search } from "core/icon";
import Styles from 'core/autocomplete/style'
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
const styleError = {
    color: "#d32f2f",
    fontFamily: "Roboto",
    fontFamily: "Helvetica",
    fontFamily: "Arial",
    fontFamily: "sans-serif",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: 0,
    marginLeft: "14px"
}

const useStyles = makeStyles({
    customOutline: {
        "& .MuiOutlinedInput-notchedOutline ": {
            borderWidth: 0,
        },

    },
    textarea: {
        "&:focus": {
            border: "none",
            outline: "2px solid #ff8585"
        }
    },
    textarea_error: {
        "&:focus": {
            border: "none",
            outline: "2px solid red"
        }
    }
});

const MultiSelectComponent = props => {
    const classes = useStyles();
    const {
        styleFormControl,
        classFormControl,
        id,
        label,
        list,
        defaultValue,
        disabled,
        onChange,
        styleLabel = {},
        required,
        notOutline,
        noneValue,
        isRow,
        styleMenu = {},
        name,
        searchOnChange,
        onClick,
        error,
        renderValue,
        listValue,
        valueInput,
        open,
        renderList,
        isSearch = false
    } = props
    const ITEM_HEIGHT = 53;
    const ITEM_PADDING_TOP = 10;
    const MenuProps = {
        PaperProps: {
            style: {
                overflow: "hidden",
                maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP, // scroll => 100px
                width: 250,
            },
        },
    };

    const tempStyle = { color: "#5D7386", fontSize: "1rem", lineHeight: "20px" }
    const rowStyle = isRow ? Object.assign({ display: 'flex', justifyContent: "center", alignItems: 'center' }, { ...tempStyle }) : tempStyle
    const styles = !Helper.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f' } : { fontSize: '1rem', color: '#6b778c' }
    const styleMenuItem = { height: ITEM_HEIGHT }
    const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
    return (
        <Stack direction={isRow ? "row" : "column"} spacing={1} sx={isRow ? { alignItems: 'center' } : null, props.fullWidth ? { width: '100%' } : null}>
            <CustomTypography colors={colors} required={props.required} style={{ ...styles, ...styleLabel }}>{label}</CustomTypography>
            <FormControl required={required} sx={{ m: 1, minWidth: 120, border: 'none' }}>
                <Select
                    labelId={id}
                    id={id}
                    multiple
                    error={!Helper.isEmpty(error) ? true : false}
                    value={listValue}
                    sx={{ ...styleFormControl, "& .MuiOutlinedInput-input": { whiteSpace: "inherit" } }}
                    className={classFormControl, notOutline ? classes.customOutline : null}
                    onChange={() => { }}
                    input={<OutlinedInput />}
                    // renderValue={(selected) => selected.join(', ')}
                    renderValue={renderValue}
                    MenuProps={MenuProps}
                    disabled={disabled}
                >
                    {
                        isSearch ?
                            <Styles.search>
                                <Styles.searchIcon>
                                    {svg_search}
                                </Styles.searchIcon>
                                <Styles.searchInput type="text" value={valueInput} onChange={searchOnChange} />
                            </Styles.search> : null
                    }
                    <Styles.container >
                    <MenuItem>
                                <ListItemText primary={"none"} />
                            </MenuItem>
                        {renderList.map((item, key) => (                           
                            <MenuItem sx={styleMenuItem} key={key} onClick={(event) => { onClick(event, item) }} >
                                <Checkbox checked={!Helper.isEmpty(listValue.find(element => { return element.value === item.value }))} />
                                <ListItemText primary={item.text} />
                            </MenuItem>
                        ))}
                    </Styles.container>
                </Select>
                <p style={styleError}>{error}</p>
            </FormControl>
        </Stack >

    )

}

export default MultiSelectComponent