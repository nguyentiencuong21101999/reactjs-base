/**
 * Created By Nguyen Cong Thanh on 07/25/2020 15:43.
 *
 * Copyright intelIn 2020.
 */

import React, { Fragment, useEffect } from 'react'

const DialogHtml = props => {

  const { view } = props
  useEffect(() => {
    if (view.current !== view.default) {
      document.body.style.overflow = "hidden"
    }
  }, [])

  return (
    <Fragment>{view[view.current]}</Fragment>
  )

}

export default DialogHtml