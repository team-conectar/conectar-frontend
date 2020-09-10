import styled from 'styled-components';



export const BodyLogin = styled.form`
  display:flex;
  flex-direction:column;
  align-items:center;
  button{
    margin:1.2rem 0;
  }   
  
  aside{
    display:flex;
    justify-content:space-evenly;
    button{
      display:flex;
      justify-content:center;
      align-items:center;
      margin:1.2rem;
    }
    .google-button{
      font-size:3rem;
      border: 1px solid var(--white);
      width:3rem;
      height:3rem;
      background-color: var(--white);
      border-radius:50%;
    }
    .facebook-button{
      color:#3b5998;
      font-size:3rem;
      border: 3px solid var(--white);
      width:3rem;
      height:3rem;
      background-color:var(--white);
      border-radius:50%;
    }
  }
  p{
    color:white;
    align-self:center;
    margin:0.5rem 0;
    a{
        color:var(--green);
        text-decoration:none;
    }
  }
`;