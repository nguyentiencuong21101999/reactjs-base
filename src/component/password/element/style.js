import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {GENERAL, PRIMARY, SECONDARY} from "core/color";
import FONT from "core/font";

const FadeIn = keyframes`
  to{
    opacity: 0;
  }
  from{
    opacity: 1;
  }
`

const FadeOut = keyframes`
  to{
    opacity: 1;
  }
  from{
    opacity: 0;
  }
`

const styles = {
    fill: styled.div`
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.2s ease-in-out;
          background-color:#FFF2F7;
    `,
    container: styled.div`
          width: ${props => props.width + 'px'};
          position: absolute;
          background-color: white;
          border-radius: 8px;
          transition: opacity 0.2s linear;
          opacity: ${props=> props.isOpen ? 1 : 0};
    `,


    close: styled.a``,
    body: styled.div`
      background-color: ${GENERAL.WHITE};
      padding: 30px 22px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    `,
    wrapper: styled.div`
        display: flex;
    `,
    icon: styled.div`
       margin-right: 30px;
    `,
    error: styled.div`
    color: #FD5E5D;
    font-size: 28px;
    letter-spacing: 0.32px;
    line-height: 24px;
    white-space: pre-line;
    font-weight: 800;
    text-align: center;
    width: 80%;
    margin: auto;
`,
    content: styled.div`
        color:#333333;
        font-size: 18px;
        letter-spacing: 0.32px;
        line-height: 24px;
        white-space: pre-line;
        text-align: center;
        width: 80%;
        margin: auto;
    `,
    footer: styled.div`
        display: flex;
        justify-content: flex-end;
        padding: 30px 22px;
    `
}


export default styles
