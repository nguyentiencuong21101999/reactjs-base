/**
 * Created By Nguyen Cong Thanh on 07/24/2020 10:59.
 *
 * Copyright intelIn 2020.
 */

import Config from 'config'

const getTime = () => {
  const date = new Date()
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
}

class LoggerService {

  static info(content) {
    if (Config.log.includes('info')) {
      console.info(`[${getTime()}]-[INFO]: \n`, JSON.stringify(content, null, 2))
    }
  }

  static debug(message, content) {
    if (Config.log.includes('debug')) {
      console.debug(`[${getTime()}]-[DEBUG]: ${message} \n`, JSON.stringify(content, null, 3))
    }
  }

  static trace(content) {
    if (Config.log.includes('trace')) {
      console.trace(`[${getTime()}]-[TRACE]: \n`, JSON.stringify(content, null, 2))
    }
  }

  static warn(content) {
    if (Config.log.includes('warn')) {
      console.warn(`[${getTime()}]-[WARN]: \n`, JSON.stringify(content, null, 2))
    }
  }

  static error(content) {
    if (Config.log.includes('error')) {
      console.error(`[${getTime()}]-[ERROR]: \n`, JSON.stringify(content, null, 2))
    }
  }

  static log(content) {
    if (Config.log.includes('log')) {
      console.log(`[${getTime()}]-[LOG]: \n`, content)
    }
  }

  static table(content) {
    if (Config.log.includes('table')) {
      console.table(`[${getTime()}]-[TABLE]: \n`, content);
    }
  }

}

export default LoggerService
