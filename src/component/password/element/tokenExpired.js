/**
 * Created By Nguyen Cong Thanh on 07/25/2020 16:37.
 *
 * Copyright intelIn 2020.
 */

import React, { useState } from 'react';

import Style from 'core/_app.scss'
import { Stack, Box, Typography, Link } from '@material-ui/core';
import Button from 'core/button'
import Localize from 'service/localize'
import Styles from "./style";
import Copyright from 'core/hook/footer'
const Close = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10.001" height="10" viewBox="0 0 10.001 10">
    <g id="close_1_" data-name="close (1)" opacity="0.7">
      <g id="Group_5524" data-name="Group 5524">
        <path id="Path_60" data-name="Path 60" d="M6.1,5.016,9.841,1.277a.548.548,0,0,0,0-.773L9.513.176a.548.548,0,0,0-.774,0L5,3.915,1.261.176a.548.548,0,0,0-.773,0L.16.5a.547.547,0,0,0,0,.773L3.9,5.016.16,8.755a.549.549,0,0,0,0,.774l.328.328a.548.548,0,0,0,.773,0L5,6.117,8.74,9.856a.543.543,0,0,0,.387.16h0a.543.543,0,0,0,.387-.16l.328-.328a.548.548,0,0,0,0-.774Z" transform="translate(0 -0.016)" fill={props.color} />
      </g>
    </g>
  </svg>
)
const ConfirmHtml = props => {

  const { handleClose, dialog, handleConfirm } = props;
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
        <Styles.body>
          <Stack >
            <img style={{ display: "block", margin: "auto" }} width="225px" height="200px" src="https://static.intelin.vn/meiji/ebe13140-4510-11ec-96e1-df415c613210.png" />
          </Stack>
          <br />
          <Styles.wrapper>
            <Styles.error data-test-id="popupContent">
              {Localize.getLocalize("LC_SORRY")}
            </Styles.error>
          </Styles.wrapper>
          <br />
          <Styles.wrapper>
            <Styles.content data-test-id="popupContent">
              {Localize.getLocalize("LC_SET_PASSWORD_EXPIRE")}
            </Styles.content>
          </Styles.wrapper>
        </Styles.body>
        <Styles.footer>
          <Button style={{ width: "300px", display: "block", margin: "auto", backgroundColor: "#FD5E5D" }} testId="popupConfirm" text={Localize.getLocalize('LC_UNDERSTAND')} onClick={handleConfirm} />
        </Styles.footer>
        <Stack sx={{ marginTop: "20px", marginBottom: "15px" }} direction="column" spacing={3} >
        <Copyright />
      </Stack>
    </Styles.container>

    </Styles.fill >
  )

}
export default ConfirmHtml
