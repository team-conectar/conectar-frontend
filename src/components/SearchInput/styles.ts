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
export const Component = styled.form`
  background: white;
  box-shadow: var(--boxShadow);
  height: 2.4rem;
  width: 32rem;
  margin-top: 0.2rem;
  padding-right: 0.6rem;
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

  &:focus-within span {
    opacity: 1;
    visibility: visible;
  }
  ${BodyButton} {
    > button {
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
  }
  &:focus-within ${BodyButton} button {
    opacity: 1;
    visibility: visible;
  }
`
