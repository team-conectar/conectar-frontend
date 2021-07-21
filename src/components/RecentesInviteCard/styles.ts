import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const ProjectLink = styled(Link)`
  width: 90%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: flex-start;
  gap: 0.6rem;
  margin: 0.4rem;
  margin-left: 2rem;
  > img {
    width: 2rem;
  }
  > aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    > h2 {
      font-size: 1rem;
      word-break: keep-all;
    }
    > a {
      text-align: center;
      color: var(--textGreen);
      font-size: 0.8rem;
      text-decoration: underline;
    }
  }
`
export const BodyCard = styled.div`
  border-radius: var(--borderRadius);
  background: white;
  padding-top: 0.8rem;
  width: 100%;
  height: fit-content;
  box-shadow: var(--boxShadow);
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: space-evenly;
  > h2 {
    font-size: 1rem;
    padding-right: 2rem;
    word-break: keep-all;
    align-self: flex-start;
    margin-left: 1rem;
  }
  > button {
    width: 100%;
    border: 0;
    background: white;
    align-self: flex-end;
    padding: 0.6rem 0.8rem;
    border-top: solid 1px var(--borderDivision);
    font-weight: 700;
    border-radius: 0 0 0.8rem 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    img {
      width: 1.8rem;
    }
  }
`
