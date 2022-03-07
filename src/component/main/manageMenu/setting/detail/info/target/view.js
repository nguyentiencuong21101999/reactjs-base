import React, { Fragment, useState, useEffect } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Box, Typography, Tab, Button, Chip, Stack } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";

import BasicTableComponent from "core/table/basic";
import Helper from "service/helper";
import UserEnum from "service/enum/user";
import PostEnum from "service/enum/post";
import LoadingComponent from "./loading";
import styled from "@emotion/styled";
import MenuEnum from "service/enum/menu";
import style from "core/hook/button/style"
import Localize from 'service/localize'

const CustomChip = styled(Chip)`
  background-color:${(props) => props.style.backgroundColor}
  color: ${(props) => props.style.color}
`;

const ListTargetSettingHtml = (props) => {
  const { ui, timeout, handleOnRef, handleSetData, handleRedirectDetail, handleEdit, handleCreate } = props;

  const [rows, setRows] = useState(null); // Get list by API

  useEffect(() => {
    setRows(ui.list);
  }, [ui.list]);

  const ActiveComponent = (value, indexCell, row, index) => {
    return (
      <Button
        color="info"
        size="small"
        variant="outlined"
        disabled={timeout.status}
        style={{ ...style.buttonOutlined, minWidth: "100px" }}
        onClick={(e) => {
          e.preventDefault();
          handleEdit(row, index);
        }}
      >
        {Localize.getLocalize("LC_UPDATE")}
      </Button>
    );
  };
  const TargetComponent = (value, indexCell, row, index) => {

    switch (ui.list[index].menuSettingTargetType) {
      case MenuEnum.MENU_SETTING_TARGET_TYPE.MOM:
        let target = [];
        JSON.parse(ui.list[index].target).forEach((element) => {
          target.push(PostEnum.TARGET_PARSE[element]);
        });
        return target.join(", ");
      case MenuEnum.MENU_SETTING_TARGET_TYPE.BABY:
        return !Helper.isEmpty(ui.list[index].monthTo)
          ? `${Localize.getLocalize("LC_BABY_FROM")} ${ui.list[index].monthFrom} - ${ui.list[index].monthTo} ${Localize.getLocalize("LC_MONTH_OLD")} `
          : `${Localize.getLocalize("LC_BABY_FROM")} ${ui.list[index].monthFrom}  ${Localize.getLocalize("LC_MONTH_OLD")} `
    }
  };
  const PhysicalConditionComponent = (listPhysicalCondition) => {
    let physicalCondition = [];

    listPhysicalCondition.forEach((element) => {
      physicalCondition.push(MenuEnum.MENU_SETTING_TARGET_PHYSICAL_CONDITION_PARSE[element]);
    });

    return physicalCondition.join(", ");
  };

  const headerRows = [
    { value: Localize.getLocalize("LC_OBJECT") },
    { value: Localize.getLocalize("LC_BMI") },
    { value: Localize.getLocalize("LC_PHYSICAL_CONDITION") },
    { value: Localize.getLocalize("LC_MODIFIED_BY") },
    { value: Localize.getLocalize("LC_MODIFIED_AT") },
    { value: Localize.getLocalize("LC_ACTION") }];
  const cells = [
    {
      field: "menuSettingTargetId",
      parser: TargetComponent,
      align: "left",
    },
    {
      field: "menuSettingBmiTarget",
      parser: (value) => {
        return MenuEnum.MENU_SETTING_BMI_TARGET_PARSE[value];
      },
      align: "left",
    },
    {
      field: "physicalCondition",
      parser: (value) => {
        return !Helper.isEmpty(value) && JSON.parse(value).length > 0 ? PhysicalConditionComponent(JSON.parse(value)) : "-";
      },
      align: "left",
    },
    { field: "modifiedBy", align: "left" },
    {
      field: "modifiedAt",
      parser: (value) => {
        return Helper.getFullDate(value);
      },
      align: "left",
    },
    { field: "menuSettingTargetId", parser: ActiveComponent, align: "left" },
  ];

  const Html = (props) => {
    return (
      <>
        <BasicTableComponent headerRows={headerRows} rows={rows} cells={cells} loading={<LoadingComponent query={ui.dataTable} handleSetData={handleSetData} />} handleOnRow={() => { }} rowHover={true} />
        <Button color="info" size="small" variant="outlined" disabled={timeout.status} sx={{ ...style.buttonOutlined, minWidth: "100px", marginTop: "10px" }} onClick={(e) => { e.preventDefault(); handleCreate() }}>
          {Localize.getLocalize("LC_ADD_OBJECT")}
        </Button>
      </>
    );
  };

  return (
    <Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={`2`}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          </Box>
          <TabPanel sx={{ padding: 0 }} value={`${UserEnum.USER_TYPE.USER}`}>
            {Html(props)}
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default ListTargetSettingHtml;
