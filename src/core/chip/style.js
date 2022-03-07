import styled from '@emotion/styled'
import FONT from "core/font";

const styles = {
    container: styled.div`
        background-color: ${props=>props.background};
        border-radius: 8px;
        display: inline-block;
    `,
    message: styled.span`
        display: inline-block;
        font-size: 16px;
        font-family: ${FONT.MEDIUM};
        color: ${props=>props.color};
        padding: 3px 15px;
    `
}

export default styles
