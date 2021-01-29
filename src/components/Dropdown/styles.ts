import styled, { css } from 'styled-components'
interface styleProps {
  asideOpen: boolean
}

export const BodyButton = styled.button<styleProps>`
  border: 0;
  background: transparent;
  position: relative;

  cursor: default;

  > span {
    background: transparent;
    border: 0;
    width: 100%;
    cursor: pointer;
  }
  aside {
    --arrowWidth: 8px;
    --arrowRight: 16px;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    background-color: var(--white);
    min-width: 10rem;
    width: fit-content;
    min-height: 2rem;
    right: calc(50% - var(--arrowRight) - var(--arrowWidth));
    margin-top: 0.8rem;
    z-index: 100;
    border-radius: 0.4rem;
    box-shadow: var(--boxShadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.8rem 0 0.6rem;
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 0px;
      width: 0px;
      right: var(--arrowRight);
      border-width: var(--arrowWidth);
      border-style: solid;
    }
    &:before {
      border-color: transparent transparent var(--borderDivision) transparent;
      bottom: calc(100% + 0.1rem);
      filter: blur(2px);
      right: calc(var(--arrowRight) - 0.1rem);
      border-width: calc(var(--arrowWidth) + 0.1rem);
      z-index: 80;
    }
    &:after {
      border-color: transparent transparent var(--white) transparent;
      bottom: 100%;
      z-index: 100;
    }
  }
  &:focus aside {
    opacity: 1;
    visibility: visible;
  }
`
