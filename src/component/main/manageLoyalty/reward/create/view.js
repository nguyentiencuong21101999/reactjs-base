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
import Localize from 'service/localize'
import RewardCountHook from "core/hook/reward/rewardCount.hook";
import BonusCountHook from "core/hook/reward/bonusCount.hook";
import RewardCountInputHook from "core/hook/reward/rewardCountInput.hook";
import BonusCountInputHook from "core/hook/reward/bonusCountInput.hook";
import RewardNameHook from "core/hook/reward/rewardName.hook";
import RewardBonusHook from "core/hook/reward/rewardBonus.hook";
import ContentHook from "core/hook/challenge/content.hook";
import Select from "core/select"
import ButtonHook from "core/hook/button/index.hook"
import RewardEnum from "service/enum/reward";
import style from "core/hook/button/style"
import HeaderComponent from 'component/layout/header'
const EditAdminHTML = (props) => {
  const { ui, timeout, handleSubmit, handleOnBack, handleOnRef, handleOnChange, handleOnChangeRewardCount,
    handleOnChangeBonusCount,
    handleOnChangeRewardType,
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
              {Localize.getLocalize("LC_REWARD")}
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
            <DragAndDrop disabled={ui.detailReward && ui.detailReward.status === RewardEnum.PROMOTION_STATUS.POSTPONE || timeout.status} testMessageId="msgImage" src={!Helper.isEmpty(ui.detailReward) ? ui.detailReward.photos : null} widthResize={328} heightResize={229} onChange={(fileUpload) => { handleOnChangeImage(fileUpload) }} />
          </Box>
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <RewardNameHook
            name="proName"
            value={ui.detailReward && ui.detailReward.proName || ""}
            type="text"
            label={Localize.getLocalize("LC_REWARD_NAME")}
            error={timeout.field === 'title' ? timeout.message : ''}
            disabled={ui.detailReward && ui.detailReward.status === RewardEnum.PROMOTION_STATUS.POSTPONE || timeout.status}
            styleFormControl={{ margin: 0 }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={true}
            required={true}
          />
        </Stack>

        <Stack
          direction="row"
          spacing={2}

        >  <Stack
          direction="column"
          spacing={3}
          sx={{ width: '50%' }}
        >
            <RewardCountHook
              name="isLimit"
              defaultValue={ui.currentRewardCount.value}
              list={ui.rewardCount}
              onChange={handleOnChangeRewardCount}
              disabled={timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "gender" ? timeout.message : ""}
              label={Localize.getLocalize("LC_QTY_REWARD")}
              row={true}
              styleRadio={{ display: "contents" }}
              required={true}
            />
            {ui.currentRewardCount.value === RewardEnum.PROMOTION_LIMIT.LIMITED && (
              <RewardCountInputHook
                name="exchangeCount"
                value={ui.detailReward && ui.detailReward.exchangeCount.toString() || ""}
                type="text"
                label=""
                error={timeout.field === 'title' ? timeout.message : ''}
                disabled={timeout.status}
                styleFormControl={{ maxWidth: "260px", marginTop: "-10px" }}
                onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={true}
              />)}
          </Stack>
          <Stack
            direction="column"
            spacing={3}
            sx={{ width: '50%' }}
          >
            <BonusCountHook
              name=""
              defaultValue={ui.currentBonusCount.value}
              list={ui.bonusCount}
              onChange={handleOnChangeBonusCount}
              disabled={timeout.status}
              onRef={handleOnRef}
              error={timeout.field === "gender" ? timeout.message : ""}
              label={Localize.getLocalize("LC_REDEMPTION_LIMIT")}
              row={true}
              styleRadio={{ display: "contents" }}
              required={true}
            />
            {ui.currentBonusCount.value === RewardEnum.PROMOTION_LIMIT.LIMITED && (
              <BonusCountInputHook
                name="exchangeLimit"
                value={ui.detailReward && ui.detailReward.exchangeLimit.toString() || ""}
                type="text"
                label=""
                error={timeout.field === 'title' ? timeout.message : ''}
                disabled={timeout.status}
                styleFormControl={{ maxWidth: "260px", marginTop: "-10px" }}
                onRef={handleOnRef}
                onChange={handleOnChange}
                fullWidth={true}
                required={true}
              />
            )}
          </Stack>

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
            <RewardBonusHook
              name="requirement"
              value={ui.detailReward && ui.detailReward.requirement.toString() || ""}
              type="text"
              label={Localize.getLocalize("LC_POINT_REQUIRED")}
              error={timeout.field === 'title' ? timeout.message : ''}
              disabled={timeout.status}
              styleFormControl={{ maxWidth: "250px", marginTop: "-10px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              fullWidth={true}
              required={true}
            />
          </Stack>
          <Stack
            direction="column"
            spacing={3}
            sx={{ width: '50%' }}
          >
            <Select
              label={Localize.getLocalize("LC_REWARD_TYPE")}
              list={ui.listShow}
              defaultValue={ui.defaultShow}
              onChange={handleOnChangeRewardType}
              styleFormControl={null}
              disabled={ui.detailReward && ui.detailReward.status === RewardEnum.PROMOTION_STATUS.POSTPONE || timeout.status}
              notOutline={false}
              menuProps={true}
              isRow={false}
              required={true}
              styleFormControl={{ maxWidth: "250px" }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" spacing={3}
          justifyContent="flex-start"
          sx={{ width: '100%' }}
        >
          <ContentHook
            name="note"
            value={ui.detailReward && ui.detailReward.note || ""}
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
      {/* {open ? <Alert color='danger' message={timeout.message} onClose={e=>{e.preventDefault(); setOpen(false)}}/> : null} */}
    </Box>
  );
};

export default EditAdminHTML;
