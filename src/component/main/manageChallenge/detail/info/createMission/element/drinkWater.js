import React from 'react';
import {
    Box,
    Typography,
    Tab,
    Button,
    Stack,
    Avatar,
    Chip,
} from '@material-ui/core';
import QuantityHook from "core/hook/createMission/quantity.hook"
import Localize from "service/localize";
const DrinkWater = (props) => {
    const { ui, timeout,
        handleOnRef,
        handleOnChange
    } = props;

    return (
        <Stack direction="column" spacing={2}
            justifyContent="flex-start"
            sx={{ width: '100%' }}
        >
            <QuantityHook
                name="goalWater"
                value={""}
                type="text"
                label={Localize.getLocalize("LC_QTY")}
                error={timeout.field === 'goalWater' ? timeout.message : ''}
                disabled={timeout.status}
                styleFormControl={{ maxWidth: "250px" }}
                onRef={handleOnRef}
                fullWidth={true}
                onChange={handleOnChange}
                required={true}
            />

        </Stack>

    )
};

export default DrinkWater;