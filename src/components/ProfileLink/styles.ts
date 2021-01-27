import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const BodyLink = styled(Link)`
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: center;
  gap: 0.6rem;
  > img {
    border-radius: 50%;
    border: solid 1px var(--borderDivision);
    width: 2.4rem;
    height: 2.4rem;
    object-fit: cover;
    object-position: center;
  }
  > aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > h2 {
      color: var(--green-bg);
      font-size: 1rem;
    }
    > p {
      text-align: center;
      color: var(--gray);
      font-size: 0.8rem;
    }
  }
`
