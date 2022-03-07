import React, { Component } from "react";
import moment from "moment";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import PostEnum from "service/enum/post";
import RouteEnum from "service/enum/route";
import Localize from "service//localize";
import DialogEnum from "service/enum/dialog";
import DialogModel from "component/layout/dialog/model";
import { IconLogout } from "assets/images/user/Logout.svg";
import Config from "config";

import View from "component/main/managePost/post/detail/edit/view";
import { ModelView, ModelRequest, ModelRequestTargetPost } from "./model";
import HelperService from "service/helper";
import ModelTable from "core/table/model";

class EditPostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleForbidden: this.handleForbidden.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
        handleUpdateTargetPostSuccees: this.handleUpdateTargetPostSuccees.bind(this),
        handleUpdatePostSuccees: this.handleUpdatePostSuccees.bind(this),
        handleRequestSuccess: this.handleUploadImageSucess.bind(this),
        handleGetListCategoryAndChallenge: this.handleGetListCategoryAndChallenge.bind(this),
      },
      data: new ModelView(),
      ui: {
        responseListChallenge:null,
        data: {},
        listCategoryId: null,
        defaultCategoryId: null,
        listChallenge: null,
        defaultChallenge: null,
        listTarget: [
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.PLANNING_A_PREGNANCY],
            value: PostEnum.TARGET.PLANNING_A_PREGNANCY,
          },
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.PREGNANCY_TRACKING],
            value: PostEnum.TARGET.PREGNANCY_TRACKING,
          },
          {
            text: PostEnum.TARGET_PARSE[PostEnum.TARGET.HAD_A_BABY],
            value: PostEnum.TARGET.HAD_A_BABY,
          },
        ],
        defaultTarget: [],
        listShow: [
          {
            text: PostEnum.SHOW_PARSE[PostEnum.SHOW.HIDDEN],
            value: PostEnum.SHOW.HIDDEN,
          },
          {
            text: PostEnum.SHOW_PARSE[PostEnum.SHOW.SHOW_BY_START_DATE],
            value: PostEnum.SHOW.SHOW_BY_START_DATE,
          },
          {
            text: PostEnum.SHOW_PARSE[PostEnum.SHOW.SHOW_BY_START_AND_END_DATE],
            value: PostEnum.SHOW.SHOW_BY_START_AND_END_DATE,
          },
        ],
        defaultShow: {},
        listTopic: [
          {
            text: PostEnum.TOPIC_PARSE[PostEnum.TOPIC.KNOW],
            value: PostEnum.TOPIC.KNOW,
          },
          {
            text: PostEnum.TOPIC_PARSE[PostEnum.TOPIC.CHALLENGE],
            value: PostEnum.TOPIC.CHALLENGE,
          },
          {
            text: PostEnum.TOPIC_PARSE[PostEnum.TOPIC.OTHER],
            value: PostEnum.TOPIC.OTHER,
          },
        ],
        defaultTopic: {},

        isShowBtn: false,
        toDoList: [""],
        detailPost: {},
        targetPost: [],
        startDate: null,
        endDate: null,
        isEdit: true,
        checked: false,
        checkedShowInInjectSchedule: false,
        isShowStartDate: false,
        isHiddenErr: false,
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 3,
        upload: 1,
        update: 2,
        category: 3,
        updateTarget:4
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeCategoryId = this.handleOnChangeCategoryId.bind(this);
    this.handleOnChangeShow = this.handleOnChangeShow.bind(this);
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this);
    this.handleOnChangeDate = this.handleOnChangeDate.bind(this);
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this);
    this.handleOnChangeTodo = this.handleOnChangeTodo.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnCheck = this.handleOnCheck.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnCheckShowInInjectSchedule = this.handleOnCheckShowInInjectSchedule.bind(this);
    this.handleOnChangeTopic = this.handleOnChangeTopic.bind(this);
    this.handleOnChangeChallenge = this.handleOnChangeChallenge.bind(this);
  }
  handleGetListCategoryAndChallenge(response) {
    try {
      Logger.info("LoadingListPostComponent execute handleGetListCategoryAndChallenge");
      Logger.debug("LoadingListPostComponent execute handleGetListCategoryAndChallenge receive list", response);
      const { ui, timeout, data, req } = this.state;
      timeout.setTimeout(false);
      ui.responseListChallenge = response.challenges;
      const listCategory = [];
      if (response.categories.length > 0) {
        response.categories.map((item) => {
          listCategory.push({ text: `${PostEnum.TARGET_PARSE[item.targetMeijiId]} - ${item.name}`, value: item.categoryId });
        });
      }
      ui.listCategoryId = listCategory;
      ui.defaultCategoryId = ui.listCategoryId.find((item) => {
        return item.value == data["categoryId"];
      });
      const listChallenge = [];
      if (response.challenges.length > 0) {
        response.challenges.map((item) => {
          listChallenge.push({ text: item.title, value: item.challengeId });
        });
      }
      ui.listChallenge = listChallenge;
      ui.defaultChallenge = ui.listChallenge.find((item) => {
        return item.value == data["challengeByTopic"];
      });
      req.current = req.update;
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleGetListCategorySuccess ${e.toString()}`);
    }
  }
  handleUpdatePostSuccees(response) {
    try {
      Logger.info("EditPostComponent execute handleUpdatePostSuccees");
      Logger.debug("EditPostComponent execute handleUpdatePostSuccees receive response", response);
      const { ui, timeout, data,req } = this.state;
      const { toast } = this.props;
      if( ui.defaultTopic.value === PostEnum.TOPIC.CHALLENGE &&ui.detailPost.challengeByTopic != data['challengeByTopic']){
        req.current = req.updateTarget
        timeout.setTimeout();
      }else{
        toast({ status: "success", message: Localize.getLocalize("LC_TOAST_POST_UPDATE_SUCCESS") });
        const route = RouteEnum.PAGE.MANAGE_POST.POST.DETAIL;
        const path = route.replace(":id", data["postId"]);
        this.handleRedirectWithState(path, { ...ui.detailPost, ...data });
      }
    } catch (e) {
      Logger.error(`EditPostComponent handleUpdatePostSuccees ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleUpdateTargetPostSuccees(response) {
    try {
      Logger.info("EditPostComponent execute handleUpdateTargetPostSuccees");
      Logger.debug("EditPostComponent execute handleUpdateTargetPostSuccees receive response", response);
      const { ui, timeout, data,req } = this.state;
      const { toast } = this.props;
      const route = RouteEnum.PAGE.MANAGE_POST.POST.DETAIL;
      const path = route.replace(":id", data["postId"]);
      this.handleRedirectWithState(path, { ...ui.detailPost, ...data });
    } catch (e) {
      Logger.error(`EditPostComponent handleUpdateTargetPostSuccees ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUploadImageSucess(response) {
    try {
      Logger.info("EditPostComponent execute handleUploadImageSucess");
      Logger.debug("EditPostComponent execute handleUploadImageSucess receive", response);
      const { ui, timeout, req, data } = this.state;
      const { update } = this.props;
      // const srcImg = `[\"${response.path}\"]`

      const toDoList = JSON.stringify(data["toDoList"]);
      const photos = !Helper.isEmpty(data["photos"]) ? `[\"${response.path}\"]` : "[]";
      let payload = new ModelRequest()
        .setPostId(data["postId"])
        .setTitle(data["title"])
        .setPhotos(photos)
        .setSummary(data["summary"] || "")
        .setTopic(data["topic"])
        .setContent(`${data["content"]}`);
      switch (ui.defaultTopic.value) {
        case PostEnum.TOPIC.KNOW:
          payload.setCategoryId(data["categoryId"]);
          payload.setShow(data["show"]);
          payload.setStartDate(data["startDate"]);
          //payload.setEndDate(data["endDate"] || undefined);
          payload.setEndDate(data["endDate"] || "");
          payload.setToDoList(toDoList);
          payload.setShowInInjectSchedule(data["showInInjectSchedule"]);
          break;
        case PostEnum.TOPIC.CHALLENGE:
          payload.setChallengeByTopic(data["challengeByTopic"]);
          break;
        default:
          break;
      }
      Logger.debug("EditPostComponent execute handleRequest receive payload", payload);
      update(timeout.key, payload);
    } catch (e) {
      Logger.error(`EditPostComponent handleUploadImageSucess ${e.toString()}`);
    }
  }
  handleSystemError() {
    try {
      Logger.info("EditPostComponent execute handleSystemError");
      const { ui, timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleForbidden() {
    try {
      Logger.info("EditPostComponent execute handleForbidden");
      const { ui, timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "success", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`EditPostComponent handleForbidden ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("EditPostComponent execute UNSAFE_componentWillMount");
      const { ui, data, timeout } = this.state;
      const { location } = this.props;

      ui.detailPost = location.state.detailPost;
      ui.targetPost = location.state.targetPost;

      // Object.keys(data).map((key) => {
      //   if (key !== "target") {
      //     data[key] = ui.detailPost[key];
      //   }
      // });

      data["postId"] = ui.detailPost.postId;
      data["photos"] = !Helper.isEmpty(ui.detailPost.photos) ? JSON.parse(ui.detailPost.photos) : undefined;
      data["title"] = !Helper.isEmpty(ui.detailPost.title) ? ui.detailPost.title : undefined;
      data["content"] = !Helper.isEmpty(ui.detailPost.content) ? ui.detailPost.content : undefined;
      data["summary"] = !Helper.isEmpty(ui.detailPost.summary) ? ui.detailPost.summary : undefined;
      data["topic"] = !Helper.isEmpty(ui.detailPost.topic) ? ui.detailPost.topic : undefined;

      switch (ui.detailPost.topic) {
        case PostEnum.TOPIC.KNOW:
          data["categoryId"] = ui.detailPost.categoryId;
          data["show"] = ui.detailPost.show;
          data["startDate"] = !Helper.isEmpty(ui.detailPost.startDate) ? new Date(ui.detailPost.startDate).getTime() : "";
          data["endDate"] = !Helper.isEmpty(ui.detailPost.endDate) ? new Date(ui.detailPost.endDate).getTime() : "";
          data["toDoList"] = !Helper.isEmpty(ui.detailPost.toDoList) ? JSON.parse(ui.detailPost.toDoList) : undefined;
          data["showInInjectSchedule"] = ui.detailPost.showInInjectSchedule;
          const startDate = new Date(ui.detailPost.startDate).getTime();
          const endDate = new Date(ui.detailPost.endDate).getTime();
          ui.startDate = startDate;
          ui.endDate = endDate;
          switch (data["show"]) {
            case PostEnum.SHOW.HIDDEN:
              data["startDate"] = "";
              data["endDate"] = "";
              break;
            case PostEnum.SHOW.SHOW_BY_START_DATE:
              data["endDate"] = "";
              break;
          }
          break;
        case PostEnum.TOPIC.CHALLENGE:
          data["challengeByTopic"] = ui.detailPost.challengeByTopic;
          break;
        default:
          break;
      }

      ui.photo = !Helper.isEmpty(data["photos"]) && data["photos"].length > 0 ? `${Config.urlStatic}${data["photos"][0]}` : null;

      ui.detailPost.content = data["content"];
      ui.data = Helper.cloneNewModel(data);
      ui.toDoList = !Helper.isEmpty(ui.detailPost.toDoList) &&  JSON.parse(ui.detailPost.toDoList).length > 0 ? JSON.parse(ui.detailPost.toDoList) : [""];

      ui.checked = !HelperService.isEmpty(ui.detailPost.toDoList) && !HelperService.isEmpty(JSON.parse(ui.detailPost.toDoList)[0]) ? true : false;

      ui.checkedShowInInjectSchedule = ui.detailPost.showInInjectSchedule === PostEnum.SHOW_IN_INJECT_SCHEDULE.SHOW ? true : false;
      ui.defaultShow =
        ui.listShow.find((item) => {
          return item.value == data["show"];
        }) || ui.listShow[0];
      ui.defaultTopic = ui.listTopic.find((item) => {
        return item.value === data["topic"];
      });
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`EditPostComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("EditPostComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`EditPostComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("EditPostComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { update, upload, getListCategoryAndChallenge,updateTarget } = this.props;
      switch (req.current) {
        case req.category:
          getListCategoryAndChallenge(timeout.key);
          break;
        case req.upload:
          upload(timeout.key, data["photos"]);
          break;
        case req.update:
          const toDoList =!Helper.isEmpty(data['toDoList']) && !Helper.isEmpty(data["toDoList"][0]) ?  JSON.stringify(data["toDoList"]) : JSON.stringify([]);
          const photos = !Helper.isEmpty(data["photos"]) ? JSON.stringify(data["photos"]) : "[]";
          let payload = new ModelRequest()
            .setPostId(data["postId"])
            .setTitle(data["title"])
            .setPhotos(photos)
            .setSummary(data["summary"] || "")
            .setTopic(data["topic"])
            .setContent(`${data["content"]}`);
          switch (ui.defaultTopic.value) {
            case PostEnum.TOPIC.KNOW:
              payload.setCategoryId(data["categoryId"]);
              payload.setShow(data["show"]);
              payload.setStartDate(data["startDate"]);
              //payload.setEndDate(data["endDate"] || undefined);
              payload.setEndDate(data["endDate"] || "");
              payload.setToDoList(toDoList);
              payload.setShowInInjectSchedule(data["showInInjectSchedule"]);
              break;
            case PostEnum.TOPIC.CHALLENGE:
              payload.setChallengeByTopic(data["challengeByTopic"]);
              break;
            default:
              break;
          }
          Logger.debug("EditPostComponent execute handleRequest receive payload", payload);
        update(timeout.key, payload);
          break;
        case req.updateTarget:
            const payloadUpdateTarget = new ModelRequestTargetPost()
            .setPostId(data['postId'])
            .setTarget(data['target'])

            updateTarget(timeout.key,payloadUpdateTarget)
        break;
      }
    } catch (e) {
      Logger.error(`EditPostComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }


  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("EditPostComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`EditPostComponent handleSubmit ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleOnRef(name, element) {
    try {
      const { ref } = this.state;
      ref[name] = element;
      if (name === "username") {
        ref[name].focus();
      }
    } catch (e) {
      Logger.error(`EditPostComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value, error) {
    try {
      Logger.info("EditPostComponent execute handleOnChange");
      Logger.debug("EditPostComponent execute handleOnChange receive name", name);
      Logger.debug("EditPostComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("EditPostComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      delete temp["toDoList"];
      delete temp["target"];
      delete temp["photos"];
      delete temp["summary"];
      let status = false;
      switch (ui.defaultTopic.value) {
        case PostEnum.TOPIC.KNOW:
          delete temp["challengeByTopic"];
          if (data["show"] !== PostEnum.SHOW.SHOW_BY_START_AND_END_DATE) {
            delete temp["endDate"];
          }
          switch (data["show"]) {
            case PostEnum.SHOW.HIDDEN:
              delete temp["startDate"];
              delete temp["endDate"];
              break;
            case PostEnum.SHOW.SHOW_BY_START_DATE:
              delete temp["endDate"];
              break;
          }

          if (name === "endDate") {
            ui.isShowStartDate = error;
          }
          let isTodoListEmpty = true;
          if (ui.checked) {
            isTodoListEmpty = data["toDoList"].length > 0 && data["toDoList"].findIndex((element) => element === "") === -1;
          }
          if (name === "startDate" || name === "endDate") {
            this.setState({ ui });
          }
          status = isTodoListEmpty && Object.values(temp).findIndex((item) => item.toString() === "") == -1;
          status = error ? !error : status;

          break;
        case PostEnum.TOPIC.CHALLENGE:
        case PostEnum.TOPIC.OTHER:
          delete temp["categoryId"];
          delete temp["show"];
          delete temp["startDate"];
          delete temp["endDate"];
          delete temp["showInInjectSchedule"];
          delete temp["toDoList"];
          if (ui.defaultTopic.value === PostEnum.TOPIC.OTHER) {
            delete temp["challengeByTopic"];
          }
          status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
          break;
        default:
          break;
      }

      if (status !== ui.isShowBtn) {
        ui.isShowBtn = status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeCategoryId(event, value) {
    try {
      Logger.info("EditPostComponent execute handleOnChangeCategoryId");
      Logger.debug("EditPostComponent execute handleOnChangeCategoryId receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui, data } = this.state;
      ui.defaultCategoryId = ui.listCategoryId.find((item) => {
        return item.value == value;
      });
      this.handleOnChange("categoryId", value);
      this.setState({ data });
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeCategoryId ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeTopic(name, value) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnChangeTopic");
      Logger.debug("CreateChallengeComponent execute handleOnChangeTopic receive value", value);
      const { data } = this.state;
      const { ui } = this.state;
      switch (value) {
        case PostEnum.TOPIC.KNOW:
          ui.toDoList = [""];
          if (ui.listCategoryId.length > 0) {
            this.handleOnChangeCategoryId(null, ui.listCategoryId[0].value);
            }
          this.handleOnChangeShow(null, ui.listShow[1].value);
          this.handleOnCheck({ target: { checked: false } });
          this.handleOnCheckShowInInjectSchedule({ target: { checked: false } });
          break;
        case PostEnum.TOPIC.CHALLENGE:
          if (ui.listChallenge.length > 0) {
            this.handleOnChangeChallenge(null, ui.listChallenge[0].value);
          }
          break;
        case PostEnum.TOPIC.OTHER:
          break;
        default:
          break;
      }
      ui.defaultTopic = ui.listTopic.find((item) => {
        return item.value == value;
      });
      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnChangeTopic ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeShow(event, value) {
    try {
      Logger.info("EditPostComponent execute handleOnChangeShow");
      Logger.debug("EditPostComponent execute handleOnChangeShow receive value", value);
      if (event) {
        event.preventDefault();
      }
      const { ui, data } = this.state;
      data["startDate"] = "";
      data["endDate"] = "";
      ui.defaultShow = ui.listShow.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange("show", value);
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeShow ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleTarget(challengeId) {
    const { ui } = this.state;
    const { targetMeijiId } = ui.responseListChallenge.find((item) => {
      return item.challengeId === challengeId;
    });
    let newDefaultTarget = [];
    JSON.parse(targetMeijiId).forEach((element) => {
      newDefaultTarget.push(ui.listTarget.find((item) => item.value === element));
    });
    ui.defaultTarget = newDefaultTarget;
    this.handleOnChangeTarget(null, JSON.parse(targetMeijiId));
  }
  handleOnChangeChallenge(event, value) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeChallenge");
      Logger.debug("CreatePostComponent execute handleOnChangeChallenge receive value", value);
      const { ui, data } = this.state;
      if (event) {
        event.preventDefault();
      }
      ui.defaultChallenge = ui.listChallenge.find((item) => {
        return item.value == value;
      });
      this.handleTarget(ui.defaultChallenge.value)
      this.setState({ ui });
      this.handleOnChange("challengeByTopic", value);
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeChallenge ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeImage(value) {
    try {
      Logger.info("EditPostComponent execute handleOnChangeImage");
      Logger.debug("EditPostComponent execute handleOnChangeImage receive", value);
      const { ui, timeout, req } = this.state;
      const { handleChangeImage } = this.props;
      ui.photos = value;
      if (Helper.isEmpty(value)) {
        req.current = req.update;
      } else {
        req.current = req.upload;
      }
      this.setState({ ui });
      this.handleOnChange("photos", value);
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeImage ${e.toString()}`);
    }
  }

  handleOnChangeDate(name, value, error) {
    try {
      Logger.info("EditPostComponent execute handleOnChangeDate");
      Logger.debug("EditPostComponent execute handleOnChangeDate name", name);
      Logger.debug("EditPostComponent execute handleOnChangeDate receive", value);
      const { ui, timeout, req } = this.state;
      this.handleOnChange(name, value, error);
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeDate ${e.toString()}`);
    }
  }

  handleOnChangeTarget(event, list) {
    try {
      Logger.info("EditPostComponent execute handleOnChangeTarget");
      Logger.debug("EditPostComponent execute handleOnChangeTarget receive list", list);
      if (event) {
        event.preventDefault();
      }
      const { ui,data } = this.state;
      this.handleOnChange("target", list);
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeTodo(name, value, index) {
    try {
      Logger.info("EditPostComponent execute handleOnChangeTodo");
      Logger.debug("EditPostComponent execute handleOnChangeTodo receive name", name);
      Logger.debug("EditPostComponent execute handleOnChangeTodo receive value", value);
      Logger.debug("EditPostComponent execute handleOnChangeTodo receive index", index);
      const { ui, timeout, req, data } = this.state;
      data[name][index] = value;
      this.handleOnChange(name, data[name]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeTodo ${e.toString()}`);
    }
  }

  handleAddTodo() {
    try {
      Logger.info("EditPostComponent execute handleAddTodo");
      const { ui, data } = this.state;
      const toDoList = [...data["toDoList"]];
      ui.toDoList = [...ui.toDoList, ""];
      data["toDoList"][toDoList.length] = "";
      this.handleOnChange("toDoList", data["toDoList"]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditPostComponent handleAddTodo ${e.toString()}`);
    }
  }

  handleRemoveTodo(index) {
    try {
      Logger.info("EditPostComponent execute handleRemoveTodo");
      Logger.debug("EditPostComponent execute handleRemoveTodo receive", index);
      const { ui, data } = this.state;
      const { handleChangeImage } = this.props;
      ui.toDoList.splice(index, 1);
      data["toDoList"].splice(index, 1);
      this.handleOnChange("toDoList", data["toDoList"]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditPostComponent handleRemoveTodo ${e.toString()}`);
    }
  }

  handleOnBack() {
    try {
      Logger.info("CreateChallengeComponent execute handleOnBack");
      this.props.history.goBack();
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleOnCheck(event) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnBack");
      const { ui, data } = this.state;
      ui.checked = event.target.checked;
      this.handleOnChange("toDoList", [""]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleOnClick() {
    try {
      Logger.info("CreateBubbleComponent execute handleOnClick");
      const { ui, timeout } = this.state;
      ui.isHiddenErr = !ui.isHiddenErr;
      timeout.setTimeout(false, "endDate", "");
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleOnClick ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleOnCheckShowInInjectSchedule(event) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnBack");
      const { ui } = this.state;
      const value = event.target.checked;
      ui.checkedShowInInjectSchedule = event.target.checked;
      this.handleOnChange("showInInjectSchedule", event.target.checked ? PostEnum.SHOW_IN_INJECT_SCHEDULE.SHOW : PostEnum.SHOW_IN_INJECT_SCHEDULE.HIDDEN);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  render() {
    const { ui, timeout, data, req } = this.state;
    return req.current !== req.category ? <View ui={ui} timeout={timeout} handleOnChangeChallenge={this.handleOnChangeChallenge} handleOnChangeTopic={this.handleOnChangeTopic} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeCategoryId={this.handleOnChangeCategoryId} handleOnChangeShow={this.handleOnChangeShow} handleOnChangeImage={this.handleOnChangeImage} handleOnChangeDate={this.handleOnChangeDate} handleOnChangeTarget={this.handleOnChangeTarget} handleOnChangeTodo={this.handleOnChangeTodo} handleAddTodo={this.handleAddTodo} handleRemoveTodo={this.handleRemoveTodo} handleOnBack={this.handleOnBack} handleOnCheck={this.handleOnCheck} handleOnClick={this.handleOnClick} handleOnCheckShowInInjectSchedule={this.handleOnCheckShowInInjectSchedule} /> : null;
  }
}

export default BaseComponent(EditPostComponent);
