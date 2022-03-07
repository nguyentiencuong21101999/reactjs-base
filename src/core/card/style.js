import styled from '@emotion/styled'
import {GENERAL} from "core/color";

const common = `
    background-color: ${GENERAL.WHITE};
    border-radius: 8px;
    box-sizing: border-box;
    position: relative;
    `

const variants = {
    'card': `
        ${common}
        width: 392px;
        height: auto;
        margin-bottom: 30px;

        @media (min-width: 1024px) and (max-width: 1365px) {
            margin-right: 30px;
        }
    `,
    'reward': `
        ${common}
        width: 690px;
        height: auto;
        margin-bottom: 30px;
        
        @media (min-width: 1024px) and (max-width: 1365px) {
            width: 100%;
        }
    `,
    'store': `
        ${common}
        width: 392px;
        height: auto;

        @media (min-width: 1024px) and (max-width: 1365px) {
            margin-bottom: 30px;
            height: 432px;
        }
    `,
    'policy': `
        ${common}
        width: 690px;
        height: auto;
        
        @media (min-width: 1024px) and (max-width: 1365px) {
            width: 100%;
        }
    `,
    'logo': `
        ${common}
        width: 330px;
        height: 230px;
        marginBottom:30;
    `,
    'cardReport': `
        ${common}
        width: 360px;
        height: 148px;
        box-shadow: rgb(34 34 34 / 10%) 0px 1px 5px;
        padding: 20px 38px;
        
        &:not(:last-child){
            margin-right: 25px;
        }

        @media (min-width: 1366px) and (max-width: 1439px) {            
            width: 344px;
            padding: 20px 30px;
        
            &:not(:last-child){
                margin-right: 15px;
            }
        }

        @media (min-width: 1024px) and (max-width: 1365px) {            
            width: 344px;
            padding: 20px 30px;
        
            &:not(:last-child){
                margin-right: 15px;
            }
        
            &:nth-child(2n + 1){
                margin-top: 15px;
            }
        
            // &:nth-child(2n){
            //     margin-right: 0;
            // }
        
            &:nth-child(1){
                margin-top: 0;
            }
        }
    `,
    'tableReportCard': `
        ${common}
        width: 100%;
        box-shadow: rgb(34 34 34 / 10%) 0px 1px 5px;
        margin-top: 30px;
        padding: 0 25px 30px;

        @media (min-width: 1024px) and (max-width: 1365px) {            
            max-width: 757px;
        }
    `,
    'merchantInfo': `
        ${common}
        width: 780px;
        box-shadow: rgb(34 34 34 / 10%) 0px 1px 5px;
        margin-right: 30px;

        @media (min-width: 1024px) and (max-width: 1365px) {                        
            width: 446px;
            margin-right: 22px;
        }
    `,
    'packageInfo': `
        ${common}
        width: 320px;
        box-shadow: rgb(34 34 34 / 10%) 0px 1px 5px;

        @media (min-width: 1024px) and (max-width: 1365px) {                        
            width: 298px;
            height: 316px;
        }
    `,
    'stampInfo': `
        ${common}
        width: 700px;
        margin-right: 30px;
        box-shadow: rgb(34 34 34 / 10%) 0px 1px 5px;

        @media (min-width: 1024px) and (max-width: 1365px) {                        
            width: 740px;
            margin-bottom: 10px;
        }
    `,
    'wrapperRequestInfoAndCustomer': `
        ${common}
        width: 400px;
        max-height: 362px;
        min-height: 162px;
        box-shadow: rgb(34 34 34 / 10%) 0px 1px 5px;
        border-radius: 8px;

        &:nth-child(2n + 1) {
            margin-bottom: 10px;
        }

        @media (min-width: 1024px) and (max-width: 1365px) {                        
            &:nth-child(2n + 1) {
                margin-right: 10px;
            }
            &:nth-child(2n + 1) {
                margin-bottom: 0px;
            }
        }
    `,
    'groupAuth': `
        ${common}
        width: 420px;
        box-shadow: rgb(34 34 34 / 10%) 0px 1px 5px;

        @media (min-width: 1024px) and (max-width: 1365px) {    
            margin-bottom: 20px;
        }
    `
}

const defaultValue = (props) => {
    return `
        width: ${ props.width };
        height: ${ props.height };
        background-color: ${GENERAL.WHITE};
        border-radius: 8px;
        box-shadow: ${ props.elevation };
        box-sizing: border-box;
        position: relative;
    `
}

const styles = {
    container: styled.div`
        ${ props=> props.variant ? variants[props.variant] : defaultValue( props )
    }
    `
}

export default styles
