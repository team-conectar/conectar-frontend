import styled from 'styled-components'

export const BodySwitch = styled.div`
  label {
    display: flex;
    flex-flow: row-reverse wrap;
    align-items: center;
    justify-content: center;
    margin: 0.6rem;
    label {
      margin-left: 0.8rem;
    }
    .switch {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 18px;
      background: linear-gradient(to left, white 50%, var(--textGreen) 50%);
      background-size: 200% 100%;
      background-position: right bottom;
      box-shadow: var(--boxShadow);
      transition: all 0.3s;
      border-radius: 20px;
      cursor: pointer;
      ::after {
        content: '';
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: var(--green);
        top: -2px;
        left: -1px;
        transition: all 0.3s;
      }
    }
    .checkbox:checked + .switch {
      background-position: left bottom;
      ::after {
        left: 25px;
        right: 0;
      }
    }
    .checkbox {
      display: none;
    }
  }
`
