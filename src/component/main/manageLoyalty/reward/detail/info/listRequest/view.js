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

import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Select from "core/select"
import SearchHook from "core/hook/listUser/search.hook"
import Localize from "service/localize";
import Helper from 'service/helper'
import UserEnum from 'service/enum/user'
import FullNameSearchHook from 'core/hook/reward/listRequest/fullNameSearch.hook'
import PhoneNumberSearchHook from 'core/hook/reward/listRequest/phoneNumberSearch.hook'
import style from "core/hook/button/style"
import LoadingComponent from './loading'
import styled from '@emotion/styled';
import RewardEnum from 'service/enum/reward';
import ButtonHook from "core/hook/button/index.hook"

const CustomChip = styled(Chip)`
  background-color:${props => props.style.backgroundColor}
  color: ${props => props.style.color}
`
const StatusParticipantComponent = (value) => {
  let styles = {}
  if (value)
    switch (value) {
      case RewardEnum.PROMOTION_REQUEST_STATUS.NEW:
        styles.color = "#333333"
        styles.backgroundColor = "#D9D9D9"
        break;
      case RewardEnum.PROMOTION_REQUEST_STATUS.PROCESSING:
        styles.color = "#FF8000"
        styles.backgroundColor = "#FFE0C1"
        break;
      case RewardEnum.PROMOTION_REQUEST_STATUS.DONE:
        styles.color = "#00A7C6"
        styles.backgroundColor = "#E5FDFF"
        break;
    }
  let temp = !Helper.isEmpty(styles) ? <CustomChip size="small" sx={{ height: "36px", padding: "0px 10px 0px 10px", fontWeight: 400, fontSize: "12px" }} style={styles} label={RewardEnum.PROMOTION_REQUEST_STATUS_PARSE[value]} /> : <Typography>{"-"}</Typography>
  return temp
}

const ListUserHtml = (props) => {
  const { ui, handleOnChangeTableValue, timeout, handleOnRef,
    handleSetData, handleRedirectDetail, handleChangeTab,
    handleOnChangeOrderBy,
    handleOnChangeStatus,
    handleOnChangeSearch,
    handleOnChangeSearchValue,
    handleSubmitSearch,
    handleUpdateListRequest

  } = props

  const Html = (props) => {

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
              isChangeSearch={ui.isChangeSearch}
              disabled={timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "search" ? Localize.getLocalize(timeout.message) : null}
              heightInput={'36px'}
              styleFormControl={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}
            />
          );
      }
    }
    const BtnComponent = (value, indexCell, row, index) => {
      return (
        row['status'] !== RewardEnum.PROMOTION_REQUEST_STATUS.DONE && <Button
          color="info"
          size="small"
          variant="outlined"
          disabled={timeout.status}
          sx={{ ...style.buttonOutlined, minWidth: "100px" }}
          onClick={(event) => { event.preventDefault(); handleUpdateListRequest(event, row, index) }}
        >
          {Localize.getLocalize("LC_UPDATE")}
        </Button>
      )
    }
    const RequestIdComponent = (value) => {
      return < p style={{ WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', wordWrap: "break-word", maxWidth: "100px" }}>
        {value}
      </p >

    }
    const headerRows = [
      { value: Localize.getLocalize("LC_ID_CUSTOMER_REWARD") },
      { value: Localize.getLocalize("LC_ID_ACCOUNT") },
      { value: Localize.getLocalize("LC_FULLNAME") },
      { value: Localize.getLocalize("LC_EMAIL") },
      { value: Localize.getLocalize("LC_PHONE") },
      { value: Localize.getLocalize("LC_STATUS") },
      { value: Localize.getLocalize("LC_MODIFIED_AT") },
      { value: Localize.getLocalize("LC_ACTION") },

    ]
    const cells = [
      { field: "requestId", parser: RequestIdComponent, align: "left" },
      { field: "userId", align: "left" },
      { field: "fullName", align: "left" },
      { field: "email", align: "left" },
      { field: "phoneNumber", align: "left" },
      { field: "status", parser: StatusParticipantComponent, align: "left" },
      { field: "modifiedAt", parser: (value) => { return Helper.getFullDate(value) }, align: "left" },
      { field: "requestId", parser: BtnComponent, align: "left" },
    ]
    return (
      <>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: "flex-start", typography: 'body', margin: '20px 0' }}>
          <Stack direction="row" spacing={2}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Stack direction="row" spacing={2}>
              <Select
                label={Localize.getLocalize("LC_SORT")}
                list={ui.listOrderBy}
                defaultValue={ui.defaultOrderBy}
                onChange={handleOnChangeOrderBy}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
              />

              <Select
                label={Localize.getLocalize("LC_STATUS")}
                list={ui.listStatus}
                defaultValue={ui.defaultStatus}
                onChange={handleOnChangeStatus}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
              />
            </Stack>

            <Stack direction="row" spacing={2}>
              <Select
                label={Localize.getLocalize("LC_SEARCH_BY")}
                list={ui.listSearch}
                defaultValue={ui.defaultSearch}
                onChange={handleOnChangeSearch}
                styleFormControl={null}
                disabled={timeout.status}
                notOutline={true}
              />

              {renderSearch()}

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
        <Box sx={{ marginTop: '30px' }}>
          <TableComponent
            loading={ui.list === null}
            total={ui.total}
            onChange={handleOnChangeTableValue}
          >
            <BasicTableComponent headerRows={headerRows} rows={ui.list} cells={cells}
              loading={<LoadingComponent query={ui.dataTable} handleSetData={handleSetData} />}
              handleOnRow={() => { }} rowHover={true} />

          </TableComponent>

        </Box>
      </>
    )
  }

  return (
    <Box>
      {/* <Typography variant="h3" sx={{ marginBottom: '30px' }}>Danh sách người tham gia</Typography> */}
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={`2`}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {/* <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
              <Tab label="Người tham gia" value={`${UserEnum.USER_TYPE.USER}`} />
            </TabList> */}
          </Box>
          <TabPanel sx={{ padding: 0 }} value={`${UserEnum.USER_TYPE.USER}`}>{Html(props)}</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default ListUserHtml;
