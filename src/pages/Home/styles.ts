import styled from 'styled-components';


export const BodyHome = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    
    main.topo-background{
        background:var(--green-bg);
        width:100%;
        display:flex;
        justify-content:center;
        clip-path: polygon(0 0, 100% 0, 100% 90%, 80% 90%, 74% 79%, 52% 79%, 48% 72%, 0 72%);
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
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        h3{
            font-size: 1.4rem;
            color:var(--green-bg);
            border-bottom:2px solid var(--green);
            padding-bottom:0.8rem;
            margin:0 0 1.2rem 2rem;
        }
        .cards-em-alta{
            display:flex;
            flex-wrap:wrap;
            justify-content:space-evenly;
        }
    }
    .quem-ja-usou{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:flex-start;
        margin:4rem 0;
        h3{
            font:400 1.4rem Roboto;
            color:var(--green-bg);
            margin:2rem 0;
        }
        .depoimentos{
            display:flex;
            flex-wrap:wrap;
            justify-content:space-between;
            aside{
                max-width:220px;
                display:flex;
                flex-direction:column;
                align-items:center;
                
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
        background:var(--green-bg);
        clip-path: polygon(20% 0%, 0 0, 0 100%, 100% 100%, 100% 40%, 43% 40%, 40% 25%, 25% 25%);
        width:100vw;
        height:20vh;
    }
`;