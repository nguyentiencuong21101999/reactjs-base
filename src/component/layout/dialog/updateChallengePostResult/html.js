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
import ChallengeEnum from 'service/enum/challenge';
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
                    <Styles.title data-test-id="popupTitle">{Localize.getLocalize("LC_UPDATE_RESULT")}</Styles.title>
                    {/* <Styles.close data-test-id="popupClose" href="" onClick={close}><Close color={'white'}/></Styles.close> */}
                </Styles.head>
                <Styles.body>
                    <Styles.wrapper>
                        <Styles.icon data-test-id="popupIcon">
                            {svg_warning_popup('#D1CFFF')}
                        </Styles.icon>
                        <Styles.content data-test-id="popupContent">
                            {dialog.data.content.valid === ChallengeEnum.SOCIAL_SUBMISSION_VALID.VALID ? `Bạn chắc chắn cập nhật kết quả bài dự thi thành hợp lệ` : `Bạn chắc chắn cập nhật kết quả bài dự thi thành không hợp lệ`}
                        </Styles.content>
                    </Styles.wrapper>
                </Styles.body>
                <Styles.footer>
                    <Button testId="popupCancel" text={Localize.getLocalize('LYT_CANCEL_BUTTON')} onClick={close} variant='secondary' style={{ marginRight: 30 }} />
                    <Button testId="popupConfirm" text={Localize.getLocalize('LYT_OK_POPUP_BUTTON')} onClick={(e) => { e.preventDefault(); handleSubmit() }} />
                </Styles.footer>
            </Styles.container>
        </Styles.fill>
    )

}
export default ConfirmHtml
