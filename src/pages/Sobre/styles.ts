import styled from 'styled-components'

export const BodySobre = styled.div`
    overflow-x: hidden;
    width: 100%;
    background: var(--background);
    border-radius: var(--borderRadius);
    box-shadow: var(--boxShadow);
    gap: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    >section{
        
        height: 100%;
        width: 100%;
        #parte_um{
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            width: 100%;
            flex-direction: row-reverse;
            height: 50rem;

            >img{
                width: 50rem;
                height: auto;
                margin-right: -8rem;
            }
            >aside{
                margin: 0 10rem;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                height: 100%;
                >h1{
                    text-align: left;
                    font-size: 48px;
                }
                >h2{
                    text-align: justify;
                    font-weight: 400;
                    margin-top: 2rem;
                    font-size: 24px;
                    
                }
            }
        }
        #parte_dois{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 50rem;
            background: var(--textGreen);
            >section{
                margin-bottom: 5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                >p {
                    margin-right: 10rem;
                    text-align: left;
                    font-size: 28px;
                    width: 32%;
                    color: white
                }
                >img{
                    width: 30rem;
                    height: auto;
                }
            }
        }
        .box-information{
            margin-top: -5rem;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            width: 95%;
            height: 15rem;
            padding: 4rem;
            background: white;
            >h1{
                width: 40%;
                text-align: center;
                font-size: 24px;
            }
            >h2{
                font-weight: 400;
                font-size: 20px;
                width: 60%;
            }
        }
        #parte_tres{
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: center;
            width: 100%;
            height: 50rem;
            >section{
                >p{
                    font-weight: 600;
                    font-size: 32px;
                    text-align: center;
                    margin: 8rem 0 4rem 0;
                }
            }
        }
        #grid{
            display: grid;
            grid-template-columns: auto auto auto;
            gap: .8rem;
        }

        .box-check{
            width: 25rem;
            display: flex;
            padding: 1rem;
            background: white;
            >svg{
                color: var(--textGreen);
                margin-right: 1rem;
                width: 1.5rem;
                height: 1.5rem;
                padding: 4px;
                border: 2px solid var(--green);
                border-radius: 5rem;
            }
            >div{
                display: flex;
                width: 80%;
                height: 100%;
                flex-direction: column;
                justify-content: center;
                text-align: left;
                >h1{
                    margin-bottom: .5rem;
                    font-size: 20px ;
                }
                >p{
                    color: var(--gray);
                }
            }
            text-align: center;
            border: 2px solid var(--textGreen);
            border-radius: 0.5rem;
        }
        #parte_quatro{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: auto;
            padding: 0 12rem;
            >strong{
                margin-right: -8rem;
                display: flex;
                align-items: center;
                text-align: left;
                width: 35%;
                font-size: 32px;
                height: 100%;
            }
            >img{
                width: 50rem;
                height: auto;
                margin-bottom: -4.7rem;
        }
        }
    }

`