import React from "react";
import { Helmet } from "react-helmet";
import { Box, Typography, Tab, Button, Stack, Avatar, Chip, Link, typographyClasses } from "@material-ui/core";
import HelperService from "service/helper";
import ChallengeEnum from "service/enum/challenge";
import TeachingPregnancyEnum from "service/enum/teachingPregnancy";
import ImageSlideComponent from "core/slideImage";
import ButtonHook from "core/hook/button/index.hook"
import Localize from "service/localize";
import style from "core/hook/button/style";
import RenderContent from "core/ckEditor/render";
import { ImageModel } from "core/slideImage/model";   
const View = (props) => {
  const { ui, timeout, handleEdit, handleOnBack } = props;
  const keyParse = {
    photos: Localize.getLocalize("LC_COVER_IMAGE"),
    title: Localize.getLocalize("LC_TITLE"),
    summary: Localize.getLocalize("LC_SUMMARY"),
    pregnancySubject: Localize.getLocalize("LC_WRITE_ABOUT"),
    pregnancyMonth: Localize.getLocalize("LC_PRENATAL_EDU_FOR"),
    createdBy: Localize.getLocalize("LC_CREATED_BY"),
    modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
  };
  const valueParse = {
    photos: (value) => {
      return !HelperService.isEmpty(value) ? (<ImageSlideComponent item={[value]} />) : "-"
    },
    title: (value) => {
      return value;
    },
    status: (value) => {
      return ChallengeEnum.SUB_CHALLENGE_STATUS_PARSE[ui.detailSubChallenge.status];
    },
    summary: (value) => {
      return !HelperService.isEmpty(value) ? value : "-";
    },
    pregnancySubject: (value) => {
      return TeachingPregnancyEnum.SUBJECT_PARSE[value];
    },
    pregnancyMonth: (value) => {
      return `Tháng ${value}`;
    },
    createdBy: (value) => {
      return !HelperService.isEmpty(value) ? HelperService.handleDateTime(ui.detailTeachingPregnancy.createdBy, ui.detailTeachingPregnancy.createdAt) : "-"
    },
    modifiedBy: (value) => {
      return !HelperService.isEmpty(value) ? HelperService.handleDateTime(ui.detailTeachingPregnancy.modifiedBy, ui.detailTeachingPregnancy.modifiedAt) : "-"
    },
  };
  return (
    <Box
    // sx={{ backgroundColor: "#fff" }}
    >
      <Stack sx={{ width: "100%", typography: "header", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ marginBottom: "30px" }}>
            {Localize.getLocalize("LC_PRENATAL_EDU")}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              color="info"
              size="small"
              disabled={timeout.status}
              sx={style.buttonBack}
              onClick={(e) => { e.preventDefault(); handleOnBack() }}>
              {Localize.getLocalize("LC_BUTTON_BACK")}
            </Button>
            <ButtonHook
              text={Localize.getLocalize("LC_BUTTON_EDIT")}
              color="primary"
              size="small"
              variant="contained"
              disabled={timeout.status}
              style={{ backgroundColor: "rgb(253, 94, 93)" }}
              onClick={(e) => {
                e.preventDefault();
                handleEdit();
              }}
            />
          </Stack>
        </Box>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: "auto" }}>
        <Stack direction="column" spacing={5} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
          <Stack>
            {Object.keys(keyParse).map((key, index) => {
              return (
                <Stack key={index} direction="row" spacing={2} sx={{ width: "100%", marginBottom: "20px" }}>
                  <Stack direction="column" sx={{ width: "12%" }} spacing={2}>
                    <Typography>{keyParse[key]}</Typography>
                  </Stack>
                  <Stack direction="column" sx={{ width: "85%" }} spacing={2}>
                    <Stack> {valueParse[key](ui.detailTeachingPregnancy[key])} </Stack>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
          <Typography>{Localize.getLocalize("LC_CONTENT_POST")}</Typography>
          {/* {!HelperService.isEmpty(ui.detailTeachingPregnancy.content) ? <div dangerouslySetInnerHTML={{ __html: ui.detailTeachingPregnancy.content }} /> : <Typography>-</Typography>} */}
          <RenderContent styleFormControl={{width:"784px"}} value={ui.detailTeachingPregnancy.content} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default View;
