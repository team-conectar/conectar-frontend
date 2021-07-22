import styled, { css } from 'styled-components'
interface PropsBodyButton {
  theme?: string
}

export const BodyButton = styled.button<PropsBodyButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  font: 600 14px Raleway;
  text-transform: uppercase;
  letter-spacing: 1.25px;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0.6rem;
  outline: 0;
  gap: 0.4rem;
  width: 12rem;
  height: 2.2rem;
  > img {
    height: 1rem;
  }
  ${props =>
    props.theme === 'error' &&
    css`
      color: white;
      background: var(--red);

      :hover {
        background: var(--red-dark);
      }
    `}
  
  ${props =>
    props.theme === 'primary' &&
    css`
      background: var(--textGreen);
      color: white;
    `}
  ${props =>
    props.theme === 'secondary' &&
    css`
      border: 1px solid var(--textGreen);

      background: transparent;
    `}

    ${props =>
    props.theme === 'tertiary' &&
    css`
      background: transparent;
      padding: 0;
      :hover{
        color: var(--gray);
      }
    `}

  :disabled {
    cursor: no-drop;
    opacity: 0.5;
  }
`
