import styled, { css } from 'styled-components';
interface PropsBodyButton{
  theme?:string;
}

export const BodyButton = styled.button<PropsBodyButton>`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self:center;  
  margin:0;
  width:12rem; 
  padding:0.6rem;
  border-radius:0.4rem; 
  border:0;
  cursor: pointer;
  font:500 1rem Roboto;
  ${props => props.theme === "primary-yellow" && css`
    background:var(--yellow);
    color:var(--green-bg);
    :hover{
      background:var(--yellow-dark);
    }
  `}
  ${props => props.theme === "secondary-yellow" && css`
    border:2px solid var(--yellow);
    color:var(--yellow);
    background:transparent;
    :hover{
      border:2px solid var(--yellow-dark);
    }
  `}
  ${props => props.theme === "primary-green" && css`
    background:var(--green-bg);
    color:white;
  `}
  ${props => props.theme === "secondary-green" && css`
    border:2px solid var(--green-bg);
    color:var(--green-bg);
    background:transparent;
  `}
  :disabled{
    cursor: no-drop;
    opacity:0.5;
  }
`;