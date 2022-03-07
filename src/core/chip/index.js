import React from "react";
import PropTypes from 'prop-types'
import Styles from './style'
import {SECONDARY} from "core/color";
const Chip = (props) => {
    const {color, message} = props

    const hex = {
        success: {
            background: SECONDARY['DFF2F9'],
            color: SECONDARY["00B9FF"]
        },
        warning: {
            background: SECONDARY['F9F3E0'],
            color: SECONDARY["FEBE10"]
        },
        danger: {
            background: SECONDARY['F6E1E1'],
            color: SECONDARY["DE1715"]
        }
    }

    return (
        <Styles.container background={hex[color].background}>
            <Styles.message data-test-id={props.testId} color={hex[color].color}>{message}</Styles.message>
        </Styles.container>
    )
}

Chip.prototype = {
    message: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Chip
