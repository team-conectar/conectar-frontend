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
    width:12rem;
  }
  .searchBlock{
    border: 2px solid var(--green);
    height: 2rem;
    margin-top: 0.2rem;
    padding:0;
    border-radius: 0.3rem;
    display:flex;
    align-items:center;
    input{
      border:0;
      width:20vw;
      background:transparent;
      height: 2rem;
      color:var(--white);
      outline: 0;
      padding: 0 0.6rem;
    }
    button{
      border:0;
      background:transparent;
      padding:0 0.4rem;
      border-right:2px solid var(--green);
      cursor: pointer;
      img {
        width:16px;
      }
    }
  }
  aside {
    a{
      text-decoration:none;
      font:500 0.8rem Roboto;
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
