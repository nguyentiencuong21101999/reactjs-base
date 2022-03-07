/**
 * Created By Nguyen Cong Thanh on 07/24/2020 14:22.
 *
 * Copyright intelIn 2020.
 */

import moment from "moment";
import Helper from "service/helper";

class AppError extends Error {

  constructor(field, message) {
    super(field, message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Error);
    }
    this.field = field;
    this.message = message;
  }

}

class Validator {

  static isString(field, value, message) {
    try {
      value = value.trim()
      if (typeof value !== 'string') {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isNotEmpty(field, value, message) {
    try {
      if (typeof value === 'undefined') {
        throw new AppError(field, message)
      }
      if (value === null) {
        throw new AppError(field, message)
      }
      if (value === '') {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isNumber(field, value, message) {
    try {
      if (typeof value !== 'number') {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isOnlyNumber(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{0,45}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isArray(field, value, message) {
    try {
      if (!Array.isArray(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isObject(field, value, message) {
    try {
      this.isNotEmpty(field, value, message)
      if (typeof value !== "object") {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }



  static isAccount(field, value, message) {
    try {
      const regex = new RegExp(/^([a-zA-Z0-9]|[\@\.\-\_](?![\@\.\-\_])){4,50}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isPasswordAccount(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9\@\.\\\-\_\!\#\$\%\^\&\*\(\)\<\>\?\/\+\=\|\;\:\[\]\{\}\\\'\;\"\`\~\,]{6,20}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isPassword(field, value, message) {
    try {
      const regex = new RegExp(/^(?=^.{6,35}$)((?=.*[A-Z])(?=.*[a-z])(?=.*\d+)).*$/)
      const regex_ = new RegExp(/^[\w\d\@\!\%\&\*\(\)\_\-\=\+\"\/\\\?\>\<\:\;\.\,]+$/);
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
      if (!regex_.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isPhoneNumber(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{10,10}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isPhoneNumberCard(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9\(-\+\.\)\s]{8,20}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isEmail(field, value, message) {
    try {
      // const regex = new RegExp(/^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9\_\.\-]{1,22}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isWebsite(field, value, message) {
    try {
      const regex = new RegExp(/^(http[s]?:\/\/[^\s]+)$/)
      const regex_ = new RegExp(/^[a-zA-Z0-9.\-_\/:]{0,30}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
      if (!regex_.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isCardBackTitle(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9`~!@#$%^&*()_+=\-{}|\[\]\\":;'?><,./\s]{1,40}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isCardBackDescription(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9`~!@#$%^&*()_+=\-{}|\[\]\\":;'?><,./\s]{1,50}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isCardLocationTitle(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s]{4,50}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isCardLocationDescription(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\/\,\.-\s]{6,200}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isCardCheckpointStamp(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{1,3}$/)
      if (!regex.test(value) || 1 > Number(value) || Number(value) > 500) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isMinDate(field, minDate, current, message) {
    try {
      let min = new Date(minDate);
      min.setHours(0, 0, 0, 0)
      let cur = new Date(parseInt(current));
      cur.setHours(0, 0, 0, 0)
      if (cur.getTime() < min.getTime()) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isMerchantName(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9`~!@#$%^&*()_+=\-{}|\[\]\\":;'?><,./\s]{1,80}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isMerchantDescription(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9`~!@#$%^&*()_+=\-{}|\[\]\\":;'?><,./\s]{1,100}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isAuthorizationName(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9`~!@#$%^&*()_+=\-{}|\[\]\\":;'?><,./\s]{1,100}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isFullName(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\s]{2,50}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isStoreName(field, value, message) {
    try {
      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9`~!@#$%^&*()_+=\-{}|\[\]\\":;'?><,./\s]{1,50}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isPasswordChange(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9@.\-_!#$%^&*()<>?\/+=|;:\[\]{}\\\'\;\"\`\~\,]{6,20}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isTypeFile(field, value, message) {
    try {
      const listType = ['image/png', 'image/jpg', 'image/jpeg']
      if (!listType.includes(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isFileUpload(field, value, message) {
    try {
      const maxSize = 15 * 1024 * 1024
      if (value > maxSize) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isTaxID(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9\-]{10,14}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isNotNaN(field, value, message) {
    try {

      if (isNaN(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isArrayEmpty(field, value, message) {
    try {
      this.isArray(field, value, `${value} is not array`)
      if (value.length < 1) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isPasswordReset(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\_\-\+\=\{\[\]\}\\\|\:\;\"\,\<\>\?\.\)\/\']{6,20}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isUsername(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9\@\.-\_]{4,50}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isEmail(field, value, message) {
    try {
      // const regex = new RegExp(/^([\w-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([\w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)
      const regex = new RegExp(/^[a-zA-Z][a-zA-Z0-9\_\.\-]{1,22}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }

  static isPhoneNumber(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{10,10}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isContentSms(field, value, message) {
    try {
      const regex = new RegExp(/^[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\_\-\+\=\{\[\]\}\\\|\:\;\"\,\<\>\?\.\)\/\'\s]{1,160}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isQuantityLimitReward(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{1,45}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
      if (value < 1 || value > 100000000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isQuantityBonusReward(field, value, message) {
    try {
      const regex = new RegExp(/^[0-9]{1,45}$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
      if (value > 100000000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValueSetting(field, value, message) {
    try {
      this.isOnlyNumber(field, value, message)
      if (value > 100000000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValueNutritionFood(field, value, message) {
    try {
      if (value < 0 || value > 100000000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isContentDevice(field, value, message) {
    try {

      const clearVietnamese = Helper.clearVietnamese(value)
      const regex = new RegExp(/^[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\_\-\+\=\{\[\]\}\\\|\:\;\"\,\<\>\?\.\)\/\'\s]{1,500}$/)
      if (!regex.test(clearVietnamese)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isTimeValid(field, timeStart, timeEnd, message) {
    try {
      const timeStarts = moment(timeStart).utc(true).valueOf()
      const timeEnds = moment(timeEnd).utc(true).valueOf()
      if (timeEnds - timeEnds < 1800000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValidMonthFromAndTo(field, value, message) {
    try {
      const regex = new RegExp(/^\d+$/)
      if (!regex.test(value)) {
        throw new AppError(field, message)
      }
      if (Number(value) > 2000 || value < 1) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isCompareMonthFromAndTo(field, monthFrom, monthTo, message) {
    try {
      if (Number(monthFrom) >= Number(monthTo)) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isCompareTimeStartAndEnd(field, timeStart, timeEnd, message) {
    try {
      const timeS = new Date(`${Helper.getYearMonthDate(timeStart)} ${Helper.getTimeFormat(timeStart)}`).getTime()
      const timeE = new Date(`${Helper.getYearMonthDate(timeEnd)} ${Helper.getTimeFormat(timeEnd)}`).getTime()
      if ((timeEnd - timeStart) < 1800000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isCompareDateStartAndEnd(field, startDate, endDate, message) {
    try {
      const DateS = new Date(Helper.getYearMonthDate(startDate)).getTime()
      const DateE = new Date(Helper.getYearMonthDate(endDate)).getTime()
      if (DateS > DateE) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValidRankChallenge(field, value, message) {
    try {
      this.isOnlyNumber(field, value, message)
      if (value < 1 || value > 100000000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValidPointChallenge(field, value, message) {
    try {
      this.isOnlyNumber(field, value, message)
      if (value > 100000000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValidPointChallengeMission(field, value, message) {
    try {
      this.isOnlyNumber(field, value, message)
      if (value > 100000000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValidQuantityWater(field, value, message) {
    try {
      this.isOnlyNumber(field, value, message)
      if (value < 1 || value > 100) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValidPostLink(field, value, message) {
    try {
      if (value.length > 5) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
  static isValueRank(field, value, message) {
    try {
      this.isOnlyNumber(field, value, message)
      if (value < 1 || value > 100000000) {
        throw new AppError(field, message)
      }
    } catch (e) {
      throw e
    }
  }
}

export default Validator
