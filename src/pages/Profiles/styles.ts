import styled, { css } from 'styled-components';





export const Page = styled.div`
    width:100%;
    height: 100%;
    min-height: 100vh;
    background:var(--background);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:flex-start;
    >main{
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        padding:2rem 0;
        width:min(1100px, 90vw);
        >header{
            background:white;
            border-radius:.8rem;
            border:solid 1px var(--borderDivision);
            width:100%;
            display:grid;
            grid-template-columns:1fr 1.4fr;
            grid-template-rows: repeat(2, auto);
            >aside{

                    grid-column: 2;
                    grid-row:1;
                    width:100%;
                    display:flex;
                    justify-content:flex-end;
                    padding:0 2rem;
                >img{
                    width:calc(100% / 3 - 2rem);

                }
            }
            >section{
                grid-column: 2;
                grid-row:2;
                display:flex;
                align-items:center;
            }
        }
        >div{
            display:grid;
            grid-template-columns:1fr 1.4fr;
            padding:0 2rem;
            width:100%;
            color:var(--green-bg);
            .info-perfil{
                border-radius:.8rem;
                background:white;
                grid-column:1;
                padding:2rem .8rem;
                width:100%;
                height:fit-content;
                margin-top:-12rem;
                box-shadow: 0 0 1px 1px  var(--borderDivision);
                display: flex;
                flex-direction: column;
                gap: 1rem;
                align-items: center;
                justify-content: space-evenly;
                >img{
                    border-radius: 50%;
                    width: 20%;
                    object-fit:cover;
                    object-position: center;
                }
                >aside{
                    display: flex;
                    gap: 1rem;
                    >img{
                        width: 2rem;
                    }
                }
                >ul{
                    display: flex;
                    flex-flow: row wrap;
                    gap: .4rem;
                    width: 100%;
                    li{
                        list-style:none;
                        box-shadow: 0 0 1px 1px var(--green-bg);
                        border-radius:.8rem;
                        padding: .2rem .4rem;
                    }
                }
                >h3{
                    align-self:flex-start;
                }
                >h4{
                    cursor: pointer;
                }

            }
            .projetos{
                grid-column:2;
                width:100%;
                padding:2rem 0 2rem 2rem;
                ul{
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
            }
        }
    }
`;
export const ButtonList = styled.button<{borderBottom:boolean}>`
    width:50%;
    display:flex;
    justify-content:center;
    align-items:center;
    padding: .4rem 0;
    border:solid 1px transparent;
    border-top:solid 1px var(--borderDivision);
    border-left:solid 1px var(--borderDivision);
    background:transparent;
    ${props=>props.borderBottom && css`
        border-bottom: 2px solid var(--green-bg);
        margin-bottom:-1px;
    `}
    & + & {
        border-bottom-right-radius:.8rem;
    }
`;