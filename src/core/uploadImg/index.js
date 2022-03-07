/**
 * Created By Nguyen Cong Thanh on 02/17/2020 13:52.
 *
 * Copyright intelIn 2020.
 */

import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import Styles from 'core/_app.scss'
import Localize from 'service/localize'

const useStyles = makeStyles(theme => ({
  root: {
    display: "none"
  },
}))


const UploadImg = props => {

  const classes = useStyles()
  const { idClick, idPrint, onChange } = props
  const [errorValue, setError] = useState("")
  
  useEffect(() => {
    if (errorValue) {
      setError(errorValue)
    }
  }, [errorValue])

  const handleOnChange = (event) => {
    try{
      const listType = ['image/png', 'image/jpg', 'image/jpeg']
      if(listType.includes(event.target.files[0].type))
      {
        const image = event.target.files[0]
        const FR = new FileReader();
        let base64 = '';
        FR.addEventListener("load", e => {
          base64 = e.target.result;
          document.getElementById(idPrint).src = base64;
          onChange(image)
        });
        FR.readAsDataURL(image);
        setError("")
      }else{
        setError(`${Localize.getLocalize('LYT_MERCHANT_LOGO_TYPE_ERROR')}`)
      }
    }catch(e){
      Logger.error(`UploadImageComponent onchange ${e.toString()}`)
    }
  }

  return (
    <div className={Styles['field']} >
      <input className={classes.root} type="file" accept='image/png, image/jpeg'
        id={idClick}
        onChange={handleOnChange} />
      <p style={{textAlign: "center"}} className={Styles['field-error']}>{errorValue}</p>
    </div>
  )
}

export default UploadImg