import styled from 'styled-components'
import { BodyVacancy } from '../../components/Vacancy/styles'
import background from '../../assets/image/background.svg'
import { BodyField } from '../../components/UI/FieldText/styles'
import { BodyInput } from '../../components/UI/Input/styles'

export const Page = styled.div`
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
    width: calc(var(--container) - 30vw);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    img {
      width: 5rem;
      height: 5rem;
    }
    > form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      > label {
        align-self: flex-start;
      }
      &.segunda-etapa {
        > section {
          width: 100%;
          display: flex;
          justify-content: space-around;
          ${BodyInput} {
            label {
              margin: 0 !important;
            }
            width: 3.2rem;
          }
          ${BodyField} {
            margin: 0;
            width: 3.2rem;
            padding: 0;
            input {
              width: 2rem;
              text-align: center;
              font-size: 1.4rem;
            }
          }
        }
      }

      > aside {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > button.voltar {
          border: none;
          background: none;
          color: var(--textGreen);
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          padding: 0 0.6rem;
        }
      }
      &.terceira-etapa {
        > aside {
          justify-content: flex-end;
        }
      }
    }
  }
`
