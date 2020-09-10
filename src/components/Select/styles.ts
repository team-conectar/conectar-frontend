import styled from 'styled-components';



export const BodySelect = styled.div`
  width:100%;
  min-width:10rem;
  margin: 0.3rem 0 ;
  label{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font: 400 1rem Roboto;
    color:var(--orange);
    a{
      justify-content:flex-end;
      text-decoration:none;
      color: var(--gray);
      font-size:0.7rem;
    }
  }
  select{
    border: 2px solid var(--yellow);
    width:100%;
    height: 2rem;
    margin-top: 0.2rem;
    border-radius: 0.3rem;
    outline: 0;
    padding: 0 0.8rem;
    font: 1.6rem;
    background:white;
  }
`;
