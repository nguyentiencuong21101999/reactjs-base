import React from 'react';
import {
    Box,
    Typography,
    Stack,
    Divider
} from '@material-ui/core';
import Localize from 'service/localize';

const Count = (props) => {
    const { ui } = props
    const data = [
        {
            account: ui.detailDashBoard.totalUser,
            text:`${Localize.getLocalize('LC_TOTAL_USER')}`
        },
        {
            account: ui.detailDashBoard.totalNewUser,
            text: `${Localize.getLocalize('LC_TOTAL_USER_IN_DAY')}`
        },
        {
            account: ui.detailDashBoard.totalPost,
            text: `${Localize.getLocalize('LC_TOTAL_POST')}`
        },
        {
            account: ui.detailDashBoard.totalNewPost,
            text: `${Localize.getLocalize('LC_TOTAL_POST_IN_DAY')}`
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