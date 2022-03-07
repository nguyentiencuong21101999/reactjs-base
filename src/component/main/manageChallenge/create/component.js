import React, { Component } from 'react'
import moment from 'moment'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Helper from 'service/helper'
import PostEnum from 'service/enum/post'
import RouteEnum from 'service/enum/route'
import ChallengeEnum from 'service/enum/challenge'

import View from 'component/main/manageChallenge/detail/edit/view'
import { ModelView, ModelRequest } from './model'
import Localize from "service/localize";
class CreateChallengeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleCreateChallengeSuccess: this.handleCreateChallengeSuccess.bind(this),
        handleCreateChallengeFailed: this.handleCreateChallengeFailed.bind(this)
      },
      data: new ModelView(),
      ui: {
        data: {},
        listCategoryId: [
          {
            text: ChallengeEnum.CHALLENGE_TYPE_PARSE[ChallengeEnum.CHALLENGE_TYPE.WRITE_POST],
            value: ChallengeEnum.CHALLENGE_TYPE.WRITE_POST,
          },
          {
            text: ChallengeEnum.CHALLENGE_TYPE_PARSE[ChallengeEnum.CHALLENGE_TYPE.CHALLENGE_CHAIN],
            value: ChallengeEnum.CHALLENGE_TYPE.CHALLENGE_CHAIN,
          }
        ],
        defaultCategoryId: {},
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
          }
        ],
        defaultTarget: [],
        listShow: [
          {
            text: ChallengeEnum.SHOW_PARSE[ChallengeEnum.SHOW.SHOW],
            value: ChallengeEnum.SHOW.SHOW,
          },
          {
            text: ChallengeEnum.SHOW_PARSE[ChallengeEnum.SHOW.SHOW_BY_TIME],
            value: ChallengeEnum.SHOW.SHOW_BY_TIME,
          },
        ],
        defaultShow: {},
        listRank: [
          {
            text: ChallengeEnum.RESULT_TYPE_PARSE[ChallengeEnum.RESULT_TYPE.AUTO],
            value: ChallengeEnum.RESULT_TYPE.AUTO,
          },
          {
            text: ChallengeEnum.RESULT_TYPE_PARSE[ChallengeEnum.RESULT_TYPE.MANUAL],
            value: ChallengeEnum.RESULT_TYPE.MANUAL,
          },
        ],
        defaultRank: {},
        isShowBtn: true,
        isDefaultBtn: 0,
        isContentUpdate: false,
        photos: "",
        detailChallenge: null,
        isShowStartDate: false,
        isHiddenErr: false
      },
      ref: {
        username: React.createRef(),
        email: React.createRef(),
      },
      req: {
        current: 2,
        upload: 1,
        create: 2
      }
    }

    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnChangeShow = this.handleOnChangeShow.bind(this)
    this.handleOnChangeImage = this.handleOnChangeImage.bind(this)
    this.handleOnChangeDate = this.handleOnChangeDate.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
    this.handleOnChangeTarget = this.handleOnChangeTarget.bind(this)
    this.handleOnChangeCategoryId = this.handleOnChangeCategoryId.bind(this)
    this.handleOnchangeRank = this.handleOnchangeRank.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
  }
  handleUploadImageSuccess(response) {
    try {
      Logger.info("CreateChallengeComponent execute handleUploadImageSuccess")
      Logger.debug("CreateChallengeComponent execute handleUploadImageSuccess receive", response)
      const { ui, timeout, data } = this.state
      const { createChallenge } = this.props
      const srcImg = `[\"${response.path}\"]`
      let payload = new ModelRequest()
        .setTitle(data['title'])
        .setPhotos(srcImg)
        .setShow(data['show'])
        .setChallengeType(data['challengeType'])
        .setStartDate(data['startDate'])
        .setEndDate(!Helper.isEmpty(data['endDate']) ? data['endDate'] : undefined)
        .setContent(`${data['content']}`)
        .setSummary(!Helper.isEmpty(data['summary']) ? data["summary"] : undefined)
        .setTargetMeijiId(JSON.stringify(data['targetMeijiId']))
        .setResultType(ui.defaultCategoryId.value === ChallengeEnum.CHALLENGE_TYPE.WRITE_POST ? data["resultType"] : undefined)
      Logger.debug('CreateChallengeComponent execute handleRequest receive payload', payload)
      createChallenge(timeout.key, payload)
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleUploadImageSuccess ${e.toString()}`)
    }
  }

  handleCreateChallengeSuccess(response) {
    try {
      Logger.info("CreateChallengeComponent execute handleCreateChallengeSuccess")
      Logger.debug("CreateChallengeComponent execute handleCreateChallengeSuccess receive", response)
      const { ui, timeout, data } = this.state
      const { toast } = this.props
      toast({ status: 'success', message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") })
      timeout.setTimeout(false)
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_CHALLENGE._)

    } catch (e) {
      Logger.error(`CreateChallengeComponent handleUploadImageSuccess ${e.toString()}`)
    }
  }
  handleCreateChallengeFailed(response) {
    try {
      Logger.info("CreateChallengeComponent execute handleCreateChallengeFailed")
      Logger.debug("CreateChallengeComponent execute handleCreateChallengeFailed receive", response)
      const { ui, timeout, data } = this.state
      const { toast } = this.props
      toast({ status: 'error', message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false)

    } catch (e) {
      Logger.error(`CreateChallengeComponent handleUploadImageSuccess ${e.toString()}`)
    }
  }
  handleSystemError() {
    try {
      Logger.info('CreateChallengeComponent execute handleSystemError')
      const { ui, timeout, req, data } = this.state
      const { toast } = this.props
      if (!Helper.isEmpty(data['photos'])) {
        req.current = req.upload
      } else {
        req.current = req.create
      }
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('CreateChallengeComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      ui.defaultShow = ui.listShow[1]
      ui.defaultRank = ui.listRank[0]
      ui.defaultTarget = [ui.listTarget[0]]
      ui.defaultCategoryId = ui.listCategoryId[0]

      data['show'] = ui.defaultShow.value
      data['challengeType'] = ui.defaultCategoryId.value
      data['targetMeijiId'] = [ui.defaultCategoryId.value]
      data['resultType'] = ui.defaultRank.value

    }
    catch (e) {
      Logger.error(`CreateChallengeComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('CreateChallengeComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`CreateChallengeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('CreateChallengeComponent execute handleRequest')
      const { ui, timeout, data, req } = this.state
      const { upload } = this.props
      upload(timeout.key, data['photos']);
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault()
      }
      Logger.info('CreateChallengeComponent execute handleSubmit')
      const { ui, timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleSubmit ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleOnRef(name, element) {
    try {
      const { ref } = this.state
      ref[name] = element
      if (name === 'username') {
        ref[name].focus()
      }
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value, error) {
    try {
      Logger.info('CreateChallengeComponent execute handleOnChange')
      Logger.debug('CreateChallengeComponent execute handleOnChange receive name', name)
      Logger.debug('CreateChallengeComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      Logger.debug('CreateChallengeComponent execute handleOnChange receive data', data)
      let temp = { ...data }
      delete temp["summary"]
      if (data['show'] === ChallengeEnum.SHOW.SHOW) {
        delete temp['endDate']
      }
      if (name == "startDate" || name == "endDate") {
        this.setState({ ui })
      }
      if (name === 'endDate') {
        ui.isShowStartDate = error
      }
      let status = Object.values(temp).findIndex(item => item.toString() === '') == -1
      status = error ? !error : status
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status
        this.setState({ ui })
      }

    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeTarget(event, list) {
    try {
      Logger.info('EditPostComponent execute handleOnChangeTarget')
      Logger.debug('EditPostComponent execute handleOnChangeTarget receive list', list)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      this.handleOnChange('targetMeijiId', list)
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeTarget ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }



  handleOnChangeShow(event, value) {
    try {
      Logger.info('CreateChallengeComponent execute handleOnChangeShow')
      Logger.debug('CreateChallengeComponent execute handleOnChangeShow receive value', value)
      const { data } = this.state
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state

      ui.defaultShow = ui.listShow.find(
        item => {
          return item.value == value
        }
      )
      this.setState({ ui })
      this.handleOnChange('show', value)
      if (value === ChallengeEnum.SHOW.SHOW) {
        this.handleOnChange('endDate', "")
      }
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnChangeShow ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnchangeRank(name, value) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnchangeRank");
      Logger.debug("CreateChallengeComponent execute handleOnchangeRank receive value", value);
      const { data } = this.state;
      const { ui } = this.state;

      ui.defaultRank = ui.listRank.find((item) => {
        return item.value == value;
      });
      this.handleOnChange(name, value);
      this.setState({ ui });
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnchangeRank ${e.toString()}`);
      const { ui, timeout } = this.state;
      ui.isShowBtn = false;
      timeout.setTimeout(false, e.field, e.message);
    }
  }
  handleOnChangeImage(value) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnChangeImage")
      Logger.debug("CreateChallengeComponent execute handleOnChangeImage receive", value)
      const { ui, timeout, req } = this.state
      const { handleChangeImage } = this.props
      ui.photos = value
      req.current = req.upload
      this.handleOnChange('photos', ui.photos)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnChangeImage ${e.toString()}`)
    }
  }

  handleOnChangeDate(name, value,error) {
    try {
      Logger.info("CreateChallengeComponent execute handleOnChangeDate")
      Logger.debug("CreateChallengeComponent execute handleOnChangeDate name", name)
      Logger.debug("CreateChallengeComponent execute handleOnChangeDate receive", value)
      const { ui, timeout, req } = this.state
      const { handleChangeImage } = this.props
      ui.date = value
      this.handleOnChange(name, value,error)
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnChangeDate ${e.toString()}`)
    }
  }

  handleOnBack() {
    try {
      Logger.info('CreateChallengeComponent execute handleOnBack')
      this.props.history.goBack()
    } catch (e) {
      Logger.error(`CreateChallengeComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleOnChangeCategoryId(event, value) {
    try {
      Logger.info('EditPostComponent execute handleOnChangeCategoryId')
      Logger.debug('EditPostComponent execute handleOnChangeCategoryId receive value', value)
      const { ui, data } = this.state
      if (event) {
        event.preventDefault()
      }
      switch (value) {
        case ChallengeEnum.CHALLENGE_TYPE.CHALLENGE_CHAIN:
          ui.defaultRank = ui.listRank[0]
          data['resultType'] = ui.defaultRank.value
          break;
      }

      ui.defaultCategoryId = ui.listCategoryId.find(
        item => {
          return item.value == value
        }
      )
      this.handleOnChange('challengeType', value)
      this.setState({ data })
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeCategoryId ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnClick() {
    try {
      Logger.info("CreateBubbleComponent execute handleOnClick");
      const { ui, timeout } = this.state;
      ui.isHiddenErr = !ui.isHiddenErr
      timeout.setTimeout(false, 'endDate', "");
      this.setState({ ui })
    } catch (e) {
      Logger.error(`CreateBubbleComponent handleOnClick ${e.toString()}`);
      this.state.timeout.setTimeout(false);
    }
  }
  render() {
    const { ui, timeout, data } = this.state
    return <View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit} data={data}
      handleOnRef={this.handleOnRef} handleOnChange={this.handleOnChange}
      handleOnChangeShow={this.handleOnChangeShow}
      handleOnChangeImage={this.handleOnChangeImage} handleOnChangeDate={this.handleOnChangeDate}
      handleOnBack={this.handleOnBack}
      handleOnChangeTarget={this.handleOnChangeTarget}
      handleOnChangeCategoryId={this.handleOnChangeCategoryId}
      handleOnchangeRank={this.handleOnchangeRank}
      handleOnClick={this.handleOnClick}
    />
  }
}

export default BaseComponent(CreateChallengeComponent)