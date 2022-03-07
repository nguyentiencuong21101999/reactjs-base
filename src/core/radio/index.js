import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import Helper from "service/helper";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const CustomFormLabel = styled(FormLabel)`
  position: relative;
  width: fit-content;
  &::before {
    content: "*";
    position: absolute;
    top: 0;
    right: -8px;
    font-size: 12px;
    color:${props => props.colors};
    display: ${(props) => (props.required ? "block" : "none")};
  }
  .MuiFormLabel-asterisk {
    display: none;
  }
`;
const RadioCore = (props) => {
  const { label, name, list, defaultValue, onChange, error, styleChild, disabled, required, row } = props;
  const [state, setState] = React.useState(defaultValue);

  React.useEffect(() => {
    setState(defaultValue);
  }, [defaultValue]);

  const handleChange = (event) => {
    let { value } = event.target;
    setState(value);
    onChange(name, value);
  };
  const styles = !Helper.isEmpty(error) ? { fontSize: "1rem", color: "#d32f2f" } : { fontSize: "1rem", color: "#6b778c" };
  const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
  return (
    <FormControl component="fieldset" sx={props.styleFromControl}>
      {label ? (
        <CustomFormLabel colors={colors} required={props.required} style={styles}>
          {label}
        </CustomFormLabel>
      ) : null}
      <RadioGroup aria-label="gender" name={`controlled-radio-buttons-group-${name}`} value={state} onChange={handleChange} row={row} sx={props.styleRadio}>
        {list.map((item, index) => (
          <FormControlLabel disabled={disabled} style={styleChild} key={index} value={item.value} control={<Radio />} label={item.text} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

RadioCore.defaultProps = {
  list: [
    {
      text: "test 1",
      value: "test 1",
      disabled: true,
    },
    {
      text: "test 2",
      value: "test 2",
      disabled: false,
    },
  ],
};

RadioCore.prototype = {
  label: PropTypes.string,
  name: PropTypes.string,
  list: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  row: PropTypes.bool,
};

export default RadioCore;
