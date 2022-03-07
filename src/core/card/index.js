import React from "react";
import PropType from 'prop-types'
import Styles from './style'
const Card = (props) => {
    const {width, height, children, style, elevation = 2, variant} = props

    const shadow = {
        1: '0 1px 5px rgba(34,34,34,.1)',
        2: '0 3px 10px rgba(0,0,0,.1)'
    }

    return (
        <Styles.container variant={variant} width={width} height={height} style={style} elevation={shadow[elevation]}>
            {children}
        </Styles.container>
    )
}

Card.prototype = {
    width: PropType.number.isRequired,
    height: PropType.number.isRequired,
    children: PropType.element.isRequired,
    variant: PropType.string.isRequired,
}

export default Card
