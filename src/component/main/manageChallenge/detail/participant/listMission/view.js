import React, { Fragment, useState, useEffect } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import {
  Box,
  Typography,
  Tab,
  Button,
  Chip,
  Checkbox,
  Stack
} from '@material-ui/core';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@material-ui/lab';

import Config from 'config'
import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Select from "core/select"
import SearchHook from "core/hook/listUser/search.hook"
import Localize from "service/localize";
import Helper from 'service/helper'
import UserEnum from 'service/enum/user'
import ChallengeEnum from 'service/enum/challenge'
import ButtonHook from "core/hook/button/index.hook"
import LoadingComponent from './loading'
import styled from '@emotion/styled';
import style from "core/hook/button/style"

import { ImageModel } from "core/slideImage/model";  
import ImageSlideComponent from 'core/slideImage'
const CustomChip = styled(Chip)`
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`

const ListUserHtml = (props) => {
  const { ui, handleOnChangeTableValue, timeout, handleOnRef,
    handleSetData, handleUpdateChallengePostResult,
    handleOnChangeOrderBy,
    handleOnChangeStatus,
    handleOnChangeSearch,
    handleOnChangeSearchValue,
    handleSubmitSearch,
    handleUpdateMissionResult
  } = props


  const TitleComponent = (value) => {
    return <p style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {value}
    </p>
  }
  const btnUpdateComponent = (value, indexCell, row, index) => {
    const handleOnChange = (e) => {
      handleUpdateMissionResult(index, row)
    }

    return row.status === ChallengeEnum.USER_CHALLENGE_MISSION_STATUS.UNDER_REVIEW ? (

      <Button
        color="info"
        size="small"
        variant="outlined"
        disabled={timeout.status}
        style={{ ...style.buttonOutlined, minWidth: "100px" }}
        onClick={handleOnChange}
      >
        {Localize.getLocalize("LC_UPDATE")}
      </Button>
    ) : (<Typography>{"-"}</Typography>)
  }

  const missionContentComponent = (value, indexCell, row) => {
    const listImgAndVideo = []
    if(row.resultType === ChallengeEnum.MISSION_RESULT_TYPE.MANUAL && row.missionType === ChallengeEnum.MISSION_TYPE.CLIP_OR_PIC ){
      if(Helper.isArray(JSON.parse(value))){
        JSON.parse(value).map((item,index) =>{
            listImgAndVideo.push(item)
        })
      }
      return   listImgAndVideo.length > 0 ?  <ImageSlideComponent item={listImgAndVideo} /> : "-" 
    }
   
  }
  const headerRows = [
    { value: Localize.getLocalize("LC_MISSION_ID") },
    { value: Localize.getLocalize("LC_MISSION") },
    { value: Localize.getLocalize("LC_DATA_NEED_CHECK"),align:"center" },
    { value: Localize.getLocalize("LC_RESULT") },
    { value: Localize.getLocalize("LC_RESULT_MODIFIED_BY") },
    { value: Localize.getLocalize("LC_ACTION") },

  ]
  const cells = [
    { field: "missionId", align: "left", parser: TitleComponent },
    { field: "missionTitle", align: "left", },
    { field: "missionContent", align: "center", parser: missionContentComponent },
    { field: "status", align: "left", parser: (value) => { return ChallengeEnum.USER_CHALLENGE_MISSION_STATUS_PARSE[value] } },
    { field: "modifiedBy", align: "left", parser: (value) => { return !Helper.isEmpty(value) ? value : "-" } },
    { field: "missionId", align: "left", parser: btnUpdateComponent }
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
                onClick={handleSubmitSearch}
              />
            </Box>

          </Stack>
        </Box>
        <Box sx={{ marginTop: '30px' }}>
          <TableComponent
            loading={ui.list === null}
            total={ui.total}
            onChange={handleOnChangeTableValue}
            resetPage={ui.resetPage}
          >
            <BasicTableComponent headerRows={headerRows} rows={ui.list} cells={cells}
              loading={<LoadingComponent query={ui.dataTable} handleSetData={handleSetData} />}
              rowHover={true} />
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
            <TabList aria-label="lab API tabs example">
              <Tab label={Localize.getLocalize("LC_PARTICIPATING_PROCESS")} value={`${UserEnum.USER_TYPE.USER}`} />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: 0 }} value={`${UserEnum.USER_TYPE.USER}`}>{Html(props)}</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default ListUserHtml;
