import React, { useEffect, useState, createRef } from "react";
import PropTypes from "prop-types";
import Helper from "service/helper";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import TimePicker from "@material-ui/lab/TimePicker";
import { TextField, InputAdornment, Typography, Stack } from "@material-ui/core";
import styled from "@emotion/styled";

const CustomTypography = styled(Typography)`
  position: relative;
  width: fit-content;
  &::before {
    content: "*";
    position: absolute;
    top: 0;
    right: -8px;
    font-size: 12px;
    display: ${(props) => (props.required ? "block" : "none")};
    color:${props => props.colors};
  }
`;

const Input = (props) => {
  const { type, heightInput, id, label, name, placeholder, error, disabled, onRef, onChange, styleFormControl, isRow, value,onClick } = props;

  const [time, setTime] = React.useState(null);
  useEffect(() => {
    const temp = !Helper.isEmpty(value) ? value : null;
    setTime(temp);
  }, []);

  const styles = !Helper.isEmpty(error) ? { fontSize: "1rem", color: "#d32f2f" } : { fontSize: "1rem", color: "#6b778c" };
  const colors = !Helper.isEmpty(error) ? '#d32f2f' : '#ff8585';
  return (
    <Stack direction={isRow ? "row" : "column"} spacing={1} sx={isRow ? { alignItems: "flex-start+" } : { justifyContent: "flex-start" }}>
      {label ? (
        <CustomTypography colors={colors} required={props.required} style={styles}>
          {label}
        </CustomTypography>
      ) : null}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          ampm={false}
          ampmInClock={false}
          value={value}
          onChange={(newValue) => {
            setTime(newValue);
            props.onChange(newValue);
          }}
          renderInput={(params) => {
            let tempParams = { ...params };
            return <TextField {...tempParams}  onClick={props.onClick} error={!Helper.isEmpty(props.error) ? true : false} helperText={!Helper.isEmpty(props.error) ? props.error : ""} sx={styleFormControl} />;
          }}
          disabled={disabled}
          errorText={props.error}
        />
      </LocalizationProvider>
    </Stack>
  );
};

Input.defaultProps = {
  disabled: false,
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Input;
