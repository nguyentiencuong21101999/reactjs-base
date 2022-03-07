/**
 * Created By Nguyen Cong Thanh on 02/28/2020 14:34.
 *
 * Copyright intelIn 2020.
 */

import React, { useEffect, useState } from 'react';
import Helper from "service/helper";
import Input from "core/input";
import Styles from './style'
import PropTypes from 'prop-types'
import { svg_arrow_up, svg_arrow_down, svg_search } from "core/icon";


const Autocomplete = props => {
  const {
    id,
    label,
    name,
    placeholder,
    onRef,
    error,
    disabled,
    onChange,
    iconEnd,
    list,
    defaultValue,
    isSearch,
    onFocus,
    style,
    borderLeft,
    borderRight,
    autoComplete,
    testId,
    testMessageId,
    testItem,
    required
  } = props

  const [valInput, setValInput] = useState('')
  const [selected, setSelected] = useState({})
  const [renderList, setRenderList] = useState([])
  const [openAutoComplete, setOpenAutoComplete] = useState(false)
  const [arrow, setArrow] = useState(iconEnd)
  const [reverseShow, setReverseShow] = useState(null)
  useEffect(() => {
    if (list) setRenderList(list)
    else setRenderList([{
      text: '', value: ''
    }])
  }, [list])

  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue)
      setValInput(defaultValue.text)
    }
  }, [defaultValue])

  const reversePosition = () => {
    setReverseShow(null)
  }

  const handleOnFocus = (e) => {
    e.preventDefault();
    setOpenAutoComplete(true)
    setArrow(svg_arrow_up)
    reversePosition()
    onFocus ? onFocus(e) : null
  }

  const closeAutoComplete = (e) => {
    e.preventDefault();
    setOpenAutoComplete(false)
    setArrow(svg_arrow_down)
    setRenderList(list);
  }

  const select = (e, item) => {
    e.preventDefault();
    setSelected(item)
    setValInput(item.text)
    onChange(e, item)
    closeAutoComplete(e)
  }

  const searchOnChange = (e) => {
    const { value } = e.target;
    const lowerCasedValue = Helper.clearVietnamese(value.toLowerCase().trim());
    if (lowerCasedValue === "") setRenderList(list);
    else {
      let filtered = list.filter(item => Helper.clearVietnamese(item.text).toLowerCase().includes(lowerCasedValue))
      setRenderList(filtered)
    }
  }

  return (
    <Input label={label}
      placeholder={placeholder}
      value={valInput} onChange={() => { }}
      onFocus={handleOnFocus}
      iconEnd={<a style={{ cursor: "pointer" }} onClick={handleOnFocus}>{arrow}</a>} readOnly={true} ref={onRef}
      name={name} id={id} error={error} disabled={disabled} style={style}
      borderLeft={borderLeft}
      borderRight={borderRight}
      testId={testId}
      testMessageId={testMessageId}
      isPointer={true}
      autoComplete={autoComplete}
      type={"button"}
      required={required}
    >
      {
        openAutoComplete ?
          <>
            <Styles.dragdrop style={reverseShow}>
              {
                isSearch ? (
                  <Styles.search>
                    <Styles.searchIcon>
                      {svg_search}
                    </Styles.searchIcon>
                    <Styles.searchInput type="text" onChange={searchOnChange} />
                  </Styles.search>
                ) : null
              }
              <Styles.container>
                {
                  renderList.map((item, key) => (
                    <Styles.item key={key} data-test-id={testItem}
                      className={!Helper.isEmpty(selected.disabled) && selected.value === item.value || item.disabled ? 'disabled' : (selected.value === item.value ? 'active' : null)}
                      onClick={(e) => {
                        if (selected.value !== item.value) {
                          if (Helper.isEmpty(selected.disabled)) {
                            return select(e, item)
                          }
                          if (!item.disabled) {
                            return select(e, item)
                          }
                        }
                      }}>
                      {item.text}
                    </Styles.item>
                  ))
                }
              </Styles.container>
            </Styles.dragdrop>
            <Styles.overflow onClick={closeAutoComplete} />
          </>
          : null
      }
    </Input>
  )
}

Autocomplete.defaultProps = {
  iconEnd: svg_arrow_down,
  id: `Autocomplete-${new Date().getTime()}`
}

Autocomplete.prototype = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onRef: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  iconEnd: PropTypes.element,
  list: PropTypes.array.isRequired,
  defaultValue: PropTypes.object,
  isSearch: PropTypes.bool,
  onFocus: PropTypes.func,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
}

export default Autocomplete
