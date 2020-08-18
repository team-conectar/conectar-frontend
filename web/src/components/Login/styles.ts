import styled from 'styled-components';



export const BodyLogin = styled.form`
  display:flex;
  flex-direction:column;
  align-items:center;   
  .google-button{
    
  }
  .facebook-button{
    border:0;
    border-radius:50%;
    padding:0;

    .icon-facebook {
      color:blue;
      width: 2rem;
      height: 2rem;
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