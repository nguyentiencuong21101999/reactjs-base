import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { GENERAL, PRIMARY, SECONDARY } from "core/color";
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
          over-flow:"scroll";
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          z-index: 1300;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background-color 0.2s ease-in-out;
          background-color: ${props => props.isOpen ? 'rgba(34,34,34,0.7)' : GENERAL.TRANSPARENT};
    `,
  container: styled.div`
          width: ${props => props.width + 'px'};
          position: absolute;
          z-index: 2;
          background-color: white;
          border-radius: 8px;
          transition: opacity 0.2s linear;
          opacity: ${props => props.isOpen ? 1 : 0};
    `,
  head: styled.div`
        display: flex;
        justify-content: space-between;
        padding: 15px 20px;
        background-color: ${props => props.variant === 'danger' ? SECONDARY.DE1715 : PRIMARY["FF8585"]};
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    `,
  headerTitle: styled.div`
    display: block;
    color:"#4a4a4a4a"
    
`,
  title: styled.p`
        font-family: ${FONT.SEMIBOLD};
        font-size: 18px;
        color: ${GENERAL.WHITE};
        letter-spacing: 0.32px;
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
  wrapperNote: styled.div`
    display: flex;
    margin-top: "10px" ;
    margin-left:"77px" ;
`,
  icon: styled.div`
       margin-right: 30px;
    `,
  content: styled.div`
        color: ${GENERAL.BLACK};
        font-size: 18px;
        letter-spacing: 0.32px;
        line-height: 24px;
        white-space: pre-line;
    `,
  footer: styled.div`
        display: flex;
        justify-content: flex-end;
        padding: 30px 22px;
    `,
}


export default styles
