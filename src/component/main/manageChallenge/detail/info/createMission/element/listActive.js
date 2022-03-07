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
import ListActiveHook from "core/hook/createMission/listActive.hook"
import CloseIcon from '@material-ui/icons/Close';
import Localize from "service/localize";
import style from "core/hook/button/style"
const ListActive = (props) => {
    const { ui, timeout, data,
        handleAddActive,
        handleRemoveActive,
        handleOnRef,
        handleOnChangeActive
    } = props;
    return (
        <Stack direction="column" spacing={2}
            justifyContent="flex-start"
            sx={{ width: '100%' }}
        >
            {/* <Typography style={{ fontSize: '1rem', color: '#6b778c' }}>{Localize.getLocalize("LC_TODO_LIST")}</Typography> */}
            {ui.listActive.map((item, index) => (
                <Stack direction="row" spacing={2}
                    justifyContent="flex-start"
                    alignItems='center'
                    sx={{ width: '100%' }}
                    key={index}
                >
                    <Stack sx={ui.listActive.length > 1 ? { width: '90%' } : { width: '100%' }}>
                        <ListActiveHook
                            name="action"
                            value={data['action'][index].actionName || ""}
                            type="text"
                            label={Localize.getLocalize("LC_TODO_LIST")}
                            error={timeout.field === 'todo' ? timeout.message : ''}
                            disabled={timeout.status}
                            styleFormControl={{}}
                            onRef={handleOnRef}
                            fullWidth={true}
                            onChange={(name, value) => handleOnChangeActive(name, value, index)}
                            required={true}
                        />
                    </Stack>

                    <Stack sx={ui.listActive.lenght > 1 ? { width: '10%' } : { width: '0%' }}>
                        {index > 0 && index + 1 === ui.listActive.length ? <Button
                            color="primary"
                            size="small"
                            variant="text"
                            disabled={timeout.status}
                            sx={{ height: "36px" }}
                            onClick={event => { event.preventDefault(); handleRemoveActive(index) }}
                        >
                            <CloseIcon />

                        </Button>
                            : null}
                    </Stack>
                </Stack>
            ))
            }
            {/* </Stack> */}
            {
                ui.listActive.length < 100 ? <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    disabled={!(data['action'].findIndex(element => element.actionName === '') === -1) || timeout.status}
                    sx={{...style.buttonOutlined,  width: '100px' }}
                    onClick={handleAddActive}
                >
                    {Localize.getLocalize("LC_BUTTON_ADD")}
                </Button> : null
            }

        </Stack >

    )
};

export default ListActive;