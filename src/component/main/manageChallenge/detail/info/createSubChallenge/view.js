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
import NameHook from "core/hook/createChallengeChild/name.hook";
import DescriptionHook from "core/hook/createChallengeChild/description.hook";
import BonusPointHook from "core/hook/createChallengeChild/bonusPoint.hook";
import ChallengeEnum from 'service/enum/challenge';
import PostLinkHook from "core/hook/createChallengeChild/postLink.hook"
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
    handleOnchangePostLink
  } = props
  return (
    <Box>
      <HeaderComponent
        html={
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3" sx={{ marginBottom: "30px" }}>
              {Localize.getLocalize("LC_SUB_CHAL")}
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
            value={ui.detailSubChallenge && ui.detailSubChallenge.title || ""}
            type="text"
            label={Localize.getLocalize("LC_SUB_CHAL_NAME")}
            error={timeout.field === 'title' ? timeout.message : ''}
            disabled={ui.detailSubChallenge && ui.detailSubChallenge.status === ChallengeEnum.SUB_CHALLENGE_STATUS.APPLY || timeout.status}
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
          {/* <Stack
            direction="row"
            spacing={1}
            sx={{ width: '29%' }}
          >
            <BonusPointHook
              name="point"
              placeholder="Vui lòng nhập số điểm thưởng"
              value={ui.detailSubChallenge && ui.detailSubChallenge.point.toString() || ""}
              type="text"
              label="Số điểm thưởng"
              error={timeout.field === 'point' ? timeout.message : ''}
              disabled={ui.detailSubChallenge && ui.detailSubChallenge.status === ChallengeEnum.SUB_CHALLENGE_STATUS.APPLY || timeout.status}
              styleFormControl={{ margin: 0, minWidth: "230px" }}
              onRef={handleOnRef}
              onChange={handleOnChange}
              fullWidth={false}
              required={true}
            />
          </Stack> */}

          <PostLinkHook
            name='linkUrl'
            list={ui.listPostAdmin}
            defaultValue={ui.defaultLinkUrl}
            label={Localize.getLocalize("LC_RELATED_POST")}
            onChange={handleOnchangePostLink}
            required={false}

          />
        </Stack>

        <Stack direction="row" spacing={1}
          justifyContent="space-around"
          sx={{ width: '100%' }}
        >
          <DescriptionHook
            name="note"
            value={ui.detailSubChallenge && ui.detailSubChallenge.note || ""}
            type="text"
            label={Localize.getLocalize("LC_CONTENT")}
            disabled={timeout.status}
            error={timeout.field === 'note' ? timeout.message : ''}
            styleFormControl={{ maxWidth: '784px' }}
            onRef={handleOnRef}
            onChange={handleOnChange}
            minRows={5}
            maxRows={5}
            fullWidth={true}
            required={true}
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
