import styled from 'styled-components'
import { Form } from '@unform/web'
import background from '../../assets/image/background.svg'

export const BodyExperienceAreas = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-image: url(${background});
  background-position: center;
  background-attachment: fixed;
  background-size: 100%;
  background-repeat: no-repeat;
  h1 {
    margin: 1.4rem 0;
  }

  .area-central {
    padding: 2.4rem 3.2rem;
    border-radius: 0.8rem;
    background: var(--background);
  }
  footer {
    width: min(1100px, 90vw);
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
`
