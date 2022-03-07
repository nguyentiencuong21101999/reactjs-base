/**
 * Created By Nguyen Cong Thanh on 02/25/2020 17:51.
 *
 * Copyright intelIn 2020.
 */

import React, { useState, useEffect } from 'react';
import Styles from 'core/_app.scss'

import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight } from '@material-ui/icons'

const TextHorizontalAlignComponent = props => {

  const {
    style = {},
    id = `toggle-align-${new Date().getTime()}`,
    name,
    value = 'left',
    onChange = () => { },
  } = props

  const [current, setCurrent] = useState(value)
  const [format, setFormat] = useState([
    {
      text: <FormatAlignLeft color='primary' key={id} />,
      value: 'left'
    },
    {
      text: <FormatAlignCenter color='primary' key={id} />,
      value: 'center'
    },
    {
      text: <FormatAlignRight color='primary' key={id} />,
      value: 'right'
    },
  ])

  useEffect(() => {
    if (value) {
      setCurrent(value)
    }
  }, [value])

  const handleClick = (event) => {
    event.preventDefault()
    let index = format.findIndex(item => item.value === current)
    index += 1;
    if (index > 2) {
      setCurrent(format[0].value)
      onChange(format[0].value)
    } else {
      setCurrent(format[index].value)
      onChange(format[index].value)
    }
  }

  return (
    <button className={Styles['format-toggle-align']} name={name} style={style} id={id} onClick={handleClick}>
      {format.map(item => {
        if (item.value === current) {
          return item.text
        }
        return null
      })}
    </button>
  )

}

export default TextHorizontalAlignComponent