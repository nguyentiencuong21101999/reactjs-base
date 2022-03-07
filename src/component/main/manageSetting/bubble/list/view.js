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
import Select from "core/select"
import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Helper from 'service/helper'
import SearchHook from "core/hook/listUser/search.hook";
import LoadingComponent from './loading'
import styled from '@emotion/styled';
import ButtonHook from "core/hook/button/index.hook"
import style from "core/hook/button/style"
import PostEnum from 'service/enum/post'
import SettingEnum from 'service/enum/setting'
import Localize from 'service/localize';
const CustomChip = styled(Chip)`
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`

const ListBubbleHtml = (props) => {
  const { ui, timeout, handleOnRef,
    handleSetData, handleSubmitSearch, handleEdit, handleRedirectDetail, handleOnChangeTableValue, handleOnChangeOrderBy, handleOnChangeSearch,
    handleOnChangeSearchValue, handleCreate
  } = props

  const [rows, setRows] = useState(null) //Use to loading data when have API
  // const [rows, setRows] = useState([])

  const TargetComponent = (listTarget) => {
    let target = []
    listTarget.forEach(element => {
      target.push(PostEnum.TARGET_PARSE[element])
    })
    return target.join(", ")
  }
  const RedirectToComponent = (value) => {
    return SettingEnum.DIRECT_TO_PARSE[value]
  }
  const ActiveComponent = (value, indexCell, row, index) => {
    return <Button
      color="info"
      size="small"
      variant="outlined"
      disabled={timeout.status}
      style={{ ...style.buttonOutlined, minWidth: "100px" }}
      onClick={(e) => { e.preventDefault(); handleEdit(row, index) }}
    >
      {Localize.getLocalize("LC_UPDATE")}
    </Button>
  }

  const headerRows = [
    { value: Localize.getLocalize("LC_OBJECT"), align: "left" },
    { value: Localize.getLocalize("LC_TIME_SLOT"), align: "left" },
    { value: Localize.getLocalize("LC_DIRECT"), align: "left" },
    { value: Localize.getLocalize("LC_CONTENT"), align: "left" },
    { value: Localize.getLocalize("LC_MODIFIED_BY"), align: "left" },
    { value: Localize.getLocalize("LC_MODIFIED_AT"), align: "left" },
    { value: Localize.getLocalize("LC_ACTION"), align: "center" },
  ]
  const cells = [
    { field: "targetMeijiId", align: "left", parser: (value) => { return TargetComponent(JSON.parse(value)) } },
    { field: "timeStart", parser: (value, indexCell, row, index) => { return `${row.timeStart}-${row.timeEnd}` } },
    { field: "directTo", parser: RedirectToComponent, align: "left" },
    { field: "content", align: "left" },
    { field: "createdBy", parser: (value) => { return !Helper.isEmpty(value) ? value : "-" }, align: "left" },
    { field: "modifiedAt", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" }, align: "left" },
    { field: "bubbleId", align: "center", parser: ActiveComponent },
  ]
  const handleRenderSearchInput = () => {
    switch (ui.searchInput) {
      default:
        return (
          <SearchHook
            variant="outlined"
            margin="normal"
            required
            label=""
            name="searchValue"
            autoComplete="search"
            autoFocus
            value={ui.searchValue}
            onChange={handleOnChangeSearchValue}
            disabled={timeout.status}
            onRef={handleOnRef}
            error={timeout.field === "search" ? Localize.getLocalize(timeout.message) : null}
            heightInput={'36px'}
            styleFormControl={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}
          />
        )
    }
  }
  const Html = (props) => {
    return (
      <>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: "flex-start", typography: 'body', margin: '20px 0' }}>
          <Stack direction="row" spacing={1}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Stack direction="row" spacing={1}>
              <Select
                label={Localize.getLocalize("LC_SORT")}
                list={ui.listOrderBy}
                defaultValue={ui.defaultOrderBy}
                onChange={handleOnChangeOrderBy}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
              />
            </Stack>

            <Stack direction="row" spacing={1}>
              <Select
                label={Localize.getLocalize("LC_SEARCH_BY")}
                list={ui.listSearch}
                defaultValue={ui.defaultSearch}
                onChange={handleOnChangeSearch}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              {handleRenderSearchInput()}
            </Stack>
            <Box sx={{ display: 'flex', padding: '10px', alignItems: 'center' }}>
              <ButtonHook
                text={Localize.getLocalize("LC_BUTTON_SEARCH")}
                color="primary"
                size="small"
                variant="contained"
                disabled={timeout.status}
                style={{ backgroundColor: "rgb(253, 94, 93)", width: "92px" }}
                onClick={(e) => { e.preventDefault(); handleSubmitSearch() }}
              />
            </Box>



          </Stack>
        </Box>
        <TableComponent
          loading={ui.list === null}
          total={ui.total}
          onChange={handleOnChangeTableValue}
          resetPage={ui.resetPage}
          list={ui.list}
        >
          <BasicTableComponent headerRows={headerRows} rows={ui.list} cells={cells}
            loading={<LoadingComponent handleSetData={handleSetData} query={ui.dataTable} tab={ui.tab} />}
            handleOnRow={handleRedirectDetail} rowHover={true} />
        </TableComponent>
      </>

    )
  }

  return (
    <Box
      sx={{ backgroundColor: "#fff" }}
    >
      <Box sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_BUBBLE")}</Typography>
        <ButtonHook
          text={Localize.getLocalize("LC_BUTTON_CREATE")}
          color="primary"
          size="small"
          variant="contained"
          disabled={timeout.status}
          style={{ backgroundColor: "rgb(253, 94, 93)" }}
          onClick={(e) => { e.preventDefault(); handleCreate() }}
        />
      </Box>

      {Html(props)}
    </Box>
  );
}

export default ListBubbleHtml;
