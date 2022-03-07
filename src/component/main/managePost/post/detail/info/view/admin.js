import React from "react";

import { Box, Typography, Tab, Button, Stack, Avatar, Chip, Link } from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import Helper from "service/helper";
import PostEnum from "service/enum/post";
import Localize from "service/localize";
import ButtonHook from "core/hook/button/index.hook";
import ImageSlideComponent from "core/slideImage";
import Config from "config";
import style from "core/hook/button/style";
import RenderContent from "core/ckEditor/render";
import { ImageModel } from "core/slideImage/model";
const DetailAdminPost = (props) => {
  const { ui, timeout, handleEditAdminPost, handleChangeStatus, data, handleApproveAdminPost, handleEditTarget, handleOnBack, handleSendNotification } = props;
  const isShowApproveBtn = () => {
    return ui.detailPost.status == PostEnum.SOCIAL_POST_STATUS.CREATED_BY_ADMIN || ui.detailPost.status == PostEnum.SOCIAL_POST_STATUS.UPDATED_BY_ADMIN;
  };

  const isCreatedByOtherAdmin = () => {
    return ui.profile.userId != ui.detailPost.userId;
  };

  const isCreatedByAdmin = () => {
    return ui.profile.userId == ui.detailPost.userId;
  };

  const TargetComponent = (listTarget) => {
    let temp = [];
    const list = (ui.defaultTarget = listTarget.map((item) => {
      return ui.listTarget.find((target) => target.value == item.targetMeijiId);
    }));
    list.forEach((item) => {
      if (temp.length === 0) {
        temp.push(item.text);
      } else {
        temp = [temp, item.text].join(", ");
      }
    });
    const display =
      temp.length > 0  ? (
        <Stack direction="row" spacing={2}>
          <Typography>{temp}</Typography>
          {isCreatedByAdmin() &&  ui.detailPost.topic != PostEnum.TOPIC.CHALLENGE && (
            <Link
              sx={{ color: "#1290FF", textDecorationColor: "#1290FF" }}
              component="button"
              onClick={(e) => {
                e.preventDefault();
                handleEditTarget();
              }}
            >
              {Localize.getLocalize("LC_BUTTON_CHANGE")}
            </Link>
          )}
        </Stack>
      ) : (
        <Typography>{"-"}</Typography>
      );
    return display;
  };
  const ShowComponent = (value) => {
    switch (value) {
      case PostEnum.SHOW.SHOW_BY_START_DATE:
        return `${Localize.getLocalize("LC_FIXED_FROM")} ${Helper.getDate(ui.detailPost.startDate)}`;
      case PostEnum.SHOW.SHOW_BY_START_AND_END_DATE:
        return `${Localize.getLocalize("LC_DURATION_FROM")} ${Helper.getDate(ui.detailPost.startDate)}  
          - ${Helper.getDate(ui.detailPost.endDate)}`;
      default:
        return PostEnum.SHOW_PARSE[value];
    }
  };
  const ToDoListComponent = (listToDoList) => {
    let temp = [];
    listToDoList.map((item, index) => {
      if (temp.length === 0) {
        temp.push(
          <Stack key={index} direction="row">
            {item}
          </Stack>
        );
      } else {
        temp = [
          temp,
          <Stack key={index} direction="row">
            {item}
          </Stack>,
        ];
      }
    });
    return (
      <Stack direction="column" spacing={1}>
        {temp}
      </Stack>
    );
  };
  let keyParse = null;
  switch (ui.detailPost.topic) {
    case PostEnum.TOPIC.KNOW:
      keyParse = {
        photos: Localize.getLocalize("LC_COVER_IMAGE"),
        title: Localize.getLocalize("LC_TITLE"),
        summary: Localize.getLocalize("LC_SUMMARY"),
        topic:Localize.getLocalize("LC_TOPIC"),
        categoryName: Localize.getLocalize("LC_POST_TYPE"),
        show: Localize.getLocalize("LC_DISPLAY"),
        targetPost: Localize.getLocalize("LC_OBJECT"),
        showInInjectSchedule: Localize.getLocalize("LC_POST_IN_INJECT_SCHEDULE"),
        toDoList: Localize.getLocalize("LC_TODO_LIST"),
        createdBy: Localize.getLocalize("LC_CREATED_BY"),
        modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
        status: Localize.getLocalize("LC_STATUS"),
      };
      break;
    case PostEnum.TOPIC.CHALLENGE:
      keyParse = {
        photos: Localize.getLocalize("LC_COVER_IMAGE"),
        title: Localize.getLocalize("LC_TITLE"),
        summary: Localize.getLocalize("LC_SUMMARY"),
        topic:Localize.getLocalize("LC_TOPIC"),
        titleChallenge:Localize.getLocalize("LC_CHALLENGE"),
        targetPost: Localize.getLocalize("LC_OBJECT"),
        createdBy: Localize.getLocalize("LC_CREATED_BY"),
        modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
        status: Localize.getLocalize("LC_STATUS"),
      };
      break;
    case PostEnum.TOPIC.OTHER:
      keyParse = {
        photos: Localize.getLocalize("LC_COVER_IMAGE"),
        title: Localize.getLocalize("LC_TITLE"),
        summary: Localize.getLocalize("LC_SUMMARY"),
        topic:Localize.getLocalize("LC_TOPIC"),
        targetPost: Localize.getLocalize("LC_OBJECT"),
        createdBy: Localize.getLocalize("LC_CREATED_BY"),
        modifiedBy: Localize.getLocalize("LC_MODIFIED_BY"),
        status: Localize.getLocalize("LC_STATUS"),
      };
      break;
    default:
      break;
  }
  const valueParse = {
    photos: (value) => {
      return !Helper.isEmpty(value) && JSON.parse(value).length > 0 ? <ImageSlideComponent item={[`${Config.urlStatic}${JSON.parse(value)}`]} /> : "-";
    },
    title: (value) => {
      return !Helper.isEmpty(value) ? value : "-";
    },
    summary: (value) => {
      return !Helper.isEmpty(value) ? value : "-";
    },
    topic:(value) =>{
      return !Helper.isEmpty(value) ? PostEnum.TOPIC_PARSE[value] : "-";
    },
    titleChallenge:(value)=>{
      return !Helper.isEmpty(value) ? value : "-";
    },
    categoryName: (value) => {
      return !Helper.isEmpty(value) ? value : "-";
    },

    show: (value) => {
      return !Helper.isEmpty(value) ? ShowComponent(value) : "-";
    },
    targetPost: (value) => {
      return !Helper.isEmpty(value) ? TargetComponent(value) : "-";
    },
    showInInjectSchedule: (value) => {
      return !Helper.isEmpty(value) ? PostEnum.SHOW_IN_INJECT_SCHEDULE_PARSE[value] : "-";
    },
    toDoList: (value) => {
      return !Helper.isEmpty(value) && JSON.parse(value).length > 0 ? ToDoListComponent(JSON.parse(value)) : "-";
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
    <Box
    // sx={{ backgroundColor: "#fff" }}
    >
      <Stack sx={{ width: "100%", typography: "header", display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3" sx={{ marginBottom: "30px" }}>
            {Localize.getLocalize("LC_POST")}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              color="info"
              size="small"
              disabled={timeout.status}
              onClick={(e) => {
                e.preventDefault();
                handleOnBack();
              }}
              sx={style.buttonBack}
            >
              {Localize.getLocalize("LC_BUTTON_BACK")}
            </Button>
            {ui.detailPost.status === PostEnum.SOCIAL_POST_STATUS.ACCEPTED_BY_ADMIN && (
              <ButtonHook
                color="error"
                size="small"
                variant="contained"
                disabled={timeout.status}
                style={{ backgroundColor: "#FFE8E6", border: "none", color: "#FD5E5D" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleSendNotification();
                }}
                text={Localize.getLocalize("LC_BUTTON_SEND_NOTI")}
              />
            )}

            {isShowApproveBtn() && isCreatedByOtherAdmin() && (
              <Button
                color="info"
                size="small"
                variant="outlined"
                disabled={timeout.status}
                style={style.buttonOutlined}
                onClick={(e) => {
                  e.preventDefault();
                  handleApproveAdminPost();
                }}
              >
                {Localize.getLocalize("LC_BUTTON_APPROVE_POST")}
              </Button>
            )}

            {isCreatedByAdmin() && (
              <ButtonHook
                text={Localize.getLocalize("LC_BUTTON_EDIT")}
                color="primary"
                size="small"
                variant="contained"
                disabled={timeout.status}
                style={{ backgroundColor: "rgb(253, 94, 93)" }}
                onClick={(e) => {
                  e.preventDefault();
                  handleEditAdminPost();
                }}
              />
            )}
          </Stack>
        </Box>
      </Stack>
      <Stack direction="column" spacing={2} sx={{ p: 1, backgroundColor: "#fff", margin: "auto" }}>
        <Stack direction="column" spacing={2} sx={{ p: 4, width: "100%", maxWidth: "calc(100vw - 400px)", bgcolor: "transparent", boxShadow: "rgb(0 0 0 / 10%) 0px 3px 10px" }}>
          <Typography variant="h4"> {Localize.getLocalize("LC_GENERAL_INFO")} </Typography>{" "}
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
          {/* {!Helper.isEmpty(ui.detailPost.content) ? <div style={{ wordWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: ui.detailPost.content }} /> : <Typography>-</Typography>} */}
          <RenderContent styleFormControl={{ width: "784px" }} value={ui.detailPost.content} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default DetailAdminPost;
