import styled from '@emotion/styled'
import FONT from "core/font";
import {GENERAL, PRIMARY, SECONDARY} from "core/color";

const button = styled.button`
        border: 0;
        outline: 0;
        border-top-left-radius: ${props => props.borderLeft ? '8px' : 0};
        border-bottom-left-radius: ${props => props.borderLeft ? '8px' : 0};
        border-top-right-radius: ${props => props.borderRight ? '8px' : 0};
        border-bottom-right-radius: ${props => props.borderRight ? '8px' : 0};
        height: 48px;
        padding: 15px 30px;
        cursor: pointer;
        font-size: 16px;
        letter-spacing: 0.32px;
        box-sizing: border-box;
        transition: all 0.25s ease-in-out;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        align-items: center;
    `

const styles = {
    primary: styled(button)`
        background-color: ${PRIMARY["FF8585"]};
        color: ${GENERAL.WHITE};
        &:hover{
            box-shadow: 0 10px 10px #5B56E833;
        }
        &:disabled{
            color: ${PRIMARY.ECEBFF};
            background-color: ${PRIMARY.D1CFFF};
        }
    `,
    secondary: styled(button)`
        background-color: ${GENERAL.GRAY1};
        color: ${GENERAL.BLACK};
        &:disabled{
            opacity: 0.4;
        }
    `,
    light: styled(button)`
        color: ${GENERAL.BLACK};
        background-color: ${GENERAL.WHITE};
        &:disabled{
            opacity: 0.4;
        }
    `,
    outlinePrimary: styled(button)`
        background-color: ${GENERAL.WHITE};
        border: 1px solid ${PRIMARY["FF8585"]};
        color: ${PRIMARY["FF8585"]};
        &:hover{
            background-color: ${PRIMARY.ECEBFF};
        }
        &:disabled{
            opacity: 0.4;
        }
    `,
    outlineSecondary: styled(button)`
        background-color: ${GENERAL.WHITE};
        border: 1px solid ${SECONDARY.DE1715};
        color: ${SECONDARY.DE1715};
        &:hover{
            background-color: ${SECONDARY.FFEAEA};
        }
        &:disabled{
            opacity: 0.4;
        }
    `,
    icon: styled.span`
        display: flex;
    `
}

export default styles
