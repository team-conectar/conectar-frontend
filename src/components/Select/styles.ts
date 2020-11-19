import styled from 'styled-components';



export const BodySelect = styled.div`
  width:100%;
  min-width:10rem;
  margin: 0.3rem 0 ;
  position: relative;
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
  .select{
    *{
        border-color:var(--yellow) !important;
        border-width:2px;
        :focus-within{
            box-shadow: 0 0 0 0 !important;
        }
    }
    width:100%;
    margin-top: 0.3rem;
    font: 1.6rem;
  }
`;
