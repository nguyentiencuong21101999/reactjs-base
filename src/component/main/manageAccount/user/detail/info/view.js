import React, { Fragment } from 'react'

import {
    Box,
    Typography,
    Tab,
    Button,
    Stack,
    Avatar,
    Chip,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import style from "core/hook/button/style"
import Helper from 'service/helper'
import UserEnum from 'service/enum/user'
import Localize from 'service/localize';

const DetailAdminHtml = (props) => {
    const {
        ui, timeout,
        handleEdit,
        handleChangeStatus,
        handleOnBack
    } = props
    return (
        <Box
        //  sx={{ backgroundColor: "#fff" }}
        >
            <Stack sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_USER")}</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button
                            color="info"
                            size="small"
                            disabled={timeout.status}
                            sx={style.buttonBack}
                            onClick={(e) => { e.preventDefault(); handleOnBack() }}>
                            {Localize.getLocalize("LC_BACK")}
                        </Button>
                        {ui.data.status !== UserEnum.USER_STATUS.LOCKED_BY_WRONG_PASSWORD_MANY_TIME ? (<Button
                            color={ui.data.status !== UserEnum.USER_STATUS.ACTIVE ? "info" : "error"}
                            size="small"
                            variant="outlined"
                            disabled={timeout.status}
                            sx={style.buttonOutlined}
                            onClick={(e) => { e.preventDefault(); handleChangeStatus(ui.data.status) }}
                        >
                            {ui.data.status === UserEnum.USER_STATUS.ACTIVE ? Localize.getLocalize("LC_BUTTON_BLOCK") : Localize.getLocalize("LC_BUTTON_UNBLOCK")}
                        </Button>) : null

                        }

                    </Stack>
                </Box>
            </Stack>
            {/* <Avatar sx={{ bgcolor: 'transparent', boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 10px',
                boxSizing: 'border-box', width: 'auto', height: 'auto'}} variant="rounded"
            >
                {ui.data.image ? <img style={{width: '300px', height: '300px', objectFit: "contain"}}
                    src={ui.data.image} alter="Avatar"/> : <AccountBoxIcon sx={{width: '300px', height: '300px'}} />}
            </Avatar> */}
            <Stack direction="row" spacing={5} sx={{ p: 4, width: '100%', bgcolor: 'transparent', boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 10px' }}>
                <Stack direction="column" spacing={2}>
                    <Typography>{Localize.getLocalize("LC_ID_ACCOUNT")}</Typography>
                    <Typography>{Localize.getLocalize("LC_USERNAME")}</Typography>
                    <Typography>{Localize.getLocalize("LC_FULLNAME")}</Typography>
                    <Typography>{Localize.getLocalize("LC_DOB")}</Typography>
                    <Typography>{Localize.getLocalize("LC_GENDER")}</Typography>
                    <Typography>{Localize.getLocalize("LC_PHONE")}</Typography>
                    <Typography>{Localize.getLocalize("LC_EMAIL")}</Typography>
                    <Typography>{Localize.getLocalize("LC_CREATED_AT")}</Typography>
                    <Typography>{Localize.getLocalize("LC_MODIFIED_AT")}</Typography>
                    <Typography>{Localize.getLocalize("LC_STATUS")}</Typography>
                </Stack>

                <Stack direction="column" spacing={2}>
                    <Typography>{ui.data.userId || "-"}</Typography>
                    <Typography>{ui.data.username || "-"}</Typography>
                    <Typography>{ui.data.fullName || "-"}</Typography>
                    <Typography>{ui.data.dob ? Helper.getDate(ui.data.dob) : "-"}</Typography>
                    <Typography>{!Helper.isEmpty(ui.data.gender) ? UserEnum.GENDER_PARSE[ui.data.gender] : "-"}</Typography>
                    <Typography>{ui.data.phoneNumber || "-"}</Typography>
                    <Typography>{ui.data.email || "-"}</Typography>
                    <Typography>{ui.data.createdBy ? Helper.handleDateTime(ui.data.createdBy, ui.data.createdAt) : "-"}</Typography>
                    <Typography>{ui.data.modifiedBy ? Helper.handleDateTime(ui.data.modifiedBy, ui.data.modifiedAt) : "-"}</Typography>
                    <Typography>{ui.data.status ? UserEnum.USER_STATUS_PARSE[ui.data.status] : "-"} </Typography>
                </Stack>
            </Stack>
        </Box>
    )
}

export default DetailAdminHtml
