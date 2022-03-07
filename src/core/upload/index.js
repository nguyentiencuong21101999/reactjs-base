/**
 * Created By Nguyen Cong Thanh on 04/13/2020 15:17.
 *
 * Copyright intelIn 2020.
 */

import React, { Fragment } from 'react';

import Styles from 'core/_app.scss'
import Cancel from '@material-ui/icons/Cancel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Localize from 'service/localize'

const UploadImageComponent = props => {

  const {
    style = null,
    idImage = null,
    idFile = null,
    nameImage = '',
    name = null,
    loading = false,
    src = "",
    error = '',
    disabled = false,
    handleOnClickCamera = () => { },
    handleChangeFile = () => { },
    handleRemoveImg = () => { },
    handleErrorImg = () => { },
  } = props

  return (
      <Fragment>
        <div className={Styles['user-upload-image']} style={{
          ...style,
          cursor: (src) ? 'unset' : 'pointer',
        }}>
          {
            (loading) ? <LinearProgress style={{ margin: 'auto 0', width: '100%' }} /> : null
          }
          <img
              id={idImage}
              name={name}
              src={src}
              alt={`image-${idImage}`}
              style={{ display: (loading || !src) ? 'none' : 'unset' }}
              onError={handleErrorImg}
          />
          <input type="file" accept='image/png, image/jpg, image/jpeg' name={idFile} style={{ display: 'none' }} id={idFile}
                 onChange={handleChangeFile} />
          <div className={[Styles['user-upload-image-camera'], (disabled) ? Styles['user-upload-image-camera-disabled'] : ''].join(' ')}
               onClick={handleOnClickCamera} style={{
            cursor: (src) ? 'unset' : 'pointer',
            pointerEvents: (src) ? 'none' : 'unset', padding: (nameImage) ? '15px 50px' : '15px 20px'
          }}>
            {(nameImage) ? <p>{nameImage}</p> : <p style={{ opacity: 0.5 }}>{Localize.getLocalize('LYT_UPDATE_PHOTO_PLACEHOLDER')}</p>}
          </div>
          {
            (src && !loading) ? (<a href="" className={Styles['user-upload-image-remove']} onClick={event => {
              event.preventDefault();
              document.getElementById(idFile).value = ""
              handleRemoveImg()
            }}>
              <Cancel style={{ color: '#d50000' }} /></a>) : null
          }
        </div>
        <div className={Styles['user-upload-image-error']}>
          <p>{error}</p>
        </div>
      </Fragment>
  )

}

export default UploadImageComponent
