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
import Select from "core/select"
import SearchHook from "core/hook/listUser/search.hook"
import TitleSearchHook from "core/hook/notification/titleSearch.hook"
import Localize from "service/localize";
import Helper from 'service/helper'
import LoadingComponent from './loading'
import NotifyEnum from 'service/enum/notify';
import ButtonHook from "core/hook/button/index.hook"
import DateHook from "core/hook/post/date.hook";
import styled from '@emotion/styled';

const CustomChip = styled(Chip)`
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`
const ListNotifyReceivedHtml = (props) => {
  const { ui, handleOnChangeTableValue, handleOnChangeOrderBy, timeout, handleOnRef,
    handleOnChangeSearchValue, handleOnChangeStatus, handleOnChangeSearch,
    handleSetData, handleSubmitSearch, handleCreate, handleChangeTab
  } = props
  const headerRows = [
    { value: Localize.getLocalize("LC_CHANNEL"), align: "left" },
    { value: Localize.getLocalize("LC_TITLE"), align: "left" },
    { value: Localize.getLocalize("LC_SENT_TO"), align: "left" },
    { value: Localize.getLocalize("LC_TIME"), align: "center" },
    { value: Localize.getLocalize("LC_STATUS"), align: "center" },
  ]

  const [rows, setRows] = useState(null) //Use to loading data when have API
  // const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])
  const StatusComponent = (value) => {
    let styles = {}
    switch (value) {
      case NotifyEnum.NOTIFY_STATUS.SUCCESS:
        styles.color = "#00A7C6"
        styles.backgroundColor = "#E5FDFF"
        break;
      default:
        styles.color = "#FD5E5D"
        styles.backgroundColor = "#FFE8E6"
        break;
      // case PostEnum.SOCIAL_POST_STATUS.ACCEPTED_BY_ADMIN:
      //   styles.color = "#00A7C6"
      //   styles.backgroundColor = "#E5FDFF"
      //   break;
    }
    let temp = !Helper.isEmpty(styles) ? <CustomChip size="small" sx={{ height: "32px", padding: "0px 8px 0px 8px", fontWeight: 400, fontSize: "12px" }} style={styles} label={value === NotifyEnum.NOTIFY_STATUS.SUCCESS ? NotifyEnum.NOTIFY_STATUS_PARSE[NotifyEnum.NOTIFY_STATUS.SUCCESS] : NotifyEnum.NOTIFY_STATUS_PARSE[NotifyEnum.NOTIFY_STATUS.FAILED]
    } /> : <Typography>{"-"}</Typography >
    return temp
  }
  const ChannelComponent = (value) => {
    return NotifyEnum.FILTER_PARSE[value]
  }
  const TitleComponent = (value) => {
    return value
    // return <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: "250px" }}>
    //   {value}
    // </p>
  }
  const sendToComponent = (value) => {
    return <p style={{
      maxWidth: "300px", wordWrap: "break-word"
    }
    }>
      {value}
    </p >
  }
  const cells = [
    { field: "channel", align: "left", parser: ChannelComponent },
    { field: "title", align: "left", parser: TitleComponent },
    { field: "sendTo", align: "left", parser: sendToComponent },
    { field: "createdAt", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" }, align: "center" },
    { field: "status", parser: StatusComponent, align: "center", },

  ]
  const handleRenderSearchInput = () => {

    switch (ui.searchInput) {
      //case 'logs.cif':
      case 'logs.createdAt':
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
            value={ui.searchValue}
            onChange={handleOnChangeSearchValue}
            isChangeSearch={ui.isChangeSearch}
            disabled={timeout.status}
            onRef={handleOnRef}
            error={timeout.field === "search" ? Localize.getLocalize(timeout.message) : null}
            heightInput={'36px'}
            styleFormControl={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}
          />
        )
    }
  }


  return (
    <Box
      sx={{ backgroundColor: "#fff" }}
    >
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
                onClick={handleSubmitSearch}
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
            handleOnRow={() => { }} rowHover={true} />

        </TableComponent>

      </>
    </Box>
  );
}

export default ListNotifyReceivedHtml;
