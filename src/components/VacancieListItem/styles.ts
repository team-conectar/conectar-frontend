import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
export interface IPropsLiVancancyStyles extends HTMLAttributes<HTMLLIElement> {
  clicked?: boolean
}
export const VacancyLi = styled.li<IPropsLiVancancyStyles>`
  box-shadow: var(--boxShadow);
  border-radius: var(--borderRadius);

  border: 0;
  padding: 0.6rem 1rem;
  display: grid;
  grid-template-columns: 2rem 1fr 2rem;
  align-items: center;
  gap: 1rem;
  margin: var(--gap) 0.4rem;
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

  > aside {
    position: relative;
    display: flex;
    justify-content: space-around;
    gap: 2rem;
    margin-right: 2rem;
    transition: 0.5s;
    opacity: 0;
    visibility: visible;
  }
  ${({ clicked }) =>
    clicked
      ? css`
          background: var(--backgroundElevation);
          > aside {
            opacity: 1;
          }
        `
      : css`
          background: white;
        `}
  &:hover > aside {
    opacity: 1;
  }
`
