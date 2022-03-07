/**
 * Created By Nguyen Cong Thanh on 03/02/2020 11:39.
 *
 * Copyright intelIn 2020.
 */

import DialogEnum from 'service/enum/dialog'

class DialogModel {

  constructor() {
    this.view = DialogEnum.VIEW.DEFAULT

    this.data = {
      title: '',
      content: '',
      button: '',
      icon:'',
      color:'',
      confirmContent:'',
    }

    this.image = 0 // 0 fail 1 success

    this.func = {
      handleConfirm: () => { },
      handleClose: () => { }
    }

    this.error = ''

    this.show = false

  }

  getView() {
    return this.view
  }

  setView(view) {
    this.view = view
  }

  getTitle() {
    return this.data.title
  }

  setTitle(title) {
    this.data.title = title
  }

  getContent() {
    return this.data.content
  }

  setContent(content) {
    this.data.content = content
  }

  getButton() {
    return this.data.button
  }

  setButton(button) {
    this.data.button = button
  }

  getImage() {
    return this.image
  }

  setImage(image) {
    this.image = image
  }

  getHandleConfirm() {
    return this.func.handleConfirm
  }

  setHandleConfirm(handleConfirm) {
    this.func.handleConfirm = handleConfirm
  }

  getHandleClose() {
    return this.func.handleClose
  }

  setHandleClose(handleClose) {
    this.func.handleClose = handleClose
  }

  getError() {
    return this.error
  }

  setError(error) {
    this.error = error
  }

  getShow() {
    return this.show
  }

  setShow(show) {
    this.show = show
  }

  getIcon() {
    return this.data.icon
  }

  setIcon(icon) {
    this.data.icon = icon
  }

  getColor() {
    return this.data.color
  }

  setColor(color) {
    this.data.icon = color
  }

  getConfirmContent() {
    return this.data.confirmContent
  }

  setConfirmContent(confirmContent) {
    this.data.confirmContent = confirmContent
  }
}

export default DialogModel