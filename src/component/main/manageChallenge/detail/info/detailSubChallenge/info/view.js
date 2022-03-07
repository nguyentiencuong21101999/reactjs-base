import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Typography,
  Tab,
  Button,
  Stack,
} from '@material-ui/core';
import Localize from "service/localize";
import HelperService from 'service/helper';
import ChallengeEnum from 'service/enum/challenge';
import ButtonHook from "core/hook/button/index.hook"
import style from "core/hook/button/style"
const View = (props) => {
  const { ui, timeout, handleEdit, handleOnBack, handleRemove } = props
  const keyParse = {
    title: Localize.getLocalize("LC_SUB_CHAL_NAME"),
    status: Localize.getLocalize("LC_STATUS"),
    posts: Localize.getLocalize("LC_RELATED_POST"),

  }
  const valueParse = {
    title: (value) => { return value },
    status: (value) => { return ChallengeEnum.SUB_CHALLENGE_STATUS_PARSE[ui.detailSubChallenge.status] },
    posts: (value) => {
      return !HelperService.isEmpty(value) && value.length > 0 ? value.map((element, index) => {
        return (
          <Stack direction="row" sx={{ width: '100%', marginBottom: '10px' }} key={index} spacing={1}>
            <Typography> {element.title}</Typography>
          </Stack>
        )
      }) : "-"
    }
  }
  return (
    <Box
    // sx={{ backgroundColor: "#fff" }}
    >
      <Stack sx={{ width: '100%', typography: 'header', display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ marginBottom: '30px' }}>{Localize.getLocalize("LC_SUB_CHAL")}</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              color="info"
              size="small"
              disabled={timeout.status}
              sx={style.buttonBack}
              onClick={(e) => { e.preventDefault(); handleOnBack() }}
            >
              {Localize.getLocalize("LC_BUTTON_BACK")}
            </Button>
            <Button
              color="error"
              size="small"
              variant="outlined"
              disabled={timeout.status}
              sx={style.buttonOutlined}
              onClick={(e) => { e.preventDefault(); handleRemove() }}
            >
              {Localize.getLocalize("LC_DELETE")}
            </Button>

            <ButtonHook
              text={Localize.getLocalize("LC_BUTTON_EDIT")}
              color="primary"
              size="small"
              variant="contained"
              disabled={timeout.status}
              style={{ backgroundColor: "rgb(253, 94, 93)" }}
              onClick={(e) => { e.preventDefault(); handleEdit() }}
            />
          </Stack>
        </Box>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: 'auto' }}>
        <Stack direction="column" spacing={5} sx={{ p: 4, width: '100%', maxWidth: 'calc(100vw - 400px)', bgcolor: 'transparent', boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 10px' }}>
          <Stack>
            {
              Object.keys(keyParse).map((key, index) => {
                return (
                  <Stack key={index} direction="row" spacing={2} sx={{ width: '100%', marginBottom: "20px" }}>
                    <Stack direction="column" sx={{ width: "20%" }} spacing={2}>
                      <Typography>{keyParse[key]}</Typography>
                    </Stack>
                    <Stack direction="column" sx={{ width: "80%" }} spacing={2}>
                      <Stack> {valueParse[key](ui.detailSubChallenge[key])}</Stack>
                    </Stack>
                  </Stack>
                )
              })
            }
          </Stack>
        </Stack>
        <Stack direction="column" spacing={3} sx={{ p: 4, width: '100%', maxWidth: 'calc(100vw - 400px)', bgcolor: 'transparent', boxShadow: 'rgb(0 0 0 / 10%) 0px 3px 10px' }}>
          <Typography>{Localize.getLocalize("LC_CONTENT")}</Typography>
          {!HelperService.isEmpty(ui.detailSubChallenge.note) ? <div dangerouslySetInnerHTML={{ __html: ui.detailSubChallenge.note }} /> : <Typography>-</Typography>}
        </Stack>
      </Stack>
    </Box>
  );
}

export default View;
