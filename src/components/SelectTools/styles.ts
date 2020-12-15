import styled from 'styled-components'

export const BodySelectTool = styled.div`
  margin: 0.3rem 0;
  width: 100%;
  padding-bottom: 1rem;
  position: relative;
  > label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: 400 1rem Roboto;
    color: var(--orange);
  }
  > div {
    margin-top: 0.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 0;
    border: 2px solid var(--yellow);
    border-radius: 0.4rem;
    .area-selecao,
    .area-selecionadas {
      height: 60vh;
    }
    .area-selecao {
      border-right: 2px solid var(--yellow);
      grid-column: 1;
      grid-row: 1;
      height: 60vh;
      > legend {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 100%;
        color: var(--green-bg);
        font: 500 1.2rem Roboto;
        border-bottom: 2px solid var(--yellow);
      }
      > ul {
        height: 80%;
        overflow-y: auto;
        overflow-x: hidden;
        > li {
          list-style: none;
          width: 100%;
          input {
            display: none;
          }
          > label {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background: none;
            height: 50px;
            border-bottom: 2px solid var(--yellow);
            padding: 0 1.4rem;
            font: 500 1.2rem Roboto;
            cursor: pointer;
            span,
            strong {
              color: var(--green);
              font-size: 1.3rem;
            }
            > span {
              position: absolute;
            }
            > legend {
              color: var(--orange);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 0.4rem;
              width: 100%;
            }
          }
        }
      }
      .area-insercao {
        border-top: 2px solid var(--yellow);
        padding-bottom: 0.5rem;
        > button {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--green);
          font-size: 1.3rem;
          font: 700 1.3rem Roboto;
          text-align: center;
        }
        > input {
          width: 90%;
          border: 0;
          margin-left: 0.2rem;
          padding-left: 0.8rem;
          height: 2rem;
        }
        > legend {
          color: var(--orange);
          padding: 0.2rem;
        }
      }
    }
    .area-selecionadas {
      grid-column: 2;
      grid-row: 1;
      width: 100%;
      > legend {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 100%;
        background: var(--green-bg);
        color: white;
        font: 500 1.2rem Roboto;
        border-top-right-radius: 0.4rem;
        padding: 0.8rem;
      }
      > ul {
        height: 90%;
        overflow-y: auto;
        > li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 50px;
          background: none;
          border: 0;
          border-bottom: 2px solid var(--yellow);
          padding: 0 1.4rem;
          font: 500 1.2rem Roboto;
          > svg {
            color: var(--green);
            font-size: 1.3rem;
          }
          > label {
            > img {
              cursor: pointer;
              height: 1.4rem;
              cursor: pointer;
            }
          }

          > legend {
            color: var(--green-bg);
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-left: 0.4rem;
            width: 100%;
          }
        }
      }
    }
  }
  > span {
    color: red;
    font: 400 0.8rem Roboto;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`
