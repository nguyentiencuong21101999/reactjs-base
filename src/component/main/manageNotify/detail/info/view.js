import React, { Fragment } from "react";
import { Box, Typography, Button, Stack } from "@material-ui/core";


import Helper from "service/helper";
import PostEnum from "service/enum/post";
import Alert from "@material-ui/core/Alert";
import Localize from "service/localize";
import NotifyEnum from 'service/enum/notify';
import style from "core/hook/button/style";
import RenderContent from "core/ckEditor/render";
const DetailNotifyHTML = (props) => {
  const { ui, timeout, handleOnBack } = props;
  const TargetComponent = (listTarget) => {
    let target = [];
    listTarget.forEach((element) => {
      target.push(PostEnum.TARGET_PARSE[element]);
    });
    return target.join(", ");
  };

  const keyParse = {
    channel: Localize.getLocalize("LC_CHANNEL"),
    title: Localize.getLocalize("LC_TITLE"),
    target: Localize.getLocalize("LC_OBJECT"),
    createdBy: Localize.getLocalize("LC_CREATED_BY")
  };
  const valueParse = {
    channel: (value) => {
      return NotifyEnum.FILTER_PARSE[value];
    },
    title: (value) => {
      return value;
    },
    target: (value) => { return TargetComponent(JSON.parse(value)) },
    createdBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailNotify.createdBy, ui.detailNotify.createdAt) : "-"
    }
  };
  return (
    <>
      <Box>
        <Stack sx={{ width: "100%", typography: "header", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_NOTI")}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }}>
                {Localize.getLocalize("LC_BACK")}
              </Button>
            </Stack>
          </Box>
        </Stack>
        <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: "auto" }}>
          <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
            <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
            {Object.keys(keyParse).map((key, index) => {
              return (
                <Stack key={index} direction="row" spacing={2} sx={{ width: "100%" }}>
                  <Stack direction="column" sx={{ width: "10%" }} spacing={2}>
                    <Typography>{keyParse[key]}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "90%" }} spacing={2}>
                    <Typography> {valueParse[key](ui.detailNotify[key])}</Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
          <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
          <Typography variant="h4">{Localize.getLocalize("LC_CONTENT_NOTI")}</Typography>
            {ui.detailNotify.channel ===  NotifyEnum.FILTER.EMAIL ?   <RenderContent styleFormControl={{width:"784px"}} value={ui.detailNotify.content} /> : !Helper.isEmpty(ui.detailNotify.content) ? <div style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: ui.detailNotify.content }} /> : <Typography>-</Typography>  }
          </Stack>
        </Stack>
      </Box>

      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {Localize.getLocalize(timeout.message)}
        </Alert>
      ) : null}
    </>
  );
};

export default DetailNotifyHTML;
