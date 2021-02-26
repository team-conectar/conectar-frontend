import styled from 'styled-components'

export const Icon = styled.span`
  margin: 0.2rem;
  position: relative;
  width: 1.6rem;
  height: 1.6rem;

  cursor: pointer;
  svg {
    position: absolute;
    right: 0;
    top: 0;
    width: 1.6rem;
    height: 1.6rem;
    transition: 0.2s;
    :nth-of-type(1) {
      opacity: 1;
      visibility: visible;
    }
    :nth-of-type(2) {
      opacity: 0;
      visibility: hidden;
    }
  }

  :hover,
  :focus {
    svg {
      :nth-of-type(1) {
        opacity: 0;
        visibility: hidden;
      }
      :nth-of-type(2) {
        opacity: 1;
        visibility: visible;
      }
    }
  }
`
