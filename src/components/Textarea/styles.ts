import styled from 'styled-components';


export const BodyTextarea = styled.div`
  width:100%;
  min-width:10rem;
  margin: 0.4rem 0 ;
  padding-bottom:.8rem;
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
      color: gray;
      font-size:0.7rem;
    }
  }
  textarea{
    border: 2px solid var(--yellow);
    border-radius: .2rem;
    width:100%;
    min-height: 10rem ;
    margin-top: 0.2rem;
    padding: 0.4rem 0.8rem;
    font: 1.6rem;
    outline: 0;
    resize: none;
  }
  span{
    color:red;
    font:400 .8rem Roboto;
    position:absolute;
    left:0;
    bottom:0;
  }
`;
