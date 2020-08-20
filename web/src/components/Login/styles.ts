import styled from 'styled-components';



export const BodyLogin = styled.form`
  display:flex;
  flex-direction:column;
  align-items:center;   
  aside{
    display:flex;
    justify-content:space-evenly;
    button{
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .google-button{
      font-size:3rem;
      border: 1px solid var(--white);
      width:3rem;
      height:3rem;
      background-color: var(--white);
      border-radius:50%;
      margin:1rem;
    }
    .facebook-button{
      cursor:pointer;
      color:#3b5998;
      font-size:3rem;
      border: 3px solid var(--white);
      width:3rem;
      height:3rem;
      background-color:var(--white);
      border-radius:50%;
      margin:1rem;
    }
  }
  p{
    color:var(--white);
    align-self:center;
    margin:0.5rem 0;
    a{
        color:var(--green);
        text-decoration:none;
    }
  }
`;