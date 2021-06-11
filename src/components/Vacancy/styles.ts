import styled from 'styled-components'

export const BodyVacancy = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  > h1 {
    margin: 1.4rem 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    > button {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      border: 0;
      background: none;
      font: 500 1.2rem Raleway;
      color: var(--green);
      span {
        font: 500 2rem Raleway;
      }
    }
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: 100%;

    width: 100%;
    .area-botoes {
      display: flex;
      justify-content: space-evenly;
      margin: 0.4rem 0;
    }
  }

  aside {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    div + div {
      margin-left: 0.4rem;
    }
  }

  @media (min-width: 768px) {
    height: auto;
    position: relative;
    --gap: 10px;
    width: calc(100% - var(--gap) * 3);
    > form {
      display: grid !important;
      width: 100%;
      grid-template-columns: 0.5fr 0.25fr 0.25fr;
      gap: var(--gap) !important;
      padding: 0 0.2rem;
      .area-botoes {
        grid-column: 1 / -1;
        grid-row: 4;
        margin-top: 3rem;
      }
      .bloco-area {
        grid-column: 2 / -1;
        grid-row: 2;
      }

      .bloco-contrato {
        margin: 0;
        grid-column: 2 / -1;
        grid-row: 3;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        gap: 2rem;
        height: 100%;
        width: 100%;
      }
    }
  }
`
