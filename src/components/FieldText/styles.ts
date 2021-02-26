import styled, { css, keyframes } from 'styled-components'
import Tooltip from '../Tooltip'

export const Error = styled(Tooltip)`
  svg {
    margin: 0;
    color: var(--red);
    cursor: pointer;
  }
  span {
    background: var(--red);
    color: white;
    &::before {
      border-color: var(--red) transparent;
    }
  }
`
const showMessage = keyframes`
  0%,80%{
    opacity: 1;
    visibility: visible;
  }
  100%{
    opacity: 0;
    visibility: hidden;
  }

`
export const BodyField = styled.label<{ isEmpty: boolean }>`
  --fieldHeight: 2.4rem;
  --marginTop: 1.6rem;
  --fontSize: 0.9rem;
  --iconSize: 1.2rem;
  width: max(100%, 10rem);
  min-height: var(--fieldHeight);
  box-shadow: var(--boxShadow);
  border-radius: 0.2rem;
  margin-top: var(--marginTop) !important;
  padding: 0 0.4rem 0 0.8rem;
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  cursor: text;
  font: 400 0.8rem Raleway;
  ${Error} {
    align-self: flex-start;
    margin-top: calc((var(--fieldHeight) - var(--iconSize)) / 2);
    svg {
      font-size: var(--iconSize);
    }
  }
  a {
    text-decoration: none;
    position: absolute;
    top: -1.2rem;
    right: 0.2rem;
    color: var(--gray);
    font-size: 0.8rem;
  }

  label {
    height: var(--fontSize);
    font-size: var(--fontSize);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: calc((var(--fieldHeight) - var(--fontSize)) / 2);
    color: gray;
    left: 0.8rem;
    transition: 0.5s;
    cursor: text;
  }

  :focus-within {
    label {
      top: -1.2rem;
      left: 0.2rem;
      color: var(--textGreen);
    }
    ${Error} {
      &:hover span {
        opacity: 1;
        animation-duration: 0s;
      }
      span {
        animation: 3s ease-in-out 0s 1 none running ${showMessage};
      }
    }
  }
  ${props =>
    !props.isEmpty &&
    css`
      label {
        top: -1.2rem;
        left: 0.2rem;
        color: var(--textGreen);
      }
    `}

  :focus-within::after {
    width: calc(100% -3.2rem);
    height: 1.92px;
    content: '';
    background: var(--textGreen);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`
