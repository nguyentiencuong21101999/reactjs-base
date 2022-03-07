import React, { useEffect, useState } from 'react';
import { Box, Chip, Tab, Stack, Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import styled from '@emotion/styled'

import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Select from 'core/select';
import SearchHook from 'core/hook/listUser/search.hook';
import Localize from 'service/localize';
import AdminEnum from 'service/enum/admin';
import Helper from 'service/helper';
import DobHook from 'core/hook/admin/dob.hook';
import Button from "core/hook/button/index.hook"

import LoadingComponent from './loading';
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

  const headerRows = {
    [ui.tab.active]: [
      { value: Localize.getLocalize("LC_ID_ACCOUNT") },
      { value: Localize.getLocalize("LC_USERNAME") },
      { value: Localize.getLocalize("LC_FULLNAME") },
      { value: Localize.getLocalize("LC_PHONE") },
      { value: Localize.getLocalize("LC_EMAIL") },
      { value: Localize.getLocalize("LC_STATUS"), align: 'center' },
    ],
    [ui.tab.notActive]: [
      // {value: "ID người dùng"},
      { value: Localize.getLocalize("LC_USERNAME") },
      { value: Localize.getLocalize("LC_FULLNAME") },
      { value: Localize.getLocalize("LC_PHONE") },
      { value: Localize.getLocalize("LC_EMAIL") },
      // {value: "Trạng thái", align:'center'},
    ]
  }

  const [rows, setRows] = useState(null)

  useEffect(() => {
    setRows(ui.list[ui.tab.current])
  }, [ui.list[ui.tab.current]])

  const listSearchNotActive = [...ui.listSearch]
  listSearchNotActive.splice(4, 1)
  const ChipComponent = (status) => {
    return !Helper.isEmpty(status) ? (<CustomChip size="small" active={`${status === AdminEnum.ADMIN_STATUS.ACTIVE}`}
      label={AdminEnum.ADMIN_STATUS_PARSE[status]} />) : (<Typography>{"-"}</Typography>)
  }

  const cells = {
    [ui.tab.active]: [
      { field: "userId", align: "left" },
      { field: "username", align: "left" },
      { field: "fullName", align: "left" },
      { field: "phoneNumber", align: "left" },
      { field: "email", align: "left" },
      { field: "status", align: 'center', parser: ChipComponent },
    ],
    [ui.tab.notActive]: [
      // { field: "userId", align: "left"},
      { field: "username", align: "left" },
      { field: "fullName", align: "left" },
      { field: "phoneNumber", align: "left" },
      { field: "email", align: "left" },
      // { field: "status", align: 'center', parser: ChipComponent },
    ]
  }

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
            value={ui.searchValue[ui.tab.current]}
            onChange={handleOnChangeSearchValue}
            disabled={timeout.status}
            onRef={handleOnRef}
            error={timeout.field === "search" ? Localize.getLocalize(timeout.message) : null}
            heightInput={'36px'}
            styleFormControl={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center', }}
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
                defaultValue={ui.defaultOrderBy[ui.tab.current]}
                onChange={handleOnChangeOrderBy}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
                minWidth={false}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              {ui.tab.current === ui.tab.active && <Select
                label={Localize.getLocalize("LC_STATUS")}
                list={ui.listStatus}
                defaultValue={ui.defaultStatus[ui.tab.current]}
                onChange={handleOnChangeStatus}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
                minWidth={false}
              />}
            </Stack>
            <Stack direction="row" spacing={1}>
              <Select
                label={Localize.getLocalize("LC_SEARCH_BY")}
                list={ui.tab.current !== ui.tab.notActive ? ui.listSearch : listSearchNotActive}
                defaultValue={ui.defaultSearch[ui.tab.current]}
                onChange={handleOnChangeSearch}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
                minWidth={false}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              {handleRenderSearchInput()}
            </Stack>
            <Box sx={{ display: 'flex', padding: '10px', alignItems: 'center' }}>
              <Button
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
          <BasicTableComponent headerRows={headerRows[ui.tab.current]} rows={rows} cells={cells[[ui.tab.current]]}
            loading={<LoadingComponent handleSetData={handleSetData} query={ui.dataTable[ui.tab.current]} tab={ui.tab} />}
            handleOnRow={handleRedirectDetail} rowHover={true} />

        </TableComponent>

      </>
    )
  }

  return (
    <Box >
      <Box sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_ADMIN")}</Typography>
        <Button
          color="primary"
          size="small"
          variant="contained"
          disabled={timeout.status}
          style={{ backgroundColor: "#FD5E5D" }}
          onClick={(e) => { e.preventDefault(); handleCreate() }}
          text={Localize.getLocalize("LC_BUTTON_CREATE")}
        />


      </Box>

      <TabContext value={`${ui.tab.current}`}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="Tabs admin">
            <Tab label={Localize.getLocalize("LC_STATUS_ACTIVATED")} value={`${ui.tab.active}`} />
            <Tab label={Localize.getLocalize("LC_STATUS_INACTIVE")} value={`${ui.tab.notActive}`} />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0 }} value={`${ui.tab.active}`}>{Html(props)}</TabPanel>
        <TabPanel sx={{ padding: 0 }} value={`${ui.tab.notActive}`}>{Html(props)}</TabPanel>
      </TabContext>

    </Box>
  );
}

export default ListUserHtml;
