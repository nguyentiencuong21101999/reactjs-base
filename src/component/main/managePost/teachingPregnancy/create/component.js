import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import View from "./view";
import { ModelView, ModelRequest } from "./model";
import HelperService from "service/helper";
import TeachingPregnancyEnum from 'service/enum/teachingPregnancy'
import Localize from "service/localize";

class CreateTeachingPregnancyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleCreateTeachingPregnancySuccess: this.handleCreateTeachingPregnancySuccess.bind(this),
        handleCreateTeachingPregnancyFailed: this.handleCreateTeachingPregnancyFailed.bind(this),
      },
      data: new ModelView(),
      ui: {
        data: {},
        listSubject: [
          {
            text: TeachingPregnancyEnum.SUBJECT_PARSE[TeachingPregnancyEnum.SUBJECT.MOM],
            value: TeachingPregnancyEnum.SUBJECT.MOM,
          },
          {
            text: TeachingPregnancyEnum.SUBJECT_PARSE[TeachingPregnancyEnum.SUBJECT.BABY],
            value: TeachingPregnancyEnum.SUBJECT.BABY,
          },

        ],
        defaultSubject: {},
        listMonth: [
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.FIRST],
            value: TeachingPregnancyEnum.MONTH.FIRST
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.SECOND],
            value: TeachingPregnancyEnum.MONTH.SECOND
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.THIRD],
            value: TeachingPregnancyEnum.MONTH.THIRD
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.FOURTH],
            value: TeachingPregnancyEnum.MONTH.FOURTH
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.FIFTH],
            value: TeachingPregnancyEnum.MONTH.FIFTH
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.SIXTH],
            value: TeachingPregnancyEnum.MONTH.SIXTH
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.SEVENTH],
            value: TeachingPregnancyEnum.MONTH.SEVENTH
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.EIGHTH],
            value: TeachingPregnancyEnum.MONTH.EIGHTH
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.NINTH],
            value: TeachingPregnancyEnum.MONTH.NINTH
          },
          {
            text: TeachingPregnancyEnum.MONTH_PARSE[TeachingPregnancyEnum.MONTH.TENTH],
            value: TeachingPregnancyEnum.MONTH.TENTH
          },

        ],
        defaultMonth: {},
        isShowBtn: true,
        photos: "",
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 2,
        upload: 1,
        create: 2,
      },
    };

    this.handleOnRef = this.handleOnRef.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this);
    this.handleOnBack = this.handleOnBack.bind(this);
    this.handleOnChangeSubject = this.handleOnChangeSubject.bind(this)
    this.handleOnChangeMonth = this.handleOnChangeMonth.bind(this)
  }
  handleUploadImageSuccess(response) {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleUploadImageSuccess");
      Logger.debug("CreateTeachingPregnancyComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { createTeachingPregnancy } = this.props;
      const srcImg = response.path;
      let payload = new ModelRequest()
        .setPhotos(srcImg)
        .setTitle(data['title'])
        .setSummary(!HelperService.isEmpty(data['summary']) ? data['summary'] : "")
        .setContent(data['content'])
        .setPregnancySubject(data['pregnancySubject'])
        .setPregnancyMonth(data['pregnancyMonth'])
      Logger.debug("CreateTeachingPregnancyComponent execute handleRequest receive payload", payload);
      createTeachingPregnancy(timeout.key, payload)
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }

  handleCreateTeachingPregnancySuccess() {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleCreateTeachingPregnancySuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") });
      this.handleOnBack();
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleCreateTeachingPregnancySuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleCreateTeachingPregnancyFailed() {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleCreateTeachingPregnancyFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleCreateTeachingPregnancyFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSystemError() {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      const { toast } = this.props;
      if (!Helper.isEmpty(data["photos"])) {
        req.current = req.upload;
      } else {
        req.current = req.create;
      }
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      ui.defaultSubject = ui.listSubject[0]
      ui.defaultMonth = ui.listMonth[0]

      data['pregnancySubject'] = ui.defaultSubject.value
      data['pregnancyMonth'] = ui.defaultMonth.value

    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { upload, createTeachingPregnancy } = this.props;
      switch (req.current) {
        case req.upload:
          upload(timeout.key, data['photos'])
          break;
        case req.create:
          let payload = new ModelRequest()
            .setPhotos("")
            .setTitle(data['title'])
            .setSummary(!HelperService.isEmpty(data['summary']) ? data['summary'] : "")
            .setContent(data['content'])
            .setPregnancySubject(data['pregnancySubject'])
            .setPregnancyMonth(data['pregnancyMonth'])
          Logger.debug("CreateTeachingPregnancyComponent execute handleRequest receive payload", payload);
          createTeachingPregnancy(timeout.key, payload)
          break;

        default:
          break;
      }
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("CreateTeachingPregnancyComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`CreateTeachingPregnancyComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleOnChange");
      Logger.debug("CreateTeachingPregnancyComponent execute handleOnChange receive name", name);
      Logger.debug("CreateTeachingPregnancyComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("CreateTeachingPregnancyComponent execute handleOnChange receive data", data);
      let temp = { ...data };
      delete temp['summary']
      delete temp['photos']
      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }


  handleOnChangeSubject(event, value) {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleOnChangeSubject");
      Logger.debug("CreateTeachingPregnancyComponent execute handleOnChangeSubject receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultSubject = ui.listSubject.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange('pregnancySubject', value);
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleOnChangeSubject ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeMonth(event, value) {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleOnChangeMonth");
      Logger.debug("CreateTeachingPregnancyComponent execute handleOnChangeMonth receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultMonth = ui.listMonth.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange('pregnancyMonth', value);
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleOnChangeMonth ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeImage(value) {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleOnChangeImage");
      Logger.debug("CreateTeachingPregnancyComponent execute handleOnChangeImage receive", value);
      const { ui, timeout, req } = this.state;
      ui.photos = value;
      req.current = req.upload;
      this.handleOnChange("photos", ui.photos);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleOnChangeImage ${e.toString()}`);
    }
  }


  handleOnBack() {
    try {
      Logger.info("CreateTeachingPregnancyComponent execute handleOnBack");
      this.props.history.goBack();
    } catch (e) {
      Logger.error(`CreateTeachingPregnancyComponent handleOnBack ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  render() {
    const { ui, timeout, data } = this.state;
    return <View ui={ui} timeout={timeout}
      handleSubmit={this.handleSubmit}
      data={data}
      handleOnRef={this.handleOnRef}
      handleOnChange={this.handleOnChange}
      handleOnChangeShow={this.handleOnChangeShow}
      handleOnChangeImage={this.handleOnChangeImage}
      handleOnBack={this.handleOnBack}
      handleOnChangeSubject={this.handleOnChangeSubject}
      handleOnChangeMonth={this.handleOnChangeMonth}

    />;
  }
}

export default BaseComponent(CreateTeachingPregnancyComponent);
