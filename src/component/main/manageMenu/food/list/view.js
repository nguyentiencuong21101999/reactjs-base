import React, { Fragment, useState, useEffect } from 'react'
import { Redirect, Switch, Route } from "react-router-dom";
import {
  Box,
  Typography,
  Stack
} from '@material-ui/core';
import TableComponent from 'core/table';
import BasicTableComponent from 'core/table/basic';
import Select from "core/select"
import SearchHook from "core/hook/listUser/search.hook"
import Helper from 'service/helper'
import MenuEnum from "service/enum/menu";
import LoadingComponent from './loading'
import ButtonHook from "core/hook/button/index.hook"
import Localize from "service/localize";

const FoodHtml = (props) => {
  const { ui, handleOnChangeTableValue, handleOnChangeOrderBy, timeout, handleOnRef,
    handleOnChangeSearchValue, handleOnChangeSearch,
    handleSetData, handleSubmitSearch, handleCreate, handleRedirectDetail, handleOnChangeStatus
  } = props
  const [rows, setRows] = useState(null)
  useEffect(() => {
    setRows(ui.list)
  }, [ui.list])

  const SuitableForComponent = (list) => {
    let subFoodList = []
    list.map((item) => {
      if (subFoodList.length === 0) {
        subFoodList.push(MenuEnum.FOOD_PARSE[item]);
      } else {
        subFoodList = [subFoodList, MenuEnum.FOOD_PARSE[item]].join(", ");
      }
    })
    return subFoodList
  }
  const headerRows = [
    { value: Localize.getLocalize("LC_FOOD_NAME"), align: "left" },
    { value: Localize.getLocalize("LC_SUITABLE"), align: "left" },
    { value: Localize.getLocalize("LC_MODIFIED_BY"), align: "left" },
    { value: Localize.getLocalize("LC_AT"), align: "left" },
  ]
  const cells = [
    { field: "foodName", align: "left", parser: (value) => { return value } },
    { field: "suitableFor", align: "left", parser: (value) => { return SuitableForComponent(JSON.parse(value)) } },
    { field: "modifiedBy", align: "left" },
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
                label={Localize.getLocalize("LC_SUITABLE")}
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
      sx={{ backgroundColor: "#fff" }}
    >
      <Box sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_FOOD")}</Typography>
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

export default FoodHtml;
