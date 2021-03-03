import styled from 'styled-components'

export const Icon = styled.span`
  margin: 0.2rem;
  position: relative;
  width: 2.2rem;
  height: 2.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    position: absolute;
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
