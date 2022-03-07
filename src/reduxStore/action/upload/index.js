/**
 * Created By Nguyen Cong Thanh on 07/25/2020 14:15.
 *
 * Copyright intelIn 2020.
 */

import BaseAction from 'base/action'

class UploadAction extends BaseAction {

  static uploadImage(key, payload) {
    try {
      this.logger.info(`UploadAction execute uploadImage`)
      this.logger.debug(`UploadAction execute uploadImage receive key`, key)
      this.logger.debug(`UploadAction execute uploadImage receive payload`, payload)
      const formData = new FormData();
      formData.append('file', payload)
      return {
        type: this.action.TYPE.COMMON.REQUEST,
        key: key,
        name: 'UploadAction uploadImage',
        options: {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
            'token': this.getToken()
          },
          url: `${this.api.resource}`,
          data: formData,
        },
      }
    } catch (e) {
      this.logger.error(`UploadAction execute uploadImage ${e.toString()}`)
    }
  }

}

export default UploadAction
