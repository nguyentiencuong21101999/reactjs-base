/**
 * Created By Nguyen Cong Thanh on 07/24/2020 09:28.
 *
 * Copyright intelIn 2020.
 */
import Localize from "service/localize";

class RouteEnum {

  static get PAGE() {
    return {
      LOGIN: '/login',
      PROFILE: '/profile',
      PASSWORD: {
        RESET: '/resetPassword'
      },

      MAIN: '/',
      HOME: '/home',

      DASHBOARD: '/dashboard',

      MANAGE_ACCOUNT: {
        _: '/manageAccount',
        USER: {
          _: '/manageAccount/user',
          DETAIL: '/manageAccount/user/:id',
        },
        ADMIN: {
          _: '/manageAccount/admin',
          CREATE: '/manageAccount/admin/create',
          DETAIL: '/manageAccount/admin/:id',
          EDIT: '/manageAccount/admin/:id/edit',
        }
      },
      MANAGE_POST: {
        _: '/managePost',
        POST: {
          _: "/managePost/post",
          CREATE: '/managePost/post/create',
          DETAIL: '/managePost/post/:id',
          EDIT: '/managePost/post/:id/edit',
          SOCIAL: '/managePost/post/social',
        },
        CATEGORY: {
          _: "/managePost/category",
          CREATE: "/managePost/category/create",
          DETAIL: "/managePost/category/:id",
          EDIT: "/managePost/category/:id/edit"
        },
        TEACHING_PREGNANCY: {
          _: '/managePost/teachingPregnancy',
          CREATE: '/managePost/teachingPregnancy/create',
          DETAIL: "/managePost/teachingPregnancy/:id",
          EDIT: "/managePost/teachingPregnancy/:id/edit"
        }

      },
      MANAGE_NOTIFY: {
        _: "/manageNotify",
        CREATE: '/manageNotify/create',
        DETAIL: '/manageNotify/:id',
      },
      MANAGE_CHALLENGE: {
        _: "/manageChallenge",
        CREATE: '/manageChallenge/create',
        CREATE_MISSION: "/manageChallenge/:id/createMission",
        CREATE_SUB_CHALLENGE: "/manageChallenge/:id/createSubChallenge",
        DETAIL_SUB_CHALLENGE: "/manageChallenge/:id/detailSubChallenge",
        DETAIL_MISSION: "/manageChallenge/:id/detailMission",
        EDIT_SUB_CHALLENGE: "/manageChallenge/:id/detailSubChallenge/edit",
        DETAIL: '/manageChallenge/:id',
        EDIT: '/manageChallenge/:id/edit',
        PARTICIPANT: '/manageChallenge/:id/participant',
        CREATE_SETTING_PRIZE: "/manageChallenge/:id/createSettingPrize",
        // DETAIL_SETTING_PRIZE: "/manageChallenge/:id/detailSettingPrize",
        EDIT_SETTING_PRIZE: "/manageChallenge/:id/editSettingPrize",
      },
      MANAGE_LOYALTY: {
        _: "/manageLoyalty",
        REWARD: {
          _: "/manageLoyalty/reward",
          CREATE: '/manageLoyalty/reward/create',
          DETAIL: '/manageLoyalty/reward/:id',
          EDIT: "/manageLoyalty/reward/:id/edit"
        }
        // ,
        // MEMBER:{
        //   _:"manageLoyalty/member",
        // }
        ,
        MEMBER: {
          _: "/manageLoyalty/member",
          DETAIL: "/manageLoyalty/member/:id"
        }

      },
      MANAGE_MENU: {
        _: "/manageMenu",
        CATEGORY: {
          _: "/manageMenu/category",
          CREATE: "/manageMenu/category/create",
          DETAIL: "/manageMenu/category/:id",
          EDIT: "/manageMenu/category/:id/edit"
        },
        FOOD: {
          _: "/manageMenu/food",
          CREATE: "/manageMenu/food/create",
          DETAIL: "/manageMenu/food/:id",
          EDIT: "/manageMenu/food/:id/edit"
        },
        SETTING: {
          _: "/manageMenu/setting",
          DETAIL: "/manageMenu/setting/:id",
          CREATE_MENU: "/manageMenu/setting/:id/createMenu",
          EDIT_MENU: "/manageMenu/setting/:id/editMenu",
          CREATE_TARGET: "/manageMenu/setting/:id/createTarget",
          EDIT_TARGET: "/manageMenu/setting/:id/editTarget"

        }
      }
      ,
      MANAGE_SETTING: {
        _: "/manageSetting",
        CONFIG: {
          _: "/manageSetting/config"
        },
        BUBBLE: {
          _: "/manageSetting/bubble",
          CREATE: "/manageSetting/bubble/create",
          DETAIL: "/manageSetting/bubble/:id",
          EDIT: "/manageSetting/bubble/:id/edit"
        }

      }
    }
  }

  static get BREADCRUMB() {
    return {
      // [this.PAGE.LOGIN]: "Đăng nhập",
      [this.PAGE.PROFILE]: Localize.getLocalize("LC_ACCOUNT_INFO"),
      // [this.PAGE.PASSWORD.RESET]: "Reset mật khẩu",
      // [this.PAGE.MAIN]: "",
      // [this.PAGE.HOME]: "Home",
      [this.PAGE.DASHBOARD]: Localize.getLocalize("LC_DASHBOARD"),
      // manage account
      [this.PAGE.MANAGE_ACCOUNT._]: Localize.getLocalize("LC_ACCOUNT_MANAGE"),
      //_user
      [this.PAGE.MANAGE_ACCOUNT.USER._]: Localize.getLocalize("LC_USER"),
      [this.PAGE.MANAGE_ACCOUNT.USER.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      //_admin
      [this.PAGE.MANAGE_ACCOUNT.ADMIN._]: Localize.getLocalize("LC_ADMIN"),
      [this.PAGE.MANAGE_ACCOUNT.ADMIN.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_ACCOUNT.ADMIN.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_ACCOUNT.ADMIN.EDIT]: Localize.getLocalize("LC_EDIT"),
      //manage post
      [this.PAGE.MANAGE_POST._]: Localize.getLocalize("LC_POST_MANAGE"),
      //_category
      [this.PAGE.MANAGE_POST.CATEGORY._]: Localize.getLocalize("LC_CATEGORY"),
      [this.PAGE.MANAGE_POST.CATEGORY.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_POST.CATEGORY.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_POST.CATEGORY.EDIT]: Localize.getLocalize("LC_EDIT"),
      //_teaching pregnancy
      [this.PAGE.MANAGE_POST.TEACHING_PREGNANCY._]: Localize.getLocalize("LC_PRENATAL_EDU"),
      [this.PAGE.MANAGE_POST.TEACHING_PREGNANCY.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_POST.TEACHING_PREGNANCY.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_POST.TEACHING_PREGNANCY.EDIT]: Localize.getLocalize("LC_EDIT"),
      //_post
      [this.PAGE.MANAGE_POST.POST._]: Localize.getLocalize("LC_POST"),
      [this.PAGE.MANAGE_POST.POST.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_POST.POST.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_POST.POST.EDIT]: Localize.getLocalize("LC_EDIT"),
      //notify
      [this.PAGE.MANAGE_NOTIFY._]: Localize.getLocalize("LC_NOTI_MANAGE"),

      [this.PAGE.MANAGE_NOTIFY.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_NOTIFY.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      //challenge
      [this.PAGE.MANAGE_CHALLENGE._]: Localize.getLocalize("LC_CHALLENGE_MANAGE"),

      [this.PAGE.MANAGE_CHALLENGE.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_CHALLENGE.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_CHALLENGE.EDIT]: Localize.getLocalize("LC_EDIT"),
      [this.PAGE.MANAGE_CHALLENGE.PARTICIPANT]: Localize.getLocalize("LC_PARTICIPANT"),
      [this.PAGE.MANAGE_CHALLENGE.CREATE_MISSION]: Localize.getLocalize("LC_ADD_MISSION"),
      [this.PAGE.MANAGE_CHALLENGE.CREATE_SUB_CHALLENGE]: Localize.getLocalize("LC_ADD_SUB_CHAL"),
      [this.PAGE.MANAGE_CHALLENGE.DETAIL_SUB_CHALLENGE]: Localize.getLocalize("LC_SUB_CHAL"),
      [this.PAGE.MANAGE_CHALLENGE.EDIT_SUB_CHALLENGE]: Localize.getLocalize("LC_EDIT"),
      [this.PAGE.MANAGE_CHALLENGE.DETAIL_MISSION]: Localize.getLocalize("LC_MISSION"),
      [this.PAGE.MANAGE_CHALLENGE.CREATE_SETTING_PRIZE]: Localize.getLocalize("LC_ADD_PRIZE"),
      [this.PAGE.MANAGE_CHALLENGE.EDIT_SETTING_PRIZE]: Localize.getLocalize("LC_EDIT_PRIZE"),
      //loyalty
      [this.PAGE.MANAGE_LOYALTY._]: Localize.getLocalize("LC_LOYALTY_MANAGE"),
      //_reward
      [this.PAGE.MANAGE_LOYALTY.REWARD._]: Localize.getLocalize("LC_REWARD"),
      [this.PAGE.MANAGE_LOYALTY.REWARD.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_LOYALTY.REWARD.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_LOYALTY.REWARD.EDIT]: Localize.getLocalize("LC_EDIT"),
      //_member
      [this.PAGE.MANAGE_LOYALTY.MEMBER._]: Localize.getLocalize("LC_MEMBER"),
      [this.PAGE.MANAGE_LOYALTY.MEMBER.DETAIL]: Localize.getLocalize("LC_DETAIL"),

      [this.PAGE.MANAGE_MENU._]: Localize.getLocalize("LC_MENU_MANAGE"),
      [this.PAGE.MANAGE_MENU.CATEGORY._]: Localize.getLocalize("LC_CATEGORY"),
      [this.PAGE.MANAGE_MENU.CATEGORY.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_MENU.CATEGORY.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_MENU.CATEGORY.EDIT]: Localize.getLocalize("LC_EDIT"),

      [this.PAGE.MANAGE_MENU.FOOD._]: Localize.getLocalize("LC_FOOD"),
      [this.PAGE.MANAGE_MENU.FOOD.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_MENU.FOOD.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_MENU.FOOD.EDIT]: Localize.getLocalize("LC_EDIT"),

      [this.PAGE.MANAGE_MENU.SETTING._]: Localize.getLocalize("LC_CONFIG"),
      [this.PAGE.MANAGE_MENU.SETTING.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_MENU.SETTING.CREATE_MENU]: Localize.getLocalize("LC_CONFIG_MENU"),
      [this.PAGE.MANAGE_MENU.SETTING.EDIT_MENU]: Localize.getLocalize("LC_CONFIG_MENU"),
      [this.PAGE.MANAGE_MENU.SETTING.CREATE_TARGET]: Localize.getLocalize("LC_CONFIG_OBJECT"),
      [this.PAGE.MANAGE_MENU.SETTING.EDIT_TARGET]: Localize.getLocalize("LC_CONFIG_OBJECT"),
      // manage setting
      [this.PAGE.MANAGE_SETTING._]: Localize.getLocalize("LC_CONFIG_MANAGE"),
      //_system
      [this.PAGE.MANAGE_SETTING.CONFIG._]: Localize.getLocalize("LC_SYSTEM"),
      //_bubble
      [this.PAGE.MANAGE_SETTING.BUBBLE._]: Localize.getLocalize("LC_BUBBLE"),
      [this.PAGE.MANAGE_SETTING.BUBBLE.CREATE]: Localize.getLocalize("LC_ADD_NEW"),
      [this.PAGE.MANAGE_SETTING.BUBBLE.DETAIL]: Localize.getLocalize("LC_DETAIL"),
      [this.PAGE.MANAGE_SETTING.BUBBLE.EDIT]: Localize.getLocalize("LC_EDIT"),



    }
  }

}

export default RouteEnum
