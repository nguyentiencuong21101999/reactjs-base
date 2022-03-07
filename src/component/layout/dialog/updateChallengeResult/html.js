/**
 * Created By Nguyen Cong Thanh on 07/25/2020 16:37.
 *
 * Copyright intelIn 2020.
 */

import React, { useState } from 'react';

import Style from 'core/_app.scss'

import Button from 'core/button'
import Localize from 'service/localize'
import Styles from "component/layout/dialog/style";
import { svg_warning_popup } from "core/icon";
const ConfirmHtml = props => {

  const { handleClose, dialog, handleSubmit } = props;
  const [slide, setSlide] = useState(true)

  const close = (e) => {
    e.preventDefault()
    setSlide(false)
    setTimeout(() => {
      handleClose()
    }, 100)
  }

  return (
    <Styles.fill isOpen={open}>
      <Styles.container isOpen={open} width={488}>
        <Styles.head variant='success'>
          <Styles.title data-test-id="popupTitle">{Localize.getLocalize("LC_PUBLISH_RESULT")}</Styles.title>
          {/* <Styles.close data-test-id="popupClose" href="" onClick={close}><Close color={'white'}/></Styles.close> */}
        </Styles.head>
        <Styles.body>
          <Styles.wrapper>
            <Styles.icon data-test-id="popupIcon">
              {svg_warning_popup('#D1CFFF')}
            </Styles.icon>
            <Styles.content data-test-id="popupContent">
              {Localize.getLocalize("LC_POPUP_PUBLISH_RESULT_CONTENT")}
            </Styles.content>
          </Styles.wrapper>
          <Styles.wrapper style={{ marginTop: "10px", marginLeft: "77px" }}>
            <Styles.content data-test-id="popupContent">
              {Localize.getLocalize("LC_POPUP_PUBLISH_RESULT_NOTE")}
            </Styles.content>
          </Styles.wrapper>
        </Styles.body>
        <Styles.footer>
          <Button testId="popupCancel" text={Localize.getLocalize('LC_BUTTON_CANCEL')} onClick={close} variant='secondary' style={{ marginRight: 30 }} />
          <Button testId="popupConfirm" text={Localize.getLocalize('LC_BUTTON_CONFIRM')} onClick={(e) => { e.preventDefault(); handleSubmit() }} />
        </Styles.footer>
      </Styles.container>
    </Styles.fill>
  )

}
export default ConfirmHtml