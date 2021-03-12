import styled, { css } from 'styled-components'
import { BodyCard as LinksCard } from '../../components/LinksCard/styles'
import { BodyCard as ProfileCard } from '../../components/ProfileCard/styles'
import { BodyCard as ProjectCard } from '../../components/ProjectCard/styles'
import { BodyCard as SuccessfulCreatorsCard } from '../../components/SuccessfulCreatorsCard/styles'

export const Page = styled.div`
  width: var(--container);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 55px);
  min-height: calc(100vh - 55px);
  gap: 2rem;
  padding: 1rem 0;
  > ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  > aside {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    img {
      width: 60%;
    }
    h2 {
      font-size: 2rem;
    }
  }
  ${ProjectCard} {
    width: calc(50% - 0.5rem);
  }
`
