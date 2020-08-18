import styled from 'styled-components';
import backgroundMain from '../../assets/image/background.svg';
import backgroundFooter from '../../assets/image/footer.svg';



export const BodyHome = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:url(${backgroundMain});
    background-size: 100vw;
    background-repeat:no-repeat;
    main{

        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr 400px;
        grid-template-columns: 1fr 3fr ;
        grid-template-areas: "login ah" "guia guia" "projeto projeto"  "experiencia experiencia" "footer footer";
        width:90vw;
        .area-login{
            grid-area:login ;
            h1{
                padding-bottom:1.4rem ;
                font:500 3.4rem Roboto;
                color:var(--white);
            }  
        }
        .saiba-como-acontece{
            grid-area:guia;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:flex-start;
            p{
                text-align:center;
            }
            h3{
                font:700 1.4rem Roboto;
                color:var(--green-bg);
                
            }
        }
        .projetos-em-alta{
            grid-area:projeto;
            display:flex;
            flex-direction:column;
            align-items:flex-start;
            h3{
                font-size: 1.4rem;
                color:var(--green-bg);
                border-bottom:2px solid var(--green);
            }
        }
        .quem-ja-usou{
            grid-area:experiencia;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:flex-start;
            h3{
                font:400 1.4rem Roboto;
                color:var(--green-bg);
                
            }
        }
    }
    footer{
        width:100vw;
        height:15vh;
        grid-area:footer;
        background:url(${backgroundFooter});
        background-size: cover;
        background-repeat:no-repeat;
    }
`;