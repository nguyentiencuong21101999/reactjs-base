import styled from '@emotion/styled'
import FONT from "core/font";
import {GENERAL, PRIMARY, SECONDARY} from "core/color";

const styles = {
    fill: styled.div`
        position: relative;
    `,
    label: styled.label`
        font-size: 16px;
        letter-spacing: 0.32px;
        font-family: ${FONT.LIGHT};
        color: ${GENERAL.BLACK};
    `,
    sub: styled.span`
        color: ${SECONDARY.DE1715};
    `,
    container: styled.div`
        margin-top: 10px;
        margin-bottom: 10px;
        position: relative;
        display: flex;
    `,
    input: styled.input`
        width: 100%;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: ${props => `${props.paddingLeft}px`};
        padding-right: ${props => `${props.paddingRight}px`};
        border-top-left-radius: ${props => props.borderLeft ? '8px' : 0};
        border-bottom-left-radius: ${props => props.borderLeft ? '8px' : 0};
        border-top-right-radius: ${props => props.borderRight ? '8px' : 0};
        border-bottom-right-radius: ${props => props.borderRight ? '8px' : 0};
        border: 1px solid ${props => props.error ? SECONDARY.DE1715 : GENERAL.GRAY1};
        background: ${GENERAL.WHITE};
        box-sizing: border-box;
        font-size: 16px;
        letter-spacing: 0.32px;
        color: ${GENERAL.BLACK};
        font-family: ${FONT.MEDIUM};
        transition: all 0.25s ease-in-out;
        text-align: left;
        &:focus {
          outline: 0;
          box-shadow: 0 3px 10px rgba(0,0,0,0.1);
          border-color: ${PRIMARY["D1CFFF"]};
        }
        &:disabled{
          color: ${GENERAL.GRAY};
          cursor: no-drop;
          background-color: ${GENERAL.GRAY1};
        }
        &::placeholder,
        &::-webkit-input-placeholder {
          color: ${GENERAL.GRAY};
          font-family: ${FONT.REGULAR};
        }
        &:-ms-input-placeholder {
          color: ${GENERAL.GRAY};
          font-family: ${FONT.REGULAR};
        }
    `,
    iconEnd: styled.div`
        position: absolute;
        padding-right: 15px;
        padding-left: 15px;
        height: 100%;
        right: 0;
        display: flex;
        align-items: center;
        border-top-right-radius: ${props => props.borderRight ? '8px' : 0};
        border-bottom-right-radius: ${props => props.borderRight ? '8px' : 0};
    `,
    iconStart: styled.div`
        position: absolute;
        padding-right: 15px;
        padding-left: 15px;
        height: 100%;
        left: 0;
        display: flex;
        align-items: center;
        border-top-left-radius: ${props => props.borderLeft ? '8px' : 0};
        border-bottom-left-radius: ${props => props.borderLeft ? '8px' : 0};
    `,
    error: styled.div`
        min-height: 20px;
        font-size: 16px;
        letter-spacing: 0.32px;
        color: ${SECONDARY.DE1715};
        font-family: ${FONT.REGULAR};
    `
}

export default styles
