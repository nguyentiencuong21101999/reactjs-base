import React, { useEffect, useState } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Typography, Stack } from '@material-ui/core';

const Input = props => {
  const {
    value,
    styleFormControl
  } = props
  return (
    <Stack sx={styleFormControl}>
    <CKEditor
      disabled
      editor={ClassicEditor}
      config={[]}
      data={value}
      onReady={editor => {
        document.querySelector(".ck-sticky-panel__content").style.display = "none";
        document.querySelector(".ck-content").style.border = "none";
        // You can store the "editor" and use when it is needed.

        // setEditor(editor)
      }}
      onChange={(event, editor) => {
      }}
      onBlur={(event, editor) => {
      }}
      onFocus={(event, editor) => {
        setIsChange(true)
      }}
    />
    </Stack>

  )

}

export default Input
