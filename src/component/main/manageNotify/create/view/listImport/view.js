import React, { Fragment, useState, useEffect } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import {
  Box,
  Typography,
  Tab,
  Button,
  Chip,
} from '@material-ui/core';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@material-ui/lab';
import NotifyEnum from 'service/enum/notify'

import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import LoadingComponent from './loading'
import styled from '@emotion/styled';
import Localize from 'service/localize';

const CustomChip = styled(Chip)`
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`

const ListUserHtml = (props) => {
  const { ui, handleSetData, handleSubmitSearch, handleCreate, handleRedirectDetail, handleChangeTab
  } = props
  const headerRows = [
    { value: Localize.getLocalize("LC_INFO") },
  ]

  // const [rows, setRows] = useState(null) // Get list by API

  const [rows, setRows] = useState([])

  const cells = [
    { field: "info", align: "left" },
  ]

  const Html = (props) => {

    return (
      <Box sx={{ marginTop: '30px' }}>
        <BasicTableComponent headerRows={headerRows} rows={ui.list[ui.tab.current]} cells={cells}
          loading={<LoadingComponent handleSetData={handleSetData} tab={ui.tab} />}
          handleOnRow={() => { }} rowHover={true} />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_IMPORT_LIST")}</Typography>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={`${ui.tab.current}`}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label={Localize.getLocalize("LC_EXISTED_IN_SYSTEM")} value={`${NotifyEnum.TAB_LIST_DATA.EXISTED}`} />
              <Tab label={Localize.getLocalize("LC_EXISTED_IN_SYSTEM")} value={`${NotifyEnum.TAB_LIST_DATA.NOT_EXISTS}`} />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: 0 }} value={`${NotifyEnum.TAB_LIST_DATA.EXISTED}`}>{Html(props)}</TabPanel>
          <TabPanel sx={{ padding: 0 }} value={`${NotifyEnum.TAB_LIST_DATA.NOT_EXISTS}`}>{Html(props)}</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default ListUserHtml;
