import styled from 'styled-components'
import { Form } from '@unform/web'

export const BodyMasteryTools = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  h1 {
    margin: 1.4rem 0;
  }
  .area-central {
    padding: 2.4rem 3.2rem;
    border-radius: 0.8rem;
    background: white;
  }
  footer {
    width: min(1100px, 90vw);
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
`
