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
    font: 500 1rem Roboto;
    svg {
      margin: 0 0.3rem;
      font-size: 1.2rem;
    }
  }
  .janela {
    width: 100vw;
    height: 100vh;
    > h1 {
      font: 500 2rem Roboto;
      margin-bottom: 4rem;
      color: white;
    }
    @media (min-width: 768px) {
      width: max(710px, 50vw);
      height: auto;
      overflow-y: none;
      opacity: none;
      position: relative;
      z-index: 102;
    }
  }
`
export const BodyModalDefault = styled.div`
  width: 100%;
  background: var(--green-bg);
  border-radius: 0.8rem;
  padding: 1.8rem;
  opacity: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  > h1 {
    font: 500 2rem Roboto;
    margin-bottom: 4rem;
    color: white;
  }
  footer {
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  @media (min-width: 768px) {
    width: max(710px, 50vw);
    height: auto;
    overflow-y: none;
    opacity: none;
    position: relative;
    z-index: 102;
  }
`
