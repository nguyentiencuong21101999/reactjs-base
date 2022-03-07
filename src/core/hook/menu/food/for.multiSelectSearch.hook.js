/**
 * Created By Nguyen Cong Thanh on 02/28/2020 14:34.
 *
 * Copyright intelIn 2020.
 */

import React, { Fragment, useEffect, useState } from 'react';
import Validator from 'service/validator'
import Helper from 'service/helper'
import MultipleSelectSearch from 'core/select/search'

const MultiSelectComponent = props => {
  const {
    styleFormControl = { minWidth: 120 },
    classFormControl,
    id = `input-${new Date().getTime()}`,
    label,
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
    styleMenu = {},
    msgErr = "",
    name = "",
    fullWidth = true
  } = props

  const [open, setOpen] = useState(false)
  const [listValue, setListValue] = useState([])
  const [error, setError] = useState('')
  const [renderList, setRenderList] = useState(list)
  const [valueInput, setValueInput] = useState("")





  useEffect(() => {
    setError(props.error)
  }, [props.error])

  let listTemp = {}
  list.forEach(item => {
    listTemp = { ...listTemp, [item.text]: item.value }
  })


  useEffect(() => {
    setListValue(defaultValue)
  }, [defaultValue])

  const change = (item) => {
    try {
      setError('')
      let tempListValue = []
      item.forEach(
        element => {
          tempListValue = [...tempListValue, element.value]
        }
      )
      Validator.isArrayEmpty("", tempListValue, msgErr);
      onChange(name, tempListValue)
    } catch (error) {
      setError(error.message)
      onChange(name, "")
    }

  }

  const renderValue = (selected) => {
    const arrVal = []
    selected.map((item, index) => {
      arrVal.push(item.text)

    })
    return arrVal.join(', ')

  }
  const onClick = (event, item) => {
    const temp = [...listValue]
    const index = listValue.findIndex(element => { return element.value === item.value })
    if (index > -1) {
      temp.splice(index, 1)
    } else {
      temp.push(item)
    }
    setListValue(temp)
    change(temp)
  }
  const searchOnChange = (e) => {
    const { value } = e.target;
    setValueInput(value)
    const lowerCasedValue = Helper.clearVietnamese(value.toLowerCase().trim());
    if (lowerCasedValue === "") setRenderList(list);
    else {
      let filtered = list.filter(item => Helper.clearVietnamese(item.text).toLowerCase().includes(lowerCasedValue))
      setRenderList(filtered)
    }
  }
  return (
    <MultipleSelectSearch
      id={id}
      styleFormControl={styleFormControl}
      classFormControl={classFormControl}
      label={label}
      list={list}
      defaultValue={defaultValue}
      disabled={disabled}
      styleLabel={styleLabel}
      required={required}
      notOutline={notOutline}
      noneValue={noneValue}
      isRow={isRow}
      styleMenu={styleMenu}
      name={name}
      searchOnChange={searchOnChange}
      onClick={onClick}
      error={error}
      renderValue={renderValue}
      listValue={listValue}
      valueInput={valueInput}
      open={open}
      renderList={renderList}
      isSearch={false}
      fullWidth={fullWidth}
    />

  )

}

export default MultiSelectComponent