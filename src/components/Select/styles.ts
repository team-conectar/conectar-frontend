import styled from 'styled-components'

export const BodySelect = styled.div`
  width: 100%;
  .react-select-container {
    width: 100%;
    min-width: 10rem;
    position: relative;
    text-align: left;
    flex: 1;
    .react-select__control {
      cursor: pointer;
      background: transparent;
      border: none;
      box-shadow: none;
      font: 400 0.8rem Raleway;
      .react-select__value-container {
        padding: 0;

        .react-select__input {
        }
      }
      .react-select__indicators {
        svg {
          color: var(--green);
        }
      }
      .react-select__indicator-separator {
        display: none;
      }
    }
    .react-select__menu {
      .react-select__menu-list {
        .react-select__option {
          margin-left: 0;
        }
      }
    }
  }
`
