import React, { Component } from 'react'

import BaseComponent from 'base/component'
import Timeout from 'base/component/timeout'
import Logger from 'service/logger'
import Helper from 'service/helper'

import DialogEnum from 'service/enum/dialog'
import DialogModel from 'component/layout/dialog/model'
import RouteEnum from 'service/enum/route'
import Auth from 'service/auth'
import PostEnum from 'service/enum/post'
import UserEnum from 'service/enum/user'
import View from './view'
import { ModelView, ModelRequest } from './model'
import Localize from 'service/localize'

class InfoPostComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: new ModelView(),
      timeout: new Timeout(this.setState.bind(this), this.handleRequest.bind(this)),
      func: {
        handleGetDetailPostSuccees: this.handleGetDetailPostSuccees.bind(this),
        handleGetTargetPostSuccees: this.handleGetTargetPostSuccees.bind(this),
        handleForbidden: this.handleForbidden.bind(this),
        handleApproveAdminPostSuccess: this.handleApproveAdminPostSuccess.bind(this),
        handleEditTargetSuccess: this.handleEditTargetSuccess.bind(this),
        handleSystemError: this.handleSystemError.bind(this)
      },
      ui: {
        postId: {},
        detailPost: {},
        targetPost: [],
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
      },
      req: {
        current: 0,
        detailPost: 1,
        targetPost: 2,
        approveAdminPost: 3,
      }
    }

    this.handleEditAdminPost = this.handleEditAdminPost.bind(this)
    this.handleRemovePost = this.handleRemovePost.bind(this)
    this.handleApproveAdminPost = this.handleApproveAdminPost.bind(this)
    this.handleEditTarget = this.handleEditTarget.bind(this)
    this.handleOnBack = this.handleOnBack.bind(this),
      this.handleSendNotification = this.handleSendNotification.bind(this)
  }
  handleSystemError() {
    try {
      Logger.info('LoadingListPostComponent execute handleSystemError')
      const { ui, timeout } = this.state
      const { toast } = this.props
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`LoadingListPostComponent handleSystemError ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleGetDetailPostSuccees(response) {
    try {
      Logger.info('InfoPostComponent execute handleGetDetailPostSuccees')
      const { ui, timeout, data } = this.state
      ui.detailPost = Helper.cloneNewModel(response)
      Logger.debug('InfoPostComponent execute handleGetDetailPostSuccees receive', ui.detailPost)
      const { getTargetPostByPostId } = this.props
      getTargetPostByPostId(timeout.key, ui.postId)
    } catch (e) {
      Logger.error(`InfoPostComponent handleGetDetailPostSuccees ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleGetTargetPostSuccees(response) {
    try {
      Logger.info('InfoPostComponent execute handleGetTargetPostSuccees')
      const { ui, timeout, data } = this.state
      ui.targetPost = Helper.cloneNewModel(response)
      ui.detailPost.targetPost = ui.targetPost
      Logger.debug('InfoPostComponent execute handleGetTargetPostSuccees receive', ui.targetPost)
      timeout.setTimeout(false)
      this.setState({ data })
    } catch (e) {
      Logger.error(`InfoPostComponent handleGetTargetPostSuccees ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleForbidden() {
    try {
      Logger.info('InfoPostComponent execute handleForbidden')
      const { ui, timeout } = this.state
      const { toast } = this.props
      timeout.setTimeout(false);
      toast({ status: "error", message: Localize.getLocalize("LC_SYSTEM_BUSY") })
    } catch (e) {
      Logger.error(`InfoPostComponent handleForbidden ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  UNSAFE_componentWillMount() {
    try {
      Logger.info('InfoPostComponent execute UNSAFE_componentWillMount')
      const { ui, req } = this.state
      const { location } = this.props
      ui.postId = location.state.postId
      req.current = req.detailPost
      ui.profile = Auth.getPackageProfile()
    }
    catch (e) {
      Logger.error(`InfoPostComponent UNSAFE_componentWillMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  componentDidMount() {
    try {
      Logger.info('InfoPostComponent execute componentDidMount')
      const { timeout } = this.state
      timeout.setTimeout()
    }
    catch (e) {
      Logger.error(`InfoPostComponent componentDidMount ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRequest() {
    try {
      Logger.info('InfoPostComponent execute handleRequest')
      const { ui, timeout, req } = this.state
      const { location } = this.props
      const { getDetailPost, getDetailPostUser, approveAdminPost } = this.props
      switch (req.current) {
        case req.detailPost:
          if (location.state.userType === UserEnum.USER_TYPE.USER || location.state.userType === UserEnum.USER_TYPE.SOCIAL) {
            ui.detailPost = Helper.cloneNewModel(location.state)
            this.setState({ ui })
          } else {
            getDetailPost(timeout.key, ui.postId)
          }
          break;
        case req.approveAdminPost:
          const payload = new ModelRequest().setPostId(ui.postId)
          approveAdminPost(timeout.key, payload)
          break;
      }
    } catch (e) {
      Logger.error(`InfoPostComponent handleRequest ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleEditAdminPost() {
    try {
      Logger.info('InfoPostComponent execute handleEditAdminPost')
      const { ui, timeout } = this.state
      const route = RouteEnum.PAGE.MANAGE_POST.POST.EDIT
      const path = route.replace(':id', ui.postId)
      this.handleRedirectWithState(path, { detailPost: ui.detailPost, targetPost: ui.targetPost })
    } catch (e) {
      Logger.error(`InfoPostComponent handleEditAdminPost ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleRemovePost(status) {
    try {
      Logger.info('InfoPostComponent execute handleRemovePost')
      const { ui, timeout } = this.state
      const { update } = this.props
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.REMOVE_POST)
      dialog.setHandleConfirm(() => {
        this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_POST._)
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoPostComponent handleRemovePost ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }


  handleApproveAdminPost() {
    try {
      Logger.info('InfoPostComponent execute handleExistedEmail')
      const { ui, timeout, req } = this.state
      req.current = req.approveAdminPost

      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.CONFIRM)
      dialog.setTitle(Localize.getLocalize("LC_POPUP_APPROVE_POST_TITLE"))
      dialog.setContent(Localize.getLocalize("LC_POPUP_APPROVE_POST_CONTENT"))
      dialog.setHandleConfirm(() => {
        timeout.setTimeout()
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoPostComponent handleExistedEmail ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleApproveAdminPostSuccess() {
    try {
      Logger.info('InfoPostComponent execute handleExistedEmail')
      const { ui, timeout, req } = this.state
      const { toast } = this.props
      timeout.setTimeout(false)
      toast({ status: "success", message: Localize.getLocalize("LC_TOAST_POST_APPROVE_SUCCESS") })
      this.handleRedirectWithState(RouteEnum.PAGE.MANAGE_POST._)
    } catch (e) {
      Logger.error(`InfoPostComponent handleExistedEmail ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleEditTarget() {
    try {
      Logger.info('InfoPostComponent execute handleEditTarget')
      const { ui, timeout, req } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.EDIT_TARGET_POST)
      dialog.setContent({ postId: ui.postId, target: ui.targetPost })
      dialog.setHandleConfirm(() => {
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoPostComponent handleEditTarget ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }

  handleEditTargetSuccess(response) {
    try {
      Logger.info('InfoPostComponent execute handleEditTarget')
      Logger.debug('InfoPostComponent execute handleEditTarget recieve', response)
      const { ui, timeout, req } = this.state
      ui.targetPost = response
      ui.detailPost.targetPost = ui.targetPost
      this.setState({ ui })
      // timeout.setTimeout(false)
    } catch (e) {
      Logger.error(`InfoPostComponent handleEditTarget ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }


  handleOnBack() {
    try {
      Logger.info('InfoPostComponent execute handleOnBack')
      const { tab } = this.props.location.state
      let path = RouteEnum.PAGE.MANAGE_POST.POST._

      this.handleRedirectWithState(path, { tab: tab })
    } catch (e) {
      Logger.error(`InfoPostComponent handleOnBack ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  handleSendNotification() {
    try {
      Logger.info('InfoPostComponent execute handleSendNotification')
      const { ui, timeout } = this.state
      const { updateModal } = this.props;
      const dialog = new DialogModel()
      dialog.setView(DialogEnum.VIEW.SEND_NOTIFICATION_POST)
      dialog.setContent(ui.detailPost)
      dialog.setHandleConfirm(() => {
        timeout.setTimeout()
      })
      updateModal(dialog)
    } catch (e) {
      Logger.error(`InfoPostComponent handleSendNotification ${e.toString()}`)
      this.state.timeout.setTimeout(false)
    }
  }
  render() {
    const { ui, timeout, data } = this.state
    return <View ui={ui} data={data} timeout={timeout} handleEditAdminPost={this.handleEditAdminPost} handleRemovePost={this.handleRemovePost}
      handleApproveAdminPost={this.handleApproveAdminPost} handleEditTarget={this.handleEditTarget}
      handleOnBack={this.handleOnBack}
      handleSendNotification={this.handleSendNotification}
    />
  }
}

export default BaseComponent(InfoPostComponent)