import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

import DialogAction from 'reduxStore/action/dialog'
import MessageCenterAction from 'reduxStore/action/messageCenter'
import Component from "./component";


const mapStateToProps = (allReducer) => {
    return {
        allReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateModal: (data) => {
          dispatch(DialogAction.update(data))
        },
        messageCenterupdate: (payload) => {
            dispatch(MessageCenterAction.update(payload))
        },
       
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Component))