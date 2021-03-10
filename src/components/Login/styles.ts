import styled from 'styled-components'
import { Form } from '@unform/web'

export const BodyLogin = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    margin: 2.2rem 0 1.2rem;
  }

  aside {
    display: flex;
    justify-content: space-evenly;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1.2rem;
    }
    .google-button {
      font-size: 3rem;
      border: 1px solid var(--backgroudElevation);
      width: 3rem;
      height: 3rem;
      background-color: var(--backgroudElevation);
      border-radius: 50%;
    }
    .facebook-button {
      color: #3b5998;
      font-size: 3rem;
      border: 3px solid var(--backgroudElevation);
      width: 3rem;
      height: 3rem;
      background-color: var(--backgroudElevation);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 3rem;
        height: 3rem;
      }
    }
  }
  p {
    color: white;
    align-self: center;
    margin: 0.5rem 0;
    a {
      color: var(--green);
      text-decoration: none;
    }
  }
`
