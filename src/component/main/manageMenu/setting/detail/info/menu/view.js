import React, { Fragment, useState, useEffect } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import {
  Box,
  Typography,
  Tab,
  Button,
  Chip,
  Stack,
} from '@material-ui/core';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@material-ui/lab';
import BasicTableComponent from 'core/table/basic';
import Localize from "service/localize";
import RouteEnum from 'service/enum/route';
import AdminEnum from 'service/enum/admin';
import Helper from 'service/helper'
import ButtonHook from "core/hook/button/index.hook"
import UserEnum from 'service/enum/user'
import ChallengeEnum from 'service/enum/challenge';

import LoadingComponent from './loading'
import styled from '@emotion/styled';
import style from "core/hook/button/style"
const CustomChip = styled(Chip)`
  background-color:${props => props.style.backgroundColor}
  color: ${props => props.style.color}
`
const SuitableForComponent = (list) => {
  let food = []
  if (list.length > 0) {
    list.map((item) => {
      if (food.length === 0) {
        food.push(item.foodName);
      } else {
        food = [food, item.foodName].join(", ");
      }
    })
  }
  return food.length > 0 ? food : "-"
}
const MenuSettingHtml = (props) => {
  const { ui, timeout, handleOnRef,
    handleSetData, handleRedirectDetail, handleChangeTab,
    handleActive
  } = props


  const [rows, setRows] = useState(null)
  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])

  const ActiveComponent = (value, indexCell, row, index) => {
    return <Button
      color="info"
      size="small"
      variant="outlined"
      disabled={timeout.status}
      style={{ ...style.buttonOutlined, minWidth: "100px" }}
      onClick={(e) => { e.preventDefault(); handleActive(row, index) }}
    >
      {Localize.getLocalize("LC_UPDATE")}
    </Button>
  }
  const headerRows = [
    { value: Localize.getLocalize("LC_BREAKFAST"), align: "left" },
    { value: Localize.getLocalize("LC_LUNCH"), align: "left" },
    { value: Localize.getLocalize("LC_DINNER"), align: "left" },
    { value: Localize.getLocalize("LC_SNACKS_1"), align: "left" },
    { value: Localize.getLocalize("LC_SNACKS_2"), align: "left" },
    { value: Localize.getLocalize("LC_MODIFIED_BY"), align: "left" },
    { value: Localize.getLocalize("LC_MODIFIED_AT"), align: "left" },
    { value: Localize.getLocalize("LC_ACTION"), align: "left" },

  ]
  const cells = [
    { field: "breakfast", parser: SuitableForComponent, align: "left" },
    { field: "lunch", parser: SuitableForComponent, align: "left" },
    { field: "dinner", parser: SuitableForComponent, align: "left" },
    { field: "firstSnack", parser: SuitableForComponent, align: "left" },
    { field: "secondSnack", parser: SuitableForComponent, align: "left" },
    { field: "modifiedBy", align: "left" },
    { field: "modifiedAt", parser: (value) => { return Helper.getFullDate(value) }, align: "left" },
    { field: "menuSettingId", parser: ActiveComponent, align: "left" },
  ]

  const Html = (props) => {
    return (
      <>
        <BasicTableComponent headerRows={headerRows} rows={rows} cells={cells}
          loading={<LoadingComponent query={ui.dataTable} handleSetData={handleSetData} />}
          handleOnRow={() => { }} rowHover={true} />
      </>
    )
  }

  return (
    <Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={`1`}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          </Box>
          <TabPanel sx={{ padding: 0 }} value={`1`}>{Html(props)}</TabPanel>
        </TabContext>
      </Box>
    </Box >
  );
}

export default MenuSettingHtml;
