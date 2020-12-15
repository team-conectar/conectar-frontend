import styled from 'styled-components';
import { Form } from '@unform/web';


export const BodyMasteryTools = styled(Form)`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    min-height:100vh;
    width:100vw;
    background:var(--green-bg);
    h1{
        margin:1.4rem 0;
        color: var(--green-bg);
    }
    .area-central{
        padding:2.4rem 3.2rem;
        border-radius:0.8rem;
        background:white;     
        section{
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows:1fr;
            border:2px solid var(--yellow);
            border-radius:0.4rem ;
            .area-selecao, .area-selecionadas{
                height:60vh;
            }
            .area-selecao{
                border-right:2px solid var(--yellow);
                grid-column:1;
                grid-row:1;
                height:60vh;
                > legend{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:10%;
                    width:100%;
                    color:var(--green-bg);
                    font:500 1.2rem Roboto;
                    border-bottom:2px solid var(--yellow);
                }

                form{
                    height:80%;
                    overflow-y:auto;
                    >label{
                        width:100%;
                        cursor:pointer;
                        background:none;
                        display: flex;
                        justify-content:space-between;
                        align-items:center;
                        height:10%;
                        border:0;
                        border-bottom:2px solid var(--yellow);
                        padding:0 1.4rem;
                        color:var(--orange);
                        font:500 1.2rem Roboto;
                        strong{
                            color:var(--green);
                            font-size:1.4rem;
                        }
                        legend{
                            margin-left:0.4rem; 
                            width:100%;
                        }
                    }

                    .check-box{
                        input{
                            display:none;
                        }
                        label{
                            cursor:pointer;
                            position:relative;
                            color:black;
                        }
                        
                        label::after{
                            position:relative;
                            content:"";
                            width:20px;
                            height:20px;
                            display:inline-block;
                            clip-path: polygon(83% 11%, 99% 20%, 52% 97%, 0 65%, 11% 50%, 45% 72%);
                        }
                        input:checked + label::after{
                            background:var(--green);
                        }
                        
                    }
                }
            
            }
            .area-selecionadas{
                grid-column:2;
                grid-row:1;
                width:100%;
                > legend{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:10%;
                    width:100%;
                    background:var(--green-bg);
                    color:white;
                    font:500 1.2rem Roboto;
                    border-top-right-radius:0.4rem;
                }
            }
        }
    }
    footer{
        width: min(1100px, 90vw);
        display:flex;
        justify-content:space-between;
        margin-top: 1rem;
    }
`;