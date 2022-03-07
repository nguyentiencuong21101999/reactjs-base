/**
 * Created By Nguyen Cong Thanh on 07/25/2020 16:37.
 *
 * Copyright intelIn 2020.
 */

import React, { useState } from 'react';
import Button from 'core/button'
import Localize from 'service/localize'
import ReasonHook from "core/hook/post/reason.hook";
import Styles from "component/layout/dialog/style";
import MultiSelect from "core/select/multi"
import Alert from '@material-ui/core/Alert';
import { svg_warning_popup } from "core/icon";
const Close = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10.001" height="10" viewBox="0 0 10.001 10">
        <g id="close_1_" data-name="close (1)" opacity="0.7">
            <g id="Group_5524" data-name="Group 5524">
                <path id="Path_60" data-name="Path 60" d="M6.1,5.016,9.841,1.277a.548.548,0,0,0,0-.773L9.513.176a.548.548,0,0,0-.774,0L5,3.915,1.261.176a.548.548,0,0,0-.773,0L.16.5a.547.547,0,0,0,0,.773L3.9,5.016.16,8.755a.549.549,0,0,0,0,.774l.328.328a.548.548,0,0,0,.773,0L5,6.117,8.74,9.856a.543.543,0,0,0,.387.16h0a.543.543,0,0,0,.387-.16l.328-.328a.548.548,0,0,0,0-.774Z" transform="translate(0 -0.016)" fill={props.color} />
            </g>
        </g>
    </svg>
)
const Html = props => {

    const { handleClose, handleSubmit, timeout, ui, handleOnChange, handleOnRef } = props;
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
                <Styles.head>
                    <Styles.title data-test-id="popupTitle">{Localize.getLocalize("LC_POPUP_SEND_NOTI_TITLE")}</Styles.title>
                    {/* <Styles.close data-test-id="popupClose" href="" onClick={close}><Close color={'white'}/></Styles.close> */}
                </Styles.head>
                <Styles.body>
                    <Styles.wrapper>
                        <Styles.icon data-test-id="popupIcon">
                            {svg_warning_popup('#D1CFFF')}
                        </Styles.icon>
                        <Styles.content data-test-id="popupContent">
                            {Localize.getLocalize("LC_POPUP_SEND_NOTI_CONTENT")}
                        </Styles.content>
                    </Styles.wrapper>
                </Styles.body>
                <Styles.footer>
                    <Button testId="popupCancel" text={Localize.getLocalize('LC_BUTTON_CANCEL')} onClick={close} variant="secondary" disabled={timeout.status} style={{ marginRight: 30 }} />
                    <Button testId="popupConfirm" text={Localize.getLocalize('LC_BUTTON_CONFIRM')} onClick={(e) => { e.preventDefault(); handleSubmit() }} disabled={timeout.status} loading={timeout.statusLoading} />
                </Styles.footer>
                {timeout.field === "all" ? (
                    <Alert severity="error" style={{ fontSize: "18px" }}>
                        {/* {Localize.getLocalize(timeout.message)} */}
                        {timeout.message}
                    </Alert>
                ) : null}
            </Styles.container>
        </Styles.fill>
    )

}
export default Html
