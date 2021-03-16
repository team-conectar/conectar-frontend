import styled, { css } from 'styled-components'
import { BodyCard as LinksCard } from '../../components/LinksCard/styles'
import { BodyCard as ProfileCard } from '../../components/ProfileCard/styles'
import { BodyCard as ProjectCard } from '../../components/ProjectCard/styles'
import { BodyCard as SuccessfulCreatorsCard } from '../../components/SuccessfulCreatorsCard/styles'
interface ITagProps {
  isSelected: boolean
}
export const Tag = styled.span<ITagProps>`
  font-size: 0.8rem;
  word-break: normal;
  padding: 0.2rem;
  margin: 0.2rem;
  border-radius: 0.2rem;
  border: solid 1px var(--textGreen);
  width: fit-content;
  cursor: pointer;
  ${props =>
    props.isSelected &&
    css`
      background: var(--textGreen);
      color: white;
      font-weight: 600;
    `}
`
export const Page = styled.div`
  width: var(--container);
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 55px);
  gap: 1rem;
  padding: 1rem 0;
  > p {
    color: var(--gray);
    font-size: 0.8rem;
  }
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
  @media (min-width: 1024px) {
    ${ProjectCard} {
      width: calc(50% - 0.5rem);
    }
    ${ProfileCard} {
      width: calc(100% / 3 - 0.7rem);
    }
  }
`
