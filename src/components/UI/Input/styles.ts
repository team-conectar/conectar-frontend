import styled from 'styled-components'

export const BodyInput = styled.div`
  width: 100%;
  input {
    border: 0;
    background: transparent;
    outline: 0;
    height: 100%;
    flex: 1;
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
`
