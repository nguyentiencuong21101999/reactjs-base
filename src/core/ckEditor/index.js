import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import Helper from 'service/helper'

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Typography, Stack } from '@material-ui/core';
import styled from '@emotion/styled'
import BaseAction from 'base/action'

CKEditor.editorConfig = function (config) {
  // misc options
  config.height = '350px';
};

const custom_config = {
  extraPlugins: [MyCustomUploadAdapterPlugin],
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'blockQuote',
      'insertTable',
      '|',
      'imageUpload',
      'undo',
      'redo',
    ]
  },

  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  }
}

const CustomTypography = styled(Typography)`
  position: relative;
  width: fit-content;
  &::before{
    content: '*';
    position: absolute;
    top: 0;
    right: -8px;
    font-size: 12px;
    display: ${props => props.required ? 'block' : 'none'};
    color:${props => props.colors};
  }
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
const Input = props => {
  const {
    id,
    label,
    name,
    placeholder,
    error,
    disabled,
    onRef,
    onChange,
    styleFormControl,
    isRow,
    value,
  } = props

  const [content, setContent] = useState(value)
  const [editor, setEditor] = useState({})
  const [isChange, setIsChange] = useState(false)



  useEffect(() => {
    setContent(value)
  })

  const width = props.fullWidth ? { width: '100%', height: "auto" } : null
  const row = isRow ? { alignItems: 'center' } : null

  const styles = !Helper.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f' } : { fontSize: '1rem', color: '#6b778c' }
  const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
  return (
    <Stack direction={isRow ? "row" : "column"} spacing={1} sx={{ ...row }, { ...width }}>
      {label ? <CustomTypography colors={colors} required={props.required} style={styles}>{label}</CustomTypography> : null}
      <Stack>
        <CKEditor
          editor={ClassicEditor}
          config={custom_config}
          data={value}
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            if (!Helper.isEmpty(content)) {
              editor.setData(content)
            }

            // setEditor(editor)
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            if (isChange) {
              onChange(data)
            }

          }}
          onBlur={(event, editor) => {
          }}
          onFocus={(event, editor) => {
            setIsChange(true)
          }}
        />
      </Stack>
      <div id="editors"></div>
      <p style={styleError}>{error}</p>
    </Stack>
  )

}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}

class MyUploadAdapter {
  constructor(props) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
    // URL where to send files.
    // this.url = `${ENV}/Services/SaveImage`;
    // this.url = `https://api.meiji.dev.intelin.vn/api/static/admin`;
  }

  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {

      this.loader.file.then(payload => {

        // console.log(payload)
        var myHeaders = new Headers();
        myHeaders.append("token", BaseAction.getToken());

        var formdata = new FormData();
        formdata.append("file", payload);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        const url = `${BaseAction.api.host}${BaseAction.api.resource}`
        fetch(url, requestOptions)
          .then(response => response.json())
          .then(response => {
            // console.log(response)
            if (response && response.code === "200" && response.data) {
              resolve({
                default: response.data.host + response.data.path
              })
            } else {
              reject("Response code error")
            }
          })
          .catch(error => {
            reject(error)
          });
      }
      )

    });
  }

}


Input.defaultProps = {
  type: 'text',
  style: { width: '100%' },
  value: '',
  borderLeft: true,
  borderRight: true,
  isPointer: false,
  disabled: false,
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  style: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  onRef: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
}

export default Input
