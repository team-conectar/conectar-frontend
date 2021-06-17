import styled from 'styled-components'

export const BodySobre = styled.div`
    background: var(--background);
    width: 100% !important;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    >section {
        border-radius: 1rem;
        background: var(--backgroundElevation);
        padding: 5rem;
        width: 50%;

        >h1{
            text-align: center;
        }
        >h2{
            font-weight: 400;
            margin-top: 2rem;
            font-size: 16px;
            
        }
        >ul{
            margin-top: 1rem;
        }
    }

`