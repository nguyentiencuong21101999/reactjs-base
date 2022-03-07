/**
 * Created By Nguyen Cong Thanh on 07/26/2020 09:10.
 *
 * Copyright intelIn 2020.
 */

import IntelIn from '@intelIn/package.json'
import ConfJson from '@intelIn/config.json'

const Config = {
  version: IntelIn.version,
  ...ConfJson
}

export default Config