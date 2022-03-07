import React, { Fragment } from 'react'

import PostEnum from 'service/enum/post'
import ViewAdmin from './view/admin'
import ViewUser from './view/user'
import Alert from '@material-ui/core/Alert';
import Localize from 'service/localize'

const DetailPostHtml = (props) => {
    const { 
        ui, timeout,
        data
    } = props

    const handleView = (userType) => {
        switch(userType){
            case PostEnum.USER_TYPE.ROOT:
            case PostEnum.USER_TYPE.ADMIN:
                return ViewAdmin(props)
            case PostEnum.USER_TYPE.USER:
            case PostEnum.USER_TYPE.SOCIAL:
                return ViewUser(props)
            default:
                return <Fragment></Fragment>
        }
    }

    return (
      <>
        {handleView(ui.detailPost.userType)}

        {timeout.field === "all" ? (
          <Alert severity="error" style={{ fontSize: "18px" }}>
            {timeout.message}
          </Alert>
        ) : null}
      </>
    );
}

export default DetailPostHtml