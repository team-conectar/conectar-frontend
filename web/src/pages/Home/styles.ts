import styled from 'styled-components';
import backgroundMain from '../../assets/image/background.svg';
import backgroundFooter from '../../assets/image/footer.svg';
import backgroundDepoimentos from '../../assets/image/bg-depoimentos.svg';



export const BodyHome = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    main{
        background:var(--green-bg);
        width:100%;
        display:flex;
        justify-content:center;
        clip-path: polygon(0 0, 100% 0, 100% 85%, 80% 85%, 75% 77%, 55% 77%, 50% 69%, 0 69%);
        .topo{

            display: grid;
            grid-template-rows: 50rem;
            grid-template-columns: 1fr 3fr ;
            grid-template-areas: "login hero";
            .area-login{
                grid-area:login ;
                h1{
                    padding-bottom:1.4rem ;
                    font:500 3.4rem Roboto;
                    color:var(--white);
                }  
            }
            .hero{
                grid-area:hero;
                display:flex;
                justify-content:flex-end;
                align-items:flex-start;
                img{
                    width:70%;
                }
            }
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
            padding-bottom:0.8rem;
            margin:0 0 2rem 2rem;
        }
        .cards-em-alta{
            display:flex;
            flex-wrap:wrap;
            justify-content:center;
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
            margin:2rem 0;
        }
        .depoimentos{
            display:flex;
            justify-content:center;
            flex-flow: row wrap;
            aside{
                max-width:220px;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:space-between;
                i{
                    text-align:center;
                    margin:1.5rem 0;
                }
                strong {
                    text-transform:uppercase;
                }
                img{
                    border-radius:50%;
                    border:3px solid var(--yellow);
                    width:5rem;
                    height:5rem;
                }
            }
        }
    }
    footer{
        width:100vw;
        height:100px;
        background:url(${backgroundFooter});
        background-size: cover;
        background-repeat:no-repeat;
    }
`;