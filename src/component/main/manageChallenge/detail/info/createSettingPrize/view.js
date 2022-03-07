import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Button
} from '@material-ui/core';
import NameHook from "core/hook/settingPrize/name.hook";
import GiftHook from "core/hook/settingPrize/gift.hook";
import RankHook from "core/hook/settingPrize/rank.hook";
import BonusPoint from "core/hook/settingPrize/bonusPoint.hook";
import ButtonHook from "core/hook/button/index.hook"
import style from "core/hook/button/style"
import HeaderComponent from 'component/layout/header'
import Localize from "service/localize";
const View = (props) => {
  const { ui, timeout,
    handleOnRef,
    handleOnChange,
    handleOnBack,
    handleSubmit,
  } = props
  return (
    <Box>
      <HeaderComponent
        html={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_PRIZE")}
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
                disabled={!ui.isShowBtn || timeout.status}
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
          width: '870px',
          height: "auto",
          marginTop: "84px"
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <NameHook
            name="title"
            value={ui.detailChallenge && ui.detailChallenge.title || ""}
            type="text"
            label={Localize.getLocalize("LC_PRIZE_NAME")}
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
          justifyContent="flex-start"
          sx={{ width: '100%' }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ width: '50%' }}
          >
            <RankHook
              name="rank"
              value={ui.detailChallenge && ui.detailChallenge.rank.toString() || ""}
              type="text"
              label={Localize.getLocalize("LC_RANK_APPLY")}
              error={timeout.field === 'point' ? timeout.message : ''}
              disabled={timeout.status}
              styleFormControl={{ margin: 0, minWidth: "230px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              fullWidth={false}
              required={true}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={1}
          >
            <BonusPoint
              name="point"
              value={ui.detailChallenge && ui.detailChallenge.point.toString() || ""}
              type="text"
              label={Localize.getLocalize("LC_BONUS_POINT")}
              error={timeout.field === 'point' ? timeout.message : ''}
              disabled={timeout.status}
              styleFormControl={{ margin: 0, minWidth: "230px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              fullWidth={false}
              required={true}
            />
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <GiftHook
            name="reward"
            value={ui.detailChallenge && ui.detailChallenge.reward || ""}
            type="text"
            label={Localize.getLocalize("LC_INFO_ABOUT_PRIZE")}
            error={timeout.field === 'title' ? timeout.message : ''}
            disabled={timeout.status}
            styleFormControl={{ margin: 0 }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            fullWidth={true}
            required={false}
          />
        </Stack>

      </Stack>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-around"
        sx={{ width: '100%' }}
      >

      </Stack>
      {timeout.field === "all" ? (
        <Alert severity="error" style={{ fontSize: "18px" }}>
          {/* {Localize.getLocalize(timeout.message)} */}
          {timeout.message}
        </Alert>
      ) : null}
    </Box>
  );
}

export default View;
