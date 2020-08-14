import styled from 'styled-components';



export const BodyNavBar = styled.header`
  width:100vw;
  margin:0 auto;
  background:var(--green-bg);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.2rem 0;
  img{
    width:8.4rem;
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
    display: flex;
     button + button {
       margin-left: 20px;
     }
  }
`;