import React, { Fragment, useState, useEffect } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import {
  Box,
  Typography,
  Tab,
  Button,
  Chip,
  Stack
} from '@material-ui/core';

import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Helper from 'service/helper'
import style from "core/hook/button/style"

import LoadingComponent from './loading'
import styled from '@emotion/styled';
import Localize from 'service/localize';

const CustomChip = styled(Chip)`
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`

const ListSettingHtml = (props) => {
  const { ui, timeout, handleOnRef,
    handleSetData, handleSubmitSearch, handleUpdateSetting, handleRedirectDetail
  } = props

  //const [rows, setRows] = useState(null) //Use to loading data when have API
  // const [rows, setRows] = useState([])


  const ActiveComponent = (value, indexCell, row, index) => {
    return <Button
      color="info"
      size="small"
      variant="outlined"
      disabled={timeout.status}
      style={{ ...style.buttonOutlined, minWidth: "100px" }}
      onClick={(e) => { e.preventDefault(); handleUpdateSetting(row, index) }}
    >
      {Localize.getLocalize("LC_UPDATE")}
    </Button>
  }

  const DescriptionComponent = (value) => {
    return <p style={{}}>
      {value}
    </p>
  }
  const headerRows = [
    { value: Localize.getLocalize("LC_ID_CONFIG"), align: "left" },
    { value: Localize.getLocalize("LC_DESCRIPTION"), align: "left" },
    { value: Localize.getLocalize("LC_VALUE"), align: "left" },
    { value: Localize.getLocalize("LC_MODIFIED_BY"), align: "left" },
    { value: Localize.getLocalize("LC_MODIFIED_AT"), align: "left" },
    { value: Localize.getLocalize("LC_ACTION"), align: "center" },
  ]
  const cells = [
    { field: "configId", align: "left", parser: (value) => { return value } },
    { field: "description", parser: DescriptionComponent, align: "left" },
    { field: "value", parser: (value) => { return value }, align: "left" },
    { field: "modifiedBy", align: "left" },
    { field: "modifiedAt", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" }, align: "left" },
    { field: "configId", align: "center", parser: ActiveComponent },
  ]

  const Html = (props) => {

    return (
      <>
        <BasicTableComponent headerRows={headerRows} rows={ui.list} cells={cells}
          loading={<LoadingComponent handleSetData={handleSetData} query={ui.dataTable} tab={ui.tab} />}
          handleOnRow={handleRedirectDetail} rowHover={true} />
      </>
    )
  }

  return (
    <Box
    >
      <Box sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_SYSTEM")}</Typography>

      </Box>

      {Html(props)}
    </Box>
  );
}

export default ListSettingHtml;
