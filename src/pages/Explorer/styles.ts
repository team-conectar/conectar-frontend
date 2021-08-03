import styled, { css } from 'styled-components'
import { BodyCard as LinksCard } from '../../components/LinksCard/styles'
import { BodyCard as ProfileCard } from '../../components/ProfileLink/styles'
import { BodyCard as SuccessfulCreatorsCard } from '../../components/SuccessfulCreatorsCard/styles'

export const Page = styled.div`
  width: var(--container);
  padding: 2rem 0;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  align-items: flex-start;
  gap: 1rem;
  position: relative;

  > ${ProfileCard} {
    grid-column: 1;
    position: sticky;
    top: calc(2rem + 45px);
  }
  > section {
    grid-column: 3;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: sticky;
    top: calc(2rem + 45px);
  }
  > nav {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: sticky;
    top: calc(2rem + 45px);
  }
  > ul {
    grid-column: 2;
    border-radius: var(--borderRadius);
    background: white;
    box-shadow: var(--boxShadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    > span {
      width: 80%;
      margin: 2rem 0;
    }
    > li {
      list-style: none;
      border-bottom: solid 1px var(--borderDivision);
      padding: 1.2rem;
    }
  }
`
