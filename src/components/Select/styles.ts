import styled from 'styled-components'

export const BodySelect = styled.div`
  width: 100%;
  min-width: 10rem;
  margin: 0.3rem 0;
  padding-bottom: 1rem;
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
  .react-select-container {
    .react-select__control {
      border: 0;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      border-radius: 0.2rem;
      height: 2.4rem;
      margin: 0.2rem 0;
      outline: 0;

      .react-select__value-container {
        font: 400 0.85rem Raleway;
      }
      .react-select__indicators {
        svg {
          color: var(--green);
        }
      }
    }
    .react-select__menu {
      font: 400 0.85rem Raleway;
      .react-select__menu-list {
        .react-select__option {
          margin-left: 0;
        }
      }
    }
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
    bottom: 1.2rem;
  }
`
