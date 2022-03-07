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

import PostEnum from 'service/enum/post';
import Helper from 'service/helper'
import DateHook from "core/hook/post/date.hook";

import LoadingComponent from './loading'
import styled from '@emotion/styled';
import ButtonHook from "core/hook/button/index.hook"
const CustomChip = styled(Chip)`
  background-color:${props => props.style.backgroundColor}
  color: ${props => props.style.color}
`

const ListPostHtml = (props) => {
  const { ui, handleOnChangeTableValue, handleOnChangeOrderBy, timeout, handleOnRef,
    handleOnChangeSearchValue, handleOnChangeStatus, handleOnChangeSearch,
    handleSetData, handleSubmitSearch, handleCreate, handleRedirectDetail, handleChangeTab
  } = props

  const headerRows = {
    [ui.tab.user]: [
      { value: Localize.getLocalize("LC_ID_ACCOUNT"), align: "left" },
      { value: Localize.getLocalize("LC_MODE"), align: "center" },
      { value: Localize.getLocalize("LC_CONTENT"), align: "left" },
      { value: Localize.getLocalize("LC_CREATED_AT"), align: "left" },
      { value: Localize.getLocalize("LC_STATUS"), align: "center" },
    ],
    [ui.tab.admin]: [
      { value: Localize.getLocalize("LC_TITLE"), align: "left" },
      { value: Localize.getLocalize("LC_TOPIC"), align: "center" },
      // {value: "Hiển thị"},
      { value: Localize.getLocalize("LC_CREATED_BY"), align: "left" },
      { value: Localize.getLocalize("LC_APPROVED_BY"), align: "left" },
      { value: Localize.getLocalize("LC_MODIFIED_AT"), align: "left" },
      { value: Localize.getLocalize("LC_STATUS"), align: "center" },
    ]
  }

  const [rows, setRows] = useState(null)

  useEffect(() => {
    setRows(ui.list[ui.tab.current])
  }, [ui.list[ui.tab.current]])

  const StatusComponent = (value) => {
    let styles = {}
    switch (value) {
      case PostEnum.SOCIAL_POST_STATUS.CREATED_BY_ADMIN:
        styles.color = "#333333"
        styles.backgroundColor = "#D9D9D9"
        break;
      case PostEnum.SOCIAL_POST_STATUS.UPDATED_BY_ADMIN:
        styles.color = "#FF8000"
        styles.backgroundColor = "#FFE0C1"
        break;
      case PostEnum.SOCIAL_POST_STATUS.ACCEPTED_BY_ADMIN:
        styles.color = "#00A7C6"
        styles.backgroundColor = "#E5FDFF"
        break;
    }
    let temp = !Helper.isEmpty(styles) ? <CustomChip size="small" sx={{ height: "32px", padding: "0px 8px 0px 8px", fontWeight: 400, fontSize: "12px" }} style={styles} label={PostEnum.SOCIAL_POST_STATUS_PARSE[value]} /> : <Typography>{"-"}</Typography>
    return temp
  }

  const TitleComponent = (value) => {
    return <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', width: "250px" }}>
      {value}
    </p>
  }
  const AudienceComponent = (value) => {
    let color = ""
    switch (value) {
      case PostEnum.SOCIAL_POST_SELECT_AUDIENCE.PUBLIC:
        color = "primary"
        break;
      case PostEnum.SOCIAL_POST_SELECT_AUDIENCE.FOLLOWER:
        color = "secondary"
        break;
    }
    return PostEnum.SOCIAL_POST_SELECT_AUDIENCE_PARSE[value]
  }

  const StatusUserComponent = (value) => {
    let styles = {}
    switch (value) {
      case PostEnum.SOCIAL_POST_STATUS.CREATED_BY_USER:
        styles.color = "#00A7C6"
        styles.backgroundColor = "#E5FDFF"
        break;
      case PostEnum.SOCIAL_POST_STATUS.DELETED_BY_USER:
        styles.color = "#FF2E2E"
        styles.backgroundColor = "#FFE8E6"
        break;
      case PostEnum.SOCIAL_POST_STATUS.DELETED_BY_ADMIN:
        styles.color = "#FF2E2E"
        styles.backgroundColor = "#FFE8E6"
        break;
    }
    let temp = !Helper.isEmpty(styles) ? <CustomChip size="small" sx={{ height: "32px", padding: "0px 8px 0px 8px", fontWeight: 400, fontSize: "12px" }} style={styles} label={PostEnum.SOCIAL_POST_STATUS_PARSE[value]} /> : <Typography>{"-"}</Typography>
    return temp
  }


  const cells = {
    [ui.tab.user]: [
      { field: "userId", align: "left" },
      { field: "audience", parser: AudienceComponent },
      { field: "title", align: "left", parser: TitleComponent },
      { field: "createdAt", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" }, align: "left" },
      { field: "status", align: "center", parser: StatusUserComponent },
    ],
    [ui.tab.admin]: [
      { field: "title", align: "left", parser: TitleComponent },
      { field: "topic", align: "center", parser: (value) => { return !Helper.isEmpty(value) ? PostEnum.TOPIC_PARSE[value] : "-" } },
      // {field: "show", parser: ChipShowComponent },
      { field: "createdBy", align: "left" },
      { field: "modifiedBy", align: "left" },
      { field: "modifiedAt", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" } },
      { field: "status", align: "center", parser: StatusComponent },
    ]
  }
  const handleRenderSearchInput = () => {
    switch (ui.searchInput[ui.tab.current]) {
      case 'createdAt':
        return (
          <DateHook
            name='searchValue'
            value={[]}
            disabled
            styleFormControl={{ height: "36px" }}
            onRef={handleOnRef}
            onChange={handleOnChangeSearchValue}
            error={timeout.field === 'searchValue' ? timeout.message : ''}
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
            value={ui.searchValue[ui.tab.current]}
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
                defaultValue={ui.defaultOrderBy[ui.tab.current]}
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
                list={ui.listStatus[ui.tab.current]}
                defaultValue={ui.defaultStatus[ui.tab.current]}
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
                list={ui.listSearch[ui.tab.current]}
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
          loading={ui.list[ui.tab.current] === null}
          total={ui.total[ui.tab.current]}
          onChange={handleOnChangeTableValue}
          resetPage={ui.resetPage}
          list={ui.list[ui.tab.current]}
        >
          <BasicTableComponent headerRows={headerRows[ui.tab.current]} rows={rows} cells={cells[ui.tab.current]}
            loading={<LoadingComponent handleSetData={handleSetData} query={ui.dataTable[ui.tab.current]} tab={ui.tab} />}
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
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_POST")}</Typography>
        {ui.tab.current === ui.tab.admin && <ButtonHook
          color="primary"
          size="small"
          variant="contained"
          disabled={timeout.status}
          style={{ backgroundColor: "#FD5E5D" }}
          onClick={(e) => { e.preventDefault(); handleCreate() }}
          text={Localize.getLocalize('LC_BUTTON_CREATE')}
        />}

      </Box>

      <TabContext value={`${ui.tab.current}`}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label={Localize.getLocalize("LC_FROM_ADMIN")} value={`${ui.tab.admin}`} />
            <Tab label={Localize.getLocalize("LC_FROM_USER")} value={`${ui.tab.user}`} />
          </TabList>
        </Box>
        <TabPanel sx={{ padding: 0 }} value={`${ui.tab.user}`}>{Html(props)}</TabPanel>
        <TabPanel sx={{ padding: 0 }} value={`${ui.tab.admin}`}>{Html(props)}</TabPanel>
      </TabContext>

    </Box>
  );
}

export default ListPostHtml;
