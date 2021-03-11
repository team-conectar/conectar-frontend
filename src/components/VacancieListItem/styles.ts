import styled, { css } from 'styled-components'
import Dropdown from '../UI/Dropdown'
import {
  BodyButton as DropdownStyle,
  DropdownContent,
} from '../UI/Dropdown/styles'

export const DropdownList = styled(Dropdown)`
  position: absolute;
  right: 0;

  li {
    list-style: none;
    width: 100%;
    cursor: pointer;
    :hover {
      background: var(--borderDivision);
    }
  }
`
export const VacancieLi = styled.li`
  box-shadow: var(--boxShadow);
  border-radius: var(--borderRadius);
  background: white;
  border: 0;
  padding: 0.6rem 1rem;
  display: grid;
  grid-template-columns: 2rem 1fr 2rem;
  align-items: center;
  gap: 1rem;
  margin: var(--gap) 0;
  > p {
    line-height: 1.6rem;
    font-size: 0.8rem;
  }
  > img {
    width: 2rem;
    :nth-of-type(2) {
      cursor: pointer;
    }
  }
  ${DropdownStyle} {
    svg {
      font-size: 1.4rem;
    }
    ${DropdownContent} {
      > li {
        text-align: start;
        list-style: none;
        width: 10rem;
        padding: 0.6rem;
        cursor: pointer;
        transition: 0.5s;
        font: 500 0.8rem Raleway;
        & + li {
          border-top: solid 1px var(--borderDivision);
        }
        :hover {
          background: var(--borderDivision);
        }
      }
    }
  }
`
