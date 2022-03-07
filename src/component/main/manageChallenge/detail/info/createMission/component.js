import React, { Component } from 'react'
import moment from 'moment'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Helper from 'service/helper'
import PostEnum from 'service/enum/post'
import RouteEnum from 'service/enum/route'
import Localize from "service/localize";
import ChallengeEnum from 'service/enum/challenge'

import View from './view'
import { ModelView, ModelRequestAction, ModelRequestWater, ModelRequestQuestion, ModelRequestClipOrPicture } from './model'
import HelperService from 'service/helper'

class createMissionComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleSystemError: this.handleSystemError.bind(this),
        handleCreateMissionFailed: this.handleCreateMissionFailed.bind(this),
        handleCreateMissionSuccess: this.handleCreateMissionSuccess.bind(this),
        handleCreateMissionFailedByQuestion: this.handleCreateMissionFailedByQuestion.bind(this)
      },
      data: new ModelView(),
      ui: {
        data: {},
        listMissionType: [
          {
            text: ChallengeEnum.MISSION_TYPE_PARSE[ChallengeEnum.MISSION_TYPE.ACTION],
            value: ChallengeEnum.MISSION_TYPE.ACTION,
          },
          {
            text: ChallengeEnum.MISSION_TYPE_PARSE[ChallengeEnum.MISSION_TYPE.WATER],
            value: ChallengeEnum.MISSION_TYPE.WATER,
          },
          {
            text: ChallengeEnum.MISSION_TYPE_PARSE[ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER],
            value: ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER,
          },
          {
            text: ChallengeEnum.MISSION_TYPE_PARSE[ChallengeEnum.MISSION_TYPE.CLIP_OR_PIC],
            value: ChallengeEnum.MISSION_TYPE.CLIP_OR_PIC,
          },
          {
            text: ChallengeEnum.MISSION_TYPE_PARSE[ChallengeEnum.MISSION_TYPE.BMI],
            value: ChallengeEnum.MISSION_TYPE.BMI,
          },
        ],
        defaultMissionType: {},
        listResult: [
          {
            text: ChallengeEnum.MISSION_RESULT_TYPE_PARSE[ChallengeEnum.MISSION_RESULT_TYPE.AUTO],
            value: ChallengeEnum.MISSION_RESULT_TYPE.AUTO,
          },
          {
            text: ChallengeEnum.MISSION_RESULT_TYPE_PARSE[ChallengeEnum.MISSION_RESULT_TYPE.MANUAL],
            value: ChallengeEnum.MISSION_RESULT_TYPE.MANUAL,
          },

        ],
        defaultResult: {},


        listActive: [""],
        defaultListActive: [{ actionName: "" }],
        listQuestion: [""],
        defaultListQuestion: [{
          question: "",
          answers: [{
            questionAnswer: "",
            isCorrect: 0
          },
          {
            questionAnswer: "",
            isCorrect: 0
          }]
        }],
        defaultAnswers: {
          questionAnswer: "",
          isCorrect: 0
        },
        defaultQuestion: {
          question: "",
          answers: [{
            questionAnswer: "",
            isCorrect: 0
          },
          {
            questionAnswer: "",
            isCorrect: 0
          }]
        },
        listAnswer: [""],
        isShowBtn: true,
        detailSubChallenge: {}
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOnRef = this.handleOnRef.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this)
    this.handleAddActive = this.handleAddActive.bind(this)
    this.handleRemoveActive = this.handleRemoveActive.bind(this)
    this.handleOnChangeMissionType = this.handleOnChangeMissionType.bind(this)
    this.handleOnChangeResult = this.handleOnChangeResult.bind(this)
    this.handleAddQuestion = this.handleAddQuestion.bind(this)
    this.handleRemoveQuestion = this.handleRemoveQuestion.bind(this)
    this.handleAddAnswer = this.handleAddAnswer.bind(this)
    this.handleRemoveAnswer = this.handleRemoveAnswer.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnChangeActive = this.handleOnChangeActive.bind(this)
    this.handleOnChangeQuestion = this.handleOnChangeQuestion.bind(this)
    this.handleOnChangeAnswer = this.handleOnChangeAnswer.bind(this)
    this.handleOnChangeAnswerResult = this.handleOnChangeAnswerResult.bind(this)
  }
  handleCreateMissionFailedByQuestion() {
    try {
      Logger.info(`ApproveSubChallengeComponent execute handleCreateMissionFailedByQuestion`);
      const { timeout, data, ui } = this.state;
      const { toast, } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_TOAST_ADD_MISSION_WHEN_NO_CORRECT_ANSWER") })
      timeout.setTimeout(false)
    }
    catch (e) {
      Logger.error(`createMissionComponent handleCreateMissionFailedByQuestion ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleCreateMissionFailed() {
    try {
      Logger.info(`ApproveSubChallengeComponent execute handleApproveSubChallengeFailedByPosition`);
      const { timeout, data, ui } = this.state;
      const { toast, } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false)
    }
    catch (e) {
      Logger.error(`createMissionComponent handleCreateMissionFailed ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleCreateMissionSuccess() {
    try {
      Logger.info(`ApproveSubChallengeComponent execute handleCreateMissionSuccess`);
      const { timeout, data, ui } = this.state;
      const { toast, } = this.props
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_ADD_NEW_SUCCESS") })
      timeout.setTimeout(false)
      this.handleOnBack()
    }
    catch (e) {
      Logger.error(`createMissionComponent handleCreateMissionSuccess ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSystemError() {
    try {
      Logger.info('EditPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
      timeout.setTimeout(false);
    } catch (e) {
      Logger.error(`EditPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('createMissionComponent execute UNSAFE_componentWillMount')
      const { ui, data } = this.state
      const { location } = this.props
      ui.detailSubChallenge = { ...location.state }

      ui.defaultMissionType = ui.listMissionType[0]
      ui.defaultResult = ui.listResult[0]

      data['missionType'] = ui.defaultMissionType.value
      data['resultType'] = ui.defaultResult.value
      data['action'] = ui.defaultListActive
      data['questions'] = [...ui.defaultListQuestion]

    }
    catch (e) {
      Logger.error(`createMissionComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('createMissionComponent execute componentDidMount')
      const { timeout } = this.state
    }
    catch (e) {
      Logger.error(`createMissionComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }



  handleRequest() {
    try {
      Logger.info('createMissionComponent execute handleRequest')
      const { ui, timeout, data, req } = this.state
      const { createMission } = this.props
      switch (ui.defaultMissionType.value) {
        case ChallengeEnum.MISSION_TYPE.ACTION:
          let payloadACtion = new ModelRequestAction()
            .setChallengeId(ui.detailSubChallenge.challengeId)
            .setMissionType(data['missionType'])
            .setMissionTitle(data['missionTitle'])
            .setMissionPoint(Number(data['missionPoint']))
            .setResultType(JSON.stringify(data['resultType']))
            .setActions(data['action'])
          Logger.debug('createMissionComponent execute handleRequest receive payload', payloadACtion)
          createMission(timeout.key, payloadACtion)
          break;
        case ChallengeEnum.MISSION_TYPE.WATER:
          let payloadWater = new ModelRequestWater()
            .setChallengeId(ui.detailSubChallenge.challengeId)
            .setMissionType(data['missionType'])
            .setMissionTitle(data['missionTitle'])
            .setMissionPoint(Number(data['missionPoint']))
            .setResultType(JSON.stringify(data['resultType']))
            .setGoalWater(Number(data['goalWater']))
          Logger.debug('createMissionComponent execute handleRequest receive payload', payloadWater)
          createMission(timeout.key, payloadWater)
          break;
        case ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER:
          let payloadQuestion = new ModelRequestQuestion()
            .setChallengeId(ui.detailSubChallenge.challengeId)
            .setMissionType(data['missionType'])
            .setMissionTitle(data['missionTitle'])
            .setCorrectPoint(Number(data['correctPoint']))
            .setWrongPoint(Number(data['wrongPoint']))
            .setResultType(JSON.stringify(data['resultType']))
            .setQuestions(data['questions'])
          Logger.debug('createMissionComponent execute handleRequest receive payload', payloadQuestion)
          createMission(timeout.key, payloadQuestion)
          break;
        case ChallengeEnum.MISSION_TYPE.BMI:
        case ChallengeEnum.MISSION_TYPE.CLIP_OR_PIC:
          let payloadClipOrPic = new ModelRequestClipOrPicture()
            .setChallengeId(ui.detailSubChallenge.challengeId)
            .setMissionType(data['missionType'])
            .setMissionTitle(data['missionTitle'])
            .setMissionPoint(Number(data['missionPoint']))
            .setResultType(JSON.stringify(data['resultType']))
          Logger.debug('createMissionComponent execute handleRequest receive payload', payloadClipOrPic)
          createMission(timeout.key, payloadClipOrPic)
          break;
      }

    } catch (e) {
      Logger.error(`createMissionComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleSubmit(event) {
    try {
      if (event) {
        event.preventDefault()
      }
      Logger.info('createMissionComponent execute handleSubmit')
      const { ui, timeout } = this.state
      timeout.setTimeout()
    } catch (e) {
      Logger.error(`createMissionComponent handleSubmit ${e.toString()}`)
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
      Logger.error(`createMissionComponent handleOnRef ${e.toString()}`)
    }
  }




  handleOnBack() {
    try {
      Logger.info('createMissionComponent execute handleOnBack')
      const { ui } = this.state
      let route = RouteEnum.PAGE.MANAGE_CHALLENGE.DETAIL
      const path = route.replace(':id', ui.detailSubChallenge.mainChallengeId)
      this.handleRedirectWithState(path, { challengeId: ui.detailSubChallenge.mainChallengeId, tab: ui.detailSubChallenge.tab })
      // this.props.history.goBack()
    } catch (e) {
      Logger.error(`createMissionComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleOnChangeMissionType(event, value) {
    try {

      Logger.info('createMissionComponent execute handleOnChangeMissionType ')
      Logger.debug('createMissionComponent execute handleOnChangeMissionType receive value', value)
      const { ui, data } = this.state
      if (event) {
        event.preventDefault()
      }
      if (ui.defaultMissionType.value === ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER
        && value !== ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER) {
        data['missionPoint'] = ""
      }
      ui.defaultMissionType = ui.listMissionType.find(
        item => { return item.value == value }
      )
      switch (value) {
        case ChallengeEnum.MISSION_TYPE.ACTION:
          data['action'] = [{ actionName: "" }]
          ui.listActive = [""]
          break;
        case ChallengeEnum.MISSION_TYPE.WATER:
          data['goalWater'] = ''
          break;
        case ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER:
          data['questions'] = [{
            question: "", answers: [
              { questionAnswer: "", isCorrect: 0 },
              { questionAnswer: "", isCorrect: 0 }
            ]
          }]
          data['correctPoint'] = ""
          data['wrongPoint'] = ""
          break;
        default:
          break;
      }
      this.handleOnChange('missionType', value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`createMissionComponent handleOnChangeMissionType ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  handleOnChangeResult(event, value) {
    try {
      Logger.info("createMissionComponent execute handleOnChangeMissionType")
      Logger.debug("createMissionComponent execute handleOnChangeMissionType receive", value)
      const { ui, timeout } = this.state
      if (event) {
        event.preventDefault()
      }
      ui.defaultResult = ui.listResult.find(
        item => {
          return item.value == value
        }
      )
      this.handleOnChange('resultType', value)
      this.setState({ ui })
    } catch (e) {
      Logger.error(`createMissionComponent handleOnChangeMissionType ${e.toString()}`)
    }
  }
  handleOnChange(name, value) {
    try {
      Logger.info('CreatePostComponent execute handleOnChange')
      Logger.debug('CreatePostComponent execute handleOnChange receive name', name)
      Logger.debug('CreatePostComponent execute handleOnChange receive value', value)
      const { data, ui } = this.state
      data[name] = value
      let temp = { ...data }
      delete temp['questions']
      delete temp['goalWater']
      delete temp['action']
      if (ui.defaultMissionType.value !== ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER) {
        delete temp["correctPoint"]
        delete temp["wrongPoint"]
      }
      Logger.debug('CreatePostComponent execute handleOnChange receive data', data)
      let status = true;
      switch (ui.defaultMissionType.value) {
        case ChallengeEnum.MISSION_TYPE.ACTION:
          status = Object.values(temp).findIndex(item => item.toString() === '') == -1
            && (data['action'].findIndex(element => element.actionName === '') === -1)

          break;
        case ChallengeEnum.MISSION_TYPE.WATER:
          status = Object.values(temp).findIndex(item => item.toString() === '') == -1
            && (data['goalWater'] !== "")
          break;
        case ChallengeEnum.MISSION_TYPE.QUESTION_AND_ANSWER:
          delete temp['missionPoint']
          status = Object.values(temp).findIndex(item => item.toString() === '') == -1
            && data['questions'].findIndex(element => element.question === "") === -1
            && HelperService.isEmpty(data['questions'].find(element => element.answers.find(item => item.questionAnswer === "")))
          break;
        case ChallengeEnum.MISSION_TYPE.CLIP_OR_PIC:
        case ChallengeEnum.MISSION_TYPE.BMI:
          status = Object.values(temp).findIndex(item => item.toString() === '') == -1
          break;
        default:
          break;
      }
      if (!status !== ui.isShowBtn) {
        ui.isShowBtn = !status
        this.setState({ ui })
      }
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChange ${e.toString()}`)
      const { ui, timeout } = this.state;
      ui.isShowBtn = false
      timeout.setTimeout(false, e.field, e.message)
    }
  }
  //active
  handleAddActive() {
    try {
      Logger.info("createMissionComponent execute handleAddActive")
      const { ui, timeout, data } = this.state
      const action = [...data['action']]
      if (action.findIndex(element => element.actionName === '') === -1) {
        ui.listActive = [...ui.listActive, ""]
        data['action'][action.length] = { actionName: "" }
        this.handleOnChange('action', data['action'])
        this.setState({ ui })
      }

    } catch (e) {
      Logger.error(`createMissionComponent   }${e.toString()}`)
    }
  }
  handleRemoveActive(index) {
    try {
      Logger.info("createMissionComponent execute handleRemoveActive")
      Logger.debug("createMissionComponent execute handleRemoveActive receive", index)
      const { ui, data, timeout, req } = this.state
      const { handleChangeImage } = this.props
      ui.listActive.splice(index, 1)
      data['action'].splice(index, 1)
      this.handleOnChange('action', data['action'])
      this.setState({ ui })
    } catch (e) {
      Logger.error(`createMissionComponent handleRemoveActive ${e.toString()}`)
    }
  }
  handleOnChangeActive(name, value, index) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeActive")
      Logger.debug("CreatePostComponent execute handleOnChangeActive receive name", name)
      Logger.debug("CreatePostComponent execute handleOnChangeActive receive value", value)
      Logger.debug("CreatePostComponent execute handleOnChangeActive receive index", index)
      const { ui, timeout, req, data } = this.state
      data[name][index] = { actionName: value }
      this.handleOnChange(name, data[name])
      this.setState({ ui })
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeActive ${e.toString()}`)
    }
  }
  //question/answer
  handleAddQuestion() {
    try {
      Logger.info("createMissionComponent execute handleAddQuestion")
      const { ui, timeout, data } = this.state
      const questions = [...data['questions']]
      if (questions.findIndex(element => element.question === "") === -1 &&
        HelperService.isEmpty(questions.find(element => element.answers.find(item => item.questionAnswer === "")))) {
        data['questions'] = [...questions, { question: "", answers: [{ questionAnswer: "", isCorrect: 0 }, { questionAnswer: "", isCorrect: 0 }] }]
      }
      this.setState({ ui })
    } catch (e) {
      Logger.error(`createMissionComponent handleAddQuestion  ${e.toString()}  }
      ${e.toString()}`)
    }
  }
  handleRemoveQuestion(index) {
    try {
      Logger.info("createMissionComponent execute handleRemoveQuestion")
      Logger.debug("createMissionComponent execute handleRemoveQuestion receive", index)
      const { ui, timeout, data } = this.state
      const { handleChangeImage } = this.props
      data['questions'].splice(index, 1)
      this.handleOnChange('questions', data['questions'])
      this.setState({ ui })
    } catch (e) {
      Logger.error(`createMissionComponent handleRemoveQuestion ${e.toString()}`)
    }
  }
  handleOnChangeQuestion(name, value, index) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeQuestion")
      Logger.debug("CreatePostComponent execute handleOnChangeQuestion receive name", name)
      Logger.debug("CreatePostComponent execute handleOnChangeQuestion receive value", value)
      Logger.debug("CreatePostComponent execute handleOnChangeQuestion receive index", index)
      const { ui, timeout, req, data } = this.state
      data[name][index]['question'] = value
      this.handleOnChange(name, data[name])
      this.setState({ ui })

    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeQuestion ${e.toString()}`)
    }
  }
  handleOnChangeAnswer(name, value, index, indexAnswer) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeQuestion")
      Logger.debug("CreatePostComponent execute handleOnChangeQuestion receive name", name)
      Logger.debug("CreatePostComponent execute handleOnChangeQuestion receive value", value)
      Logger.debug("CreatePostComponent execute handleOnChangeQuestion receive index", index)
      Logger.debug("CreatePostComponent execute handleOnChangeQuestion receive index", indexAnswer)
      const { ui, timeout, req, data } = this.state
      data[name][index].answers[indexAnswer].questionAnswer = value
      this.handleOnChange(name, data[name])
      this.setState({ ui })

    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeQuestion ${e.toString()}`)
    }
  }
  handleOnChangeAnswerResult(value, index, indexAnswer) {
    try {
      Logger.info("CreatePostComponent execute handleOnChangeAnswerResult")
      Logger.debug("CreatePostComponent execute handleOnChangeAnswerResult receive value", value)
      Logger.debug("CreatePostComponent execute handleOnChangeAnswerResult receive index", index)
      Logger.debug("CreatePostComponent execute handleOnChangeAnswerResult receive index", indexAnswer)
      const { ui, timeout, req, data } = this.state
      data['questions'][index].answers[indexAnswer].isCorrect = value
      this.handleOnChange('questions', data['questions'])
      this.setState({ ui })
    } catch (e) {
      Logger.error(`CreatePostComponent handleOnChangeQuestion ${e.toString()}`)
    }
  }
  handleAddAnswer(index) {
    try {
      Logger.info("createMissionComponent execute handleAddAnswer")
      const { ui, timeout, data } = this.state
      const questions = [...data['questions']]
      const answers = [...questions[index].answers, { questionAnswer: "", isCorrect: 0 }]
      data['questions'][index].answers = answers
      this.handleOnChange('questions', data['questions'])
      this.setState({ ui })
    } catch (e) {
      Logger.error(`createMissionComponent handleAddAnswer  ${e.toString()}  }
      ${e.toString()}`)
    }
  }
  handleRemoveAnswer(index, indexAnswer) {
    try {
      Logger.info("createMissionComponent execute handleRemoveAnswer")
      Logger.debug("createMissionComponent execute handleRemoveAnswer receive", index)
      const { ui, timeout, data } = this.state
      const { handleChangeImage } = this.props
      data['questions'][index].answers.splice(indexAnswer, 1)
      this.handleOnChange('questions', data['questions'])
      this.setState({ ui })
    } catch (e) {
      Logger.error(`createMissionComponent handleRemoveAnswer ${e.toString()}`)
    }
  }
  render() {
    const { ui, timeout, data } = this.state
    return <View ui={ui} timeout={timeout} handleSubmit={this.handleSubmit} data={data}
      handleOnRef={this.handleOnRef}
      handleOnBack={this.handleOnBack}
      handleAddActive={this.handleAddActive}
      handleRemoveActive={this.handleRemoveActive}
      handleOnChangeResult={this.handleOnChangeResult}
      handleOnChangeMissionType={this.handleOnChangeMissionType}
      handleAddQuestion={this.handleAddQuestion}
      handleRemoveQuestion={this.handleRemoveQuestion}
      handleAddAnswer={this.handleAddAnswer}
      handleRemoveAnswer={this.handleRemoveAnswer}
      handleOnChange={this.handleOnChange}
      handleOnChangeActive={this.handleOnChangeActive}
      handleOnChangeQuestion={this.handleOnChangeQuestion}
      handleOnChangeAnswer={this.handleOnChangeAnswer}
      handleOnChangeAnswerResult={this.handleOnChangeAnswerResult}

    />
  }
}

export default BaseComponent(createMissionComponent)