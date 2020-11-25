import styled from 'styled-components';

export const BodyHome = styled.div` 
    background:#f1f1f1ff;
    >main {
        height: 100vh;
        scroll-snap-type: y mandatory;
        overflow-y: scroll;
        scroll-behavior:smooth;

        >div {
            scroll-snap-align: start;
            height: 100%;
            position:relative;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .arrow-bottom{
            height:140px;
            width:100%;
            position:absolute;
            bottom:18px;
            right:0;
            transition:.5s;
            display:flex;
            align-items:flex-end;
            justify-content:center;
            a{
                cursor: pointer;     
                font-size:2rem;
                color:var(--green-bg);
            }
            :hover{
                bottom:15px;

            }
        }
        
        
        .topo-background {
            width: calc(100vw -18px);
            justify-content: flex-start;
            .topo {
                display: grid;
                grid-template-rows: 50rem;
                grid-template-columns: 1.2fr 3fr;
                margin: 0.8rem 0;
                >section {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .area-login {
                    margin-left: .8rem;
                    grid-column: 1;
                    >h1 {
                        font: 600 3.4rem Roboto;
                        color: var(--green-bg);
                        &:nth-child(1) {
                            color: white;
                            -webkit-text-stroke-width: 1.5px;
                            /* largura da borda */
                            -webkit-text-stroke-color: var(--green-bg);
                            /* cor da borda */
                        }
                    }
                    h1+h1 {
                        margin-bottom: .8rem;
                    }
                    p{
                        color:black;
                    }
                }
                .hero {
                    grid-column: 2;
                    >img {
                        width: 90%;
                        align-self: flex-end;
                    }
                }
            }
        }
        #introducao {
            position:relative;
            justify-content: flex-start;
            >aside {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 99.27vw;
                background: var(--green);
                margin: 0 0 15% 0;
                position:sticky;
                top:5%;
                h3 {
                    background: #f1f1f1ff;
                    width: fit-content;
                    font: 700 1.4rem Roboto;
                    color: var(--green-bg);
                    padding: 0 .8rem;
                }
            }
            >main{
                display:grid;
                grid-template-columns: 1.3fr 1fr;
                grid-template-rows: auto;
                grid-column-gap:110px;
                width:min(90vw,1500px);
                .intro-box{
                    position:relative;
                    margin:0 2rem;
                    color:white;
                    display:flex;
                    flex-direction:column;
                    align-items:flex-start;
                    justify-content:center;
                    padding:3rem 8% 3rem 23%;
                    transform: skewX(10deg);
                    
                    h4{
                        transform: skewX(-10deg);
                        font:700 1.4rem Roboto;
                        margin-bottom:1.2rem;
                    }
                    p{
                        transform: skewX(-10deg);
                        line-height:2rem;
                    }
                }
                .intro-box:after,.intro-box:before{
                    content:"";
                    position:absolute;
                    transform: rotate(-5deg);
                    border-radius:3rem;
                    padding:1.2rem .8rem;
                }
                .intro-box:after{
                    width:85%;
                    height:85%;
                    z-index:-1;
                    right:0;
                    transform: rotate(-5deg);
                    background: linear-gradient(350.79deg, #FF5757  20.58%, #FB0927 45.57%);
                    
                }
                .intro-box:before{
                    width:75%;
                    height:80%;
                    right:15px;
                    transform: skewX(-3deg);
                    background:var(--green-bg);
                }
                .texto{
                    img{
                        width:4rem;
                    }
                    h4{
                        font:700 1.8rem Roboto;
                        margin:1.2rem 0;
                    }
                    p{
                        line-height:2rem;
                    }
                }
            }
        }
        #perfis{
            justify-content:center;
            .area-cards{
                width:min(90vw,1100px);
                display:flex;
                justify-content:space-between;
                flex-wrap:wrap;
                
                >aside{
                    
                    display:flex;
                    flex-direction:column;
                    align-items:space-around;
                    width:300px;
                    background:linear-gradient( #ffc255ff, #ffdc83ff );
                    border-radius:1.8rem;
                    position:relative;
                    padding-bottom: 4rem;
                    margin:3.8rem 0;
                    img{
                        width:100%;
                        margin-right:-45px;
                        top:0;
                        right:0;
                        position:block;
                        align-self:flex-end;
                        transition:.5s;
                    }
                    legend{
                        align-self:flex-start;
                        border-left:solid 4px var(--green);
                        padding: 0 .8rem;
                        margin-bottom:.8rem;
                        font:500 2rem Roboto;
                        transition:.1s;
                    }
                    &:hover{
                        legend{
                            border-left:solid 6px var(--green);
                            padding: 0 calc(.8rem - 2px);
                        }
                        img{
                            margin-right:-35px;
                        }
                    }
                    p{
                        align-self:center;
                        text-align:center;
                        margin: 0 .8rem;
                        line-height:2rem;
                    }
                    a{
                        text-decoration:none;
                        align-self:center;
                        position:absolute;
                        bottom:-15px;
                    }
                }
            }
        }
        #idealizador,#aliado{
            position:relative;
            >h3{
                margin-bottom: 4rem;
                align-self:flex-end;
                border-left:solid 4px var(--green);
                border-right:solid calc(50vw + .8rem) var(--green);
                background:#f1f1f1ff;
                color:var(--green-bg);
                font: 700 2rem Roboto;
                padding: 0 .8rem;
                width:fit-content;
                position:sticky;
                top:6%;
            }
            
            >section{
                width:90vw;
                display:grid;
                grid-template-columns: 1fr 2fr;
                grid-template-rows:auto;
                grid-column-gap:20px;
                >img{
                    grid-column:1;
                    width:80%;
                }
                .area-texto{
                    padding:2rem 0 2rem 15%;
                    grid-column:2;
                    p{
                        margin-top:2rem;
                        text-align:center;
                        font-size:1.2rem;
                        line-height:2rem;
                    }

                }
            }
        }
        #colaborador{
            >h3{
                margin: 4rem 0;
                align-self:flex-start;
                border-right:solid 4px var(--green);
                border-left:solid calc(50vw + .8rem) var(--green);
                background:#f1f1f1ff;
                color:var(--green-bg);
                font: 700 2rem Roboto;
                padding: 0 .8rem;
                width:fit-content;
                position:sticky;
                top:6%;
            }
            >section{
                width:90vw;
                display:grid;
                grid-template-columns: 2fr 1fr;
                grid-template-rows:auto;
                grid-column-gap:20px;
                >img{
                    margin-top:1rem;
                    grid-column:2;
                    width:100%;
                }
                .area-texto{
                    padding:2rem 0 2rem 15%;
                    grid-column:1;
                    p{
                        margin-top:2rem;
                        text-align:center;
                        font-size:1.2rem;
                        line-height:2rem;
                    }

                }
            }
        }
        #rodape{
            justify-content:space-between;
            width: calc(100vw -17.28px);
            >p{
                margin-top:2rem;
                text-align:center;
                font-size:1.2rem;
                line-height:2rem;
            }
            >aside{
                display:flex;
                align-items:center;
                justify-content:space-between;
                width:min(90vw, 1100px);
                img{
                    width:40%;
                }
            }
            footer {
                background: var(--green-bg);
                width:100%;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:space-around;
                >img{
                    width:40%;
                    margin-top:2rem;
                }
                >section{
                    height:4rem;
                    display:flex;
                    align-items:center;
                    justify-content:space-around;
                    margin:1rem 0;
                    a{
                        text-decoration:none;
                        cursor: pointer;
                        color:white;
                        font-size:1.2rem;
                    }
                    img{
                        width:20%;
                    }
                }
                .redes{
                    a +a {
                        margin-left:20%;
                    }
                    a{
                        display:flex;
                        align-items:center;
                        color:var(--green);
                        span{
                            color:white;
                        }
                        font:700 1.6rem Roboto;

                    }
                }
                p{
                    color:gray;
                    font-size:1.2rem;
                    margin-bottom:2rem;
                }
                
            }
        }
    }

`;