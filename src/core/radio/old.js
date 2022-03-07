import React from 'react';
import PropTypes from 'prop-types'
import Styles from './style'
import StylesInput from 'core/input/style'

const Radio = (props) => {
  const {
    label,
    name,
    list,
    defaultValue,
    onChange,
    error,
    disabled,
    required,
    row
  } = props
  const [state, setState] = React.useState(defaultValue);

  React.useEffect(()=>{
    setState(defaultValue)
  }, [defaultValue])

  const handleChange = (event) => {
    let { value } = event.target
    setState(value);
    onChange(name, value)
  };
  
  return (
      <Styles.radio>
        <Styles.label>{label}{required ? <StylesInput.sub>*</StylesInput.sub> : null}</Styles.label>
        <Styles.group onChange={handleChange} row={row}>
          {
            list.map((item,index)=> {
                return <Styles.container key={index} disabled={disabled || item.disabled} row={row} data-test-id={props.testItems ? props.testItems[index] : null}>
                          {item.text}
                        <Styles.input type="radio" value={item.value} defaultChecked={state === item.value}
                          name={name} disabled={disabled || item.disabled} 
                          testIdActive={props.testIdActive}
                          testIdInActive={props.testIdInActive}/>
                        <Styles.checkmark checked={state === item.value}>
                          {state === item.value ? <Styles.indicator/> : null}
                        </Styles.checkmark>
                      </Styles.container>
            })
          }
        </Styles.group>
        <Styles.error>{error}</Styles.error>
      </Styles.radio>
  );
}

Radio.defaultProps = {
  list: [{
    text: 'test 1',
    value: 'test 1',
    disabled: true
  }, {
    text: 'test 2',
    value: 'test 2',
    disabled: false
  }]
}

Radio.prototype = {
  label: PropTypes.string,
  name: PropTypes.string,
  list: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  row: PropTypes.bool
}

export default Radio
