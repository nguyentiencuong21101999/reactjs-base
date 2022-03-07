import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Divider
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import { red } from '@material-ui/core/colors';

const Count = (props) => {
    const { ui } = props
    const data = [
        {
            account: ui.detailDashBoard.totalUser,
            text: "Tổng người dùng"
        },
        {
            account: ui.detailDashBoard.totalNewUser,
            text: "Người dùng mới trong ngày"
        },
        {
            account: ui.detailDashBoard.totalPost,
            text: "Tổng bài viết"
        },
        {
            account: ui.detailDashBoard.totalNewPost,
            text: "Bài viết mới trong ngày"
        }
    ]
    return (
        <Stack direction="row" spacing={4}
            divider={<Divider orientation="vertical" flexItem />}
        >
            {data.map((item, index) => (
                <Stack
                    direction="column"
                    spacing={1}
                    key={index}
                >
                    <Typography sx={{ fontWeight: 600, fontSize: '18px' }}>
                        {item.account}
                    </Typography>
                    <Typography>
                        {item.text}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    )
};

export default Count;