import styled, { css } from 'styled-components';
interface styleProps {
  open: boolean;
}


export const BodyModal = styled.div<styleProps>`
  ${props => props.open ? css`display:flex;` : css`display:none;`}
  width:100vw;
  height:100%;
  margin:0 auto;
  justify-content:center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  position:fixed;
  z-index:1;
  top:0;
  left:0;
  .janela{
    width:700px;
    background:var(--green-bg);
    border-radius:0.4rem;
    padding: 1.2rem ;
    opacity:none;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:relative;
    z-index:2;
    >h1{
      font:500 2rem Roboto;
      margin-bottom:4rem;
      color:white;
    }
    
    >svg{
      align-self:flex-end;
      color:white;
      cursor: pointer;
    }
    footer{
      display:flex;
      justify-content:space-between;
      width:80%;
    }
  }
`;
