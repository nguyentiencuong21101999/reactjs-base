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

import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Localize from "service/localize";
import Helper from 'service/helper'

import ChallengeEnum from 'service/enum/challenge';
import style from "core/hook/button/style"

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
        styles.color = "#333333"
        styles.backgroundColor = "#D9D9D9"
        break;
      case ChallengeEnum.USER_CHALLENGE_STATUS.COMPLETE:
        styles.color = "#00A7C6"
        styles.backgroundColor = "#E5FDFF"
        break;
      case ChallengeEnum.USER_CHALLENGE_STATUS.UNCOMPLETED:
        styles.color = "#FF2E2E"
        styles.backgroundColor = "#FFE8E6"
        break;
    }
  let temp = !Helper.isEmpty(styles) ? <CustomChip sx={{ height: "36px", padding: "0px 10px 0px 10px", fontWeight: 400, fontSize: "12px" }} size="small" style={styles} label={ChallengeEnum.USER_CHALLENGE_STATUS_PARSE[value]} /> : <Typography>{"-"}</Typography>
  return temp
}

const ListUserHtml = (props) => {
  const { ui, handleOnChangeTableValue, timeout, handleOnRef,
    handleSetData, handleEdit,

  } = props

  const [rows, setRows] = useState(null)

  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])
  const ActiveComponent = (value, indexCell, row, index) => {
    return ui.detailChallenge.status != ChallengeEnum.STATUS.RESULT ? <Button
      color="info"
      size="small"
      variant="outlined"
      disabled={timeout.status}
      style={{ ...style.buttonOutlined, minWidth: "100px" }}
      onClick={(e) => { e.preventDefault(); handleEdit(row) }}
    >
      {Localize.getLocalize("LC_UPDATE")}
    </Button> : "-"

  }
  const headerRows = [
    { value: Localize.getLocalize("LC_PRIZE_NAME") },
    { value: Localize.getLocalize("LC_RANK_APPLY"), align: "center" },
    { value: Localize.getLocalize("LC_BONUS_POINT"), align: "center" },
    { value: Localize.getLocalize("LC_INFO_ABOUT_PRIZE") },
    { value: Localize.getLocalize("LC_MODIFIED_BY") },
    { value: Localize.getLocalize("LC_MODIFIED_AT") },
    { value: Localize.getLocalize("LC_ACTION") },
  ]
  const cells = [
    { field: "title", align: "left" },
    { field: "rank", align: "center" },
    { field: "point", align: "center" },
    { field: "reward", align: "left" },
    { field: "modifiedBy", align: "left" },
    { field: "modifiedAt", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" }, align: "left" },
    { field: "rewardId", parser: ActiveComponent, align: "left" },
  ]
  return (
    <Box sx={{ marginTop: '30px' }}>
      <TableComponent
        loading={ui.list === null}
        total={ui.total}
        onChange={handleOnChangeTableValue}
      >
        <BasicTableComponent headerRows={headerRows} rows={rows} cells={cells}
          loading={<LoadingComponent query={ui.dataTable} handleSetData={handleSetData} />}
          handleOnRow={() => { }} rowHover={true} />

      </TableComponent>

    </Box>

  );
}

export default ListUserHtml;
