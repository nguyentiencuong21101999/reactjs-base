import React, { Component } from "react";

import BaseComponent from "base/component";
import Timeout from "base/component/timeout";
import Logger from "service/logger";
import Helper from "service/helper";
import View from "component/main/managePost/teachingPregnancy/create/view";
import { ModelView, ModelRequest } from "./model";
import HelperService from "service/helper";
import TeachingPregnancyEnum from 'service/enum/teachingPregnancy'
import Config from "config";
import RouteEnum from 'service/enum/route'
import Localize from "service/localize";
class EditTeachingPregnancyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleUpdateTeachingPregnancySuccess: this.handleUpdateTeachingPregnancySuccess.bind(this),
        handleUpdateTeachingPregnancyFailed: this.handleUpdateTeachingPregnancyFailed.bind(this),
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
        detailTeachingPregnancy: null
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 2,
        upload: 1,
        update: 2,
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
      Logger.info("EditTeachingPregnancyComponent execute handleUploadImageSuccess");
      Logger.debug("EditTeachingPregnancyComponent execute handleUploadImageSuccess receive", response);
      const { ui, timeout, data } = this.state;
      const { updateTeachingPregnancy } = this.props;
      const srcImg = response.path;
      let payload = new ModelRequest()
        .setPregnancyPostId(ui.detailTeachingPregnancy.pregnancyPostId)
        .setPhotos(srcImg)
        .setTitle(data['title'])
        .setSummary(!HelperService.isEmpty(data['summary']) ? data['summary'] : "")
        .setContent(data['content'])
        .setPregnancySubject(data['pregnancySubject'])
        .setPregnancyMonth(data['pregnancyMonth'])
      Logger.debug("EditTeachingPregnancyComponent execute handleRequest receive payload", payload);
      updateTeachingPregnancy(timeout.key, payload)
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleUploadImageSuccess ${e.toString()}`);
    }
  }

  handleUpdateTeachingPregnancySuccess() {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleUpdateTeachingPregnancySuccess");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") });
      this.handleOnBack();
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleUpdateTeachingPregnancySuccess ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleUpdateTeachingPregnancyFailed() {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleUpdateTeachingPregnancyFailed");
      const { timeout } = this.state;
      const { toast } = this.props;
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleUpdateTeachingPregnancyFailed ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  handleSystemError() {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleSystemError");
      const { ui, timeout, req, data } = this.state;
      const { toast } = this.props;
      if (!Helper.isEmpty(data["photos"])) {
        req.current = req.upload;
      } else {
        req.current = req.create;
      }
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") });
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleSystemError ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info("EditTeachingPregnancyComponent execute UNSAFE_componentWillMount");
      const { ui, data } = this.state;
      const { location } = this.props

      ui.detailTeachingPregnancy = location.state


      ui.defaultSubject = ui.listSubject.find((item) => { return item.value === ui.detailTeachingPregnancy.pregnancySubject })
      ui.defaultMonth = ui.listMonth.find((item) => { return item.value === ui.detailTeachingPregnancy.pregnancyMonth })

      data['pregnancySubject'] = ui.defaultSubject.value
      data['pregnancyMonth'] = ui.defaultMonth.value

      Object.keys(data).forEach((key) => {
        switch (key) {
          default:
            data[key] = ui.detailTeachingPregnancy[key];
        }
      });
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent UNSAFE_componentWillMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  componentDidMount() {
    try {
      Logger.info("EditTeachingPregnancyComponent execute componentDidMount");
      const { timeout } = this.state;
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent componentDidMount ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleRequest() {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleRequest");
      const { ui, timeout, data, req } = this.state;
      const { upload, updateTeachingPregnancy } = this.props;
      switch (req.current) {
        case req.upload:
          upload(timeout.key, data['photos'])
          break;
        case req.update:
          const photos = !HelperService.isEmpty(data['photos']) ? data["photos"].replace(Config.urlStatic, "") : ""
          let payload = new ModelRequest()
            .setPregnancyPostId(ui.detailTeachingPregnancy.pregnancyPostId)
            .setPhotos(photos)
            .setTitle(data['title'])
            .setSummary(!HelperService.isEmpty(data['summary']) ? data['summary'] : "")
            .setContent(data['content'])
            .setPregnancySubject(data['pregnancySubject'])
            .setPregnancyMonth(data['pregnancyMonth'])
          Logger.debug("EditTeachingPregnancyComponent execute handleRequest receive payload", payload);
          updateTeachingPregnancy(timeout.key, payload)
          break;
        default:
          break;
      }
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleRequest ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault();
      }
      Logger.info("EditTeachingPregnancyComponent execute handleSubmit");
      const { ui, timeout } = this.state;
      timeout.setTimeout();
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleSubmit ${e.toString()}`);
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
      Logger.error(`EditTeachingPregnancyComponent handleOnRef ${e.toString()}`);
    }
  }

  handleOnChange(name, value) {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleOnChange");
      Logger.debug("EditTeachingPregnancyComponent execute handleOnChange receive name", name);
      Logger.debug("EditTeachingPregnancyComponent execute handleOnChange receive value", value);
      const { data, ui } = this.state;
      data[name] = value;
      Logger.debug("EditTeachingPregnancyComponent execute handleOnChange receive data", data);
      let temp = { ...data };

      delete temp['summary']
      delete temp['photos']

      let status = Object.values(temp).findIndex((item) => item.toString() === "") == -1;
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status;
        this.setState({ ui });
      }
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleOnChange ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }



  handleOnChangeSubject(event, value) {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleOnChangeSubject");
      Logger.debug("EditTeachingPregnancyComponent execute handleOnChangeSubject receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultSubject = ui.listSubject.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange('pregnancySubject', value);
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleOnChangeSubject ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }

  handleOnChangeMonth(event, value) {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleOnChangeMonth");
      Logger.debug("EditTeachingPregnancyComponent execute handleOnChangeMonth receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultMonth = ui.listMonth.find((item) => {
        return item.value == value;
      });
      this.setState({ ui });
      this.handleOnChange('pregnancyMonth', value);
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleOnChangeMonth ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeImage(value) {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleOnChangeImage");
      Logger.debug("EditTeachingPregnancyComponent execute handleOnChangeImage receive", value);
      const { ui, timeout, req } = this.state;
      const { handleChangeImage } = this.props;
      if (Helper.isEmpty(value)) {
        req.current = req.update
      } else {
        req.current = req.upload
      }
      ui.photos = value;
      this.handleOnChange("photos", ui.photos);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleOnChangeImage ${e.toString()}`);
    }
  }


  handleOnBack() {
    try {
      Logger.info("EditTeachingPregnancyComponent execute handleOnBack");
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_POST.TEACHING_PREGNANCY.DETAIL
      const path = route.replace(':id', ui.detailTeachingPregnancy.pregnancyPostId)
      this.handleRedirectWithState(path, ui.detailTeachingPregnancy)
    } catch (e) {
      Logger.error(`EditTeachingPregnancyComponent handleOnBack ${e.toString()}`);
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

export default BaseComponent(EditTeachingPregnancyComponent);
