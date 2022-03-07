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
import Localize from "service/localize";
import Helper from 'service/helper'

import LoadingComponent from './loading'
import styled from '@emotion/styled';
import RewardEnum from 'service/enum/reward'
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
  // const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])

  const StatusComponent = (value) => {
    let styles = {}
    switch (value) {
      case RewardEnum.PROMOTION_STATUS.NEW:
        styles.color = "#333333"
        styles.backgroundColor = "#D9D9D9"
        break;
      case RewardEnum.PROMOTION_STATUS.APPLIED:
        styles.color = "#00A7C6"
        styles.backgroundColor = "#E5FDFF"
        break;
      case RewardEnum.PROMOTION_STATUS.POSTPONE:
        styles.color = "#FF2E2E"
        styles.backgroundColor = "#FFE8E6"
        break;
    }
    let temp = !Helper.isEmpty(styles) ? <CustomChip sx={{ height: "32px", padding: "0px 10px 0px 10px", fontWeight: 400, fontSize: "12px" }} size="small" style={styles} label={RewardEnum.PROMOTION_STATUS_PARSE[value]} /> : <Typography>{"-"}</Typography>
    return temp
  }

  const ProNameComponent = (value) => {
    return <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: "300px" }}>
      {value}
    </p>
  }
  const ProTypeComponent = (value) => {
    return !Helper.isEmpty(value) ? RewardEnum.PROMOTION_TYPE_PARSE[value] : <Typography>{"-"}</Typography>
  }
  const ExchangeLimitComponent = (value, indexCell, row) => {

    return value === RewardEnum.PROMOTION_LIMIT.UNLIMITED ? `Không giới hạn` : row["exchangeCount"]
  }
  const headerRows = [
    { value: Localize.getLocalize("LC_REWARD_NAME"), align: "left" },
    { value: Localize.getLocalize("LC_REWARD_TYPE"), align: "left" },
    { value: Localize.getLocalize("LC_REWARD_REST"), align: "center" },
    { value: Localize.getLocalize("LC_STATUS"), align: "center" },
    { value: Localize.getLocalize("LC_MODIFIED_AT"), align: "left" },
  ]
  const cells = [
    { field: "proName", align: "left", parser: (value) => { return ProNameComponent(value) } },
    { field: "proType", parser: ProTypeComponent, align: "left" },
    { field: "isLimit", parser: ExchangeLimitComponent, align: "center" },
    { field: "status", parser: StatusComponent, align: "center" },
    { field: "modifiedAt", align: "left", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" } },
  ]
  const handleRenderSearchInput = () => {
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
    >
      <Box sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_REWARD")}</Typography>
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

      {Html(props)}
    </Box>
  );
}

export default ListPostHtml;
