import styled from '@emotion/styled'
import {GENERAL, PRIMARY, SECONDARY} from "core/color";

const styles = {
    container: styled.label`
        display: block;
        position: relative;
        padding-left: 35px;
        cursor: ${props=>props.disabled ? 'no-drop' : 'pointer'};
        font-size: 16px;
        user-select: none;
        color: ${GENERAL.BLACK};
    `,
    input: styled.input`
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
        &:disabled{
            cursor: no-drop;
        }
    `,
    checkmark: styled.span`
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        border-radius: 4px;
        border: 1px solid ${props=> props.checked ? PRIMARY["5B56E8"] : props.error ? SECONDARY.DE1715 : GENERAL.GRAY};
        background-color: ${props=> props.checked ? PRIMARY["5B56E8"] : GENERAL.WHITE};
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        &:after{
          content: "";
          position: absolute;
          display: none;
        }
    `
}

export default styles
