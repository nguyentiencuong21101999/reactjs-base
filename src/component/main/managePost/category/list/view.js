import React, { Fragment, useState, useEffect } from 'react'

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
import Select from "core/select"
import SearchHook from "core/hook/listUser/search.hook"
import Localize from "service/localize";
import PostEnum from 'service/enum/post';
import CategoryEnum from 'service/enum/category';
import Helper from 'service/helper'
import LoadingComponent from './loading'
import styled from '@emotion/styled';
import HelperService from 'service/helper';
import ButtonHook from "core/hook/button/index.hook"

const CustomChip = styled(Chip)`
  background-color:${props => props.style.backgroundColor}
  color: ${props => props.style.color}
`

const ListPostHtml = (props) => {
  const { ui, handleOnChangeTableValue, handleOnChangeOrderBy, timeout, handleOnRef,
    handleOnChangeSearchValue, handleOnChangeStatus, handleOnChangeSearch,
    handleSetData, handleSubmitSearch, handleCreate, handleRedirectDetail
  } = props



  const [rows, setRows] = useState(null) //Use to loading data when have API

  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])


  const StatusUserComponent = (value) => {
    let styles = {}
    switch (value) {
      case CategoryEnum.STATUS.NEW:
        styles.color = "#333333"
        styles.backgroundColor = "#D9D9D9"
        break;
      case CategoryEnum.STATUS.APPLIED:
        styles.color = "#00A7C6"
        styles.backgroundColor = "#E5FDFF"
        break;

    }
    let temp = !Helper.isEmpty(styles) ? <CustomChip sx={{ height: "32px", padding: "0px 8px 0px 8px", fontWeight: 400, fontSize: "12px" }} size="small" style={styles} label={CategoryEnum.STATUS_PARSE[value]} /> : <Typography>{"-"}</Typography>
    return temp
  }
  const IconComponent = (value) => {
    return <img src={value} width="50px" height="40px" />
  }
  const NameComponent = (value) => {
    return <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: "300px" }}>
      {value}
    </p>
  }
  const headerRows = [
    { value: Localize.getLocalize("LC_IMAGE"), align: "center" },
    { value: Localize.getLocalize("LC_CATEGORY_NAME"), align: "left" },
    { value: Localize.getLocalize("LC_OBJECT"), align: "left" },
    { value: Localize.getLocalize("LC_STATUS"), align: "center" },
    { value: Localize.getLocalize("LC_MODIFIED_AT"), align: "left" },
  ]
  const cells = [
    { field: "icon", parser: IconComponent, align: "center" },
    { field: "name", parser: NameComponent, align: "left" },
    { field: "targetMeijiId", parser: (value) => { return PostEnum.TARGET_PARSE[value] }, align: "left" },
    { field: "status", parser: StatusUserComponent, align: "center" },
    { field: "modifiedAt", parser: (value) => { return HelperService.getFullDate(value) }, align: "left" },
  ]
  const renderSearch = () => {
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
        );
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
                minWidth={false}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Select
                label={Localize.getLocalize("LC_STATUS")}
                list={ui.listStatus}
                defaultValue={ui.defaultStatus}
                onChange={handleOnChangeStatus}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
                minWidth={false}
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
                minWidth={false}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              {renderSearch()}
            </Stack>
            <Stack direction="row" spacing={1}>
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
          </Stack>
        </Box>

        <TableComponent
          loading={ui.list === null}
          total={ui.total}
          list={ui.list}
          resetPage={ui.resetPage}
          onChange={handleOnChangeTableValue}
        >
          <BasicTableComponent headerRows={headerRows} rows={rows} cells={cells}
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
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_CATEGORY")}</Typography>
        <ButtonHook
          color="primary"
          size="small"
          variant="contained"
          disabled={timeout.status}
          style={{ backgroundColor: "#FD5E5D" }}
          onClick={(e) => { e.preventDefault(); handleCreate() }}
          text={Localize.getLocalize("LC_BUTTON_CREATE")}
        />
      </Box>

      {Html(props)}
    </Box>
  );
}

export default ListPostHtml;
