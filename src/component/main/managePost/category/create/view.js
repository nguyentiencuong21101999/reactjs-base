import React, { Fragment } from "react";

import {
  Box,
  Typography,
  Tab,
  Button,
  Stack,
  Avatar,
  Chip,
} from "@material-ui/core";
import Alert from '@material-ui/core/Alert';
import DragAndDrop from "core/dragAndDrop/resize";
import Helper from "service/helper";
import RewardCountHook from "core/hook/reward/rewardCount.hook";
import CategoryNameHook from "core/hook/category/categoryName.hook";
import Select from "core/select"
import ButtonHook from "core/hook/button/index.hook"
import Localize from "service/localize";
import style from "core/hook/button/style"
import HeaderComponent from 'component/layout/header'
const EditHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnBack, handleOnRef, handleOnChange, handleOnChangeStatus,
    handleOnChangeTarget,
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
              {Localize.getLocalize("LC_CATEGORY")}
            </Typography>
            <Stack direction="row" spacing={3}>

              <Button
                size="small"
                disabled={timeout.status}
                sx={style.buttonBack}
                onClick={(e) => { e.preventDefault(); handleOnBack() }}
              >
                {Localize.getLocalize("LC_BUTTON_BACK")}
              </Button>

              <ButtonHook
                text={Localize.getLocalize("LC_BUTTON_SAVE")}
                color="primary"
                size="small"
                variant="contained"

                disabled={ui.isShowBtn || timeout.status}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={(e) => { e.preventDefault(); handleSubmit() }}
              />
            </Stack>
          </Box>}
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
            <DragAndDrop disabled={timeout.status}
              testMessageId="msgImage"
              src={!Helper.isEmpty(ui.detailCategory) ? ui.detailCategory.icon : null}
              // widthResize={328}
              // heightResize={229}
              onChange={(fileUpload) => { handleOnChangeImage(fileUpload) }}
            />
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <CategoryNameHook
            name="name"
            value={ui.detailCategory && ui.detailCategory.name || ""}
            type="text"
            label={Localize.getLocalize("LC_CATEGORY_NAME")}
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
          spacing={2}>
          <Stack
            direction="column"
            spacing={3}
            sx={{ width: '50%' }}
          >
            <Select
              label={Localize.getLocalize("LC_OBJECT")}
              list={ui.listCategory}
              defaultValue={ui.defaultCategory}
              onChange={handleOnChangeTarget}
              styleFormControl={null}
              disabled={timeout.status}
              notOutline={false}
              isRow={false}
              required={true}
              styleFormControl={{ maxWidth: "250px" }}
            />

          </Stack>

          <Stack
            direction="column"
            spacing={3}
            sx={{ width: '50%' }}
          >
            <RewardCountHook
              name="status"
              defaultValue={ui.defaultStatus.value}
              list={ui.listStatus}
              onChange={handleOnChangeStatus}
              disabled={timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "gender" ? timeout.message : ""}
              label={Localize.getLocalize("LC_STATUS")}
              row={true}
              styleRadio={{ display: "contents" }}
              required={true}
            />
          </Stack>

        </Stack>

      </Stack>
    </Box>
  );
};

export default EditHTML;
