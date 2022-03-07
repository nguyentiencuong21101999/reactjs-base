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
import ButtonHook from "core/hook/button/index.hook"
import UserEnum from 'service/enum/user'
import ChallengeEnum from 'service/enum/challenge';
import LoadingComponent from './loading'
import styled from '@emotion/styled';

const CustomChip = styled(Chip)`
  background-color:${props => props.style.backgroundColor}
  color: ${props => props.style.color}
`
const StatusParticipantComponent = (value) => {
  let styles = {}
  if (value)
    switch (value) {
      case ChallengeEnum.USER_CHALLENGE_STATUS.JOINED:
      case ChallengeEnum.USER_CHALLENGE_STATUS.COMPLETE:
        styles.color = "#00A7C6"
        styles.backgroundColor = "#E5FDFF"
        break;
      case ChallengeEnum.USER_CHALLENGE_STATUS.UNDER_REVIEW:
        styles.color = "#333333"
        styles.backgroundColor = "#D9D9D9"
        break;
    }
  let temp = !Helper.isEmpty(styles) ? <CustomChip sx={{ height: "36px", padding: "0px 10px 0px 10px", fontWeight: 400, fontSize: "12px" }} size="small" style={styles} label={ChallengeEnum.USER_CHALLENGE_STATUS_PARSE[value]} /> : <Typography>{"-"}</Typography>
  return temp
}
const ListUserHtml = (props) => {
  const { ui, handleOnChangeTableValue, timeout, handleOnRef,
    handleSetData, handleRedirectDetail, handleChangeTab,
    handleOnChangeOrderBy,
    handleOnChangeStatus,
    handleOnChangeSearch,
    handleOnChangeSearchValue,
    handleSubmitSearch

  } = props
  const headerRows = [
    { value: Localize.getLocalize("LC_ID_ACCOUNT") },
    { value: Localize.getLocalize("LC_FULLNAME") },
    { value: Localize.getLocalize("LC_PHONE") },
    { value: Localize.getLocalize("LC_EMAIL") },
    { value: Localize.getLocalize("LC_EXCUTED_AT") },
    { value: Localize.getLocalize("LC_STATUS") },

  ]

  const [rows, setRows] = useState(null) // Get list by API
  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])

  const cells = [
    { field: "userId", align: "left" },
    { field: "fullName", align: "left" },
    { field: "phoneNumber", align: "left" },
    { field: "email", align: "left" },
    { field: "joinedAt", parser: (value) => { return Helper.getFullDate(value) }, align: "left" },
    { field: "result", parser: StatusParticipantComponent, align: "left" },
  ]

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
            <BasicTableComponent headerRows={headerRows} rows={rows} cells={cells}
              loading={<LoadingComponent query={ui.dataTable} handleSetData={handleSetData} />}
              handleOnRow={handleRedirectDetail} rowHover={true} />

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

export default ListUserHtml;
