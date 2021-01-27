import styled, { css } from 'styled-components'
import { BodyCard as LinksCard } from '../../components/LinksCard/styles'
import { BodyCard as ProfileCard } from '../../components/ProfileCard/styles'
import { BodyCard as SuccessfulCreatorsCard } from '../../components/SuccessfulCreatorsCard/styles'

export const Page = styled.div`
  width: var(--container);
  padding: 1rem 0;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  grid-template-rows: max-content auto;
  align-items: flex-start;
  gap: 0.6rem;
  position: relative;

  > ${ProfileCard} {
    grid-column: 1;
  }
  > ${LinksCard} {
    grid-column: 3;
    grid-row: 1;
  }
  > ${SuccessfulCreatorsCard} {
    grid-column: 3;
    grid-row: 2;
  }
  > ul {
    grid-column: 2;
    grid-row: 1 / -1;
    padding: 1.2rem 0;
    border-radius: var(--borderRadius);
    background: white;
    box-shadow: var(--boxShadow);
    > li {
      list-style: none;
      border-bottom: solid 1px var(--borderDivision);
      padding: 1.2rem;
    }
  }
`
