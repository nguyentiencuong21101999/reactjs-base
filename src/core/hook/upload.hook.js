/**
 * Created By Nguyen Cong Thanh on 04/14/2020 15:17.
 *
 * Copyright intelIn 2020.
 */

import React, { Fragment, useState, useEffect } from 'react'

import UploadImageComponent from 'core/upload'
import Logger from 'service/logger'
import Validator from 'service/validator'
import Localize from 'service/localize'

const UploadHook = props => {

  const { style, services, id = 'id-function', name = 'name-function', disabled, onChange = () => { }, onRemoveImage = () => { } } = props

  const idImage = `img-${id}`
  const idFile = `file-${id}`
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [src, setSrc] = useState(null)
  const [error, setError] = useState('')
  const [nameImg, setNameImg] = useState('')

  useEffect(() => {
    setError(props.error)
  }, [props.error])

  useEffect(() => {
    if (file) {
      setLoading(true)
    }
  }, [file])

  useEffect(() => {
    if (loading) {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", (event) => {        
        setSrc(event.target.result)
      });
      if (file) {
        fileReader.readAsDataURL(file);
      }
    }
  }, [loading])

  // useEffect(() => {
  //     setLoading(false)
  // }, [src])

  useEffect(() => {
    setLoading(props.loading)
  }, [props.loading])

  useEffect(() => {
    if (props.src) {
      setSrc(props.src)
      setNameImg(props.src)
    }
  }, [props.src])

  const handleOnClickCamera = (event) => {
    if (event) event.preventDefault()
    document.getElementById(idFile).click()
  }

  const handleChangeFile = (event) => {
    try {
      Logger.info('UploadHook execute handleChangeFile')
      if(event.target.files[0]){  
        setError('')
        const image = event.target.files[0];
        Logger.debug('UploadHook execute handleChangeFile receive file', image)
        Logger.log(image)
        setFile(image)
        setNameImg(image.name)
        Validator.isFileUpload(nameImg, image.size, `${Localize.getLocalize('LYT_IMAGE_MAX_WEIGH_ERROR')}`)
        Validator.isTypeFile(nameImg, image.type, `${Localize.getLocalize('LYT_MERCHANT_LOGO_TYPE_ERROR')}`)
        onChange(image)
      }
    } catch (e) {
      Logger.error(`UploadHook handleChangeFile ${e.toString()}`)
      setError(e.message)
      setLoading(false)
      onChange({})
    }
  }

  const handleRemoveImg = () => {
    try {
      Logger.info('UploadHook execute handleRemoveImg')
      setError('');
      setNameImg('');
      setFile(null);
      setSrc(null);
      setLoading(false)
      onRemoveImage()
    } catch (e) {
      Logger.error(`UploadHook handleRemoveImg ${e.toString()}`)
    }
  }

  const handleErrorImg = () => {
    try {
      Logger.info('UploadHook execute handleErrorImg')
      handleRemoveImg()
    } catch (e) {
      Logger.error(`UploadHook handleErrorImg ${e.toString()}`)
    }
  }

  return (
    <UploadImageComponent
      style={style}
      idImage={idImage}
      idFile={idFile}
      nameImage={nameImg}
      name={name}
      loading={loading}
      src={src}
      error={error}
      disabled={disabled}
      handleOnClickCamera={handleOnClickCamera}
      handleChangeFile={handleChangeFile}
      handleRemoveImg={handleRemoveImg}
      handleErrorImg={handleErrorImg}
    />
  )

}

export default UploadHook