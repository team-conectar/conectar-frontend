import styled from 'styled-components'

export const BodyTextarea = styled.div`
  width: 100%;
  min-width: 10rem;
  margin: 0.4rem 0;
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
      color: gray;
      font-size: 0.7rem;
    }
  }
  textarea {
    border: 0;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0.2rem;
    width: 100%;
    min-height: 10rem;
    margin-top: 0.2rem;
    padding: 0.4rem 0.8rem;
    font: 1.6rem;
    outline: 0;
    resize: none;
  }
  span {
    color: red;
    font: 400 0.8rem Raleway;
    position: absolute;
    left: 0;
    bottom: 0;
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
