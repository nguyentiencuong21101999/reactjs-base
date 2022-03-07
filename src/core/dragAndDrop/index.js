import React from "react";
import styled from '@emotion/styled'
import Localize from 'service/localize'
import {GENERAL, PRIMARY, SECONDARY} from "core/color";

const IconDragDrop = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 64.465 64.465">
        <g transform="translate(0)">
            <path fill='#acacac'
                  d="M651.217,3518.719l3.679-5.378c.027-.044.052-.1.079-.149l1.124-1.645a1.875,1.875,0,0,1,3.091,0l2.072,3.026a20.609,20.609,0,0,1,12.659.231,1.123,1.123,0,0,0,1.5-1.056v-21.01a6.909,6.909,0,0,0-6.919-6.9H625.786a6.906,6.906,0,0,0-6.919,6.892v42.631a6.9,6.9,0,0,0,6.919,6.89H646.6a1.119,1.119,0,0,0,1.063-1.481,20.513,20.513,0,0,1,.165-13.535,1.428,1.428,0,0,0-1.363-1.895h-17.31a1.848,1.848,0,0,1-1.546-2.869l12.707-18.95a1.877,1.877,0,0,1,3.11,0l7.771,11.586-1.686,2.459a1.03,1.03,0,0,0,.273,1.425,1.007,1.007,0,0,0,.58.175A1.044,1.044,0,0,0,651.217,3518.719ZM650.4,3503.7a3.381,3.381,0,1,1,3.381,3.367A3.37,3.37,0,0,1,650.4,3503.7Z"
                  transform="translate(-618.867 -3485.837)"/>
            <path fill='#acacac'
                  d="M656.369,3507.543a15.961,15.961,0,1,0,15.964,15.957A15.959,15.959,0,0,0,656.369,3507.543Zm5.85,16.942h-2.778v8.527a1.5,1.5,0,0,1-1.5,1.493h-3.134a1.489,1.489,0,0,1-1.5-1.493v-8.527h-2.779a1.491,1.491,0,0,1-1.174-2.416l5.8-7.387a1.56,1.56,0,0,1,2.442,0l5.8,7.387A1.493,1.493,0,0,1,662.22,3524.485Z"
                  transform="translate(-607.868 -3475)"/>
        </g>
    </svg>
)

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
background-color: #F2F2F2;
`
const WrapperIconAndText = styled.div`
    text-align: center;
`
const Typography = styled.p`
    margin-top: 10px;
    font-size: 12px;
    letter-spacing: 0.32px;
    color: ${GENERAL.BLACK};
  span{
    color: ${PRIMARY["5B56E8"]};
    text-decoration: underline;
    cursor: pointer;
  }
`

const InputHidden = styled.input`
  display: none;
`
const styleError = {
    color: "#d32f2f",
    fontFamily: "Roboto",
    fontFamily: "Helvetica",
    fontFamily: "Arial",
    fontFamily: "sans-serif",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    marginTop: "-3px",
    marginRight: "14px",
    marginBottom: 0,
    marginLeft: "14px"
  }
const Error = styled.div`
color: "#d32f2f",
fontFamily: "Roboto",
fontFamily: "Helvetica",
fontFamily: "Arial",
fontFamily: "sans-serif",
fontWeight: 400,
fontSize: "0.75rem",
lineHeight: 1.66,
letterSpacing: "0.03333em",
textAlign: "left",
marginTop: "-3px",
marginRight: "14px",
marginBottom: 0,
marginLeft: "14px"
`

const DragAndDrop = props => {
    const {onChange} = props
    const fileInputRef = React.useRef();
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState('');

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length === 1) {
            handleFiles(files);
        }else {
            setErrorMessage(`${Localize.getLocalize('LYT_MERCHANT_LOGO_TYPE_ERROR')}`);
        }
    }

    const handleFiles = (files) => {
        for(let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                // setSelectedFiles(prevArray => [...prevArray, files[i]]); //multiple files
                setErrorMessage('');
                onChange(files[0])
            } else {
                files[i]['invalid'] = true;
                setErrorMessage(`${Localize.getLocalize('LYT_MERCHANT_LOGO_TYPE_ERROR')}`);
                // setUnsupportedFiles(prevArray => [...prevArray, files[i]]); //multiple files
            }
        }

    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    const fileInputClicked = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
    }

    return (
        <DragDrop onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={fileDrop}
        >
            <WrapperIconAndText>
                {IconDragDrop}
                <Typography>{Localize.getLocalize('LYT_UPLOAD_IMAGE_NOTICE_1')} <br/><span onClick={fileInputClicked}>{Localize.getLocalize('LYT_UPLOAD_IMAGE_NOTICE_2')}</span></Typography>
            </WrapperIconAndText>
            <InputHidden
                ref={fileInputRef}
                className="file-input"
                type="file"
                onChange={filesSelected}
            />
            <Error style={props.style} data-test-id={props.testMessageId}>{errorMessage}</Error>
        </DragDrop>
    )

}
export default DragAndDrop
