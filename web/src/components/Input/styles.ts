import styled from 'styled-components';



export const BodyInput = styled.div`
  position: relative;
  margin: 0.3rem 0 ;
  label{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font: 400 0.9rem Roboto;
    color:var(--gray);
    a{
      justify-content:flex-end;
      text-decoration:none;
      color: var(--yellow);
      font-size:0.7rem;
    }
  }
  input{
    border: 2px solid var(--yellow);
    width: 100%;
    height: 2rem;
    margin-top: 0.2rem;
    border-radius: 0.3rem;
    outline: 0;
    padding: 0 0.8rem;
    font: 1.6rem;
    
  }
`;