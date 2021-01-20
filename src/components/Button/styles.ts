import styled, { css } from 'styled-components'
interface PropsBodyButton {
  theme?: string
}

export const BodyButton = styled.button<PropsBodyButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.2rem;
  font: 500 1rem Raleway;
  cursor: pointer;
  border: 0;
  margin: 0;
  padding: 0.4rem 0.8rem;
  outline: 0;
  ${props =>
    props.theme === 'yellow' &&
    css`
      background: var(--yellow);
      color: var(--green-bg);
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
    props.theme === 'green' &&
    css`
      background: var(--green-bg);
      color: white;
    `}
  ${props =>
    props.theme === 'greenG' &&
    css`
      border: 2px solid var(--green-bg);
      color: var(--green-bg);
      background: transparent;
    `}
  :disabled {
    cursor: no-drop;
    opacity: 0.5;
  }
  @media (min-width: 768px) {
    width: 12rem;
    padding: 0.6rem;
  }
`
