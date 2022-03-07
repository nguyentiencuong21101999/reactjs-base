import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Localize from "service/localize";
import { GENERAL, PRIMARY, SECONDARY } from "core/color";
import HelperService from "service/helper";
import Logger from "service/logger";
import Validator from "service/validator";
const SIZE_IMAGE = 5 * 1000 * 1000;
const IconDragDrop = (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64.465 64.465">
    <g transform="translate(0)">
      <path fill="#acacac" d="M651.217,3518.719l3.679-5.378c.027-.044.052-.1.079-.149l1.124-1.645a1.875,1.875,0,0,1,3.091,0l2.072,3.026a20.609,20.609,0,0,1,12.659.231,1.123,1.123,0,0,0,1.5-1.056v-21.01a6.909,6.909,0,0,0-6.919-6.9H625.786a6.906,6.906,0,0,0-6.919,6.892v42.631a6.9,6.9,0,0,0,6.919,6.89H646.6a1.119,1.119,0,0,0,1.063-1.481,20.513,20.513,0,0,1,.165-13.535,1.428,1.428,0,0,0-1.363-1.895h-17.31a1.848,1.848,0,0,1-1.546-2.869l12.707-18.95a1.877,1.877,0,0,1,3.11,0l7.771,11.586-1.686,2.459a1.03,1.03,0,0,0,.273,1.425,1.007,1.007,0,0,0,.58.175A1.044,1.044,0,0,0,651.217,3518.719ZM650.4,3503.7a3.381,3.381,0,1,1,3.381,3.367A3.37,3.37,0,0,1,650.4,3503.7Z" transform="translate(-618.867 -3485.837)" />
      <path fill="#acacac" d="M656.369,3507.543a15.961,15.961,0,1,0,15.964,15.957A15.959,15.959,0,0,0,656.369,3507.543Zm5.85,16.942h-2.778v8.527a1.5,1.5,0,0,1-1.5,1.493h-3.134a1.489,1.489,0,0,1-1.5-1.493v-8.527h-2.779a1.491,1.491,0,0,1-1.174-2.416l5.8-7.387a1.56,1.56,0,0,1,2.442,0l5.8,7.387A1.493,1.493,0,0,1,662.22,3524.485Z" transform="translate(-607.868 -3475)" />
    </g>
  </svg>
);

const DragDrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  border: 2px dashed ${GENERAL.GRAY1};
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #f2f2f2;
  padding: 10px;
`;

const WrapperIconAndText = styled.div`
  text-align: center;
`;

const Typography = styled.p`
  margin-top: 10px;
  font-size: 12px;
  letter-spacing: 0.32px;
  color: ${GENERAL.BLACK};
  span {
    color: ${PRIMARY["5B56E8"]};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const InputHidden = styled.input`
  display: none;
`;

const Error = styled.div`
  position: absolute;
  color: ${SECONDARY.DE1715};
  bottom: -45px;
  text-align: center;
  font-size: 12px;

  @media (min-width: 1024px) and (max-width: 1365px) {
    bottom: -2.1rem;
  }
`;

const ButtonRemovePhoto = styled.div`
  background-color: #747474;
  border-radius: 0 0 4px 4px;
  height: 52px;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.48px;
  color: #f8f8f8;
  font-size: 16px;
  font-family: SF-Semibold;
  cursor: pointer;
  margin-top: 20px;
`;

const WrapperImage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DragAndDrop = (props) => {
  const { disabled = false } = props;
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState(null);
  const img = new Image();

  useEffect(() => {
    if (file) img.src = URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        const temp = reader.result;
        setSrc(temp);
      },
      false
    );
    if (props.src) {
      if (props.src.size > 0 && validateFile(props.src)) {
        reader.readAsDataURL(props.src);
      } else {
        setSrc(props.src);
      }
    } else {
      setSrc("");
    }
  }, [props.src]);

  const {
    onChange,
    percentWidthResize = 1, // should > 0 and < 1
    percentHeightResize = 1, // should > 0 and < 1
  } = props;
  const widthResize = null;
  const heightResize = null;
  const fileInputRef = React.useRef();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length === 1) {
      handleFiles(files);
    } else {
      setErrorMessage(`${Localize.getLocalize("LYT_MERCHANT_LOGO_TYPE_ERROR")}`);
    }
  };

  const RemoveImg = (e) => {
    e.preventDefault();
    setSrc(null);
    props.onChange("");
  };

  const handleResize = (file) => {
    try {
      Logger.info("ResizeImageHook execute handleResize");
      Logger.debug("ResizeImageHook execute handleResize receive", file.name);
      var image = file;
      setFile(image);
      Validator.isFileUpload(image.name, image.size, `${Localize.getLocalize("LC_IMAGE_INVALID")}`);
    } catch (e) {
      Logger.error(`ResizeImageHook handleChangeFile ${e.toString()}`);
      setErrorMessage(e.message);
    }
  };

  img.onload = async function () {
    // const imageThumbnail = document.getElementById(idImage);
    const oc = document.createElement("canvas"),
      octx = oc.getContext("2d");
    const canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d");

    let percentWidthTemp, percentHeightTemp, widthTemp, heightTemp;
    if (widthResize && heightResize) {
      widthTemp = widthResize;
      heightTemp = heightResize;
    } else {
      widthTemp = percentWidthResize * img.width;
      heightTemp = percentHeightResize * img.height;
    }

    canvas.width = widthTemp;
    canvas.height = heightTemp;

    let cur = {
      width: Math.floor(img.width * 0.5),
      height: Math.floor(img.height * 0.5),
    };

    oc.width = cur.width;
    oc.height = cur.height;

    octx.drawImage(img, 0, 0, cur.width, cur.height);
    // step 2, loop for destination resize
    while (cur.width * 0.5 > widthTemp && cur.width * 0.5 >= canvas.width) {
      cur = {
        width: Math.floor(cur.width * 0.5),
        height: Math.floor(cur.height * 0.5),
      };
      octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
    }
    // step 3, resize to final size
    ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);

    const newDataUrl = canvas.toDataURL("image/jpeg", 0.7);
    const imageFile = newDataUrl.replace("image/jpeg", "image/octet-stream");
    setSrc(newDataUrl);
    const fileUpload = HelperService.dataURLtoFile(newDataUrl, file.name);
    onChange(fileUpload);
  };

  const handleFiles = (files) => {
    try {
      Logger.info("ResizeImageHook execute handleFiles");
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          // setSelectedFiles(prevArray => [...prevArray, files[i]]); //multiple files
          setErrorMessage("");
          // onChange(files[0])
          handleResize(files[i]);
        } else {
          files[i]["invalid"] = true;
          setErrorMessage(`${Localize.getLocalize("LC_IMAGE_INVALID")}`);
          // setUnsupportedFiles(prevArray => [...prevArray, files[i]]); //multiple files
        }
      }
    } catch (e) {
      Logger.error(`ResizeImageHook handleFiles ${e.toString()}`);
      setErrorMessage(e.message);
    }
  };

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/tiff"];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    if (file.size > SIZE_IMAGE) {
      return false;
    }
    return true;
  };

  const fileInputClicked = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };
  const image = {
    width:328,
    height:229
  }
  const styleBase64 = { maxWidth: image.width, maxHeight: image.height, display: "block", margin: "auto" };
  return HelperService.isEmptyObject(src) ? (
    <DragDrop onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={fileDrop}>
      <WrapperIconAndText>
        {IconDragDrop}
        <Typography>
          {Localize.getLocalize("LC_IMAGE_PLACEHOLDER_DRAG")} <br />
          <span onClick={fileInputClicked}>{Localize.getLocalize("LC_IMAGE_PLACEHOLDER_CHOOSE")}</span>
        </Typography>
      </WrapperIconAndText>
      <InputHidden ref={fileInputRef} className="file-input" type="file" onChange={filesSelected} />
      <Error data-test-id={props.testMessageId}>{errorMessage}</Error>
    </DragDrop>
  ) : (
    <>
      <WrapperImage>
        <div style={{ width: image.width, maxHeight: image.height }}>
          <img src={src} alt="Photo" id="Photo_Resize" style={{ ...styleBase64, borderRadius: "inherit" }} />
        </div>
      </WrapperImage>
      <ButtonRemovePhoto style={disabled ? { pointerEvents: "none", opacity: 0.4 } : {}} data-test-id={props.testButtonId} onClick={RemoveImg}>
        {Localize.getLocalize("LC_DELETE")}
      </ButtonRemovePhoto>
    </>
  );
};
export default DragAndDrop;
