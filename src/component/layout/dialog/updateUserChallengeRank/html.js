/**
 * Created By Nguyen Cong Thanh on 07/25/2020 16:37.
 *
 * Copyright intelIn 2020.
 */

import React, { useState } from 'react';
import Button from 'core/button'
import Localize from 'service/localize'
import ResultHook from 'core/hook/challenge/result.hook'
import RankHook from 'core/hook/challenge/rank.hook'
import Styles from "component/layout/dialog/style";
import { Stack } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import Select from "core/select"
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
const Html = props => {

    const { handleClose, handleSubmit, timeout, ui, data,handleOnChangePost, handleOnRef, handleOnChangeRank, handleOnChangResult,handleOnChange } = props;
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
                    <Styles.title data-test-id="popupTitle">{Localize.getLocalize("LC_UPDATE_RESULT")}</Styles.title>
                    {/* <Styles.close data-test-id="popupClose" href="" onClick={close}><Close color={'white'}/></Styles.close> */}
                </Styles.head>
                <Styles.body style={{ paddingBottom: 0 }}>
                    <Styles.wrapper data-test-id="popupContent">
                        <Styles.headerTitle>
                            <Stack sx={{ marginBottom: "10px", color: "#333333" }}>{Localize.getLocalize("LC_UPDATE_RESULT_CHALLENGE_POST_CONTENT")}</Stack>
                            <Stack sx={{ marginBottom: "10px", color: "#333333" }}>{Localize.getLocalize("LC_UPDATE_RESULT_CHALLENGE_POST_NOTE")}</Stack>
                        </Styles.headerTitle>
                    </Styles.wrapper>
                    <ResultHook
                        required
                        name="status"
                        defaultValue={ui.defaultRank.value}
                        list={ui.listRank}
                        onChange={handleOnChangResult}
                        disabled={timeout.status}
                        onRef={handleOnRef}
                        error={timeout.field === "gender" ? timeout.message : ""}
                        label={Localize.getLocalize("LC_RESULT")}
                        row={true}
                    />

                    {ui.defaultRank.value === ChallengeEnum.USER_CHALLENGE_RANK_STATUS.SUCCESS ? (
                        <>
                            <RankHook
                                name="rank"
                                value={data['rank'].toString() || ""}
                                type="text"
                                label={`${Localize.getLocalize("LC_RANK")}`}
                                error={timeout.field === 'username' ? Localize.getLocalize(timeout.message) : ''}
                                disabled={timeout.status}
                                styleFormControl={{ maxWidth: "250px" }}
                                onRef={handleOnRef}
                                onChange={handleOnChange}
                                required={true}
                                />
                            <br />
                            <Select
                                list={ui.listPost}
                                label={Localize.getLocalize("LC_WINNING_POST_ID")}
                                isRow={false}
                                defaultValue={ui.defaultPost}
                                onChange={handleOnChangePost}
                                notOutline={false}
                                styleFormControl={{ maxWidth: "250px" }}
                                disabled={timeout.status}
                                required
                            />
                        </>

                    ) : null}

                </Styles.body>
                <Styles.footer>
                    <Button testId="popupCancel" text={Localize.getLocalize('LC_BUTTON_CANCEL')} onClick={close} variant="secondary" disabled={timeout.status} style={{ marginRight: 30 }} />
                    <Button testId="popupConfirm" text={Localize.getLocalize('LC_BUTTON_CONFIRM')} onClick={(e) => { e.preventDefault(); handleSubmit() }} disabled={ui.isShowBtn || timeout.status} loading={timeout.statusLoading} />
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
