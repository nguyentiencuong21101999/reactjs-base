/**
 * Created By Nguyen Cong Thanh on 07/24/2020 10:59.
 *
 * Copyright intelIn 2020.
 */

import Config from 'config'
import ValidatorService from 'service/validator'

const files = [
  'common',
  'login',
  'footer',
  'header',
  'register',
  'forgot',
]


// const mergeLocalize = (langs) => {
//   console.log("langs_",langs);
//   let data = {}
//   langs.map((lang) => {
//     data[lang.key] = {}
//     files.map((file) => {
//       const localize = require(`assets/localize/${file}/${lang.key}.json`)
//       data[lang.key] = Object.assign({}, data[lang.key], localize)
//     })
//   })
//   console.log("data_",data);
//   return data
// }
const mergeLocalize = (langs) => {
  let data = {}
  langs.map((lang) => {
    data[lang.key] = {}
  
      const localize = require(`assets/localize/${lang.key}.json`)
      data[lang.key] = Object.assign({}, data[lang.key], localize)
  })
  return data
}

let languageCurrent = window.localStorage.getItem(Config.localStorage.language)

class LocalizeService {

  static langCurrent = (languageCurrent) ? languageCurrent : Config.localize.current;
  static data = mergeLocalize(Config.localize.language)

  static changeLanguage(key) {
    window.localStorage.setItem(Config.localStorage.language, key)
    this.langCurrent = key
  }
 
  static getLocalize(key) {
    try {
      ValidatorService.isNotEmpty('key', key, 'Key is empty')
      return this.data[this.langCurrent][key] || '-'
    } catch (e) {
      return ''
    }
  }

}

export default LocalizeService
