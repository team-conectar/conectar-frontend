import styled from 'styled-components'

export const BodySobre = styled.div`
    background: var(--background);
    width: 100% !important;
    min-height: 110vh;
    border-radius: var(--borderRadius);
    box-shadow: var(--boxShadow);
    gap: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    >section {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        >img{
            width: 60%;
            align-self: center;
            margin-bottom: 4rem;
        }
        border-radius: 1rem;
        background: var(--backgroundElevation);
        padding: 5rem;
        width: 50%;
        >h1{
            text-align: center;
        }
        >h2{
            text-align: justify;
            font-weight: 400;
            margin-top: 2rem;
            font-size: 16px;
            
        }
        >ul{
            margin-top: 1rem;

            >li{
                text-align: justify;
                margin-top: 0.5rem;
            }
        }
    }

`