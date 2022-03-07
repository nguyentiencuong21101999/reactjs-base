import React, { Fragment, useState, useEffect } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import {
  Box,
  Typography,
  Tab,
  Stack,
  Chip,
} from '@material-ui/core';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@material-ui/lab';

import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Select from "core/select"
import SearchHook from "core/hook/listUser/search.hook"
import Localize from "service/localize";
import Helper from 'service/helper'
import UserEnum from 'service/enum/user'
import ButtonHook from "core/hook/button/index.hook"
import LoadingComponent from './loading'
import styled from '@emotion/styled';
const CustomChip = styled(Chip)`
  height:32px;
  padding: "0px 8px 0px 8px";
  fontWeight: 400;
  font-size:12px;
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`

const ListUserHtml = (props) => {
  const { ui, handleOnChangeTableValue, handleOnChangeOrderBy, timeout, handleOnRef,
    handleOnChangeSearchValue, handleOnChangeStatus, handleOnChangeSearch,
    handleSetData, handleSubmitSearch, handleCreate, handleRedirectDetail, handleChangeTab
  } = props

  const headerRows = [
    { value: Localize.getLocalize("LC_ID_ACCOUNT") },
    { value: Localize.getLocalize("LC_USERNAME") },
    { value: Localize.getLocalize("LC_FULLNAME") },
    { value: Localize.getLocalize("LC_PHONE") },
    { value: Localize.getLocalize("LC_EMAIL") },
    { value: Localize.getLocalize("LC_STATUS"), align: "center" },
    // { value: "Ngày tạo" },
  ]

  const [rows, setRows] = useState(null)

  useEffect(() => {
    setRows(ui.list[ui.tab.current])
  }, [ui.list[ui.tab.current]])

  const ChipComponent = (status) => {
    let temp = !Helper.isEmpty(status) ? <CustomChip size="small" active={`${status === UserEnum.USER_STATUS.ACTIVE}`}
      label={UserEnum.USER_STATUS_PARSE[status]} /> : <Typography>{"-"}</Typography>
    return temp
  }

  const cells = [
    { field: "userId", align: "left" },
    { field: "username", align: "left" },
    { field: "fullName", align: "left" },
    { field: "phoneNumber", align: "left" },
    { field: "email", align: "left" },
    { field: "status", align: "center", parser: ChipComponent },
    // { field: "createdAt", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" } }
  ]

  const handleRenderSearchInput = () => {
    switch (ui.searchInput[ui.tab.current]) {
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
            value=''
            isChangeSearch={ui.isChangeSearch}
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
    const newListStatus = [...ui.listStatus]
    newListStatus.splice(3, 1)

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
                defaultValue={ui.defaultOrderBy[ui.tab.current]}
                onChange={handleOnChangeOrderBy}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Select
                label={Localize.getLocalize("LC_STATUS")}
                list={(ui.tab.current === ui.tab.user) ? ui.listStatus : newListStatus}
                defaultValue={ui.defaultStatus[ui.tab.current]}
                onChange={handleOnChangeStatus}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Select
                label={Localize.getLocalize("LC_SEARCH_BY")}
                list={ui.listSearch[ui.tab.current]}
                defaultValue={ui.defaultSearch[ui.tab.current]}
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
          loading={ui.list[ui.tab.current] === null}
          total={ui.total[ui.tab.current]}
          onChange={handleOnChangeTableValue}
          list={ui.list[ui.tab.current]}
          resetPage={ui.resetPage}
        >
          <BasicTableComponent headerRows={headerRows} rows={rows} cells={cells}
            loading={<LoadingComponent handleSetData={handleSetData} query={ui.dataTable[ui.tab.current]} tab={ui.tab} />}
            handleOnRow={handleRedirectDetail} rowHover={true} />

        </TableComponent>

      </>
    )
  }

  return (
    <Box
    // sx={{ backgroundColor: "#fff" }}
    >
      <Box sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ marginBottom: '30px' }}> {Localize.getLocalize("LC_USER")}</Typography>
      </Box>
      <TabContext value={`${ui.tab.current}`}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label={Localize.getLocalize("LC_ACCOUNT_NORMAL")} value={`${UserEnum.USER_TYPE.USER}`} />
            <Tab label={Localize.getLocalize("LC_ACCOUNT_SOCIAL")} value={`${UserEnum.USER_TYPE.SOCIAL}`} />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0 }} value={`${UserEnum.USER_TYPE.USER}`}>{Html(props)}</TabPanel>
        <TabPanel sx={{ padding: 0 }} value={`${UserEnum.USER_TYPE.SOCIAL}`}>{Html(props)}</TabPanel>
      </TabContext>

    </Box>
  );
}

export default ListUserHtml;
