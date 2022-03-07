import React, { Fragment, useState, useEffect } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import {
  Box,
  Typography,
  Tab,
  Button,
  Chip,
  Checkbox,
} from '@material-ui/core';
import {
  TabContext,
  TabList,
  TabPanel,
} from '@material-ui/lab';

import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Localize from "service/localize";
import Helper from 'service/helper'
import UserEnum from 'service/enum/user'
import ImageSlideComponent from 'core/slideImage'

import LoadingComponent from './loading'
import styled from '@emotion/styled';

const CustomChip = styled(Chip)`
  background-color: ${props => props.active === 'true' ? '#e3fffb' : '#ffd6d6'};
  color: ${props => props.active === 'true' ? '#2ca5a0' : '#ed2e2e'}
`

const ListUserHtml = (props) => {
  const { ui, handleOnChangeTableValue, timeout, handleOnRef,
    handleSetData,  handleUpdateChallengePostResult
  } = props
 

  const TitleComponent = (value) => {
    return <p style={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {value}
    </p>
  }

  const ImagComponent = (image, index, row) => {
    return <ImageSlideComponent item={JSON.parse(image)} />
  }
  const headerRows = [
    { value:Localize.getLocalize("LC_POST_ID"),align: "center" },
    { value: Localize.getLocalize("LC_CONTENT") },
    { value: Localize.getLocalize("LC_IMAGE"),align:"center" },
    { value: Localize.getLocalize("LC_NUMBER_OF_LIKE"),align:"center" },
    { value: Localize.getLocalize("LC_NUMBER_OF_COMMENT"),align:"center" },
    { value: Localize.getLocalize("LC_CREATED_AT"),align:"center" },

  ]
  const cells = [
    { field: "postId", align: "center" },
    { field: "title", align: "left", parser: TitleComponent },
    { field: "photos", align: "center", parser: ImagComponent },
    { field: "reactionCount", align: "center" },
    { field: "commentCount", align: "center" },
    { field: "createdAt", align: "center", parser: (value) => { return !Helper.isEmpty(value) ? Helper.getFullDate(value) : "-" } },
  ]

  return (
    <Box>
      {/* <Typography variant="h3" sx={{ marginBottom: '30px' }}>Danh sách người tham gia</Typography> */}
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={`2`}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList aria-label="lab API tabs example">
              <Tab label={Localize.getLocalize("LC_PARTICIPATING_POST")} value={`${UserEnum.USER_TYPE.USER}`} />
            </TabList>
          </Box>
          <TabPanel sx={{ padding: 0 }} value={`${UserEnum.USER_TYPE.USER}`}>
            <Box sx={{ marginTop: '30px' }}>
              <TableComponent
                loading={ui.list === null}
                total={ui.total}
                onChange={handleOnChangeTableValue}
              >
                <BasicTableComponent headerRows={headerRows} rows={ui.list} cells={cells}
                  loading={<LoadingComponent query={ui.dataTable} handleSetData={handleSetData} />}
                  rowHover={true} />

              </TableComponent>

            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default ListUserHtml;
