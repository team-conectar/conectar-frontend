import styled from 'styled-components'

export const BodyInput = styled.div`
  width: 100%;
  min-width: 10rem;
  margin: 0.3rem 0;
  padding-bottom: 0.8rem;
  position: relative;
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font: 400 1rem Raleway;
    a {
      justify-content: flex-end;
      text-decoration: none;
      color: var(--gray);
      font-size: 0.7rem;
    }
  }
  input {
    border: 0;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0.2rem;
    width: 100%;
    height: 2.4rem;
    margin: 0.2rem 0;
    outline: 0;
    padding: 0 0.8rem;
    font: 400 0.8rem Raleway;
  }
  span {
    color: red;
    font: 400 0.8rem Raleway;
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
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  :focus-within::after {
    width: calc(100% -3.2rem);
    height: 2px;
    content: '';
    background: var(--green-bg);
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 1rem;
  }
`
