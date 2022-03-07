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
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Select from "core/select"
import SearchHook from "core/hook/listUser/search.hook"
import TitleSearchHook from "core/hook/notification/titleSearch.hook"
import Localize from "service/localize";
import Helper from 'service/helper'
import LoadingComponent from './loading'
import NotifyEnum from 'service/enum/notify';
import ButtonHook from "core/hook/button/index.hook"
import ListNotifyReceivedComponent from './listNotifyReceived'
const ListNotifyHtml = (props) => {
  const { ui, handleOnChangeTableValue, handleOnChangeOrderBy, timeout, handleOnRef,
    handleOnChangeSearchValue, handleOnChangeStatus, handleOnChangeSearch,
    handleSetData, handleSubmitSearch, handleCreate, handleRedirectDetail, handleChangeTab
  } = props
  const headerRows = [
    { value: Localize.getLocalize("LC_CHANNEL"), align: "left" },
    { value: Localize.getLocalize("LC_TITLE"), align: "left" },
    { value: Localize.getLocalize("LC_CONTENT"), align: "left" },
    { value: Localize.getLocalize("LC_CREATED_BY"), align: "left" },
    { value: Localize.getLocalize("LC_CREATED_AT"), align: "left" },
  ]

  const [rows, setRows] = useState(null) //Use to loading data when have API
  // const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])

  const ChannelComponent = (value) => {
    return NotifyEnum.FILTER_PARSE[value]
  }
  const TitleComponent = (value) => {
    return  <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: "250px" }}>{value}</p>
  }
  const ContentComponent = (value) => {
    return <p dangerouslySetInnerHTML={{ __html: value }} style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', width: "250px" }} />

  }
  const cells = [
    { field: "channel", align: "left", parser: ChannelComponent },
    { field: "title", align: "left", parser: TitleComponent },
    { field: "content", align: "left", parser: ContentComponent },
    { field: "createdBy", align: "left" },
    { field: "createdAt", align: "left", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" } },

  ]
  const handleRenderSearchInput = () => {

    switch (ui.searchInput) {
      case 'notification.title':
        return (
          <TitleSearchHook
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
                minWidth={false}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <Select
                label={Localize.getLocalize("LC_CHANNEL")}
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
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_NOTI")}</Typography>
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
      <TabContext value={`${ui.tab.current}`}>
        <Box sx={{ borderColor: "divider" }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label={Localize.getLocalize("LC_ADMIN_CREATED")} value={`${ui.tab.created}`} />
            <Tab label={Localize.getLocalize("LC_USER_RECEIVED")} value={`${ui.tab.received}`} />
          </TabList>
          <TabPanel sx={{ padding: 0 }} value={`${ui.tab.created}`}>
            {Html(props)}
          </TabPanel>
          <TabPanel sx={{ padding: 0 }} value={`${ui.tab.received}`}>
            <ListNotifyReceivedComponent />
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

export default ListNotifyHtml;
