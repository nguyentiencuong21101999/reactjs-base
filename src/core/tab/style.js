import styled from '@emotion/styled'
import {GENERAL, SECONDARY} from "core/color";
import FONT from "core/font";

const styles = {
    fill: styled.div`
        width: 100%;
        background-color: ${GENERAL.WHITE};
    `,
    container: styled.div`
        display: flex;
        position: relative;
    `,
    item: styled.div`
        color: ${GENERAL.BLACK};
        cursor: pointer;
        box-sizing: border-box;
        padding: 25px 25px 12px;
    `,
    label: styled.p`
        color: currentColor;
        font-size: 14px;
        font-family: ${FONT.REGULAR};
        letter-spacing: 0.32px;
        pointer-events: none;
    `,
    indicator: styled.span`
        position: absolute;
        left: ${({left}) => left + 'px'};
        bottom: 0;
        height: 3px;
        width: ${({width}) => width + 'px'};
        background-color: ${SECONDARY.FEBE10};
        transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    `
}

export default styles
