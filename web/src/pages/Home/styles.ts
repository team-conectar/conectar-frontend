import styled from 'styled-components';
import bg from '../../assets/image/background.svg';


export const BodyHome = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    main{
        background:url(${bg});
        background-size: 100%;
        background-repeat:no-repeat;

        display: grid;
        grid-template-rows: 700px 1fr;
        grid-template-columns: 1fr 3fr ;
        grid-template-areas: "form nda" "total total";
        form{
            grid-area:form ;
            display:flex;
            flex-direction:column;

            h1{
                padding-bottom:1.4rem ;
                font:500 3.4rem Roboto;
                color:var(--white);
            }
            p{
                color:var(--white);
                align-self:center;
                margin:0.5rem 0;
                a{
                    color:var(--green);
                    text-decoration:none;
                }
            }
            
        }
    }
`;