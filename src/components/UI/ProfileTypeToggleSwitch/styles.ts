import styled from 'styled-components'
import Tooltip from '../Tooltip'
import { BodySwitch as ToggleSwitch } from '../ToggleSwitch/styles'
export const Error = styled(Tooltip)`
  svg {
    margin: 0;
    color: var(--red);
    cursor: pointer;
  }
  span {
    background: var(--red);
    color: white;
    &::before {
      border-color: var(--red) transparent;
    }
  }
`
export const BodySwitch = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    > legend {
      font: 400 0.9rem Raleway;
      height: 0.9rem;
      color: var(--orange);
      display: flex;
      align-items: center;
      gap: 1rem;
      svg {
        font-size: 1.2rem;
      }
    }
    > span {
      font: 400 0.8rem Raleway;
      color: var(--gray);
    }
  }
  > fieldset {
    background: white;
    margin-top: 0.4rem;
    width: max(30%, 150px);
    legend {
      border-radius: 0.3rem 0.3rem 0 0;
      width: 100%;
      background: var(--textGreen);
      padding: 0.2rem;
      color: white;
      text-align: center;
      margin-bottom: 0;
    }
    > aside {
      border-radius: 0 0 0.3rem 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      height: 200px;
      box-shadow: var(--boxShadow);
      border-top: 0;
      padding-bottom: 0.8rem;
      p {
        padding: 0.8rem;
        text-align: center;
      }
      .switch {
        box-shadow: none;
        background: linear-gradient(
          to left,
          var(--background) 50%,
          var(--textGreen) 50%
        );
        background-size: 200% 100%;
        background-position: right bottom;
      }
    }
  }
`
