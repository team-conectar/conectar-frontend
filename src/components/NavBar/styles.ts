import styled, { css } from 'styled-components'
interface NavBarProps {
  sobre: boolean
  explorar: boolean
}

export const BodyNavBar = styled.header<NavBarProps>`
  width: 100%;
  padding: 0 1.8rem;
  margin: 0;
  background: #f1f1f1ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  /* position: absolute;
  top: 0;
  z-index: 2; */
  img {
    width: 12rem;
  }
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  .searchBlock {
    background: white;
    box-shadow: var(--boxShadow);
    height: 2rem;
    margin-top: 0.2rem;
    padding: 0;
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    input {
      border: 0;
      width: 20vw;
      background: transparent;
      height: 2rem;
      outline: 0;
      padding: 0 0.6rem;
    }
    button {
      display: flex;
      align-items: center;
      border: 0;
      background: transparent;
      padding: 0 0.4rem;
      border-right: 2px solid var(--borderDivision);
      cursor: pointer;
      img {
        width: 16px;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 1.2rem;

    a {
      text-decoration: none;
      font: 500 0.9rem Raleway;

      display: flex;
      align-items: center;
    }
    .sobre,
    .explorar {
      border-bottom: solid 4px transparent;
      border-top: solid 4px transparent;
    }
    .sobre {
      height: 100%;
      ${props =>
        props.sobre &&
        css`
          border-bottom: solid 4px var(--textGreen);
        `}
    }
    .explorar {
      height: 100%;
      ${props =>
        props.explorar &&
        css`
          border-bottom: solid 4px var(--textGreen);
          transition: 0.5s ease-out;
        `}
      padding:0 .3rem;
      img {
        width: 1.2rem;
        margin-right: 0.6rem;
      }
    }
    .create {
      padding: 0.4rem 2rem;
      border-radius: 8rem;
      border: solid 1px var(--textGreen);
      transition: background-color 0.2s;
      text-transform: uppercase;
      font-size: 0.8rem;
      font-weight: 700;
    }

    #dropdown {
      position: relative;
      display: inline-block;
      #user,
      #notification {
        border: 0;
        background: transparent;
        padding: 0.4rem;
        font-size: 18px;
        cursor: pointer;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        img {
          width: 20px;
        }
      }

      #user {
        border-radius: 50%;
        border: solid 2px var(--green);
      }
      .dropdown-content {
        display: block;
        position: absolute;
        background-color: white;
        width: 20rem;
        min-height: 2rem;
        right: 0;
        margin-top: 0.8rem;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
        border-radius: 0.4rem;
        border: solid 2px var(--green);
        > section {
          padding: 1rem;
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-template-rows: repeat(3, 1rem);
          row-gap: 0.5rem;
          border-bottom: solid 1px var(--green);
          img {
            grid-column: 1;
            grid-row: 1 / 3;
            border-radius: 50%;
            width: 4rem;
            height: 4rem;
            border: solid 2px var(--green);
            padding: 0.2rem;
          }
          legend {
            grid-column: 2;
            grid-row: 1;
          }
          p {
            font-size: 0.8rem;
            grid-column: 2;
          }
          p:nth-child(2) {
            grid-row: 2;
          }
          p:nth-child(3) {
            grid-row: 3;
          }
        }
        a {
          text-decoration: none;
          color: black;
          display: flex;
          padding: 0.6rem 1.2rem;
          margin: 0;
        }
        button {
          border: 0;
          border-top: solid 1px var(--green);
          background: 0;
          padding: 0.8rem 1.2rem;
          width: 100%;
          text-align: start;
        }
        :before,
        :after {
          //setas
          content: '';
          position: absolute;
          height: 0px;
          width: 0px;
          right: 15px;
          border-width: 12px;
          border-style: solid;
        }
        :before {
          //borda da seta
          top: -25.5px;
          border-color: transparent transparent var(--green) transparent;
        }
        :after {
          //seta
          top: -22.5px;
          border-color: transparent transparent white transparent;
        }
      }
    }
  }
`
