import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from '@material-ui/styles';
import styled from '@emotion/styled'
import { TextField, InputAdornment, Typography, Stack } from '@material-ui/core';
import HelperService from "service/helper";
import Validator from "service/validator";
import Localize from "service/localize";
const CustomTypography = styled(Typography)`
  position: relative;
  width: fit-content;
  &::before{
    content: '*';
    position: absolute;
    top: 0;
    right: -8px;
    font-size: 12px;
    display: ${props => props.required ? 'block' : 'none'}
  }
`
const styleError = {
    color: "#d32f2f",
    fontFamily: "Roboto",
    fontFamily: "Helvetica",
    fontFamily: "Arial",
    fontFamily: "sans-serif",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    textAlign: "left",
    marginTop: "3px",
    marginRight: "14px",
    marginBottom: 0,
    marginLeft: "14px"
}
const useStyles = makeStyles(theme => ({
    option: {
        backgroundColor: "white",
        // minWidth: "590px",
        // maxWidth: "590px",
        "& .MuiFilledInput-root": {
            backgroundColor: "white",
            paddingBottom: "5px"
        },
        // "& .MuiFilledInput-root::before": {
        //     border: "1px solid rgba(0, 0, 0, 0.42)"

        // },
        "& .MuiButtonBase-root": {
            paddingTop: "-10px",
            // marginBottom: "10px",
            maxWidth: "86px"
        },
    },
}));
const BonusPointHook = props => {

    const { defaultValue, onChange, list, name, placeholder, values, type, styles = {}, label, disabled, styleFormControl, isRow } = props;

    const [value, setValue] = React.useState([]);
    const [error, setError] = React.useState("")

    const classes = useStyles();
    React.useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])
    React.useEffect(() => {
        setError(props.error)
    }, [props.error])

    const handleOnChange = (event, newValue) => {
        try {
            setError('')
            setValue(newValue)
            let arrVal = []
            newValue.map((item, index) => {
                arrVal.push(list.find(element => element.postId === Number(item.slice(0, item.indexOf('.')))).postId)
            })
            Validator.isValidPostLink(name, arrVal, Localize.getLocalize("LC_ERROR_WHEN_CHOOSE_MORE_THAN_5"))
            onChange(name, arrVal, false)
        } catch (e) {
            setError(e.message)
            onChange(name, "", true)
        }
    }
    const stylesLab = !HelperService.isEmpty(error) ? { fontSize: '1rem', color: '#d32f2f' } : { fontSize: '1rem', color: '#6b778c' }
    const stylesChip = { "backgroundColor": "white", "marginTop": '-20px' }
    return (
        <div style={{ width: "100%" }} >
            {label ? <CustomTypography required={props.required} style={stylesLab}>{label}</CustomTypography> : null
            }
            <Autocomplete
                classes={{
                    // option: classes.option,
                    root: classes.option
                }}
                value={value}
                onChange={(event, newValue) => { handleOnChange(event, newValue) }}
                multiple
                id="tags-filled"
                options={list.map((option, index) => `${option.postId}.${option.title}`)}
                freeSolo
                renderTags={(value, getTagProps) => {
                    return value.map((option, index) =>
                    (< Chip
                        sx={stylesChip}
                        variant="outlined"
                        label={option.slice(1 + option.indexOf('.'), option.length)}
                        {...getTagProps({ index })}
                    />))
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        // placeholder="Chọn bài viết liên kết"
                        //sx={{ "backgroundColor": "white" }}
                        fullWidth={true}
                        error={!HelperService.isEmpty(error) ? true : false}
                        helperText={error}
                    />
                )}

            />
        </div >
    );

}

export default BonusPointHook
