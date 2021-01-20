import styled from 'styled-components'

export const BodyInput = styled.div`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  width: 100%;
  min-width: 10rem;
  margin: 0.3rem 0;
  padding-bottom: 0.8rem;
  position: relative;
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: 400 1rem Roboto;
    color: var(--orange);
    a {
      justify-content: flex-end;
      text-decoration: none;
      color: var(--gray);
      font-size: 0.7rem;
    }
  }
  input {
    border: 2px solid var(--yellow);
    border-radius: 0.2rem;
    width: 100%;
    height: 2.4rem;
    margin: 0.2rem 0;
    outline: 0;
    padding: 0 0.8rem;
    font: 400 0.8rem Roboto;
  }
  span {
    color: red;
    font: 400 0.8rem Roboto;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }
`
