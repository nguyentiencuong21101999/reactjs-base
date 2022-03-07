import React, { Fragment } from 'react'
import {
  Box,
  Typography,
  Tab,
  Button,
  Stack,
} from '@material-ui/core';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@material-ui/lab';
import Helper from 'service/helper'
import Alert from '@material-ui/core/Alert';
import Localize from 'service/localize'
import SettingMenu from './menu'
import SettingTarget from './target'
import ButtonHook from "core/hook/button/index.hook"
import style from "core/hook/button/style"


const InfoSettingHtml = (props) => {
  const {
    ui, timeout,
    handleOnBack,
    handleEdit,
    handleChangeTab,
    data
  } = props
  const keyParse = {

    menuSettingName: Localize.getLocalize("LC_MENU_NAME"),
    createdBy: Localize.getLocalize("LC_CREATED_BY"),
    modifiedBy: Localize.getLocalize("LC_MODIFIED_BY")
  }
  const valueParse = {
    menuSettingName: (value) => { return value },
    createdBy: (value) => { return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailMenuSetting.createdBy, ui.detailMenuSetting.createdAt) : '-' },
    modifiedBy: (value) => { return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailMenuSetting.modifiedBy, ui.detailMenuSetting.modifiedAt) : '-' },

  }
  const detailChallenge = () => {
    return (
      <Box>
        <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: 'auto' }}>
          <Stack direction="column" spacing={3} sx={{ p: 4, width: '100%', maxWidth: 'calc(100vw - 400px)', bgcolor: 'transparent', boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 10px' }}>
            <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
            {
              Object.keys(keyParse).map((key, index) => {
                return (
                  <Stack key={index} direction="row" spacing={2} sx={{ width: '100%' }}>
                    <Stack direction="column" sx={{ width: "15%" }} spacing={2}>
                      <Typography>{keyParse[key]}</Typography>
                    </Stack>
                    <Stack direction="column" sx={{ width: "85%" }} spacing={2}>
                      <Typography> {valueParse[key](ui.detailMenuSetting[key])}</Typography>
                    </Stack>
                  </Stack>
                )
              })
            }
          </Stack>

        </Stack>
      </Box >
    )
  }
  return (
    <>
      <Box>
        <Stack sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_CONFIG")}</Typography>
            <Stack direction="row" spacing={1}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }}>
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>
              <ButtonHook
                text={Localize.getLocalize("LC_BUTTON_EDIT")}
                color="primary"
                size="small"
                variant="contained"
                disabled={timeout.status}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={(e) => { e.preventDefault(); handleEdit() }}
              />
            </Stack>
          </Box>
        </Stack>
        {detailChallenge()}
        <TabContext value={`${ui.tab.current}`}>
          <Box sx={{ borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label={Localize.getLocalize("LC_CONFIG_MENU")} value={`${ui.tab.settingMenu}`} />
              <Tab label={Localize.getLocalize("LC_CONFIG_OBJECT")} value={`${ui.tab.settingTarget}`} />
            </TabList>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.settingMenu}`}><SettingMenu ui={ui} /></TabPanel>
            <TabPanel sx={{ padding: 0 }} value={`${ui.tab.settingTarget}`}> <SettingTarget ui={ui} /></TabPanel>
          </Box>
        </TabContext>
      </Box >

      {
        timeout.field === "all" ? (
          <Alert severity="error" style={{ fontSize: "18px" }}>
            {Localize.getLocalize(timeout.message)}
          </Alert>
        ) : null
      }
    </>
  );
}

export default InfoSettingHtml