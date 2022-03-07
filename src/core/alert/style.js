import styled from '@emotion/styled'
import FONT from "core/font";
import {GENERAL} from "core/color";

const styles = {
    container: styled.div`
        position: relative;
        width: 100%;
        border-radius: 4px;
        background-color: ${props=>props.background};
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
    message: styled.p`
        font-family: ${FONT.REGULAR};
        font-size: 16px;
        color: ${GENERAL.BLACK};
        padding: 15px 30px;
    `,
    icon: styled.a`
        position: absolute;
        right: 30px;
        top: 15px;
        color: ${props=>props.color};
        @media (min-width: 1024px) and (max-width: 1365px) { 
            right: 45px;
        }
    `
}

export default styles
