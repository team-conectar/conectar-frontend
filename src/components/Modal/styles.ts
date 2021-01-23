import styled, { css } from 'styled-components'
interface styleProps {
  open: boolean
}

export const BodyModal = styled.div<styleProps>`
  ${props =>
    props.open
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}
  width:100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  .fechar {
    display: flex;
    align-items: center;
    top: 10px;
    right: 15px;
    position: absolute;
    z-index: 103;
    cursor: pointer;
    border-radius: 40%;
    color: currentColor;
    font: 500 1rem Raleway;
    svg {
      margin: 0 0.3rem;
      font-size: 1.2rem;
    }
  }
`

export const DivModalWindow = styled.div`
  width: min(900px, 90vw);
  background: white;
  border-radius: 0.8rem;
  padding: 1.8rem;
  opacity: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 2;
`
