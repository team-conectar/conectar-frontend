import styled from 'styled-components'
import { BodyVacancy } from '../../components/Vacancy/styles'
import background from '../../assets/image/background.svg'

export const BodyCreateProject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #d9d9d9;
  background-image: url(${background});
  background-position: center;
  background-attachment: fixed;
  background-size: 50%;
  background-repeat: repeat-x;
  > main {
    background: var(--background);
    box-shadow: var(--boxShadow);
    padding: 2.4rem;
    border-radius: 0.8rem;
    width: var(--container);
    h1 {
      margin: 1.4rem 0;
    }
    > aside {
      display: flex;
      flex-direction: column;

      > button {
        align-self: flex-end;
      }
      ${BodyVacancy}.registro + button {
        display: none;
      }
    }
    section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.6rem 0;
      > div + div {
        margin-left: 0.8rem;
      }
    }

    > form {
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 3fr;
      grid-template-rows: 1fr;
      grid-gap: 2rem;
      justify-content: center;
      > section {
        grid-row: 2;
        grid-column: 1 / -1;
      }
      .area-select {
        justify-content: space-around;
      }
      .upload-img {
        width: 100%;
        > label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font: 400 1rem Raleway;
          color: var(--orange);
        }
      }
    }
  }
`
