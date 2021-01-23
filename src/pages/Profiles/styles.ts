import styled, { css } from 'styled-components'
export const ButtonList = styled.button<{ borderBottom: boolean }>`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0;
  border: 0;
  border-top: solid 1px var(--borderDivision);
  border-left: solid 1px var(--borderDivision);
  background: transparent;
  position: relative;
  ${props =>
    props.borderBottom &&
    css`
    :after {
    width: calc(100% -3.2rem);
    height: 2px;
    content: '';
    background: var(--green-bg);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  
    `}
`
export const Page = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  > main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    width: min(1100px, 90vw);
    > header {
      background: white;
      border-radius: 0.8rem;
      box-shadow: var(--boxShadow);
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      grid-template-rows: repeat(2, auto);
      > aside {
        grid-column: 2;
        grid-row: 1;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 0 2rem;
        > img {
          width: calc(100% / 3 - 2rem);
        }
      }
      > section {
        grid-column: 2;
        grid-row: 2;
        display: flex;
        align-items: center;
      }
    }
    > div {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      width: 100%;
      color: var(--green-bg);
      .info-perfil {
        border-radius: 0.8rem;
        background: white;
        grid-column: 1;
        padding: 2rem 0.8rem;
        width: calc(100% - 2rem);
        margin: -12rem 0 0 2rem;
        height: fit-content;
        box-shadow: 0 0 8px 0 var(--borderDivision);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: space-evenly;
        > img {
          border-radius: 50%;
          width: 20%;
          object-fit: cover;
          object-position: center;
        }
        > aside {
          display: flex;
          gap: 1rem;
          > img {
            width: 2rem;
          }
        }
        > ol {
          display: flex;
          flex-flow: column nowrap;
          gap: 1.4rem;
          padding: 1.4rem 0;
          width: 100%;
          li {
            list-style: none;
            padding: 0.2rem 0.4rem;
            display: flex;
            gap: 2rem;
            aside {
              legend {
                font: 500 1.2rem Raleway;
              }
              p {
                margin-top: 0.4rem;
                line-height: 1.2rem;
              }
            }
          }
        }
        > ul {
          display: flex;
          flex-flow: row wrap;
          gap: 0.4rem;
          padding: 0.4rem 0;
          width: 100%;
          li {
            list-style: none;
            box-shadow: 0 0 1px 1px var(--green-bg);
            border-radius: 0.8rem;
            padding: 0.2rem 0.4rem;
          }
        }
        > h3 {
          align-self: flex-start;
        }
        > h4 {
          cursor: pointer;
        }
      }
      .projetos {
        grid-column: 2;
        width: calc(100% - 2rem);
        margin-right: 2rem;
        padding: 2rem 0 2rem 2rem;
        ul {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
      }
    }
  }
`
