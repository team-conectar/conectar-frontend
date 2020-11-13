import styled, { css } from 'styled-components';




export const BodyProjects = styled.div`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    >header{
    width:100vw;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        >img{
            width:100%;
        }
        >section{
            display:flex;
            justify-content:space-between;
            align-items:center;
            position:fixed;
            z-index:1;
            padding:.6rem;
            top:0;
            width: min(1100px, 90vw);
            img{
                width:1.2rem;
            }
        }
        >aside{
            border-bottom:solid 1px;
            padding:.5rem .3rem;
            width: min(1100px, 90vw);
            >img{
                
                width:100%;
                margin: 0;
            }
            h1{
                color:var(--green-bg);
                display:flex;
                align-items:center;
                justify-content:space-between;
                color:var(--green-bg);
                img{
                    width: 1.1rem;
                    cursor: pointer;
                    margin:0 0.2rem;
                }
                margin:.2rem 0;
            }
            
            button{
                margin:.3rem 0;
            }
            >p{
                text-align:justify;
            }
            >section{
                display:flex;
                justify-content:space-between;
                align-items:center;
            }
        }
        @media(min-width:768px){
            display:grid;
            grid-template-columns: 1fr 2,4fr;
            grid-template-rows:auto;
            column-gap:1rem;
            border:solid 1px;
            border-radius:.4rem;
            width: min(1100px, 90vw);
            margin-top:1rem;
            >section{
                display:none;
            }
            >aside{
                border:0;
                width:auto;
                grid-column:2;
                padding:.6rem;
            }
            >img{
                grid-column:1;
                border:solid 1px;
                border-radius:.4rem;
                max-width:300px;
                margin:0 .8rem;
                height:85%;
            }
        }
    }
    
    >main{
        
       
        .objdes{
            >aside{
                    border-radius:0.6rem;
                    border:solid 1px;
                    padding:.6rem;
                    margin:2rem 0;
                    >section{
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                    border-bottom:solid 1px;
                    padding:.2rem 0;
                    img{
                        width:1.1rem;
                        cursor: pointer;
                    }
                    legend{
                        font:600 1rem Roboto;
                        color:var(--green-bg);
                    }
                }
                >p{
                    padding:.2rem;

                }
            }
        }
        
        .caracteristicas{
            border-radius:0.6rem;
            border:solid 1px;
            padding:.6rem;
            margin:2rem 0;
            legend{
                font:600 1rem Roboto;
                color:var(--green-bg);
                margin:.3rem 0;
            }
            aside{
                display:flex;
                flex-wrap:wrap;
                span{
                    word-break:normal;
                    padding:.2rem;
                    margin:.2rem;
                    border-radius:.2rem;
                    border:solid 1px;
                }
            }
        }
        aside{

            .vagas{
                >legend{
                    font: 500 2rem Roboto;
                    margin:.2rem 0;
                    color:var(--green-bg);
                    img{
                        width:1.2rem;
                        cursor: pointer;
                    }
                }
                >section{
                    border-radius:0.6rem;
                    border:solid 1px;
                    padding:.6rem 1rem;;
                    margin:1.2rem 0;
                    display:flex;
                        justify-content:space-between;
                        align-items:center;
                    legend{
                        font: 500 1.2rem Roboto;
                        margin:.2rem 0;
                    }
                    img{
                        width:2rem;
                        cursor: pointer;

                    }
                }
                    
            }
            .descricao{
                display:none;
            }
        }
        @media(min-width:768px){
            display:grid;
            grid-template-columns: 2fr 1fr; 
            grid-template-rows: repeat(3,auto);
            column-gap:1.8rem;
            >header{
                border-radius:.4rem;
                border:solid 1px;
            }
            
            .objdes{
                grid-column:1;
                grid-row:1;
                aside{
                    border-radius:.4rem;
                }
                p{
                    margin-left:1rem;
                }
                
            }
            .caracteristicas{
                grid-column:2;
                grid-row:1;
                border-radius:.4rem;
            }
            >aside{
                border:solid 1px;
                border-radius:.4rem;
                grid-column:1 / -1;
                grid-row:2;
                display:grid;
                grid-template-columns:1fr 1fr;
                grid-template-rows:auto;
                .vagas{
                    grid-column:1;
                    grid-row:1;
                    border-right:solid 1px;
                    >legend{
                        font-size:1.6rem;
                        margin:.8rem;
                        img{
                            display:none;
                        }
                    }
                    >section{
                        border-radius:0;
                        border: 0;
                        border:solid 1px 0;
                        border-top:solid 1px;
                        padding:.6rem 1rem;
                        margin:1.2rem 0;
                        display:flex;
                        justify-content:space-between;
                        align-items:center;
                        legend{
                            font: 500 1.2rem Roboto;
                            margin:.2rem 0;
                        }
                        img{
                            width:2rem;
                        }
                    }
                }
                .descricao{
                    display:inline;
                    grid-column:2;
                    grid-row:1;
                    padding:.8rem;
                    >legend{
                        font: 500 1.6rem Roboto;
                        color:var(--green-bg);
                    }
                    >section{
                        overflow-y:auto;
                        >p{
                            margin:0.8rem 0;
                        }
                    }
                }
            }
        }
    }
`;