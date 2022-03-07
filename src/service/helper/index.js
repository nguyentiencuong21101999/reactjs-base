/**
 * Created By Nguyen Cong Thanh on 07/24/2020 10:59.
 *
 * Copyright intelIn 2020.
 */

import CryptoJS from 'crypto-js'
import JSEncrypt from 'assets/js/rsa'
import Config from 'config'
import Localize from 'service/localize'
class HelperService {

  static isEmpty(value) {
    try {
      if (typeof value === 'undefined' || value === null || value === '') {
        return true
      }
      return false
    } catch (e) {
      return true
    }
  }
  static isArray(value) {
    try {
      if (Array.isArray(value)) {
        return true
      }
      return false
    } catch (e) {
      return false
    }
  }

  static hashMD5(string = '') {
    return CryptoJS.MD5(string).toString()
  }

  static hashSHA256(string) {
    return CryptoJS.SHA256(string).toString()
  }

  static hashRSA(password) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(Config.rsaKey)
    return encrypt.encrypt(password);
  }

  static generateKey() {
    return this.hashMD5(this.hashMD5(`${new Date().getTime()}-${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}-${Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}-${new Date().getTime()}`))
  }

  static encodeBase64(string) {
    return btoa(encodeURIComponent(string).replace(/%([0-9A-F]{2})/g,
      (match, p1) => {
        return String.fromCharCode('0x' + p1);
      }));
  }
  static formatNumberCleave(number) {
    const newNumber = number.replaceAll(".", "")
    return Number(newNumber.replaceAll(",", "."))
  }


  static decodeBase64(string) {
    return decodeURIComponent(atob(string).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  static getDate(time) {
    try {
      if (!this.isEmpty(time)) {
        const date = new Date(time)
        const day = ((date.getDate()) < 10) ? `0${(date.getDate())}` : (date.getDate())
        const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        return `${day}/${month}/${date.getFullYear()}`
      }
      throw ``
    } catch (e) {
      return null
    }
  }

  static delay(ms) {
    return new Promise(res => setTimeout(res, ms))
  }

  static clearVietnamese(str) {
    try {
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      return str
    } catch (e) {
      return str
    }
  }

  static getFullDate(time) {
    try {
      if (!this.isEmpty(time)) {
        const date = new Date(time)
        const day = ((date.getDate()) < 10) ? `0${(date.getDate())}` : (date.getDate())
        const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        const hours = ((date.getHours()) < 10) ? `0${(date.getHours())}` : (date.getHours())
        const minutes = ((date.getMinutes()) < 10) ? `0${(date.getMinutes())}` : (date.getMinutes())
        return `${hours}:${minutes} - ${day}/${month}/${date.getFullYear()}`
      } else {
        return null
      }
    } catch (e) {
      console.log(e)
      return null
    }
  }

  static getDate(time) {
    try {
      if (!this.isEmpty(time)) {
        const date = new Date(time)
        const day = ((date.getDate()) < 10) ? `0${(date.getDate())}` : (date.getDate())
        const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        return `${day}/${month}/${date.getFullYear()}`
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }

  static getYearMonthDate(time) {
    try {
      if (!this.isEmpty(time)) {
        const date = new Date(time)
        const day = ((date.getDate()) < 10) ? `0${(date.getDate())}` : (date.getDate())
        const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        return `${date.getFullYear()}/${month}/${day}`
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }
  static getYearMonthDateYue(time) {
    try {
      if (!this.isEmpty(time)) {
        const date = new Date(time)
        const day = ((date.getDate()) < 10) ? `0${(date.getDate())}` : (date.getDate())
        const month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        return `${date.getFullYear()}-${month}-${day}`
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }

  static getTime(time) {
    try {
      if (!this.isEmpty(time)) {
        const date = new Date(time)
        const hours = ((date.getHours()) < 10) ? `0${(date.getHours())}` : (date.getHours())
        const minutes = ((date.getMinutes()) < 10) ? `0${(date.getMinutes())}` : (date.getMinutes())
        const seconds = ((date.getSeconds()) < 10) ? `0${(date.getSeconds())}` : (date.getSeconds())
        return `${hours}:${minutes}:${seconds}`
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }
  static getTimeFormat(time) {
    try {
      if (!this.isEmpty(time)) {
        const date = new Date(time)
        const hours = ((date.getHours()) < 10) ? `0${(date.getHours())}` : (date.getHours())
        const minutes = ((date.getMinutes()) < 10) ? `0${(date.getMinutes())}` : (date.getMinutes())
        const seconds = ((date.getSeconds()) < 10) ? `0${(date.getSeconds())}` : (date.getSeconds())
        return `${hours}:${minutes}`
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }

  static getUTCDate(time) {
    try {
      const date = new Date(time)
      const day = ((date.getUTCDate()) < 10) ? `0${(date.getUTCDate())}` : (date.getUTCDate())
      const month = ((date.getUTCMonth() + 1) < 10) ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1
      return `${day}/${month}/${date.getUTCFullYear()}`
    } catch (e) {
      return null
    }
  }

  static getTimeByMilliseconds(time) {
    try {
      let t = time / 1000
      let h = Math.floor(t / 3600)
      t = t - (h * 3600)
      let m = Math.floor(t / 60)
      t = t - (m * 60)
      let s = Math.floor(t)
      return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
    } catch (e) {
      return null
    }
  }

  static parseDateUtc(timestamp) {
    let time = new Date(timestamp)
    time.setUTCHours(0)
    time.setUTCMinutes(0)
    time.setUTCSeconds(0)
    time.setUTCMilliseconds(0)
    return time.getTime()
  }

  static parseDateUtc2(timestamp) {
    let time = new Date(timestamp)
    time.setUTCHours(0)
    time.setUTCSeconds(0)
    time.setUTCMilliseconds(0)
    return time.getTime()
  }

  static formatCurrency(amount, thousands = ".", decimal = ",", decimalCount = 2) {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();

    let j = (i.length > 3) ? i.length % 3 : 0;
    return negativeSign + (j ? i.substr(0, j) + thousands : '') + (i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "")).replace(",00", "");


  }

  static generateNextId(prefix, length, number) {
    return ('0'.repeat(length) + number).slice(length * -1);
  }

  static convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    })
  }

  static formatDate(time) {
    const temp = time.toString().split('/') // dd/MM/YYYY
    return new Date(`${temp[2]}/${temp[1]}/${temp[0]}`).getTime()
  }

  static checkLinkImage(value) {
    const regex = new RegExp(/^(https?:\/\/[^\s]+)$/)
    if (regex.test(value)) {
      return value
    }
    return null
  }

  static includeRoute(url, route) {
    let temp = url.split('/')[1];
    return `/${temp}` === route
  }

  static handleErrorImg(e) {
    return e.target.src = ''
  }

  static isEmptyObject(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  static getDifference = (a, b) =>
    Object.fromEntries(Object.entries(b).filter(([key, val]) => key in a && a[key] !== val));

  static cloneNewModel(model) {
    return JSON.parse(JSON.stringify(model))
  }

  static countryToFlag(isoCode) {
    // ISO 3166-1 alpha-2
    // ⚠️ No support for IE 11
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
  }

  static handleOnConvertCurrencyToWordEN(number) {
    if (typeof number === 'string') {
      number = parseInt(number, 10);
    }
    if (typeof number === 'number' && isFinite(number)) {
      number = number.toString(10);
    } else {
      return '';
    }
    let digits = number.split('');
    while (digits.length % 3 !== 0) {
      digits.unshift('0');
    }
    let digitsGroup = [];
    let numberOfGroups = digits.length / 3;
    for (let i = 0; i < numberOfGroups; i++) {
      digitsGroup[i] = digits.splice(0, 3);
    }
    let digitsGroupLen = digitsGroup.length;
    let numTxt = [
      [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], //hundreds
      [null, 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'], //tens
      [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] //ones
    ];
    let tenthsDifferent = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    for (let j = 0; j < digitsGroupLen; j++) {
      for (let k = 0; k < 3; k++) {
        let currentValue = digitsGroup[j][k];
        digitsGroup[j][k] = numTxt[k][currentValue];
        if (k === 0 && currentValue !== '0') { // "!==0" avoids creating a string "null hundred"
          digitsGroup[j][k] += ' hundred ';
        } else if (k === 1 && currentValue === '1') { //Changes the value in the tens place and erases the value in the ones place
          digitsGroup[j][k] = tenthsDifferent[digitsGroup[j][2]];
          digitsGroup[j][2] = 0; //Sets to null. Because it sets the next k to be evaluated, setting this to null doesn't work.
        }
      }
    }
    for (let l = 0; l < digitsGroupLen; l++) {
      if (digitsGroup[l][1] && digitsGroup[l][2]) {
        digitsGroup[l][1] += ' ';
      }
      digitsGroup[l].filter(function (e) {
        return e !== null
      });
      digitsGroup[l] = digitsGroup[l].join('');
    }
    let posfix = [null, 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion'];
    if (digitsGroupLen > 1) {
      let posfixRange = posfix.splice(0, digitsGroupLen).reverse();
      for (let m = 0; m < digitsGroupLen - 1; m++) { //'-1' prevents adding a null posfix to the last group
        if (digitsGroup[m]) {
          digitsGroup[m] += ' ' + posfixRange[m];
        }
      }
    }
    return `${digitsGroup.join(' and ').toString().substring(0, 1).toUpperCase()} ${digitsGroup.join(' ').toString().substring(1)}`;
  }

  static handleOnConvertCurrencyToWordVN(int) {
    let arrNumber = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]
    let tempWord = this.covertCurrencyToWord(int, arrNumber)
    return tempWord === "không" ? "" : `${tempWord} đồng`
  }

  static covertCurrencyToWord(number, arrNumber) {
    if (number == 0) return arrNumber[0];
    let string = "", suffixes = "";
    do {
      let billion = number % 1000000000;
      number = Math.floor(number / 1000000000);
      if (number > 0) {
        string = this.handleMillion(billion, true, arrNumber) + suffixes + string;
      } else {
        string = this.handleMillion(billion, false, arrNumber) + suffixes + string;
      }
      suffixes = " tỷ";
    } while (number > 0);
    return string.substring(1, 2).toUpperCase() + string.substring(2);
  }

  static handleMillion(number, flag, arrNumber) {
    let string = "";
    let million = Math.floor(number / 1000000);
    number = number % 1000000;
    if (million > 0) {
      string = this.handleHundreds(million, flag, arrNumber) + " triệu";
      flag = true;
    }
    let thousand = Math.floor(number / 1000);
    number = number % 1000;
    if (thousand > 0) {
      string += this.handleHundreds(thousand, flag, arrNumber) + " nghìn";
      flag = true;
    }
    if (number > 0) {
      string += this.handleHundreds(number, flag, arrNumber);
    }
    return string;
  }

  static handleHundreds(number, flag, arrNumber) {
    let string = "";
    let hundreds = Math.floor(number / 100);
    number = number % 100;
    if (flag || hundreds > 0) {
      string = " " + arrNumber[hundreds] + " trăm";
      string += this.handleTenth(number, true, arrNumber);
    } else {
      string = this.handleTenth(number, false, arrNumber);
    }
    return string;
  }

  static handleTenth(number, flag, arrNumber) {
    let string = "";
    let tenth = Math.floor(number / 10);
    let unit = number % 10;
    if (tenth > 1) {
      string = " " + arrNumber[tenth] + " mươi";
      if (unit == 1) {
        string += " mốt";
      }
    } else if (tenth == 1) {
      string = " mười";
      if (unit == 1) {
        string += " một";
      }
    } else if (flag && unit > 0) {
      string = " lẻ";
    }
    if (unit == 5 && tenth >= 1) {
      string += " lăm";
    } else if (unit > 1 || (unit == 1 && tenth == 0)) {
      string += " " + arrNumber[unit];
    }
    return string;
  }

  static dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  static includeRoutePresent(url, route) {
    return url === route
  }
  static deleteFieldEmpty(object) {
    Object.keys(object).forEach(key => this.isEmpty(object[key]) ? delete object[key] : {})
    return object
  }
  static handleDateTime(by, dateTime) {
    return `${by} ${Localize.getLocalize("LC_AT")} ${this.getFullDate(dateTime)}`

  }
  static isExistedTab(state, tabCurrent) {
    return !this.isEmpty(state) && !this.isEmpty(state.tab) ? state.tab : tabCurrent

  }

}

export default HelperService
