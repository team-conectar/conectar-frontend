import styled from 'styled-components';



export const BodyNavBar = styled.header`
  width:100vw;
  margin:0 auto;
  background:var(--green-bg);
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 1.2rem ;
  img{
    width:10.6rem;
  }
  input{
    border: 2px solid var(--green);
    background:transparent;
    height: 1.6rem;
    color:var(--white);
    margin-top: 0.2rem;
    border-radius: 0.3rem;
    outline: 0;
    padding: 0 1.6rem;
  }
  aside {
    a{
      text-decoration:none;
      font:500 1rem Roboto;
      color:var(--white);
    }
    .create{
      padding: 0.2rem 0.6rem;

      border-radius:0.2rem;
      background-color:var(--green);
      transition: background-color 0.2s;
    }

     a + a {
       margin-left: 20px;
     }
  }
`;
