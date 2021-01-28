import styled, { css } from 'styled-components'
interface styleProps {
  asideOpen: boolean
}

export const BodyButton = styled.button<styleProps>`
  border: 0;
  background: transparent;
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  cursor: default;
  svg {
    width: 100%;
    height: 100%;
  }
  #btn-drop {
    cursor: pointer;
  }
  aside {
    --arrowWidth: 8px;
    --arrowRight: 16px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    background-color: white;
    width: 20rem;
    min-height: 2rem;
    right: calc(50% - var(--arrowRight) - var(--arrowWidth));
    margin-top: 0.8rem;
    z-index: 100000;
    border-radius: 0.4rem;
    box-shadow: var(--boxShadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem 0 0.6rem;
    &:before {
      content: '';
      position: absolute;
      height: 0px;
      width: 0px;
      right: var(--arrowRight);
      border-width: var(--arrowWidth);
      border-style: solid;
      border-color: transparent transparent white transparent;
      bottom: 100%;
    }
  }
  &:focus aside {
    opacity: 1;
    visibility: visible;
  }
`
