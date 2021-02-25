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
  > img {
    height: 1rem;
  }
  ${props =>
    props.theme === 'yellow' &&
    css`
      background: var(--yellow);

      :hover {
        background: var(--yellow-dark);
      }
    `}
  ${props =>
    props.theme === 'yellowG' &&
    css`
      border: 2px solid var(--yellow);
      color: var(--yellow);
      background: transparent;
      :hover {
        border: 2px solid var(--yellow-dark);
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
  :disabled {
    cursor: no-drop;
    opacity: 0.5;
  }
`
