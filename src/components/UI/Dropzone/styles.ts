import styled from 'styled-components'

export const BodyDropzone = styled.div`
  position: relative;
  padding: 0.5rem 0;
  > main {
    background: white;
    margin: 0.4rem 0;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0.8rem;
    outline: 0;
    label {
      margin-top: 1.6rem;
      padding: 0.6em;
      cursor: pointer;
      border-radius: 0.4rem;
      background: var(--textGreen);
      color: white;
      font: 500 1rem Raleway;
    }
    input {
      display: none;
    }
    p {
      margin-top: 0.8rem;
      color: gray;
      font-size: 0.8rem;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  span {
    color: red;
    font: 400 0.8rem Raleway;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`
