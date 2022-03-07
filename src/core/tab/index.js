/**
 * Created By Nguyen Cong Thanh on 03/27/2020 15:26.
 *
 * Copyright intelIn 2020.
 */

import React from "react";
import PropTypes  from 'prop-types'
import Styles from './style'
const TabView = props => {

    const {
        initialLayout,
        onIndexChange,
        routes,
    } = props

    const [index, setIndex] = React.useState(0)
    const [indicator, setIndicator] = React.useState({width: 0, left: 0})
    const elRefs = React.useRef([]);

    if (elRefs.current.length !== routes.length){
        elRefs.current = Array(routes.length).fill(undefined, undefined, undefined).map((_, idx) => elRefs.current[idx] || React.createRef())
    }

    React.useEffect(() => {
        const {offsetWidth, offsetLeft} = elRefs.current[initialLayout].current
        setIndex(initialLayout)
        setIndicator({width: offsetWidth, left: offsetLeft})
    }, [initialLayout])

    const onChange = (e, value) => {
        e.preventDefault();
        const {offsetWidth, offsetLeft} = e.target
        setIndicator({width: offsetWidth, left: offsetLeft})
        setIndex(value)
        onIndexChange(value)
    }

    return (
        <Styles.fill>
            <Styles.container>
                {
                    routes.map((item, idx) => (
                        <Styles.item key={idx} ref={elRefs.current[idx]}
                              active={index === item.value}
                              onClick={e => onChange(e, item.value)}
                              data-test-id={item.testId} >
                            <Styles.label>{item.text}</Styles.label>
                        </Styles.item>
                    ))
                }
                <Styles.indicator width={indicator.width} left={indicator.left}/>
            </Styles.container>
        </Styles.fill>
    )
}

TabView.prototype = {
    onIndexChange: PropTypes.func.isRequired,
    routes: PropTypes.array.isRequired,
    initialLayout: PropTypes.number.isRequired
}

export default TabView
