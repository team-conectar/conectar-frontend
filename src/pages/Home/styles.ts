import styled from 'styled-components'

export const BodyHome = styled.div`
  background: var(--background);
  > main {
    height: 100vh;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    scroll-behavior: smooth;

    > div {
      scroll-snap-align: start;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .arrow-bottom {
      width: 100%;
      position: absolute;
      bottom: 18px;
      right: 0;
      transition: 0.5s;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      a {
        cursor: pointer;
        font-size: 2rem;

        outline: none;
      }
      :hover {
        bottom: 15px;
      }
      @media (min-width: 768px) {
        height: 140px;
      }
    }

    .topo-background {
      width: calc(100vw -18px);
      justify-content: flex-start;
      .topo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .area-login {
          > h1 {
            font: 700 3.2rem Raleway;

            strong {
              color: transparent;
              -webkit-text-stroke-width: 1.6px;
              -webkit-text-stroke-color: var(--textGreen);
            }
          }

          p {
            color: black;
          }
        }
        .hero {
          > img {
            width: 50%;
            margin: 1rem 0;
          }
        }
      }
      @media (min-width: 768px) {
        .topo {
          display: grid;
          grid-template-rows: 50rem;
          grid-template-columns: 2fr 3fr;

          .area-login {
            grid-column: 1;
            grid-row: 1;
          }
          .hero {
            grid-column: 2;
            > img {
              width: 90%;
              align-self: flex-end;
            }
          }
        }
      }
    }
    #introducao {
      position: relative;
      justify-content: flex-start;
      > aside {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 99.27vw;
        background: var(--green);
        margin: 0 0 15% 0;
        position: sticky;
        top: 5%;
        h3 {
          background: #f1f1f1ff;
          width: fit-content;
          font: 700 1.4rem Raleway;

          padding: 0 0.8rem;
        }
      }
      > main {
        display: grid;
        grid-template-columns: 1.3fr 1fr;
        grid-template-rows: auto;
        grid-column-gap: 110px;
        width: min(90vw, 1500px);
        .intro-box {
          position: relative;
          margin: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 3rem 8% 3rem 23%;
          transform: skewX(10deg);
          max-width: 700px;
          h4 {
            color: white;
            transform: skewX(-10deg);
            font: 700 1.4rem Raleway;
            margin-bottom: 1.2rem;
          }
          p {
            color: white;
            transform: skewX(-10deg);
            line-height: 2rem;
          }
          &:after,
          &:before {
            content: '';
            position: absolute;
            transform: rotate(-5deg);
            border-radius: 3rem;
            padding: 1.2rem 0.8rem;
          }
          &:after {
            width: 85%;
            height: 85%;
            z-index: -1;
            right: 0;
            transform: rotate(-5deg);
            background: linear-gradient(
              350.79deg,
              #ff5757 20.58%,
              #fb0927 45.57%
            );
          }
          &:before {
            width: 75%;
            height: 80%;
            right: 15px;
            transform: skewX(-3deg);
            background: var(--textGreen);
          }
        }
        .texto {
          img {
            width: 4rem;
          }
          h4 {
            font: 700 1.8rem Raleway;
            margin: 1.2rem 0;
          }
          p {
            line-height: 2rem;
          }
        }
      }
    }
    #perfis {
      justify-content: center;
      > main {
        width: min(90vw, 1100px);
        display: flex;
        justify-content: center;
        align-items: center;
        .area-cards {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          grid-template-rows: repeat(3, auto);
          background: #ffdc83ff;
          border-radius: 1.8rem;
          position: relative;
          width: min(80vw, 500px);
          > input {
            display: none;
          }
          > aside {
            grid-column: 1;
            > label {
              width: 100%;
              img {
                width: 100px;
              }
              legend {
                align-self: flex-start;
                border-left: solid 4px var(--green);
                padding: 0 0.8rem;
                margin-bottom: 0.8rem;
                font: 500 2rem Raleway;
                transition: 0.1s;
              }
            }
            .descricao {
              display: none;
              grid-column: 2;
              grid-row: 1 / -1;
              height: 100%;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-start;
              padding: 2rem 0.8rem;
              position: absolute;
              top: 0;
              right: 0;
              a {
                align-self: flex-end;
                text-decoration: none;
              }
              p {
                text-align: center;
                line-height: 2rem;
              }
            }
          }
          > input:checked + aside {
            background: linear-gradient(#ffdc83ff, #ffc255ff, #ffdc83ff);
            .descricao {
              display: flex;
            }
            > label {
              legend {
                border-left: solid 6px var(--green);
                padding: 0 calc(0.8rem - 2px);
              }
              img {
              }
            }
          }
          @media (min-width: 1100px) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: transparent;
            width: 100%;
            > aside {
              display: flex;
              flex-direction: column;
              align-items: space-around;
              width: 300px;
              background: linear-gradient(#ffc255ff, #ffdc83ff);
              border-radius: 1.8rem;
              position: relative;
              padding-bottom: 4rem;
              margin: 3.8rem 0;
              > label {
                > div {
                  width: auto;
                  display: flex;
                  flex-direction: column;
                  align-items: space-around;
                  img {
                    width: 300px;
                    margin-right: -45px;
                    align-self: flex-end;
                    transition: 0.5s;
                  }
                  legend {
                    align-self: flex-start;
                    border-left: solid 4px var(--green);
                    padding: 0 0.8rem;
                    margin-bottom: 0.8rem;
                    font: 500 2rem Raleway;
                    transition: 0.1s;
                  }
                }
              }
              &:hover {
                > label {
                  legend {
                    border-left: solid 6px var(--green);
                    padding: 0 calc(0.8rem - 2px);
                  }
                  img {
                    margin-right: -35px;
                  }
                }
              }
              .descricao {
                display: flex;
                position: initial;
                padding: 0 0.8rem;
                p {
                  align-self: center;
                  margin: 0 0.4rem;
                }
                a {
                  align-self: center;
                  position: absolute;
                  bottom: -15px;
                }
              }
            }
          }
        }
      }
    }
    #idealizador,
    #aliado,
    #colaborador {
      position: relative;
      > h3 {
        margin-bottom: 4rem;
        background: transparent;

        font: 700 2rem Raleway;
        padding: 0 0.8rem;
        width: fit-content;
        position: sticky;
        z-index: 2;
        top: 6%;
      }
      > section {
        width: 90vw;
        height: 80%;
        display: grid;
        grid-template-rows: auto;
        grid-column-gap: 20px;
        position: relative;
        > img {
          width: 80%;
        }
        button {
          position: absolute;
          z-index: 2;
          bottom: 0;
          right: 0;
        }
        .area-texto {
          padding: 2rem 0;
          height: 100%;
          grid-column: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-around;
          > p {
            text-align: center;
            font-size: 1.2rem;
            line-height: 2rem;
          }
          > aside {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            grid-gap: calc(1vw * 1);
            position: relative;
            height: auto;
            align-self: center;
            section {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              width: calc(16vw * 1);
              height: calc(16vw * 1);
              padding: 3rem 1.2rem;
              position: relative;
              &:before {
                content: '';
                position: absolute;
                width: calc(16vw * 1);
                height: calc(16vw * 1);
                border-radius: 50%;
                transform: rotate(-45deg);
                border: calc(1vw * 1) solid;
              }
              &:nth-child(1) {
                grid-column: 1;
                grid-row: 1;

                :after {
                  content: '';
                  position: absolute;
                  width: 3vw;
                  height: 3vw;
                  border-radius: 50%;
                  top: calc(50% - 2rem);
                  left: -2vw;
                }
              }
              &:nth-child(2) {
                grid-column: 2;
                grid-row: 1;
              }
              &:nth-child(3) {
                grid-column: 3;
                grid-row: 1;
                :after {
                  content: '';
                  position: absolute;
                  width: 3vw;
                  height: 3vw;
                  border-radius: 50%;
                  top: calc(50% - 2rem);
                  right: -2vw;
                }
              }
              legend {
                font: 600 1.6vw Raleway;
              }
              p {
                margin-top: 1.2rem;
                text-align: center;
                font-size: 1vw;
                line-height: 1.2rem;
              }
            }
          }
        }
      }
    }
    #idealizador {
      > h3 {
        align-self: flex-end;
        border-left: solid 4px var(--green);
        border-right: solid calc(50vw + 0.8rem) var(--green);
      }

      > section {
        grid-template-columns: 1fr 2fr;
        > img {
          grid-column: 1;
        }
        .area-texto {
          grid-column: 2;
          align-items: flex-end;
          > aside {
            section {
              &:nth-child(1) {
                :before {
                  border-color: #83b3b7;
                  border-top-color: transparent;
                  border-right-color: transparent;
                }
                :after {
                  background: #83b3b7;
                }
              }
              &:nth-child(2) {
                :before {
                  border-color: #246c7c;
                  border-bottom-color: transparent;
                  border-left-color: transparent;
                }
              }
              &:nth-child(3) {
                :before {
                  border-color: #1f3341;
                  border-top-color: transparent;
                  border-right-color: transparent;
                }
                :after {
                  background: #1f3341;
                }
              }
            }
          }
        }
      }
    }
    #aliado {
      > h3 {
        align-self: flex-end;
        border-left: solid 4px var(--green);
        border-right: solid calc(50vw + 0.8rem) var(--green);
      }

      > section {
        grid-template-columns: 1fr 2fr;
        > img {
          grid-column: 1;
        }
        .area-texto {
          grid-column: 2;
          align-items: flex-end;
          > aside {
            section {
              &:nth-child(1) {
                :before {
                  border-color: #fdcb6d;
                  border-top-color: transparent;
                  border-right-color: transparent;
                }
                :after {
                  background: #fdcb6d;
                }
              }
              &:nth-child(2) {
                :before {
                  border-color: #feb12b;
                  border-bottom-color: transparent;
                  border-left-color: transparent;
                }
              }
              &:nth-child(3) {
                :before {
                  border-color: #e29320;
                  border-top-color: transparent;
                  border-right-color: transparent;
                }
                :after {
                  background: #e29320;
                }
              }
            }
          }
        }
      }
    }
    #colaborador {
      > h3 {
        align-self: flex-start;
        border-right: solid 4px var(--green);
        border-left: solid calc(50vw + 0.8rem) var(--green);
      }
      > section {
        grid-template-columns: 2fr 1fr;
        > img {
          grid-column: 2;
          height: max-content;
          width: 100%;
        }
        .area-texto {
          grid-column: 1;
          align-items: flex-start;
          > aside {
            section {
              &:nth-child(1) {
                :before {
                  border-color: #ff8d8d;
                  border-top-color: transparent;
                  border-right-color: transparent;
                }
                :after {
                  background: #ff8d8d;
                }
              }
              &:nth-child(2) {
                :before {
                  border-color: #fe484e;
                  border-bottom-color: transparent;
                  border-left-color: transparent;
                }
              }
              &:nth-child(3) {
                :before {
                  border-color: #d8252c;
                  border-top-color: transparent;
                  border-right-color: transparent;
                }
                :after {
                  background: #d8252c;
                }
              }
            }
          }
        }
      }
    }
    #rodape {
      justify-content: space-between;
      width: calc(100vw -17.28px);
      > p {
        margin-top: 2rem;
        text-align: center;
        font-size: 1.2rem;
        line-height: 2rem;
      }
      > aside {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: min(90vw, 1100px);
        img {
          width: 40%;
        }
      }
      footer {
        background: var(--textGreen);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        > h3 {
          color: white;
          font-size: 2rem;
          height: 4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 2rem;
          img {
            width: 4rem;
            align-self: flex-start;
            :nth-of-type(1) {
              transform: scaleX(-1);
            }
          }
        }

        > section {
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: 1rem 0;
          a {
            text-decoration: none;
            cursor: pointer;
            color: white;
            font-size: 1.2rem;
          }
          img {
            width: 20%;
          }
        }
        .redes {
          a + a {
            margin-left: 20%;
          }
          a {
            display: flex;
            align-items: center;
            span {
              color: white;
            }
            font: 700 1.6rem Raleway;
            svg {
              color: var(--green) !important;
            }
          }
        }
        p {
          color: gray;
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
      }
    }
  }
`
