import React, { Fragment, useState, useEffect } from 'react'
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

import LoadingComponent from './loading'
import styled from '@emotion/styled';
import RewardEnum from 'service/enum/reward';
import HelperService from 'service/helper';
import ButtonHook from "core/hook/button/index.hook"

const CustomChip = styled(Chip)`
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`
const ListHistoryPointHtml = (props) => {
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
    const ActionComponent = (value) => {
      return RewardEnum.HISTORY_ACTION_TYPE_PARSE[value];
    }
    const PointComponent = (value, indexCell, row) => {
      switch (row.action) {
        case RewardEnum.HISTORY_ACTION_TYPE.EXCHANGE:
          return `- ${value}`
        default:
          return `+ ${value}`
      }
    }
    const headerRows = [
      { value: Localize.getLocalize("LC_ACTION") },
      { value: Localize.getLocalize("LC_DESCRIPTION") },
      { value: Localize.getLocalize("LC_SCORE") },
      { value: Localize.getLocalize("LC_TIME") }

    ]
    const cells = [
      { field: "action", parser: ActionComponent, align: "left" },
      { field: "description", align: "left" },
      { field: "point", parser: PointComponent, align: "left" },
      { field: "modifiedAt", parser: (value) => { return !HelperService.isEmpty(value) ? HelperService.getFullDate(value) : "-" }, align: "left" },

    ]
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
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={`2`}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          </Box>
          <TabPanel sx={{ padding: 0 }} value={`${UserEnum.USER_TYPE.USER}`}>{Html(props)}</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default ListHistoryPointHtml;
