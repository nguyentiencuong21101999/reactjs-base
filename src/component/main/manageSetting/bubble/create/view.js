import React, { Fragment } from "react";

import { Box, Typography, Button, Stack } from "@material-ui/core";
import Alert from "@material-ui/core/Alert";
import DragAndDrop from "core/dragAndDrop/resize";
import Helper from "service/helper";
import ContentHook from "core/hook/setting/content.hook";
import ButtonHook from "core/hook/button/index.hook";
import style from "core/hook/button/style"
import Select from "core/select";
import MultiSelect from "core/select/multi";
import FromTimeHook from "core/hook/setting/fromTime.hook";
import ToTimeHook from "core/hook/setting/toTime.hook";
import Localize from "service/localize";
import HeaderComponent from 'component/layout/header'
const CreateBubbleHtml = (props) => {
  const { ui, data, timeout, handleSubmit, handleOnBack, handleOnRef, handleOnChange, handleOnChangeRedirectTo, handleOnChangeTarget, handleOnClick } = props;

  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(timeout.field === "all");
  }, [timeout.field === "all"]);
  return (
    <Box
    >
      <HeaderComponent
        html={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_BUBBLE")}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button color="info" size="small" disabled={timeout.status} sx={style.buttonBack} onClick={(e) => { e.preventDefault(); handleOnBack() }}>
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>

              <ButtonHook text={Localize.getLocalize("LC_BUTTON_SAVE")}
                color="primary" size="small"
                variant="contained" disabled={ui.isShowBtn || timeout.status}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={(e) => { e.preventDefault(); handleSubmit() }} />
            </Stack>
          </Box>
        }
      />


      <Stack
        direction="column"
        spacing={3}
        justifyContent="center"
        sx={{
          p: 3,
          width: "auto",
          bgcolor: "transparent",
          boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px",
          margin: "auto",
          width: "800px",
          marginTop: "84px"
        }}
      >
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={3} sx={{ width: "48%" }}>
            <FromTimeHook
              name='timeStart'
              value={ui.detailBubble && new Date(`${Helper.getYearMonthDate(data['timeStart'])} ${Helper.getTimeFormat(data['timeStart'])}`) || ""}
              label={Localize.getLocalize("LC_TIME_SLOT_FROM")}
              disabled={!Helper.isEmpty(data["timeStart"]) && !Helper.isEmpty(data["timeEnd"]) ||
                !Helper.isEmpty(data["timeStart"]) && ui.isShowTimeStart
              }
              error={timeout.field === 'timeStart' ? timeout.message : ''}
              styleFormControl={{ width: "250px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              maxDate={new Date()}
              required={true}
              onClick={handleOnClick}
            />
          </Stack>
          <Stack direction="row" sx={{ width: "52%" }} spacing={3}>
            <ToTimeHook
              name='timeEnd'
              valueCheck={data["timeStart"]}
              value={ui.detailBubble && new Date(`${Helper.getYearMonthDate(data['timeEnd'])} ${Helper.getTimeFormat(data['timeEnd'])}`) || ""}
              label={Localize.getLocalize("LC_TO")}
              disabled={Helper.isEmpty(data["timeStart"])}
              error={timeout.field === 'timeEnd' ? timeout.message : ''}
              isHiddenErr={ui.isHiddenErr}
              styleFormControl={{ width: "250px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              maxDate={new Date()}
              required={true}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={3} sx={{ width: "48%" }}>
            <Select label={Localize.getLocalize("LC_DIRECT")}
              list={ui.listRedirectTo}
              defaultValue={ui.defaultRedirectTo}
              onChange={handleOnChangeRedirectTo}
              styleFormControl={null}
              disabled={timeout.status}
              notOutline={false}
              isRow={false} required={true}
              styleFormControl={{ width: "250px" }} />
          </Stack>
          <Stack direction="row" spacing={3} sx={{ width: "52%" }}>
            <MultiSelect
              label={Localize.getLocalize("LC_OBJECT")}
              list={ui.listTarget}
              defaultValue={ui.defaultTarget}
              styleFormControl={{ minWidth: "250px" }}
              onChange={handleOnChangeTarget}
              disabled={(ui.isContentUpdate && ui.detailChallenge.status !== ChallengeEnum.STATUS.NEW) || timeout.status}
              notOutline={false}
              // fullWidth={true}
              isRow={false}
              required={true}
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={3} justifyContent="space-around" sx={{ width: "100%" }}>
          <ContentHook name="content"
            value={(ui.detailBubble && ui.detailBubble.content) || ""}
            type="text" label={Localize.getLocalize("LC_CONTENT")} error={timeout.field === "title" ? timeout.message : ""}
            disabled={timeout.status} styleFormControl={{ margin: 0 }}
            onRef={handleOnRef} onChange={handleOnChange} fullWidth={true}
            required={true} />
        </Stack>
      </Stack>
      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {/* {Localize.getLocalize(timeout.message)} */}
          {timeout.message}
        </Alert>
      ) : null}
      {/* {open ? <Alert color='danger' message={timeout.message} onClose={e=>{e.preventDefault(); setOpen(false)}}/> : null} */}
    </Box>
  );
};

export default CreateBubbleHtml;
