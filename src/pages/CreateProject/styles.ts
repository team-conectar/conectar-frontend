import styled, { css } from 'styled-components'
interface Props {
  showStage: 1 | 2 | 3
}
export const BodyCreateProject = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  > main {
    background: white;
    box-shadow: var(--boxShadow);
    padding: 2.4rem;
    border-radius: 0.8rem;
    width: var(--container);
    h1 {
      margin: 1.4rem 0;
    }
    > aside {
      display: none;
      flex-direction: column;

      > button {
        align-self: flex-end;
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
      display: none;
      grid-template-columns: 2fr 3fr;
      grid-template-rows: 1fr;
      grid-gap: 2rem;
      justify-content: center;
      > section {
        grid-row: 2;
        grid-column: 1/-1;
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
    ${props =>
      (props.showStage === 1 &&
        css`
          .primeira-etapa {
            display: grid;
          }
          .segunda-etapa {
            display: none;
          }
          .terceira-etapa {
            display: none;
          }
        `) ||
      (props.showStage === 2 &&
        css`
          .primeira-etapa {
            display: none;
          }
          .segunda-etapa {
            display: grid;
          }
          .terceira-etapa {
            display: none;
          }
        `) ||
      (props.showStage === 3 &&
        css`
          .primeira-etapa {
            display: none;
          }
          .segunda-etapa {
            display: none;
          }
          .terceira-etapa {
            display: flex;
          }
        `)}
  }
`
