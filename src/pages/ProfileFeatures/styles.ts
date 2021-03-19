import styled from 'styled-components'
import background from '../../assets/image/background.svg'

export const BodyProfileFeatures = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: #d9d9d9;
  background-image: url(${background});
  background-position: center;
  background-attachment: fixed;
  background-size: 60%;
  background-repeat: repeat-x;
  h1 {
    margin: 1.4rem 0;
    font: 700 3rem Raleway;
    color: var(--textGreen);
  }

  .area-central {
    border-radius: 0.8rem;
    margin: 2rem;
  }
  footer {
    display: flex;
    justify-content: space-between;
    margin: 1.6rem 0;
  }
`
