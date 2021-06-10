import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { BodyButton } from '../Button/styles'
import { DropdownContent } from '../Dropdown/styles'
export const LiNotification = styled(Link)`
  list-style: none;
  padding: 0.8rem 1rem;
  border-bottom: solid 1px var(--borderDivision);
  border-top: solid 1px var(--borderDivision);
  display: flex;
  flex-direction: row;
  gap: 0.6rem;
  align-items: center;
  img {
    display: initial;
    width: 4rem;
    height: 4rem;
    object-fit: cover;
    border-radius: 50%;
  }
  p {
    text-align: start;
    word-break: normal;
    gap: 0.3rem;
    width: calc(100%-4rem);
  }
`

export const NotificationBall = styled.a<{ checked: boolean }>`
  position: relative;
  display: inline-block;
  #notification {
    text-align: center;
    line-height: 17px;
    z-index: 14;
    font-weight: 600;
    font-size: 12px;
    position: absolute;
    top: 0px;
    right: 2px;
    height: 20px;
    width: 20px;
    border: 1px var(--borderDivision) solid;
    border-radius: 50%;
    color: var(--borderDivision);
    background: var(--green);
  }
  ${props =>
    props.checked &&
    css`
      #notification {
        display: none;
      }
    `}
`

export const BodyNavBar = styled.nav`
  width: 100%;
  padding: 0 1.8rem;
  margin: 0;
  background: #f1f1f1ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  position: sticky;
  top: 0;
  z-index: 2;
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
    > a img {
      width: 12rem;
      display: flex;
      flex-direction: row;
    }
    display: flex;
    align-items: center;
    height: 100%;
    gap: 1.2rem;
    ${DropdownContent} {
      max-height: 800px;
      > ul {
        overflow-y: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      > h4 {
        padding: 0 1rem;
        align-self: flex-start;
        font-weight: 600;
      }
      > aside {
        padding: 0.4rem 1rem;
        border-top: solid 1px var(--borderDivision);
        font-size: 0.9rem;
        width: 100%;
        justify-content: space-between;
        .checkNotification {
          background: transparent;
          border: 0;
          font-weight: 800;
          color: var(--textGreen);
          font-size: 15px;
        }
        > ${BodyButton} {
          font-size: 0.8rem;
          height: 1.6rem;
        }
      }
      section {
        position: relative;
        padding: 1rem;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: repeat(3, 1rem);
        gap: 0.5rem;
        border-bottom: solid 1px var(--borderDivision);
        > img {
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
      > a {
        text-decoration: none;
        display: flex;
        padding: 0.6rem 1.2rem;
        margin: 0;
        align-self: flex-start;
      }
      > button {
        color: var(--textGreen);
        border: 0;
        border-top: solid 1px var(--borderDivision);
        background: 0;
        padding: 0.8rem 1.2rem;
        width: 100%;
        text-align: start;
      }
    }

    > a {
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
    .selected {
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
