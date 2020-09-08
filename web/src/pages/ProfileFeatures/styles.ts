import styled, { css } from 'styled-components';

export interface PropsBodyStyle {
    showStep :{
        first:boolean;
        second:boolean;
        third:boolean;
    }
}

export const BodyProfileFeatures = styled.div<PropsBodyStyle>`
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
            h2{
                margin:1.4rem 0;
                color: var(--green-bg);
            }
            .area-educacao{
                ${props => 
                    props.showStep.first? css`display:grid;` : css`display:none;`
                }
            }
            .area-trabalho{
                ${props => 
                    props.showStep.second? css`display:grid;` : css`display:none;`
                }
            }
            .area-projeto{
                ${props => 
                    props.showStep.third? css`display:grid;` : css`display:none;`
                }
            }
            .area-trabalho, .area-projeto, .area-educacao{
                width:100%;
                grid-template-columns: 2fr 1fr 2fr;
                grid-gap: 20px;
                .botoes{
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
        footer{
            display:flex;
            justify-content:space-between;
            margin-top: 1rem;
        }
    }

`;