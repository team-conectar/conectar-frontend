import styled, { css } from 'styled-components';



export const BodyProfileFeatures = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    min-height:100vh;
    width:100vw;
    background:var(--green-bg);
    h1{
    margin:1.4rem 0;
    font:700 3rem Roboto;
    color: white;
    }
    
    .area-central{
        
        border-radius:0.8rem;
        margin:2rem;
        .caracteristicas{
            background:white;
            padding:0.8rem;
            margin: 0.4rem 0;
            display:flex;
            flex-direction:column;
            justify-content:space-around;
            align-items: flex-start;
            border-radius:0.4rem;
            border:2px solid var(--green);
            .experiencias{
                    width:100%;
                .experiencia-cadastrada{
                    border-radius:0.4rem;
                    border:2px solid var(--green);
                    display:flex;
                    justify-content:flex-start;
                    align-items:center;
                    margin:0.8rem 0;
                    fieldset{
                        margin-left:1.2rem;
                        legend{
                            font:500 1.4rem Roboto;
                        }
                        font:400 1.2rem Roboto;
                        color:var(--green-bg);
                        
                    }
                    .icones{
                        border-right:2px solid var(--green);
                        display:flex;
                        flex-direction:column;
                        justify-content:space-between;
                        align-items:center;
                        padding:0.6rem;
                        img{
                            height:3rem;
                            cursor:pointer;
                        }
                    }
                }
                button{
                    border:0;
                    background:none;
                    font:500 1rem Roboto;
                    color:var(--yellow);
                    span{
                        font:500 1.2rem Roboto;
                    }
                }
            }
            h2{
                margin:1.4rem 0;
                color: var(--green-bg);
            }
            .area-registro{
                display:grid;
                width:100%;
                grid-template-columns: 2fr 1fr 2fr;
                grid-gap: 20px;
                .area-botoes{
                    grid-column:1/-1;
                    display:flex;
                    justify-content:space-evenly;
                }
                form{
                    display:flex;
                    flex-direction:column;
                    align-items:flex-start;
                    justify-content:center;
                    height:100%;
                }
                span{
                    color:var(--yellow-dark);
                }
               
                aside{
                    display:flex;
                    align-items:center;
                    justify-content:flex-start;
                    margin:0;
                    div + div{
                        margin-left:.4rem;
                    }
                }
                
                .bloco-um{
                    grid-column:1/-2;
                }
                .bloco-dois{
                    grid-column:-2;
                }
                .bloco-tres{
                    grid-column:1;
                }
                .bloco-quatro{
                    grid-column:2/-1
                }
            }
            

            
        }
        footer{
            display:flex;
            justify-content:space-between;
            margin-top: 1rem;
        }
    }
`;