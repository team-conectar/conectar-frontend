import styled, { css } from 'styled-components';



interface StepProps {
    showSecondStep: boolean;
}



export const BodyApproveProject = styled.div<StepProps>`
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:center;
    height:100vh;
    width:100vw;
    background:var(--green-bg);
    >main{
        display:flex;
        justify-content:center;
        align-items:flex-start;
        padding:1.4rem;
        .area-esq,.area-dir{
            @media screen and (max-width:1300px){
                display:none;
            }
            >aside{
                background:var(--white);
                padding:1.4rem;
                border-radius:0.8rem;
                border:2px solid var(--green);
                margin:0 1rem;
            }
        }
        .area-central{
            width: min(720px, 90vw);
            background:var(--white);
            padding:2.4rem;
            border-radius:0.8rem;
            border:2px solid var(--green);
            
           >h1{
                margin:1.4rem 0;
                color: var(--green-bg);
            }
            >section{
                display:flex;
                justify-content:space-between;
                align-items: center;
                margin:0.6rem 0;
                
            }
            
        }
            
    }
`;