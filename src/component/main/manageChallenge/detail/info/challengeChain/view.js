import React, { Fragment, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Link,
  Button
} from '@material-ui/core';
import TableApplyChallengeComponent from 'core/table/basic';
import TableDraftChallengeComponent from 'core/table/basic';
import ChallengeEnum from 'service/enum/challenge';
import PositionMissionComponent from './positionMission';
import CollapseComponent from 'core/hook/createChallengeChild/collapse.hook'
import style from "core/hook/button/style"
import Localize from "service/localize";
const View = (props) => {
  const { ui, timeout,
    handleCreateMission,
    handleRedirectDetailSubChallenge,
    handleApproveSubChallenge,
    handleRemoveMission,
    handleRedirectDetailMission,
    handleChangePositionMissionSuccess,
    handleShowVertical,
    handleHiddenVertical
  } = props

  //const [rows, setRows] = useState(null) //Use to loading data when have API
  const [rows, setRows] = useState([])

  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])
  const parseBtnRemoveMission = (value, index, row) => {
    return < Button
      color="error"
      size="small"
      variant="outlined"
      disabled={timeout.status}
      sx={style.buttonOutlined}
      onClick={(e) => { e.preventDefault(); handleRemoveMission(row); }}
    > {Localize.getLocalize("LC_DELETE")}</Button>

  }
  const TitleComponent = (value) => {
    return <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', width: "300px" }}>
      {value}
    </p>
  }
  const headerRows = [
    { value: Localize.getLocalize("LC_MISSION_TYPE"), align: "left" },
    { value: Localize.getLocalize("LC_DESCRIPTION"), align: "left" },
    { value: Localize.getLocalize("LC_ACTION"), align: "left" },
  ]
  const cellsApply = [
    { field: "missionType", parser: (value) => { return ChallengeEnum.MISSION_TYPE_PARSE[value] }, align: "left" },
    { field: "missionTitle", parser: (value) => { return TitleComponent(value) }, align: "left" },
    { field: "active", parser: (value) => { return value }, align: "left" },
  ]
  const cellsDraft = [
    { field: "missionType", parser: (value) => { return ChallengeEnum.MISSION_TYPE_PARSE[value] }, align: "left" },
    { field: "missionTitle", parser: (value) => { return TitleComponent(value) }, align: "left" },
    { field: "missionType", parser: parseBtnRemoveMission, align: "left", style: { position: "relative", zIndex: 2 } },
  ]
  const headerCollapsible = (item, index) => {
    return (
      <>
        <Stack direction="column">
          <Stack direction="row" spacing={1}>
            <Typography variant="h6"> #{index + 1} - {ChallengeEnum.SUB_CHALLENGE_STATUS_PARSE[item.status]}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "720px" }} variant="h6"> {item.title}  </Typography>
            <Link component="button" sx={{
              color: "#0094D8", textDecoration: "none"
            }} onClick={(e) => { e.preventDefault(); handleRedirectDetailSubChallenge(item) }}>
              {Localize.getLocalize("LC_VIEW_DETAIL")}
            </Link>
            {item.status === ChallengeEnum.SUB_CHALLENGE_STATUS.DRAFT ?
              <Link
                component="button"
                sx={{ color: "#0094D8", textDecoration: "none" }}
                onClick={(e) => { e.preventDefault(); handleApproveSubChallenge(index, item) }}>|  {Localize.getLocalize("LC_APPLY")}
              </Link> :
              null}
          </Stack>
        </Stack>
      </>
    )
  }
  const contentCollapsible = (item, index) => {
    return (
      <>
        {item.status === ChallengeEnum.SUB_CHALLENGE_STATUS.APPLY ?
          <TableApplyChallengeComponent headerRows={headerRows} rows={item.missions} cells={cellsApply}
            handleOnRow={handleRedirectDetailMission}
            rowHover={true} /> :
          <TableDraftChallengeComponent headerRows={headerRows} rows={item.missions} cells={cellsDraft}
            handleOnRow={handleRedirectDetailMission}
            rowHover={true} />
        }

        <Stack direction="row" spacing={3}
          justifyContent="flex-start"
          alignItems='center'
          sx={{ width: '100%', marginTop: "10px" }}
        >
          {item.status === ChallengeEnum.SUB_CHALLENGE_STATUS.DRAFT && item.missions.length > 1 && < Button
            color="info"
            size="small"
            variant="outlined"
            disabled={timeout.status}
            style={style.buttonOutlined}
            onClick={(e) => { e.preventDefault(); handleShowVertical(index) }}
          >
            {Localize.getLocalize("LC_CHANGE_ORDER")}
          </Button>}
          {item.status === ChallengeEnum.SUB_CHALLENGE_STATUS.DRAFT && < Button
            color="info"
            size="small"
            variant="outlined"
            disabled={timeout.status}
            style={style.buttonOutlined}
            onClick={(e) => { e.preventDefault(); handleCreateMission(item) }}
          >
            {Localize.getLocalize("LC_ADD_MISSION")}
          </Button>}

        </Stack>
        <Stack sx={{ marginTop: "10px" }}>
          {
            item.status === ChallengeEnum.SUB_CHALLENGE_STATUS.DRAFT
            && item.missions.length > 1 && ui.isIndexShowVertical === index &&
            <PositionMissionComponent
              list={item.missions}
              challengeId={item.challengeId}
              handleChangePositionMissionSuccess={handleChangePositionMissionSuccess}
              handleHiddenVertical={handleHiddenVertical}
            />
          }
        </Stack >
      </>
    )
  }
  return (
    <>

      {ui.detailSubChallenge.length > 0 ? ui.detailSubChallenge.map((item, index) =>
      (
        <Stack direction="column" key={index} spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: 'auto' }}>
          <CollapseComponent headerCollapsible={headerCollapsible(item, index)}
            contentCollapsible={contentCollapsible(item, index)}
          />
        </Stack>
      )
      ) : (
        <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: 'auto' }}>
          <Stack direction="column" spacing={3} sx={{ p: 2, width: '100%', maxWidth: 'calc(100vw - 400px)', bgcolor: 'transparent', boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 10px' }}>
            <Typography align="center" > {Localize.getLocalize("LC_NO_DATA")} </Typography>
          </Stack>
        </Stack>
      )

      }

    </>
  );
}

export default View;
