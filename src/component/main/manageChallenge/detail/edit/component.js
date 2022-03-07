import React, { Component } from 'react'
import moment from 'moment'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Helper from 'service/helper'
import PostEnum from 'service/enum/post'
import RouteEnum from 'service/enum/route'
import ChallengeEnum from 'service/enum/challenge'

import View from './view'
import { ModelView, ModelRequest } from './model'
import Config from 'config'
import Localize from "service/localize";
class EditChallengeComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleUpdateChallengeSuccess: this.handleUpdateChallengeSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this),
        handleRequestSuccess: this.handleUploadImageSuccess.bind(this),
        handleUpdateChallengeFailed: this.handleUpdateChallengeFailed.bind(this)
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
        isContentUpdate: true,
        photos: "",
        detailChallenge: {},
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
        update: 2
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
      Logger.info("EditChallengeComponent execute handleUploadImageSuccess")
      Logger.debug("EditChallengeComponent execute handleUploadImageSuccess receive", response)
      const { ui, timeout, data } = this.state
      const { updateChallenge } = this.props
      const srcImg = `[\"${response.path}\"]`
      let payload = new ModelRequest()
        .setChallengeId(ui.detailChallenge.challengeId)
        .setChallengeType(data["challengeType"])
        .setTitle(data['title'])
        .setPhotos(srcImg)
        .setStartDate(data['startDate'])
        .setEndDate(!Helper.isEmpty(data['endDate']) ? data['endDate'] : undefined)
        .setShow(data['show'])
        .setContent(`${data['content']}`)
        .setTargetMeijiId(Helper.isArray(data['targetMeijiId']) ? JSON.stringify(data['targetMeijiId']) : data['targetMeijiId'])
        .setSummary(!Helper.isEmpty(data['summary']) ? data["summary"] : "")
        .setResultType(ui.defaultCategoryId.value === ChallengeEnum.CHALLENGE_TYPE.WRITE_POST ? data["resultType"] : undefined)
      Logger.debug('EditChallengeComponent execute handleRequest receive payload', payload)
      updateChallenge(timeout.key, payload)
    } catch (e) {
      Logger.error(`EditChallengeComponent handleUploadImageSuccess ${e.toString()}`)
    }
  }
  handleUpdateChallengeSuccess(response) {
    try {
      Logger.info("EditChallengeComponent execute handleUploadImageSuccess")
      Logger.debug("EditChallengeComponent execute handleUploadImageSuccess receive", response)
      const { ui, timeout, data } = this.state
      const { toast } = this.props
      toast({ status: 'success', message: Localize.getLocalize("LC_TOAST_UPDATE_SUCCESS") })
      timeout.setTimeout(false)
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL
      const path = route.replace(':id', response.challengeId)
      this.handleRedirectWithState(path, response)

      // create(timeout.key, payload)
    } catch (e) {
      Logger.error(`EditChallengeComponent handleUploadImageSuccess ${e.toString()}`)
    }
  }
  handleUpdateChallengeFailed(response) {
    try {
      Logger.info("EditChallengeComponent execute handleUpdateChallengeFailed")
      Logger.debug("EditChallengeComponent execute handleUpdateChallengeFailed receive", response)
      const { ui, timeout, data } = this.state
      const { toast } = this.props
      toast({ status: 'error', message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`EditChallengeComponent handleUpdateChallengeFailed ${e.toString()}`)
    }
  }
  handleSystemError() {
    try {
      Logger.info('EditChallengeComponent execute handleSystemError')
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
      Logger.error(`EditChallengeComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  UNSAFE_componentWillMount() {
    try {
      Logger.info('EditChallengeComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      ui.detailChallenge = { ...location.state }
      ui.defaultShow = ui.listShow.find(item => item.value === ui.detailChallenge.show)
      ui.defaultCategoryId = ui.listCategoryId.find(item => item.value === ui.detailChallenge.challengeType)
      ui.defaultRank = ui.detailChallenge.challengeType === ChallengeEnum.CHALLENGE_TYPE.WRITE_POST ? ui.listRank.find(item => item.value === ui.detailChallenge.resultType) : ui.listRank[1]
      JSON.parse(ui.detailChallenge.targetMeijiId).forEach(element => {
        ui.defaultTarget.push(ui.listTarget.find(item => item.value === element))
      })
      Object.keys(data).forEach(
        key => {
          switch (key) {
            case 'resultType':
              data['resultType'] = ui.defaultRank.value
              break;
            default:
              data[key] = ui.detailChallenge[key]
          }
        }
      )
      data["endDate"] = ui.defaultShow.value === ChallengeEnum.SHOW.SHOW_BY_TIME ? ui.detailChallenge.endDate : ""
    }
    catch (e) {
      Logger.error(`EditChallengeComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('EditChallengeComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`EditChallengeComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('EditChallengeComponent execute handleRequest')
      const { ui, timeout, data, req } = this.state
      const { updateChallenge, upload } = this.props
      switch (req.current) {
        case req.upload:
          upload(timeout.key, data['photos']);
          break;
        case req.update:
          const photos = data['photos'].replace(Config.urlStatic, "")
          let payload = new ModelRequest()
            .setChallengeId(ui.detailChallenge.challengeId)
            .setChallengeType(data["challengeType"])
            .setTitle(data['title'])
            .setPhotos(photos)
            .setStartDate(data['startDate'])
            .setEndDate(!Helper.isEmpty(data['endDate']) ? data['endDate'] : undefined)
            .setShow(data['show'])
            .setContent(`${data['content']}`)
            .setTargetMeijiId(Helper.isArray(data['targetMeijiId']) ? JSON.stringify(data['targetMeijiId']) : data['targetMeijiId'])
            .setSummary(!Helper.isEmpty(data['summary']) ? data["summary"] : "")
            .setResultType(ui.defaultCategoryId.value === ChallengeEnum.CHALLENGE_TYPE.WRITE_POST ? data["resultType"] : undefined)
          Logger.debug('EditPostComponent execute handleRequest receive payload', payload)
          updateChallenge(timeout.key, payload)
          break;
      }

    } catch (e) {
      Logger.error(`EditChallengeComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
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
  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault()
      }
      Logger.info('EditChallengeComponent execute handleSubmit')
      const { ui, timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`EditChallengeComponent handleSubmit ${e.toString()}`)
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
      Logger.error(`EditChallengeComponent handleOnRef ${e.toString()}`)
    }
  }

  handleOnChange(name, value, error) {
    try {

      Logger.info('EditChallengeComponent execute handleOnChange')
      Logger.debug('EditChallengeComponent execute handleOnChange receive name', name)
      Logger.debug('EditChallengeComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      Logger.debug('EditChallengeComponent execute handleOnChange receive data', data)
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
      Logger.error(`EditChallengeComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeCategoryId(event, value) {
    try {
      Logger.info('EditPostComponent execute handleOnChangeCategoryId')
      Logger.debug('EditPostComponent execute handleOnChangeCategoryId receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui, data } = this.state


      this.handleOnChange('challengeType', value)
      this.setState({ data })
    } catch (e) {
      Logger.error(`EditPostComponent handleOnChangeCategoryId ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }


  handleOnChangeShow(event, value) {
    try {
      Logger.info('EditChallengeComponent execute handleOnChangeShow aaaaa')
      Logger.debug('EditChallengeComponent execute handleOnChangeShow receive value', value)
      if (event) {
        event.preventDefault()
      }
      const { ui } = this.state
      ui.defaultShow = ui.listShow.find(
        item => {
          return item.value == value
        }
      )
      this.handleOnChange('show', value)
      if (value === ChallengeEnum.SHOW.SHOW) {
        this.handleOnChange('endDate', "")
      }
      ui.detailChallenge.endDate = ""
      this.setState({ ui })

    } catch (e) {
      Logger.error(`EditChallengeComponent handleOnChangeShow ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }

  handleOnChangeImage(value) {

    try {
      Logger.info("EditChallengeComponent execute handleOnChangeImage")
      Logger.debug("EditChallengeComponent execute handleOnChangeImage receive", value)
      const { ui, timeout, req } = this.state
      const { handleChangeImage } = this.props
      ui.photos = value
      req.current = req.upload
      this.handleOnChange('photos', ui.photos)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`EditChallengeComponent handleOnChangeImage ${e.toString()}`)
    }
  }

  handleOnChangeDate(name, value, error) {
    try {
      Logger.info("EditChallengeComponent execute handleOnChangeDate")
      Logger.debug("EditChallengeComponent execute handleOnChangeDate name", name)
      Logger.debug("EditChallengeComponent execute handleOnChangeDate receive", value)
      const { ui, timeout, req } = this.state
      const { handleChangeImage } = this.props
      ui.date = value
      this.handleOnChange(name, value, error)
    } catch (e) {
      Logger.error(`EditChallengeComponent handleOnChangeDate ${e.toString()}`)
    }
  }



  handleOnBack() {
    try {
      Logger.info('EditChallengeComponent execute handleOnBack')
      this.props.history.goBack()
    } catch (e) {
      Logger.error(`EditChallengeComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
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

export default BaseComponent(EditChallengeComponent)