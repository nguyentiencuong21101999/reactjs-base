import React from "react";
import PropTypes from 'prop-types'
import Styles from './style'
import {SECONDARY} from "core/color";

const Close = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="10.001" height="10" viewBox="0 0 10.001 10">
        <g id="close_1_" data-name="close (1)" opacity="0.7">
            <g id="Group_5524" data-name="Group 5524">
                <path id="Path_60" data-name="Path 60" d="M6.1,5.016,9.841,1.277a.548.548,0,0,0,0-.773L9.513.176a.548.548,0,0,0-.774,0L5,3.915,1.261.176a.548.548,0,0,0-.773,0L.16.5a.547.547,0,0,0,0,.773L3.9,5.016.16,8.755a.549.549,0,0,0,0,.774l.328.328a.548.548,0,0,0,.773,0L5,6.117,8.74,9.856a.543.543,0,0,0,.387.16h0a.543.543,0,0,0,.387-.16l.328-.328a.548.548,0,0,0,0-.774Z" transform="translate(0 -0.016)" fill={props.color}/>
            </g>
        </g>
    </svg>
)

const Alert = (props) => {

    const {color, message, onClose} = props

    const hex = {
        success: {
            background: SECONDARY.D9EFEF,
            indicator: SECONDARY["40B0AC"],
            icon: SECONDARY["40B0AC"]
        },
        warning: {
            background: SECONDARY.FFECB8,
            indicator: SECONDARY.FEBE10,
            icon: SECONDARY.FEBE10
        },
        danger: {
            background: SECONDARY.FADCDC,
            indicator: SECONDARY.DE1715,
            icon: SECONDARY.DE1715
        }
    }

    return (
        <Styles.container data-test-id="alertServer" background={hex[color].background} indicator={hex[color].indicator}>
            <Styles.message data-test-id={props.testId}>
                {message}
            </Styles.message>
            <Styles.icon href="" onClick={onClose}>
                <Close color={hex[color].icon}/>
            </Styles.icon>
        </Styles.container>
    )
}

Alert.prototype = {
    color: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func.isRequired
}

export default Alert
