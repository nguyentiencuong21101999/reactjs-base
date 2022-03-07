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
import TypeHook from "core/hook/menu/category/type.hook";
import ClassificationNameHook from "core/hook/menu/category/classificationName.hook";
import MenuEnum from "service/enum/menu";
import Select from "core/select"
import ButtonHook from "core/hook/button/index.hook"
import RewardEnum from "service/enum/reward";
import ContentHook from "core/hook/menu/category/content.hook";
import style from "core/hook/button/style"
import Localize from "service/localize";
import HeaderComponent from 'component/layout/header'
const CategoryHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnBack, handleOnRef, handleOnChange, handleOnchangeType,
    handleOnChangeCategory,
    handleOnChangeImage
  } = props;

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen((timeout.field === 'all'))
  }, [(timeout.field === 'all')])

  return (
    <Box >
      <HeaderComponent
        html={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_CATEGORY")}
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
                text={Localize.getLocalize("LC_BUTTON_SAVE")}
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
            <DragAndDrop
              disabled={timeout.status}
              testMessageId="msgImage"
              src={!Helper.isEmpty(ui.detailCategory) ? ui.detailCategory.photos : null}
              widthResize={328}
              heightResize={229}
              onChange={(fileUpload) => { handleOnChangeImage(fileUpload) }} />
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={2}

        >  <Stack
          direction="column"
          spacing={3}
          sx={{ marginLeft: "5%", width: '50%' }}
        >
            <TypeHook
              name="menuCategoryType"
              defaultValue={ui.defaultType.value}
              list={ui.listType}
              onChange={handleOnchangeType}
              disabled={ui.isUpdate || timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "gender" ? timeout.message : ""}
              label={Localize.getLocalize("LC_TYPE")}
              row={true}
              styleRadio={{ marginTop: "15px" }}
              required={true}
            />
          </Stack>
          <Stack
            direction="column"
            spacing={3}
            sx={{ width: '50%' }}
          >
            {
              ui.defaultType.value === MenuEnum.CATEGORY_TYPE.CLASSIFICATION && (
                <Stack
                  direction="column"
                  spacing={3}
                  sx={{ width: '100%' }}
                >
                  <Select
                    label={Localize.getLocalize("LC_CATALOG")}
                    list={ui.listCategory}
                    defaultValue={ui.defaultCategory}
                    onChange={handleOnChangeCategory}
                    styleFormControl={null}
                    disabled={ui.detailReward && ui.detailReward.status === RewardEnum.PROMOTION_STATUS.POSTPONE || timeout.status}
                    notOutline={false}
                    isRow={false}
                    required={true}
                    menuProps={true}
                    styleFormControl={{ maxWidth: "250px" }}
                  />
                </Stack>

              )
            }

          </Stack>

        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-start"
          sx={{ marginLeft: "5%", width: '100%', }}

        >
          <ClassificationNameHook
            label={Localize.getLocalize("LC_NAME")}
            styleStack={{ marginLeft: "5%", marginRight: "5%" }}
            name="menuCategoryName"
            value={ui.detailCategory && ui.detailCategory.menuCategoryName || ""}
            type="text"
            error={timeout.field === 'title' ? timeout.message : ''}
            disabled={timeout.status}
            styleFormControl={{ margin: 0 }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={true}
            required={true}
          />

        </Stack>
        <Stack direction="row" spacing={3}
          justifyContent="flex-start"
          sx={{ marginLeft: "5%", width: '100%', }}
        >
          <ContentHook
            name="description"
            placeholder=""
            value={ui.detailCategory && !Helper.isEmpty(ui.detailCategory.description) ? ui.detailCategory.description : "" || ""}
            styleStack={{ marginLeft: "5%" }}
            type="text" label={Localize.getLocalize("LC_DESCRIPTION")}
            error={timeout.field === "title" ? timeout.message : ""}
            disabled={timeout.status}
            styleFormControl={{ marginRight: "5%", fontSize: "16px", height: "auto", width: "700px", maxWidth: "700px", marginBottom: "10px" }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={false}
            required={false} />
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

export default CategoryHTML;
