import styled, { css } from 'styled-components';
interface styleProps {
  open: boolean;
}


export const BodyModal = styled.div<styleProps>`
  ${props => props.open ? css`display:flex;` : css`display:none;`}
  width:100vw;
  height:100%;
  
  justify-content:center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  position:fixed;
  z-index:100;
  top:0;
  left:0;
  .fechar{
          top:10px;
          right:10px;
          position:absolute;
          z-index:103;
          
          cursor: pointer;
          border-radius:40%;
          color: currentColor;
      }
  .janela{
      width:100vw;
      height:100vh;
      @media(min-width:768px){
        width:710px;
        height:auto;
        opacity:none;
        position:relative;
        z-index:102;
        >h1{
          font:500 2rem Roboto;
          margin-bottom:4rem;
          color:white;
        }
        
        
      

    }
    
  }
`;
export const BodyModalDefault = styled.div`
    width:100%;
    background:var(--green-bg);
    border-radius:.8rem;
    padding:1.8rem;
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
    footer{
      display:flex;
      justify-content:space-between;
      width:80%;
    }
`; 
