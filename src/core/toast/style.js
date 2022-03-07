import styled from '@emotion/styled'
import FONT from "core/font";
import {GENERAL} from "core/color";

const styles = {
    container: styled.div`
        position: relative;
        background-color: ${props=>props.background};
        border-radius: 4px;
        &:before{
            content: '';
            position: absolute;
            width: 6px;
            height: 100%;
            background-color: ${props=>props.indicator};
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px; 
        }
    `,
    icon: styled.a`
        position: absolute;
        right: 15px;
        top: 15px;
        color: ${props=>props.color};
    `,
    content: styled.div`
         padding: 15px 30px;
    `,
    title: styled.p`
        font-family: ${FONT.MEDIUM};
        font-size: 16px;
        color: ${GENERAL.BLACK};
        letter-spacing: 0.32px;
        margin-bottom: 7px;
    `,
    message: styled.p`
        font-family: ${FONT.REGULAR};
        font-size: 14px;
        color: ${GENERAL.BLACK};
    `
}

export default styles
