import React, { Component } from "react";
import moment from "moment";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import PostEnum from "service/enum/post";
import RouteEnum from "service/enum/route";
import Localize from "service//localize";
import View from "component/main/managePost/post/detail/edit/view";
import { ModelView, ModelRequest } from "./model";
import HelperService from "service/helper";
import ModelTable from "core/table/model";

class CreatePostComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleCreatePostSuccess: this.handleCreatePostSuccess.bind(this),
        handleRequestSuccess: this.handleUploadImageSucess.bind(this),
        handleGetListCategoryAndChallenge: this.handleGetListCategoryAndChallenge.bind(this),
      },
      data: new ModelView(),
      ui: {
        responseListChallenge: null,
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
        photos: "",
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
        create: 2,
        category: 3,
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
    this.handleOnCheckShowInInjectSchedule = this.handleOnCheckShowInInjectSchedule.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
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
      //category
      const listCategory = [];
      if (response.categories.length > 0) {
        response.categories.map((item) => {
          listCategory.push({ text: `${PostEnum.TARGET_PARSE[item.targetMeijiId]} - ${item.name}`, value: item.categoryId });
        });
      }
      ui.listCategoryId = listCategory;
      ui.defaultCategoryId = listCategory[0];
      //challenge
      const listChallenge = [];
      if (response.challenges.length > 0) {
        response.challenges.map((item) => {
          listChallenge.push({ text: item.title, value: item.challengeId });
        });
      }
      ui.listChallenge = listChallenge;
      ui.defaultChallenge = listChallenge[0];

      data["categoryId"] = ui.defaultCategoryId && ui.defaultCategoryId.value ? ui.defaultCategoryId.value : "";
      data["challengeByTopic"] = ui.defaultChallenge && ui.defaultChallenge.value ? ui.defaultChallenge.value : "";

      req.current = req.create;
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleGetListCategorySuccess ${e.toString()}`);
    }
  }

  handleCreatePostSuccess(response) {
    try {
      Logger.info("CreatePostComponent execute handleCreatePostSuccess");
      Logger.debug("CreatePostComponent execute handleCreatePostSuccess receive response", response);
      const { ui, timeout, data } = this.state;
      const { toast } = this.props;
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_POST_CREATE_SUCCESS") });
      timeout.setTimeout(false);
      this.handleOnBack();
    } catch (e) {
      Logger.error(`CreatePostComponent handleCreatePostSuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUploadImageSucess(response) {
    try {
      Logger.info("CreatePostComponent execute handleUploadImageSucess");
      Logger.debug("CreatePostComponent execute handleUploadImageSucess receive", response);
      const { ui, timeout, data } = this.state;
      const { create } = this.props;
      const srcImg = `[\"${response.path}\"]`;
      let payload = new ModelRequest()
        .setTitle(data["title"])
        .setPhotos(srcImg)
        .setSummary(data["summary"] || undefined)
        .setTarget(data["target"])
        .setTopic(data["topic"])
        .setContent(`${data["content"]}`);
      switch (ui.defaultTopic.value) {
        case PostEnum.TOPIC.KNOW:
          const toDoList = data["toDoList"].length > 0 && !HelperService.isEmpty(data["toDoList"][0]) ? JSON.stringify(data["toDoList"]) : undefined;
          payload.setCategoryId(data["categoryId"]);
          payload.setStartDate(data["startDate"]);
          payload.setEndDate(data["endDate"] || undefined);
          payload.setShow(data["show"]);
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
      create(timeout.key, payload);
    } catch (e) {
      Logger.error(`CreatePostComponent handleUploadImageSucess ${e.toString()}`);
    }
  }
  handleSystemError() {
    try {
      Logger.info("CreatePostComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      const { toast } = this.props;
      if (!Helper.isEmpty(data["photos"])) {
        req.current = req.upload;
      } else {
        req.current = req.create;
      }
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`CreatePostComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("CreatePostComponent execute UNSAFE_componentWillMount");
      const { ui, data, timeout } = this.state;
      const { location } = this.props;
      ui.defaultTarget = [ui.listTarget[0]];
      ui.defaultShow = ui.listShow[1];
      ui.defaultTopic = ui.listTopic[0];

      data["target"] = [ui.listTarget[0].value];
      data["show"] = ui.defaultShow.value;
      data["showInInjectSchedule"] = PostEnum.SHOW_IN_INJECT_SCHEDULE.HIDDEN;
      data["topic"] = ui.defaultTopic.value;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreatePostComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("CreatePostComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`CreatePostComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("CreatePostComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { create, upload, getListCategoryAndChallenge } = this.props;
      switch (req.current) {
        case req.category:
          getListCategoryAndChallenge(timeout.key);
          break;
        case req.upload:
          upload(timeout.key, data["photos"]);
          break;
        case req.create:
          let payload = new ModelRequest()
            .setTitle(data["title"])
            .setPhotos(undefined)
            .setSummary(data["summary"] || undefined)
            .setTarget(data["target"])
            .setTopic(data["topic"])
            .setContent(`${data["content"]}`);
          switch (ui.defaultTopic.value) {
            case PostEnum.TOPIC.KNOW:
              const toDoList = data["toDoList"].length > 0 && !HelperService.isEmpty(data["toDoList"][0]) ? JSON.stringify(data["toDoList"]) : undefined;
              payload.setCategoryId(data["categoryId"]);
              payload.setStartDate(data["startDate"]);
              payload.setEndDate(data["endDate"] || undefined);
              payload.setShow(data["show"]);
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
          create(timeout.key, payload);
          break;
      }
    } catch (e) {
      Logger.error(`CreatePostComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("CreatePostComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreatePostComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`CreatePostComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value, error) {
    try {
      Logger.info("CreatePostComponent execute handleOnChange");
      Logger.debug("CreatePostComponent execute handleOnChange receive name", name);
      Logger.debug("CreatePostComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("CreatePostComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      delete temp["toDoList"];
      delete temp["photos"];
      delete temp["target"];
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
          status = isTodoListEmpty && data["target"].length > 0 && Object.values(temp).findIndex((item) => item.toString() === "") == -1;
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
      Logger.error(`CreatePostComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeCategoryId(event, value) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeCategoryId");
      Logger.debug("CreatePostComponent execute handleOnChangeCategoryId receive value", value);
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
      Logger.error(`CreatePostComponent handleOnChangeCategoryId ${e.toString()}`);
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
          if (ui.listCategoryId.length > 0) {
          this.handleOnChangeCategoryId(null, ui.listCategoryId[0].value);
          }
          this.handleOnChangeShow(null, ui.listShow[1].value);
          this.handleOnCheck({ target: { checked: false } });
          this.handleOnCheckShowInInjectSchedule({ target: { checked: false } });
          ui.defaultTarget = [ui.listTarget[0]];
          break;
        case PostEnum.TOPIC.CHALLENGE:
          if (ui.listChallenge.length > 0) {
            this.handleOnChangeChallenge(null, ui.listChallenge[0].value);
          }else{
            ui.defaultTarget =[{text:"",value:""}]
          }
          break;
        case PostEnum.TOPIC.OTHER:
          ui.defaultTarget = [ui.listTarget[0]];
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
      Logger.info("CreatePostComponent execute handleOnChangeShow");
      Logger.debug("CreatePostComponent execute handleOnChangeShow receive value", value);
      const { ui, data } = this.state;
      if (event) {
        event.preventDefault();
      }
      data["startDate"] = "";
      data["endDate"] = "";
      ui.defaultShow = ui.listShow.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange("show", value);
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeShow ${e.toString()}`);
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
      this.handleTarget(ui.defaultChallenge.value);

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
      Logger.info("CreatePostComponent execute handleOnChangeImage");
      Logger.debug("CreatePostComponent execute handleOnChangeImage receive", value);
      const { ui, timeout, req } = this.state;
      const { handleChangeImage } = this.props;
      ui.photos = value;
      if (Helper.isEmpty(value)) {
        req.current = req.create;
      } else {
        req.current = req.upload;
      }
      this.handleOnChange("photos", ui.photos);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeImage ${e.toString()}`);
    }
  }

  handleOnChangeDate(name, value, error) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeDate");
      Logger.debug("CreatePostComponent execute handleOnChangeDate name", name);
      Logger.debug("CreatePostComponent execute handleOnChangeDate receive", value);
      const { ui, timeout, req } = this.state;
      const { handleChangeImage } = this.props;

      ui.date = value;
      this.handleOnChange(name, value, error);
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeDate ${e.toString()}`);
    }
  }

  handleOnChangeTarget(event, list) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeTarget");
      Logger.debug("CreatePostComponent execute handleOnChangeTarget receive list", list);
      if (event) {
        event.preventDefault();
      }
      const { ui } = this.state;
      const value = list;
      this.handleOnChange("target", value);
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeTarget ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeTodo(name, value, index) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeTodo");
      Logger.debug("CreatePostComponent execute handleOnChangeTodo receive name", name);
      Logger.debug("CreatePostComponent execute handleOnChangeTodo receive value", value);
      Logger.debug("CreatePostComponent execute handleOnChangeTodo receive index", index);
      const { ui, timeout, req, data } = this.state;
      data[name][index] = value;
      this.handleOnChange(name, data[name]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeTodo ${e.toString()}`);
    }
  }

  handleAddTodo() {
    try {
      Logger.info("CreatePostComponent execute handleAddTodo");
      const { ui, timeout, data } = this.state;
      const toDoList = [...data["toDoList"]];
      ui.toDoList = [...ui.toDoList, ""];
      data["toDoList"][toDoList.length] = "";
      this.handleOnChange("toDoList", data["toDoList"]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreatePostComponent handleAddTodo ${e.toString()}`);
    }
  }

  handleRemoveTodo(index) {
    try {
      Logger.info("CreatePostComponent execute handleRemoveTodo");
      Logger.debug("CreatePostComponent execute handleRemoveTodo receive", index);
      const { ui, timeout, data } = this.state;
      const { handleChangeImage } = this.props;

      ui.toDoList.splice(index, 1);
      data["toDoList"].splice(index, 1);
      this.handleOnChange("toDoList", data["toDoList"]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreatePostComponent handleRemoveTodo ${e.toString()}`);
    }
  }

  handleOnBack() {
    try {
      Logger.info("CreateChallengeComponent execute handleOnBack");
      const { tab } = this.props.location.state;
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_POST.POST._, { tab: tab });
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleOnCheck(event) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnCheck");
      const { ui } = this.state;
      ui.checked = event.target.checked;
      this.handleOnChange("toDoList", [""]);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnCheck ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleOnCheckShowInInjectSchedule(event) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnCheckShowInInjectSchedule");
      const { ui } = this.state;
      const value = event.target.checked;
      ui.checkedShowInInjectSchedule = event.target.checked;
      this.handleOnChange("showInInjectSchedule", event.target.checked ? PostEnum.SHOW_IN_INJECT_SCHEDULE.SHOW : PostEnum.SHOW_IN_INJECT_SCHEDULE.HIDDEN);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnCheckShowInInjectSchedule ${e.toString()}`);
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

  render() {
    const { ui, timeout, data, req } = this.state;
    return req.current !== req.category ? <View ui={ui} timeout={timeout} handleOnChangeChallenge={this.handleOnChangeChallenge} handleSubmit={this.handleSubmit} data={data} handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange} handleOnChangeCategoryId={this.handleOnChangeCategoryId} handleOnChangeShow={this.handleOnChangeShow} handleOnChangeImage={this.handleOnChangeImage} handleOnChangeDate={this.handleOnChangeDate} handleOnChangeTarget={this.handleOnChangeTarget} handleOnChangeTodo={this.handleOnChangeTodo} handleAddTodo={this.handleAddTodo} handleRemoveTodo={this.handleRemoveTodo} handleOnBack={this.handleOnBack} handleOnCheck={this.handleOnCheck} handleOnClick={this.handleOnClick} handleOnCheckShowInInjectSchedule={this.handleOnCheckShowInInjectSchedule} handleOnChangeTopic={this.handleOnChangeTopic} /> : null;
  }
}

export default BaseComponent(CreatePostComponent);
