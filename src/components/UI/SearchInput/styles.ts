import styled, { css } from 'styled-components'
import { boolean } from 'yup'
import { BodyButton, DropdownContent } from '../Dropdown/styles'
interface ILiDropProps {
  isSelected: boolean
}
export const LiDrop = styled.button<ILiDropProps>`
  padding: 0.4rem 0.6rem;
  width: 100%;
  background: transparent;
  border: 0;
  text-align: center;

  font: 600 1rem Raleway;
  cursor: pointer;
  ::first-letter {
    text-transform: uppercase;
  }

  ${props =>
    props.isSelected
      ? css`
          background: var(--textGreen);
          color: white;
          border-radius: 0.4rem;
          width: 80%;
          margin: 0.2rem 0;
        `
      : css`
          :hover {
            background: var(--borderDivision);
          }
        `}
`
interface IComponents {
  isSearchPage?: boolean
}
export const Component = styled.form<IComponents>`
  background: white;
  box-shadow: var(--boxShadow);
  height: 2.4rem;
  width: ${props => (props.isSearchPage ? `100%` : `32rem`)};
  margin-top: 0.2rem;
  padding: 0 0.2rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  > input {
    border: 0;
    width: 20vw;
    background: transparent;
    height: 2rem;
    outline: 0;
    padding: 0 0.6rem;
    flex: 1;
  }
  > button {
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

  ${BodyButton} > button {
    padding: 0.2rem 1rem;
    background: var(--textGreen);
    color: white;
    border-radius: 0.4rem;
    width: 80%;
    margin: 0.2rem 0;
    opacity: 0;
    visibility: hidden;
    transition: 0.4s;
    display: flex;
    align-items: center;
    justify-content: center;
    font: 600 1rem Raleway;
  }

  ${props =>
    props.isSearchPage &&
    css`
      ${BodyButton} {
        > button {
          display: none;
        }
        ${LiDrop} {
          width: 6rem;
          margin: 0 8px;
          height: 100%;
          position: relative;
          border-radius: 0.2rem;
          :after {
            content: '';
            width: 2px;
            height: 100%;
            background: var(--borderDivision);
            position: absolute;
            left: -8px;
            top: 0;
          }
        }
      }
      ${DropdownContent} {
        opacity: 1;
        visibility: visible;
        position: initial;
        background: transparent;
        box-shadow: none;
        width: auto;
        height: auto;
        flex-direction: row-reverse;
        margin: 0;
        padding: 0;
        :before,
        :after {
          display: none;
        }
      }
    `}
  ${props =>
    !props.isSearchPage &&
    css`
      &:focus-within span {
        opacity: 1;
        visibility: visible;
      }
      &:focus-within ${BodyButton} button {
        opacity: 1;
        visibility: visible;
        &::first-letter {
          text-transform: uppercase;
        }
      }
    `}
`
