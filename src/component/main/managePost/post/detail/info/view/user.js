import React from "react";
import { Box, Typography, Tab, Button, Stack, Avatar, Chip } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import style from "core/hook/button/style"
import Helper from "service/helper";
import PostEnum from "service/enum/post";
import Config from "config";
import ImageSlideComponent from 'core/slideImage'
import Localize from "service/localize";
import { ImageModel } from "core/slideImage/model";    
const DetailUserPost = (props) => {
  const { ui, timeout, handleEdit, handleRemovePost, handleOnBack, data } = props;
  const parseHashTag = (arrHashTag) => {
    let temp = "";
    if (arrHashTag[0] != null) {
      arrHashTag.forEach((element) => {
        temp += ` ${element} `;
      });
    }
    return !Helper.isEmpty(temp) ? temp : '-';
  };
  const keyParse = {
    photos: Localize.getLocalize("LC_IMAGE"),
    userId: Localize.getLocalize("LC_ID_ACCOUNT"),
    audience: Localize.getLocalize("LC_MODE"),
    hashTag: Localize.getLocalize("LC_HASHTAG"),
    createdBy: Localize.getLocalize("LC_CREATED_BY"),
    modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
    status: Localize.getLocalize("LC_STATUS"),

  };
  const valueParse = {
    photos: (value) => {
      const arrImg = []
      if (!Helper.isEmpty(value) && JSON.parse(value).length > 0) {
        JSON.parse(value).map((item,index) => {
          arrImg.push(`${Config.urlStatic}${item}`)
        })
      }
      return (!Helper.isEmpty(value) && JSON.parse(value).length > 0) ? <ImageSlideComponent item={arrImg} /> : "-"
    },
    userId: (value) => {
      return value;
    },
    audience: (value) => {
      return PostEnum.SOCIAL_POST_SELECT_AUDIENCE_PARSE[value];

    },
    hashTag: (value) => {

      return !Helper.isEmpty(value) ? parseHashTag(value) : "-";
    },
    createdBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailPost.createdBy, ui.detailPost.createdAt) : "-";
    },
    modifiedBy: (value) => {
      return !Helper.isEmpty(value) ? Helper.handleDateTime(ui.detailPost.modifiedBy, ui.detailPost.modifiedAt) : "-";
    },
    status: (value) => {
      return PostEnum.SOCIAL_POST_STATUS_PARSE[value];
    },
  };
  return (
    <Box>
      <Stack sx={{ width: "100%", typography: "header", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ marginBottom: "30px" }}>
            {Localize.getLocalize("LC_POST")}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button color="info"
              size="small"
              sx={style.buttonBack}
              disabled={false}
              onClick={handleOnBack}>
              {Localize.getLocalize("LC_BUTTON_BACK")}
            </Button>
            {ui.detailPost.status === PostEnum.SOCIAL_POST_STATUS.CREATED_BY_USER && (
              <Button
                color="error"
                size="small"
                variant="outlined"
                // disabled={timeout.status}
                disabled
                sx={style.buttonOutlined}
                onClick={(e) => {
                  e.preventDefault();
                  handleRemovePost();
                }}
              >
                {Localize.getLocalize("LC_BUTTON_REMOVE_POST")}
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: "auto" }}>
        <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
          <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>
          {Object.keys(keyParse).map((key, index) => {
            return (
              <Stack key={index} direction="row" spacing={2} sx={{ width: "100%" }}>
                <Stack direction="column" sx={{ width: "15%" }} spacing={2}>
                  <Typography>{keyParse[key]}</Typography>
                </Stack>
                <Stack direction="column" sx={{ width: "85%" }} spacing={2}>
                  <Stack> {valueParse[key](ui.detailPost[key])}</Stack>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
        <Stack direction="column" spacing={3} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
          <Typography>{Localize.getLocalize("LC_CONTENT")}</Typography>
          <Typography>{ui.detailPost.title || "-"}</Typography>
          {/* {!Helper.isEmpty(ui.detailPost.content) ? <div dangerouslySetInnerHTML={{ __html: ui.detailPost.content }} /> : <Typography>-</Typography>} */}
        </Stack>
      </Stack>
    </Box>
  );
};

export default DetailUserPost;
