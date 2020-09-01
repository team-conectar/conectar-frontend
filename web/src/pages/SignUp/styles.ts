import styled, { css } from 'styled-components';




interface StepProps {
    segunda: boolean;
}

export const BodySignUp = styled.div<StepProps>`
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    width:100vw;
    background:var(--green-bg);
    form.area-central{
        background:var(--white);
        padding:2.4rem;
        border-radius:0.8rem;
        border:2px solid var(--green);
        img{
            width:40%;
        }
        h1{
            margin:1.4rem 0;
            color: var(--green-bg);
        }
        .primeira-etapa{
            ${props =>
        props.segunda ? css`display:none;` : css`display:grid;`
    } 
            
            grid-template-rows: 500px;
            grid-template-columns: 60% 40%;
            grid-template-areas:"form img";
            section{
                display:flex;
                justify-content:space-between;
                align-items:center;
                div + div {
                    margin-left:0.8rem;
                }
            }
            .area-form{
                grid-area:form;
                .google-button ,.facebook-button {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    font:400 0.9rem Roboto;
                    height:2.8rem;
                    width: 15rem;
                    border-radius:0.4rem;
                    padding:0.4rem;
                    svg{
                        color:#3b5998;
                        padding: 0 0.4rem;
                        border-right: 1px solid var(--green);
                        width:2rem;
                        height:1.2rem;
                        margin-right:0.4rem;
                    }
                }
                .google-button{
                    border: 1px solid var(--green);
                    background-color: var(--white);
                    margin: 2rem 0 0.5rem 0.2rem; 
                }
                .facebook-button{              
                    border: 1px solid var(--green);
                    background-color:var(--white);
                    margin: 2rem 0.2rem 0.5rem 0;
                }
                a{
                    font:400 1.2rem Roboto;
                    text-decoration:none;
                    color:var(--yellow);
                }
                p {
                    margin:1rem 0;
                    font:400 1rem Roboto;
                    a{
                        text-decoration:none;
                        color:var(--green);
                    }
                }
            }
            .area-img{
                grid-area:img;
            }
            -webkit-transition: .2s;
            transition: opacity .5s linear;
        }
        .segunda-etapa {
            ${props =>
                props.segunda ? css`display:flex;` : css`display:none;`
            }       
            flex-direction:column;
            section{
                display:flex;
                justify-content:space-between;
                align-items:flex-end;
                margin:0.6rem 0;
                div + div {
                    margin-left:0.4rem;
                    width:auto;     
                }
                legend{
                    font:400 1.2rem Roboto;
                    color:var(--yellow);
                }
                span{
                    font:400 1rem Roboto;
                    color:var(--gray);
                }
            }
            .tipo-perfil{
                justify-content:space-around;
                flex-wrap:wrap;
                fieldset{
                    margin-top:0.4rem;
                    width: max(30% ,150px);
                    legend{
                        width:100%;
                        background:var(--green-bg);
                        padding:0.2rem;
                        color:white;
                        text-align:center;
                        margin-bottom:0;
                    }
                    aside{
                        display:flex;
                        flex-direction:column;
                        justify-content:space-around;
                        align-items:center;
                        height:200px;
                        border:2px solid var(--yellow);
                        border-top:0;
                        padding-bottom:0.8rem;
                        p{
                            margin-bottom:0.8rem;
                        }
                        .switch {
                            position: relative;
                            display: inline-block;
                            width: 56px;
                            height: 30px;
                            input {
                                opacity: 0;
                                width: 0;
                                height: 0;
                            }
                            input:checked + .slider {
                                background-color: var(--green-bg);
                            }
                            input:focus + .slider {
                                box-shadow: 0 0 1px #2196F3;
                            }
                            input:checked + .slider:before {
                                -webkit-transform: translateX(26px);
                                -ms-transform: translateX(26px);
                                transform: translateX(26px);
                            }
                            .slider {
                                border:2px solid var(--green-bg);
                                position: absolute;
                                cursor: pointer;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background-color: var(--white);
                                -webkit-transition: .2s;
                                transition: .2s;
                                border-radius: 34px;
                            }

                            .slider:before {
                                border:2px solid var(--green-bg);
                                position: absolute;
                                content: "";
                                height: 26px;
                                width: 26px;
                                left: -2px;
                                bottom: -2px;
                                background-color: var(--green);
                                -webkit-transition: .2s;
                                transition: .2s;
                                border-radius: 50%;
                            }  
                        }
                    }
                }
            }
            button.voltar {
                border: 0;
                cursor:pointer;
                background:none;
                font:500 1rem Roboto;
                color:var(--yellow);
                :hover{
                    color:var(--yellow-dark);
                }
            }
        }
    }
`;