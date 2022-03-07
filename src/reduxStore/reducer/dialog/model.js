/**
 * Created By Nguyen Cong Thanh on 07/24/2020 14:00.
 *
 * Copyright intelIn 2020.
 */

class DialogModel {

  constructor() {

    this.view = 0

    this.data = {
      title: '',
      content: '',
      button: '',
      icon:'',
      color:'',
    }

    this.func = {
      handleConfirm: () => { },
      handleClose: () => { }
    }

  }

}

export default DialogModel