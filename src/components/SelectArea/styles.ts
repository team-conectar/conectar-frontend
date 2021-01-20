import styled, { css } from 'styled-components'

interface Props {
  showSubarea: boolean
}

export const BodySelectArea = styled.div<Props>`
  margin: 0.3rem 0;
  width: 100%;
  position: relative;
  padding-bottom: 1rem;
  > label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: 400 1rem Raleway;
  }
  > div {
    margin-top: 0.2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-gap: 0;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;
    .area-selecao,
    .area-selecionadas {
      height: 60vh;
    }
    .area-selecao {
      border-right: 2px solid var(--borderDivision);
      grid-column: 1;
      grid-row: 1;
      height: 60vh;

      > ul {
        height: 100%;
        overflow-y: auto;
        scroll-snap-type: y proximity;
        ${props =>
          props.showSubarea &&
          css`
            display: none;
          `}
        > li {
          background: none;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          height: 50px;
          width: 100%;
          border: 0;
          border-bottom: 2px solid var(--borderDivision);
          padding: 0 1.4rem;
          color: var(--green-bg);
          font: 500 1rem Raleway;
          cursor: pointer;
          input {
            display: none;
          }
        }
      }
      > aside {
        ${props =>
          !props.showSubarea &&
          css`
            display: none;
          `}
        height:100%;
        > header {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          border-bottom: 2px solid var(--borderDivision);
          padding: 0 0.4rem;
          > legend {
            color: var(--green-bg);
            font: 500 1rem Raleway;
          }
          > button {
            position: absolute;
            left: 1rem;
            border: 1px solid var(--green-bg);
            border-radius: 0.2rem;
            padding: 0.2rem;
            background: none;
            color: var(--green-bg);
          }
        }
        > ul {
          height: 90%;
          overflow-y: auto;
          scroll-snap-type: y proximity;

          > li {
            list-style: none;
            width: 100%;
            background: none;
            font: 500 1rem Raleway;

            label {
              position: relative;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 50px;
              padding: 0 1.4rem;
              border-bottom: 2px solid var(--borderDivision);
              cursor: pointer;
              svg {
                color: var(--green);
              }
              span {
                position: absolute;
              }
              legend {
                color: var(--green-bg);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 0.4rem;
                width: 100%;
              }
            }
          }
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
        font: 500 1.2rem Raleway;
        border-top-right-radius: 0.4rem;
        border-bottom: 2px solid var(--green-bg);
      }
      > ul {
        height: 90%;
        overflow-y: auto;
        > li {
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 50px;
          background: none;
          border-bottom: 2px solid var(--borderDivision);
          padding: 0 1.4rem;
          font: 500 1rem Raleway;
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
        }
        > legend {
          color: var(--green-bg);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-left: 0.4rem;
          width: 100%;
          font: 500 1rem Raleway;
        }
      }
    }
  }
  > span {
    color: red;
    font: 400 0.8rem Raleway;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`
