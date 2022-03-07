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
import ChallengeEnum from 'service/enum/challenge';
import Helper from 'service/helper'
import ButtonHook from "core/hook/button/index.hook"
import LoadingComponent from './loading'
import styled from '@emotion/styled';
import StartDateHook from "core/hook/post/startDateSearch.hook";
import EndDateHook from "core/hook/post/endDateSearch.hook";
import Localize from "service/localize";
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

  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])


  const ShowComponent = (value) => {
    return !Helper.isEmpty(value) ? ChallengeEnum.SHOW_PARSE[value] : <Typography>{"-"}</Typography>
  }

  const StatusComponent = (value) => {
    let styles = {}
    if (value)
      switch (value) {
        case ChallengeEnum.STATUS.NEW:
          styles.color = "#333333"
          styles.backgroundColor = "#D9D9D9"
          break;
        case ChallengeEnum.STATUS.START:
          styles.color = "#FF8000"
          styles.backgroundColor = "#FFE0C1"
          break;
        case ChallengeEnum.STATUS.FINISHED:
          styles.color = "#FF2E2E"
          styles.backgroundColor = "#FFE8E6"
          break;
        case ChallengeEnum.STATUS.RESULT:
          styles.color = "#FF2E2E"
          styles.backgroundColor = "#FFE8E6"
          break;
        case ChallengeEnum.STATUS.APPLY:
          styles.color = "#00A7C6"
          styles.backgroundColor = "#E5FDFF"
          break;
      }
    let temp = !Helper.isEmpty(styles) ? <CustomChip size="small" sx={{ height: "32px", padding: "0px 10px 0px 10px", fontWeight: 400, fontSize: "12px" }} style={styles} label={ChallengeEnum.STATUS_PARSE[value]} /> : <Typography>{"-"}</Typography>
    return temp
  }
  const TitleComponent = (value) => {
    return <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: "300px" }}>
      {value}
    </p>
  }
  const headerRows = [
    { value: Localize.getLocalize("LC_CHALLENGE_NAME"), align: "left" },
    { value: Localize.getLocalize("LC_CHALLENGE_TYPE"), align: "left" },
    { value: Localize.getLocalize("LC_DISPLAY"), align: "left" },
    { value: Localize.getLocalize("LC_STARTDATE"), align: "left" },
    { value: Localize.getLocalize("LC_ENDDATE"), align: "left" },
    { value: Localize.getLocalize("LC_STATUS"), align: "center" },
  ]
  const cells = [
    { field: "title", align: "left", parser: (value) => { return TitleComponent(value) } },
    { field: "challengeType", parser: (value) => { return ChallengeEnum.CHALLENGE_TYPE_PARSE[value] }, align: "left" },
    { field: "show", parser: ShowComponent, align: "left" },
    { field: "startDate", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getDate(value) : "-" }, align: "left" },
    { field: "endDate", parser: (value, indexCell, row) => { return row.show === ChallengeEnum.SHOW.SHOW_BY_TIME && !Helper.isEmpty(value) ? Helper.getDate(value) : "-" }, align: "left" },
    { field: "status", align: "center", parser: StatusComponent },
  ]
  const handleRenderSearchInput = () => {
    switch (ui.searchInput) {
      case 'challenge.startDate':
        return (
          <StartDateHook
            name='searchValue'
            value={[]}
            disabled={timeout.status}
            styleFormControl={{}}
            onRef={handleOnRef}
            onChange={handleOnChangeSearchValue}

          />
        )
        break;
      case 'challenge.endDate':
        return (
          <EndDateHook
            name='searchValue'
            value={[]}
            disabled={timeout.status}
            styleFormControl={{}}
            onRef={handleOnRef}
            onChange={handleOnChangeSearchValue}
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
            handleOnRow={handleRedirectDetail} rowHover={true}
          />

        </TableComponent>

      </>
    )
  }

  return (
    <Box
      sx={{ backgroundColor: "#fff" }}
    >
      <Box sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize('LC_CHALLENGE')}</Typography>
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
