import styled, { css } from 'styled-components'

export const BodyCreateProject = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  textarea {
    resize: none;
  }
  .area-central {
    background: white;
    padding: 2.4rem;
    border-radius: 0.8rem;
    box-shadow: var(--boxShadow);
    h1 {
      margin: 1.4rem 0;
      color: var(--green-bg);
    }
    section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.6rem 0;
      div + div {
        margin-left: 0.8rem;
      }
    }

    form {
      display: grid;
      grid-template-columns: 2fr 3fr;
      grid-template-rows: 1fr;
      grid-gap: 2rem;
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
  }
`
