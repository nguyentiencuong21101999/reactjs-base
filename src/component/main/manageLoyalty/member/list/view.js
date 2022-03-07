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
import ButtonHook from "core/hook/button/index.hook"
import Helper from 'service/helper'

import LoadingComponent from './loading'
import styled from '@emotion/styled';

import FullNameSearchHook from 'core/hook/reward/listRequest/fullNameSearch.hook'
import PhoneNumberSearchHook from 'core/hook/reward/listRequest/phoneNumberSearch.hook'

const CustomChip = styled(Chip)`
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`

const ListMemberHtml = (props) => {
  const { ui, handleOnChangeTableValue, handleOnChangeOrderBy, timeout, handleOnRef,
    handleOnChangeSearchValue, handleOnChangeStatus, handleOnChangeSearch,
    handleSetData, handleSubmitSearch, handleCreate, handleRedirectDetail
  } = props



  const [rows, setRows] = useState(null) //Use to loading data when have API
  // const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])

  const headerRows = [
    { value: Localize.getLocalize("LC_ID_ACCOUNT"), align: "left" },
    { value: Localize.getLocalize("LC_FULLNAME"), align: "left" },
    { value: Localize.getLocalize("LC_PHONE"), align: "left" },
    { value: Localize.getLocalize("LC_EMAIL"), align: "left" },
    { value: Localize.getLocalize("LC_AVAILABLE_POINT"), align: "center" },
  ]
  const cells = [
    { field: "userId", align: "left" },
    { field: "fullName", align: "left" },
    { field: "phoneNumber", parser: (value) => { return !Helper.isEmpty(value) ? value : "-" }, align: "left" },
    { field: "email", align: "left" },
    { field: "availablePoint", align: "center" },
  ]
  const renderSearch = () => {
    switch (ui.searchInput) {
      case "userInfo.fullName":
        return <FullNameSearchHook
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
      case "userInfo.phoneNumber":
        return <PhoneNumberSearchHook
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
              />

              {/* <Select
                label="Trạng thái"
                list={ui.listStatus}
                defaultValue={ui.defaultStatus}
                onChange={handleOnChangeStatus}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
              /> */}
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
              {renderSearch()}
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
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_MEMBER")}</Typography>
      </Box>

      {Html(props)}
    </Box>
  );
}

export default ListMemberHtml;
