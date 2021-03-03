import styled, { css } from 'styled-components'
import { DropdownContent } from '../Dropdown/styles'

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
  ${DropdownContent} {
    section {
      position: relative;
      padding: 1rem;
      display: grid;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: repeat(3, 1rem);
      gap: 0.5rem;
      border-bottom: solid 1px var(--borderDivision);
      img {
        grid-column: 1;
        grid-row: 1 / 3;
        border-radius: 50%;
        width: 4rem;
        height: 4rem;
        border: solid 2px var(--borderDivision);
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
      display: flex;
      padding: 0.6rem 1.2rem;
      margin: 0;
      align-self: flex-start;
    }
    button {
      color: var(--textGreen);
      border: 0;
      border-top: solid 1px var(--borderDivision);
      background: 0;
      padding: 0.8rem 1.2rem;
      width: 100%;
      text-align: start;
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
      padding: 0 0.3rem;
      img {
        width: 1.2rem;
        margin-right: 0.6rem;
        :nth-last-of-type(2) {
          display: none;
        }
        :nth-last-of-type(1) {
          display: initial;
        }
      }
      ${props =>
        props.explorar &&
        css`
          border-bottom: solid 4px var(--textGreen);
          transition: 0.5s ease-out;
          img {
            :nth-last-of-type(1) {
              display: none;
            }
            :nth-last-of-type(2) {
              display: initial;
            }
          }
        `}
      &:hover {
        border-bottom: solid 4px var(--textGreen);
        transition: 0.5s ease-out;
        img {
          :nth-last-of-type(1) {
            display: none;
          }
          :nth-last-of-type(2) {
            display: initial;
          }
        }
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
    #user {
      border-radius: 50%;
      border: solid 2px var(--green);
    }
  }
`
