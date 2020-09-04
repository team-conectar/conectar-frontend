import styled from 'styled-components';



export const BodyButton = styled.button`

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border:0;
  margin:0;
  align-self:center;  
  width:12rem; 
  padding:0.6rem;
  border-radius:0.4rem; 
  background:var(--yellow);
  font:500 1rem Roboto;
  color:var(--green-bg);
  :hover{
    background:var(--yellow-dark);
  }
  :disabled{
    cursor: no-drop;
    background: #ccc;
    color:var(--gray);
  }
`;