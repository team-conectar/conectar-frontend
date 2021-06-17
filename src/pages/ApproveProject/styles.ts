import styled from 'styled-components'
import { BodyCard as LinksCard } from '../../components/LinksCard/styles'
import { BodyCard as ProfileCard } from '../../components/ProfileLink/styles'
import { BodyCard as SuccessfulCreatorsCard } from '../../components/SuccessfulCreatorsCard/styles'
import { BodyCard as SuccessfulProjectsCard } from '../../components/SuccessfulProjectsCard/styles'

export const BodyApproveProject = styled.div`
  width: var(--container);
  padding: 1rem 0;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  grid-template-rows: max-content auto;
  grid-column-gap: 0.6rem;
  position: relative;

  > ${ProfileCard} {
    grid-column: 1;
  }
  > section {
    grid-column: 3;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    position: sticky;
    top: calc(2rem + 45px);
  }
  > main {
    grid-column: 2;
    grid-row: 1 / -1;
    padding: 1.2rem 0;
    border-radius: var(--borderRadius);
    background: white;
    box-shadow: var(--boxShadow);
    height: fit-content;
    > figure {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 2rem;
      > figcaption {
        text-align: center;
        font: 600 1.8rem Raleway;
      }
    }
    > section {
      padding: 1.2rem;
      display: flex;
      flex-direction: column;
      > ul {
        padding-bottom: 1.2rem;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: space-around;
        gap: 0.5rem;
      }
      & + section {
        border-top: solid 1px var(--borderDivision);
      }
    }
    > aside {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
    }
  }
`
