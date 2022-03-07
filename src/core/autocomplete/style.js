import styled from "@emotion/styled";
import { GENERAL, PRIMARY } from "core/color";
import FONT from "../font";

const styles = {
    dragdrop: styled.div`
        position: absolute;
        background-color: ${GENERAL.WHITE};
        border-radius: 8px;
        top: 60px;
        left: 0;
        right: 0;
        z-index: 10;
        border: 1px solid ${GENERAL.GRAY1};
        box-sizing: border-box;
    `,
    container: styled.div`
        border-radius: inherit;
        max-height:250px;
        overflow:auto;
        // padding-top: 5px;
        //padding-bottom: 5px;
        box-shadow: 0 3px 6px #00000029;
        margin-top:-34px;
    `,
    search: styled.div`
        margin-top: -8px;
        width:100%;
        box-sizing:border-box;
        padding:8px;
        position: relative;
        z-index:999;
        width:97.5%;
        background-color:#fff
    `,
    searchIcon: styled.span`
        position: absolute;
        display: flex;
        top: 13px;
        left: 13px;
    `,
    searchInput: styled.input`
         padding: 8px 8px 8px 35px;
         border-radius:4px;
         outline:0;
         width:100%;
         box-sizing:border-box;
         border-width: 1px;
         border-style: solid;
         border-color: ${GENERAL.GRAY1};
         background-color: ${GENERAL.WHITE};
         font-family: ${FONT.REGULAR};
    `,
    item: styled.div`
        height: 36px;
        width: 100%;
        padding: 11px 17px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 16px;
        letter-spacing: 0.32px;
        color: ${GENERAL.BLACK};
        white-space: nowrap;
        &:last-child {
          margin-bottom: 0
        }
        &:hover, &.active {
          cursor: pointer;
          background-color: ${PRIMARY.D1CFFF};
          color: ${PRIMARY["5B56E8"]}
        }
        &.disabled {
          cursor: not-allowed;
          opacity:0.3
        }
    `,
    overflow: styled.div`
        position: fixed;
        z-index: 1;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0
    `
}

export default styles
