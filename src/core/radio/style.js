import styled from '@emotion/styled'
import {GENERAL, PRIMARY, SECONDARY} from "core/color";
import FONT from "core/font";

const styles = {
    radio:styled.div`
        position: relative;
    `,
    label:styled.p`
        font-size: 16px;
        letter-spacing: 0.32px;
        color: ${GENERAL.BLACK};
        font-family: ${FONT.LIGHT}; 
    `,
    group: styled.div`
        display: flex;
        flex-direction: ${props=>props.row ? 'row' : 'column'};
        margin: 10px 0;
        padding: 16px;
        flex-wrap: wrap;
    `,
    container: styled.label`
        display: block;
        position: relative;
        padding-left: 35px;
        margin: ${props=>props.row ? '0 25px 0 0' : '0 0 25px 0'};
        cursor: ${props=>props.disabled ? 'no-drop' : 'pointer'};
        font-size: 16px;
        user-select: none;
        &:last-child{
            margin: 0;
        } 
        @media (min-width: 1024px) and (max-width: 1365px) {
            &:nth-child(2n + 1){
                margin-bottom: 10px;
            }
        }
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
        border-radius: 50%;
        border: 1px solid ${props=> props.checked ? PRIMARY["5B56E8"] : props.error ? SECONDARY.DE1715 : GENERAL.GRAY};
        background-color: ${GENERAL.WHITE};
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    indicator: styled.i`
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${PRIMARY["5B56E8"]};
    `,
    error: styled.div`
        min-height: 19px;
        font-size: 16px;
        letter-spacing: 0.32px;
        color: ${SECONDARY.DE1715};
    `
}

export default styles
