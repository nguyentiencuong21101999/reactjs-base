/**
 * Created By Nguyen Cong Thanh on 07/24/202 13:52.
 *
 * Copyright intelIn 2020.
 */

import Logger from 'service/logger'
import Helper from 'service/helper'

const REQUEST = {
  SYSTEM_ERROR: '5000',
  ADMIN_LOGIN_2000: 'ADMIN_LOGIN_2000',
  ADMIN_LOGIN_4000: 'ADMIN_LOGIN_4000',
  ADMIN_LOGIN_4001: 'ADMIN_LOGIN_4001',
  ADMIN_LOGIN_4002: 'ADMIN_LOGIN_4002',
  ADMIN_GET_LIST_2000: 'ADMIN_GET_LIST_2000',
  ADMIN_GET_LIST_2001: 'ADMIN_GET_LIST_2001',
  ADMIN_GET_LIST_2002: 'ADMIN_GET_LIST_2002',
  ADMIN_GET_LIST_2003: 'ADMIN_GET_LIST_2003',
  ADMIN_UPDATE_PROFILE_2000: 'ADMIN_UPDATE_PROFILE_2000',
  ADMIN_UPDATE_PROFILE_4000: 'ADMIN_UPDATE_PROFILE_4000',
  ADMIN_UPDATE_PROFILE_4001: 'ADMIN_UPDATE_PROFILE_4001',
  ADMIN_UPDATE_PROFILE_4002: 'ADMIN_UPDATE_PROFILE_4002',
  ADMIN_REGISTER_TEMP_2000: 'ADMIN_REGISTER_TEMP_2000',
  ADMIN_CREATE_ADMIN_TEMP_2000: 'ADMIN_CREATE_ADMIN_TEMP_2000',
  ADMIN_REGISTER_TEMP_4001: 'ADMIN_REGISTER_TEMP_4001',
  ADMIN_REGISTER_TEMP_4002: 'ADMIN_REGISTER_TEMP_4002',
  ADMIN_REGISTER_TEMP_4003: 'ADMIN_REGISTER_TEMP_4003',
  ADMIN_RESET_PASSWORD_2000: 'ADMIN_RESET_PASSWORD_2000',
  ADMIN_RESET_PASSWORD_4000: 'ADMIN_RESET_PASSWORD_4000',
  ADMIN_RESET_PASSWORD_2001: 'ADMIN_RESET_PASSWORD_2001',
  ADMIN_RESET_PASSWORD_4001: 'ADMIN_RESET_PASSWORD_4001',
  ADMIN_RESET_PASSWORD_4002: 'ADMIN_RESET_PASSWORD_4002',
  ADMIN_RESET_PASSWORD_4003: 'ADMIN_RESET_PASSWORD_4003',
  ADMIN_UPDATE_STATUS_USER_2000: 'ADMIN_UPDATE_STATUS_USER_2000',
  ADMIN_UPDATE_STATUS_USER_2001: 'ADMIN_UPDATE_STATUS_USER_2001',
  ADMIN_UPDATE_STATUS_USER_4000: 'ADMIN_UPDATE_STATUS_USER_4000',
  SOCIAL_POST_CREATE_2000: 'SOCIAL_POST_CREATE_2000',
  ADMIN_GET_POST_2000: 'ADMIN_GET_POST_2000',
  ADMIN_GET_TARGET_POST_2000: 'ADMIN_GET_TARGET_POST_2000',
  ADMIN_GET_DETAIL_POST_2000: 'ADMIN_GET_DETAIL_POST_2000',
  ADMIN_UPDATE_TARGET_POST_2000: 'ADMIN_UPDATE_TARGET_POST_2000',
  CODE_200: '200',
  CODE_5000: '5000',
  CODE_500: '500',
  ADMIN_UPDATE_POST_2000: 'ADMIN_UPDATE_POST_2000',
  ADMIN_UPDATE_POST_4003: 'ADMIN_UPDATE_POST_4003',
  ADMIN_APPROVE_POST_4003: 'ADMIN_APPROVE_POST_4003',
  ADMIN_APPROVE_POST_2000: 'ADMIN_APPROVE_POST_2000',
  ADMIN_CREATE_ADMIN_TEMP_4000: 'ADMIN_CREATE_ADMIN_TEMP_4000',
  ADMIN_CREATE_ADMIN_TEMP_4001: 'ADMIN_CREATE_ADMIN_TEMP_4001',
  CODE_AUTH_4001: 'AUTH_4001',
  //challenge
  CHALLENGE_2000: "CHALLENGE_2000",
  CHALLENGE_2001: "CHALLENGE_2001",
  CHALLENGE_4002: "CHALLENGE_4002",
  CHALLENGE_2002: "CHALLENGE_2002",
  CHALLENGE_4004: "CHALLENGE_4004",
  CHALLENGE_2003: "CHALLENGE_2003",
  CHALLENGE_4005: "CHALLENGE_4005",
  CHALLENGE_2004: "CHALLENGE_2004",
  CHALLENGE_2005: "CHALLENGE_2005",
  CHALLENGE_2006: "CHALLENGE_2006",
  CHALLENGE_2007: "CHALLENGE_2007",
  CHALLENGE_2008: "CHALLENGE_2008",
  CHALLENGE_4024: "CHALLENGE_4024",
  CHALLENGE_4000: "CHALLENGE_4000",
  CHALLENGE_4001: "CHALLENGE_4001",

  //user challenge
  USER_2000: "USER_2000",
  //dashBoard
  DASHBOARD_2000: "DASHBOARD_2000",
  //subChallenge
  CHALLENGE_2015: "CHALLENGE_2015",
  CHALLENGE_2009: "CHALLENGE_2009",
  CHALLENGE_4010: "CHALLENGE_4010",
  CHALLENGE_2014: "CHALLENGE_2014",
  CHALLENGE_2011: "CHALLENGE_2011",
  CHALLENGE_4014: "CHALLENGE_4014",
  //remove subChallenge
  CHALLENGE_4012: "CHALLENGE_4012",
  CHALLENGE_4015: "CHALLENGE_4015",
  CHALLENGE_4016: "CHALLENGE_4016",
  CHALLENGE_2012: "CHALLENGE_2012",
  //approve subChallenge
  CHALLENGE_4018: "CHALLENGE_4018",
  CHALLENGE_4019: "CHALLENGE_4019",
  CHALLENGE_4017: "CHALLENGE_4017",
  CHALLENGE_2013: "CHALLENGE_2013",
  //create mission
  CHALLENGE_MISSION_4000: "CHALLENGE_MISSION_4000",
  CHALLENGE_MISSION_4008: "CHALLENGE_MISSION_4008",
  CHALLENGE_MISSION_2000: "CHALLENGE_MISSION_2000",
  //remove mission
  CHALLENGE_MISSION_2004: "CHALLENGE_MISSION_2004",
  CHALLENGE_MISSION_4005: "CHALLENGE_MISSION_4005",
  CHALLENGE_MISSION_4002: "CHALLENGE_MISSION_4002",
  //get detail mission
  CHALLENGE_MISSION_2002: "CHALLENGE_MISSION_2002",
  CHALLENGE_MISSION_4003: "CHALLENGE_MISSION_4003",

  ADMIN_2000: "ADMIN_2000",
  CHALLENGE_2016: "CHALLENGE_2016",
  USER_MISSION_2006: "USER_MISSION_2006",
  //apply challenge
  CHALLENGE_2010: "CHALLENGE_2010",
  CHALLENGE_4011: "CHALLENGE_4011",
  CHALLENGE_4013: "CHALLENGE_4013",
  CHALLENGE_4025: "CHALLENGE_4025",
  //end challenge
  CHALLENGE_2017: "CHALLENGE_2017",
  CHALLENGE_4020: "CHALLENGE_4020",
  CHALLENGE_4021: "CHALLENGE_4021",
  //change position mission
  CHALLENGE_MISSION_2003: 'CHALLENGE_MISSION_2003',
  CHALLENGE_MISSION_4002: "CHALLENGE_MISSION_4002",
  CHALLENGE_MISSION_4004: "CHALLENGE_MISSION_4004",
  //send notification challenge
  NOTIFICATION_2005: "NOTIFICATION_2005",
  NOTIFICATION_4002: "NOTIFICATION_4002",
  //send notification post
  NOTIFICATION_2006: "NOTIFICATION_2006",
  NOTIFICATION_4003: "NOTIFICATION_4003",
  //notify
  NOTIFICATION_2007: "NOTIFICATION_2007",
  NOTIFICATION_2000: "NOTIFICATION_2000",
  NOTIFICATION_4000: "NOTIFICATION_4000",
  NOTIFICATION_2003: "NOTIFICATION_2003",
  //reward
  PROMOTION_2002: "PROMOTION_2002",
  PROMOTION_2003: "PROMOTION_2003",
  PROMOTION_2005: "PROMOTION_2005",
  PROMOTION_4004: "PROMOTION_4004",
  PROMOTION_2006: 'PROMOTION_2006',
  PROMOTION_2004: "PROMOTION_2004",
  PROMOTION_4003: "PROMOTION_4003",
  PROMOTION_2000: "PROMOTION_2000",
  PROMOTION_4000: "PROMOTION_4000",
  PROMOTION_2007: "PROMOTION_2007",
  PROMOTION_2008: "PROMOTION_2008",
  PROMOTION_2001: "PROMOTION_2001",
  PROMOTION_4001: "PROMOTION_4001",
  //category
  CATEGORY_2000: "CATEGORY_2000",
  CATEGORY_2002: "CATEGORY_2002",
  CATEGORY_4001: "CATEGORY_4001",
  CATEGORY_2001: "CATEGORY_2001",
  CATEGORY_4002: "CATEGORY_4002",
  CATEGORY_2003: "CATEGORY_2003",
  CONFIG_2000: "CONFIG_2000",
  CONFIG_2001: "CONFIG_2001",
  CONFIG_4000: "CONFIG_4000",
  PREGNANCY_POST_2003: "PREGNANCY_POST_2003",
  PREGNANCY_POST_2000: "PREGNANCY_POST_2000",
  PREGNANCY_POST_4000: "PREGNANCY_POST_4000",
  PREGNANCY_POST_2002: "PREGNANCY_POST_2002",
  PREGNANCY_POST_2001: "PREGNANCY_POST_2001",
  PREGNANCY_POST_4001: "PREGNANCY_POST_4001",

  //menu
  CATEGORY_2004: "CATEGORY_2004",
  CATEGORY_2005: "CATEGORY_2005",
  CATEGORY_4003: "CATEGORY_4003",
  CATEGORY_2006: "CATEGORY_2006",
  CATEGORY_4004: "CATEGORY_4004",
  CATEGORY_2007: "CATEGORY_2007",
  CATEGORY_4005: "CATEGORY_4005",
  //food
  FOOD_2003: "FOOD_2003",
  FOOD_2002: "FOOD_2002",
  FOOD_2004: "FOOD_2004",
  FOOD_2000: "FOOD_2000",
  FOOD_4000: "FOOD_4000",
  FOOD_2001: "FOOD_2001",
  FOOD_4001: "FOOD_4001",
  MENU_SETTING_2003: "MENU_SETTING_2003",
  MENU_SETTING_2000: "MENU_SETTING_2000",
  MENU_SETTING_4000: "MENU_SETTING_4000",
  MENU_SETTING_2002: "MENU_SETTING_2002",
  MENU_SETTING_2001: "MENU_SETTING_2001",
  MENU_SETTING_4001: "MENU_SETTING_4001",
  MENU_SETTING_DAY_2002: "MENU_SETTING_DAY_2002",
  MENU_SETTING_DAY_2000: "MENU_SETTING_DAY_2000",
  MENU_SETTING_DAY_4000: "MENU_SETTING_DAY_4000",
  //target
  MENU_SETTING_TARGET_2003: "MENU_SETTING_TARGET_2003",
  MENU_SETTING_TARGET_2000: "MENU_SETTING_TARGET_2000",
  MENU_SETTING_TARGET_4000: "MENU_SETTING_TARGET_4000",
  MENU_SETTING_TARGET_2001: "MENU_SETTING_TARGET_2001",
  MENU_SETTING_TARGET_4001: "MENU_SETTING_TARGET_4001",
  NOTIFICATION_2008: "NOTIFICATION_2008",
  BUBBLE_2002: "BUBBLE_2002",
  BUBBLE_2000: "BUBBLE_2000",
  BUBBLE_4000: "BUBBLE_4000",
  BUBBLE_2001: "BUBBLE_2001",
  BUBBLE_4001: "BUBBLE_4001",
  REWARD_2002: "REWARD_2002",
  REWARD_4002: "REWARD_4002",
  REWARD_2000: "REWARD_2000",
  REWARD_4000: "REWARD_4000",
  REWARD_2001: "REWARD_2001",
  REWARD_4001: "REWARD_4001",
  REWARD_4003: "REWARD_4003",
  CHALLENGE_4003: "CHALLENGE_4003",
  CHALLENGE_2019: "CHALLENGE_2019",
  CHALLENGE_4023: "CHALLENGE_4023",
  CHALLENGE_4009: "CHALLENGE_4009",
  CHALLENGE_MISSION_4002: "CHALLENGE_MISSION_4002",
  CHALLENGE_MISSION_4006: "CHALLENGE_MISSION_4006",
  CHALLENGE_MISSION_4007: "CHALLENGE_MISSION_4007",

  CATEGORY_2008:"CATEGORY_2008"






}

const REQUEST_PARSE = {
  [REQUEST.SYSTEM_ERROR]: 'handleSystemError',
  [REQUEST.ADMIN_LOGIN_2000]: 'handleLoginSuccess',
  [REQUEST.ADMIN_LOGIN_4000]: 'handleUserNotExisted',
  [REQUEST.ADMIN_LOGIN_4001]: 'handlePasswordWrong',
  [REQUEST.ADMIN_LOGIN_4002]: 'handleAdminIsBan',
  [REQUEST.ADMIN_GET_LIST_2000]: 'handleGetListAdminSuccess',
  [REQUEST.ADMIN_GET_LIST_2001]: 'handleGetListAdminNotActiveSuccess',
  [REQUEST.ADMIN_GET_LIST_2002]: 'handleGetListUserInfoSuccess',
  [REQUEST.ADMIN_GET_LIST_2003]: 'handleGetListUserSocialSuccess',
  [REQUEST.ADMIN_UPDATE_PROFILE_2000]: 'handleUpdateProfileAdminSuccess',
  [REQUEST.ADMIN_UPDATE_PROFILE_4000]: 'handleUserNotExisted',
  [REQUEST.ADMIN_UPDATE_PROFILE_4001]: 'handleForbidden',
  [REQUEST.ADMIN_UPDATE_PROFILE_4002]: 'handleExistedEmail',
  [REQUEST.ADMIN_REGISTER_TEMP_2000]: 'handleRegisterTempSuccess',
  [REQUEST.ADMIN_CREATE_ADMIN_TEMP_2000]: 'handleCreateAdminTempSuccess',
  [REQUEST.ADMIN_CREATE_ADMIN_TEMP_4000]: 'handleCreateAdminTempExistedEmail',
  [REQUEST.ADMIN_CREATE_ADMIN_TEMP_4001]: 'handleCreateAdminTempExistedUsername',
  [REQUEST.ADMIN_REGISTER_TEMP_4001]: 'handleExistedEmail',
  [REQUEST.ADMIN_REGISTER_TEMP_4002]: 'handleExistedUsername',
  [REQUEST.ADMIN_REGISTER_TEMP_4003]: 'handleForbidden',
  [REQUEST.ADMIN_RESET_PASSWORD_2000]: 'handleGetTokenSuccess',
  [REQUEST.ADMIN_RESET_PASSWORD_4000]: 'handleTokenNotFound',
  [REQUEST.ADMIN_RESET_PASSWORD_2001]: 'handleResetPasswordSuccess',
  [REQUEST.ADMIN_RESET_PASSWORD_4001]: 'handleTokenUsed',
  [REQUEST.ADMIN_RESET_PASSWORD_4002]: 'handleTokenExpired',
  [REQUEST.ADMIN_RESET_PASSWORD_4003]: 'handleAdminResetPasswordSuccess',
  [REQUEST.ADMIN_UPDATE_STATUS_USER_2000]: 'handleBanAccountSuccess',
  [REQUEST.ADMIN_UPDATE_STATUS_USER_2001]: 'handleUnbanAccountSuccess',
  [REQUEST.ADMIN_UPDATE_STATUS_USER_4000]: 'handleUpdateStatusIsUnnecessary',
  [REQUEST.SOCIAL_POST_CREATE_2000]: 'handleCreatePostSuccess',
  [REQUEST.ADMIN_GET_POST_2000]: 'handleGetListPostSuccess',
  [REQUEST.ADMIN_GET_DETAIL_POST_2000]: 'handleGetDetailPostSuccees',
  [REQUEST.ADMIN_GET_TARGET_POST_2000]: 'handleGetTargetPostSuccees',
  [REQUEST.ADMIN_UPDATE_TARGET_POST_2000]: 'handleUpdateTargetPostSuccees',
  [REQUEST.CODE_200]: 'handleRequestSuccess',
  [REQUEST.CODE_5000]: 'handleSystemError',
  [REQUEST.CODE_500]: 'handleSystemError',
  [REQUEST.ADMIN_UPDATE_POST_2000]: 'handleUpdatePostSuccees',
  [REQUEST.ADMIN_UPDATE_POST_4003]: 'handleForbidden',
  [REQUEST.ADMIN_UPDATE_TARGET_POST_2000]: 'handleUpdateTargetPostSuccees',
  [REQUEST.ADMIN_APPROVE_POST_4003]: 'handleForbidden',
  [REQUEST.ADMIN_APPROVE_POST_2000]: 'handleApproveAdminPostSuccess',
  [REQUEST.CODE_AUTH_4001]: 'handleTokenExpired',
  //challenge
  [REQUEST.CHALLENGE_2000]: 'handleUpdateChallengeResultSuccess',
  [REQUEST.CHALLENGE_2001]: 'handleUpdateChallengeSuccess',
  [REQUEST.CHALLENGE_2002]: 'handleCreateChallengeSuccess',
  [REQUEST.CHALLENGE_4004]: 'handleCreateChallengeFailed',
  [REQUEST.CHALLENGE_4002]: 'handleUpdateChallengeFailed',

  [REQUEST.CHALLENGE_2003]: 'handleUpdateUserChallengeSuccess',
  [REQUEST.CHALLENGE_4005]: 'handleUpdateUserChallengeFailed',
  [REQUEST.CHALLENGE_2004]: 'handleUpdateChallengePostResultSuccess',
  [REQUEST.CHALLENGE_2005]: 'handleGetAllChallengeSuccess',
  [REQUEST.CHALLENGE_2006]: 'handleGetListParticipantSuccess',
  [REQUEST.CHALLENGE_2007]: 'handleGetListPostParticipantSuccess',
  [REQUEST.CHALLENGE_2008]: 'handleGetDetailChallengeSuccess',
  [REQUEST.CHALLENGE_4024]: 'handleUpdateChallengeResultFail',
  [REQUEST.CHALLENGE_4000]: 'handleUpdateChallengeResultFailed',
  [REQUEST.CHALLENGE_4001]: 'handleUpdateChallengeResultFailByTime',
  // user challenge
  [REQUEST.USER_2000]: 'handleGetDetailUserChallengeSuccess',
  //dashBoard
  [REQUEST.DASHBOARD_2000]: 'handleGetDetailDashBoardSuccess',
  //subChallenge
  [REQUEST.CHALLENGE_2015]: 'handleGetDetailChallengeChainSuccess',
  [REQUEST.CHALLENGE_2009]: 'handleCreateSubChallengeSuccess',
  [REQUEST.CHALLENGE_4010]: 'handleCreateSubChallengeFailed',
  [REQUEST.CHALLENGE_2014]: 'handleGetDetailSubChallengeSuccess',
  [REQUEST.CHALLENGE_2011]: 'handleUpdateSubChallengeSuccess',
  [REQUEST.CHALLENGE_4014]: 'handleUpdateSubChallengeFailed',
  //remove subChallenge
  [REQUEST.CHALLENGE_4012]: 'handleRemoveOrApplyFailed',
  [REQUEST.CHALLENGE_4015]: 'handleRemoveSubChallengeFailed',
  [REQUEST.CHALLENGE_4016]: 'handleRemoveSubChallengeFailedByHaveMission',
  [REQUEST.CHALLENGE_2012]: 'handleRemoveSubChallengeSuccess',
  //approve subChallenge
  [REQUEST.CHALLENGE_4018]: 'handleApproveSubChallengeFailedByPosition',
  [REQUEST.CHALLENGE_4019]: 'handleApproveSubChallengeFailedByNotMission',
  [REQUEST.CHALLENGE_4017]: 'handleApproveSubChallengeFailed',
  [REQUEST.CHALLENGE_2013]: 'handleApproveSubChallengeSuccess',
  //create mission
  [REQUEST.CHALLENGE_MISSION_4000]: 'handleCreateMissionFailed',
  [REQUEST.CHALLENGE_MISSION_4002]: 'handleCreateMissionFailed',
  [REQUEST.CHALLENGE_MISSION_4006]: 'handleCreateMissionFailed',
  [REQUEST.CHALLENGE_MISSION_4007]: 'handleCreateMissionFailed',
  [REQUEST.CHALLENGE_MISSION_4008]: 'handleCreateMissionFailedByQuestion',
  [REQUEST.CHALLENGE_MISSION_2000]: 'handleCreateMissionSuccess',
  //remove mission
  [REQUEST.CHALLENGE_MISSION_2004]: 'handleRemoveMissionSuccess',
  [REQUEST.CHALLENGE_MISSION_4005]: 'handleRemoveMissionFailed',
  [REQUEST.CHALLENGE_MISSION_4002]: 'handleRemoveMissionFailedByNotSubOrDraft',
  //get detail mission
  [REQUEST.CHALLENGE_MISSION_2002]: 'handleGetDetailMissionSuccess',
  [REQUEST.CHALLENGE_MISSION_4003]: 'handleGetDetailMissionFailed',

  [REQUEST.ADMIN_2000]: 'handleGetListPostAdminSuccess',
  [REQUEST.CHALLENGE_2016]: 'handleGetListMissionParticipantSuccess',

  [REQUEST.USER_MISSION_2006]: 'handleUpdateUserChallengeMissionSuccess',
  [REQUEST.CHALLENGE_4009]: 'handleUpdateUserChallengeMissionFailed',
  //apply challenge
  [REQUEST.CHALLENGE_2010]: 'handleApplyChallengeSuccess',
  [REQUEST.CHALLENGE_4011]: 'handleApplyChallengeFailed',
  [REQUEST.CHALLENGE_4013]: 'handleApplyChallengeFailedByDate',
  [REQUEST.CHALLENGE_4025]: 'handleApplyChallengeFailedBySubChallenge',
  //end challenge
  [REQUEST.CHALLENGE_2017]: 'handleEndChallengeSuccess',
  [REQUEST.CHALLENGE_4020]: 'handleEndChallengeFailed',
  [REQUEST.CHALLENGE_4021]: 'handleEndChallengeFailedIllegal',
  [REQUEST.CHALLENGE_MISSION_2003]: 'handleChangePositionMissionSuccess',
  [REQUEST.CHALLENGE_MISSION_4002]: 'handleChangePositionMissionFailedByApplied',
  [REQUEST.CHALLENGE_MISSION_4004]: 'handleChangePositionMissionFailed',
  //send notification challenge
  [REQUEST.NOTIFICATION_2005]: 'handleSendNotificationSuccess',
  [REQUEST.NOTIFICATION_4002]: 'handleSendNotificationFailed',
  //send notification post
  [REQUEST.NOTIFICATION_2006]: 'handleSendNotificationPostSuccess',
  [REQUEST.NOTIFICATION_4003]: 'handleSendNotificationPostFailed',
  //notify
  [REQUEST.NOTIFICATION_2007]: 'handleCheckDataImportSuccess',
  [REQUEST.NOTIFICATION_2000]: 'handleCreateNotificationSuccess',
  [REQUEST.NOTIFICATION_4000]: 'handleCreateNotificationFailed',
  [REQUEST.NOTIFICATION_2003]: 'handleGetListNotificationSuccess',
  //reward
  [REQUEST.PROMOTION_2002]: 'handleGetListRewardSuccess',
  [REQUEST.PROMOTION_2003]: 'handleGetDetailRewardSuccess',
  [REQUEST.PROMOTION_2005]: 'handleGetListRequestSuccess',
  [REQUEST.PROMOTION_4004]: 'handleUpdateListRequestFailed',
  [REQUEST.PROMOTION_2006]: 'handleUpdateListRequestSuccess',
  [REQUEST.PROMOTION_2004]: 'handleApplyRewardSuccess',
  [REQUEST.PROMOTION_4003]: 'handleUpdateStatusRewardFailed',
  [REQUEST.PROMOTION_2000]: 'handleCreateRewardSuccess',
  [REQUEST.PROMOTION_4000]: 'handleCreateRewardFailed',
  [REQUEST.PROMOTION_2007]: 'handleGetDetailMemberSuccess',
  [REQUEST.PROMOTION_2008]: 'handleGetHistorySuccess',
  [REQUEST.PROMOTION_2001]: 'handleUpdateRewardSuccess',
  [REQUEST.PROMOTION_4001]: 'handleUpdateRewardFailed',
  //category
  [REQUEST.CATEGORY_2000]: 'handleGetListCategorySuccess',
  [REQUEST.CATEGORY_2002]: 'handleCreateCategorySuccess',
  [REQUEST.CATEGORY_4001]: 'handleCreateCategoryFailed',
  [REQUEST.CATEGORY_2001]: 'handleGetDetailCategorySuccess',
  [REQUEST.CATEGORY_4002]: 'handleUpdateCategoryFailed',
  [REQUEST.CATEGORY_2003]: 'handleUpdateCategorySuccess',
  [REQUEST.CONFIG_2000]: 'handleGetListSettingSuccess',
  [REQUEST.CONFIG_2001]: 'handleUpdateSettingSuccess',
  [REQUEST.CONFIG_4000]: 'handleUpdateSettingFailed',
  [REQUEST.PREGNANCY_POST_2003]: 'handleGetListTeachingPregnancySuccess',
  [REQUEST.PREGNANCY_POST_2000]: 'handleCreateTeachingPregnancySuccess',
  [REQUEST.PREGNANCY_POST_4000]: 'handleCreateTeachingPregnancyFailed',
  [REQUEST.PREGNANCY_POST_2002]: 'handleGetDetailTeachingPregnancySuccess',
  [REQUEST.PREGNANCY_POST_2001]: 'handleUpdateTeachingPregnancySuccess',
  [REQUEST.PREGNANCY_POST_4001]: 'handleUpdateTeachingPregnancyFailed',
  //menu
  [REQUEST.CATEGORY_2004]: 'handleGetListCategorySuccess',
  [REQUEST.CATEGORY_2005]: 'handleGetDetailCategorySuccess',
  [REQUEST.CATEGORY_4003]: 'handleGetDetailCategoryFailed',
  [REQUEST.CATEGORY_2006]: 'handleCreateCategorySuccess',
  [REQUEST.CATEGORY_4004]: 'handleCreateCategoryFailed',
  [REQUEST.CATEGORY_2007]: 'handleUpdateCategorySuccess',
  [REQUEST.CATEGORY_4005]: 'handleUpdateCategoryFailed',
  //food
  [REQUEST.FOOD_2003]: 'handleGetListFoodSuccess',
  [REQUEST.FOOD_2002]: 'handleGetDetailFoodSuccess',
  [REQUEST.FOOD_2004]: 'handleGetListSuccess',
  [REQUEST.FOOD_2000]: 'handleCreateFoodSuccess',
  [REQUEST.FOOD_4000]: 'handleCreateFoodFailed',
  [REQUEST.FOOD_2001]: 'handleUpdateFoodSuccess',
  [REQUEST.FOOD_4001]: 'handleUpdateFoodFailed',
  [REQUEST.MENU_SETTING_2003]: 'handleGetListMenuSettingSuccess',
  [REQUEST.MENU_SETTING_2000]: 'handleCreateMenuSettingSuccess',
  [REQUEST.MENU_SETTING_4000]: 'handleCreateMenuSettingFailed',
  [REQUEST.MENU_SETTING_2002]: 'handleGetDetailMenuSettingSuccess',
  [REQUEST.MENU_SETTING_2001]: 'handleUpdateMenuSettingSuccess',
  [REQUEST.MENU_SETTING_4001]: 'handleUpdateMenuSettingFailed',
  [REQUEST.MENU_SETTING_DAY_2002]: 'handleGetListMenuSuccess',

  [REQUEST.MENU_SETTING_DAY_2000]: 'handleUpdateMenuSuccess',
  [REQUEST.MENU_SETTING_DAY_4000]: 'handleUpdateMenuFailed',
  //target
  [REQUEST.MENU_SETTING_TARGET_2003]: 'handleGetListTargetSuccess',
  [REQUEST.MENU_SETTING_TARGET_2000]: 'handleCreateTargetSuccess',
  [REQUEST.MENU_SETTING_TARGET_4000]: 'handleCreateTargetFailed',
  [REQUEST.MENU_SETTING_TARGET_2001]: 'handleUpdateTargetSuccess',
  [REQUEST.MENU_SETTING_TARGET_4001]: 'handleUpdateTargetFailed',
  [REQUEST.NOTIFICATION_2008]: 'handleGetListNotifyReceivedSuccess',

  [REQUEST.BUBBLE_2002]: 'handleGetListBubbleSuccess',
  [REQUEST.BUBBLE_2000]: 'handleCreateBubbleSuccess',
  [REQUEST.BUBBLE_4000]: 'handleCreateBubbleFailed',
  [REQUEST.BUBBLE_2001]: 'handleUpdateBubbleSuccess',
  [REQUEST.BUBBLE_4001]: 'handleUpdateBubbleFailed',

  [REQUEST.REWARD_2002]: 'handleGetListSettingPrizeSuccess',
  [REQUEST.REWARD_4002]: 'handleGetListSettingPrizeFailed',

  [REQUEST.REWARD_2000]: 'handleCreateSettingPrizeSuccess',
  [REQUEST.REWARD_4000]: 'handleCreateSettingPrizeFailed',
  [REQUEST.REWARD_2001]: 'handleUpdateSettingPrizeSuccess',
  [REQUEST.REWARD_4001]: 'handleUpdateSettingPrizeFailed',

  [REQUEST.REWARD_4003]: 'handleRankExisted',
  [REQUEST.CHALLENGE_4003]: 'handleResultInvalid',

  [REQUEST.CHALLENGE_2019]: 'handleUpdateUserChallengeRankSuccess',
  [REQUEST.CHALLENGE_4023]: 'handleUpdateUserChallengeRankFailed',

  [REQUEST.CATEGORY_2008]: 'handleGetListCategoryAndChallenge',



}

const FRONT_END = {
  EDIT_TARGET_POST_SUCCESS: 'EDIT_TARGET_POST_SUCCESS',
  UPDATE_USER_CHALLENGE_SUCCESS: "UPDATE_USER_CHALLENGE_SUCCESS",
  UPDATE_USER_CHALLENGE_MISSION_SUCCESS: "UPDATE_USER_CHALLENGE_MISSION_SUCCESS"
}

const FRONT_END_PARSE = {
  [FRONT_END.EDIT_TARGET_POST_SUCCESS]: 'handleEditTargetSuccess',
  [FRONT_END.UPDATE_USER_CHALLENGE_SUCCESS]: 'handleConfirmUpdateUserChallengeSuccess',
  [FRONT_END.UPDATE_USER_CHALLENGE_MISSION_SUCCESS]: 'handleUpdateUserChallengeMissionSuccess',
}

class ResponseCode {

  static get REQUEST() { return REQUEST }
  static get REQUEST_PARSE() { return REQUEST_PARSE }
  static get FRONT_END() { return FRONT_END }
  static get FRONT_END_PARSE() { return FRONT_END_PARSE }

  static find(response, state) {
    try {
      Logger.info(`ResponseCode execute find`)
      Logger.debug(`ResponseCode execute find receive response`, response)
      let code = { ...REQUEST_PARSE }
      let funcName = code[response.code]
      if (Helper.isEmpty(funcName)) throw `with code ${response.code} not found function name`
      if (Helper.isEmpty(state.func[funcName])) throw `with code ${response.code} has function name ${funcName} not defined in component`
      state.func[funcName](response.data)
    } catch (e) {
      Logger.error(`ResponseCode execute find ${e.toString()}`)
      throw e
    }
  }

  static findFrontEnd(response, state) {
    try {
      Logger.info(`ResponseCode execute findFrontEnd`)
      Logger.debug(`ResponseCode execute findFrontEnd receive response`, response)
      let code = { ...FRONT_END_PARSE }
      let funcName = code[response.code]
      if (!Helper.isEmpty(funcName) && !Helper.isEmpty(state.func) && !Helper.isEmpty(state.func[funcName])) {
        state.func[funcName](response.data)
      }
    } catch (e) {
      Logger.error(`ResponseCode execute findFrontEnd ${e.toString()}`)
      throw e
    }
  }

}

export default ResponseCode
