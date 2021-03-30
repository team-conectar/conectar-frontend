import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  span {
    padding: 6px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    width: 160px;
    bottom: 140%;
    left: -50px;
    transform: translateX(-50%);
    color: #312e38;
    z-index: 1000;
    text-align: center;
    &::before {
      content: '';
      border-style: solid;
      border-color: green transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      right: 5%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`
