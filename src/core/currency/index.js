import React, { useState, useEffect, Fragment } from 'react'
import CountUp from 'react-countup';

import Config from 'config'

const Currency = props => {
  const [amount, setAmount] = useState(0)
  const [conf, setConf] = useState(Config.localize.language.find(item => item.key === 'vn'))

  useEffect(() => {
    if (props.value) {
      setAmount(props.value)
    }
  }, [props.value])

  useEffect(() => {
    if (props.localizeKey) {
      setConf(Config.localize.language.find(item => item.key === props.localizeKey))
    }
  }, [props.localizeKey])

  return (
    <CountUp
      start={amount}
      end={amount}
      delay={0}
      duration={0}
      decimals={conf.decimals}
      separator={conf.separator}
      decimal={conf.decimal}
    />
  )

}

export default Currency
