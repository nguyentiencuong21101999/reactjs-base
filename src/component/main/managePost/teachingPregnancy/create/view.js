import React, { Fragment } from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
} from "@material-ui/core";
import Alert from '@material-ui/core/Alert';
import DragAndDrop from "core/dragAndDrop/resize";
import Helper from "service/helper";
import TitleHook from "core/hook/teachingPregnancy/title.hook";
import SummaryHook from "core/hook/teachingPregnancy/summary.hook";
import ButtonHook from "core/hook/button/index.hook"
import ContentHook from "core/hook/challenge/content.hook";
import Select from "core/select"
import Localize from "service/localize";
import style from "core/hook/button/style"
import HeaderComponent from 'component/layout/header'
const EditTeachingPregnancyHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnBack, handleOnRef, handleOnChange,
    handleOnChangeSubject,
    handleOnChangeMonth,
    handleOnChangeImage
  } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen((timeout.field === 'all'))
  }, [(timeout.field === 'all')])




  return (
    <Box>
      <HeaderComponent
        html={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_PRENATAL_EDU")}
            </Typography>
            <Stack direction="row" spacing={3}>
              <Button
                color="info"
                size="small"
                disabled={timeout.status}
                sx={style.buttonBack}
                onClick={(e) => { e.preventDefault(); handleOnBack() }}
              >
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>

              <ButtonHook
                text="Lưu"
                color="primary"
                size="small"
                variant="contained"
                disabled={ui.isShowBtn || timeout.status}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={(e) => { e.preventDefault(); handleSubmit() }}
              />
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
          margin: 'auto',
          width: '800px',
          marginTop: "84px"
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ width: '100%' }}
        >
          <Box sx={{ width: '500px', height: '300px', marginBottom: '30px' }}>
            <DragAndDrop disabled={timeout.status} testMessageId="msgImage" src={ui.detailTeachingPregnancy && !Helper.isEmpty(ui.detailTeachingPregnancy.photos) ? ui.detailTeachingPregnancy.photos : null} widthResize={328} heightResize={229} onChange={(fileUpload) => { handleOnChangeImage(fileUpload) }} />
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <TitleHook
            name="title"
            value={ui.detailTeachingPregnancy && ui.detailTeachingPregnancy.title || ""}
            type="text"
            label={Localize.getLocalize("LC_TITLE")}
            error={timeout.field === 'title' ? timeout.message : ''}
            disabled={timeout.status}
            styleFormControl={{ margin: 0 }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={true}
            required={true}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <SummaryHook
            name="summary"
            value={ui.detailTeachingPregnancy && ui.detailTeachingPregnancy.summary || ""}
            type="text"
            label={Localize.getLocalize("LC_SUMMARY")}
            error={timeout.field === 'title' ? timeout.message : ''}
            disabled={timeout.status}
            styleFormControl={{ margin: 0 }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={true}
            required={false}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={2}

        >
          <Stack
            direction="column"
            spacing={3}
            sx={{ width: '50%' }}
          >
            <Select
              label={Localize.getLocalize("LC_WRITE_ABOUT")}
              list={ui.listSubject}
              defaultValue={ui.defaultSubject}
              onChange={handleOnChangeSubject}
              styleFormControl={null}
              disabled={timeout.status}
              notOutline={false}
              isRow={false}
              required={true}
              menuProps={true}
              styleFormControl={{ maxWidth: "250px" }}
            />
          </Stack>
          <Stack
            direction="column"
            spacing={3}
            sx={{ width: '50%' }}
          >
            <Select
              label={Localize.getLocalize("LC_PRENATAL_EDU_FOR")}
              list={ui.listMonth}
              defaultValue={ui.defaultMonth}
              onChange={handleOnChangeMonth}
              styleFormControl={null}
              disabled={timeout.status}
              notOutline={false}
              isRow={false}
              required={true}
              menuProps={true}
              styleFormControl={{ maxWidth: "250px" }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3}
          justifyContent="flex-start"
          sx={{ width: '100%' }}
        >
          <ContentHook
            name="content"
            value={ui.detailTeachingPregnancy && ui.detailTeachingPregnancy.content || ""}
            type="text"
            label={Localize.getLocalize("LC_CONTENT")}
            disabled={timeout.status}
            error={timeout.field === 'content' ? timeout.message : ''}
            styleFormControl={{ maxWidth: '784px' }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            minRows={5}
            maxRows={5}
            fullWidth={true}
            required={true}
            isDefaultBtn={ui.isDefaultBtn}
            isContentUpdate={ui.isContentUpdate}
          />

        </Stack>

      </Stack>
      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {/* {Localize.getLocalize(timeout.message)} */}
          {timeout.message}
        </Alert>
      ) : null}

    </Box>
  );
};

export default EditTeachingPregnancyHTML;
