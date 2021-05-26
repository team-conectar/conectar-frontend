import styled, { css } from 'styled-components'


export const ButtonFavorite = styled.button<{ checked: boolean }>`
  >svg {
    height: 1.2rem;
    width: 1.2rem;
    margin-right: 8px;
  }
  font-weight: 600;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  border: 0;
  align-self: flex-end;
  border-top: 1px solid var(--borderDivision);
  background: transparent;
  color: var(--textGreen);
  
  ${props =>
    props.checked &&
    css`
      color: var(--yellow);
    `}
`

export const ButtonInterest = styled.button<{ checked: boolean }>`
  >svg {
      height: 1.2rem;
      width: 1.2rem;
      margin-right: 8px;
    }
  font-weight: 600;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 16px 8px;
  align-self: flex-end;
  border-left: 1px solid var(--borderDivision);
  border-top: 1px solid var(--borderDivision);
  background: transparent;
  color: var(--textGreen);
    
    ${props =>
      props.checked &&
      css`
        color: var(--red);
      `}
`

export const UserInfo = styled.main`
  display: flex;

  > a {
    display: flex;
    align-items: center;
    gap: 0.4rem;

    > h2 {
      font-size: 1rem;
    }
    > p {
      text-align: center;
      color: var(--gray);
      font-size: 0.8rem;
    }
  }
`
export const ProjectInfo = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--gap);
  padding: var(--gap);
  text-align: center;
  > aside {
    display: flex;
    width: 100%;
    padding-bottom: var(--gap);
    > a {
      display: flex;
      width: 50%;
      align-items: center;
      img {
        
        width: 100%;
        height: 180px;
        object-fit: cover;
        object-position: center;
        border-radius: var(--borderRadius);
      }
    }
    > section {
      width: 50%;
      display: flex;
      flex-direction: column;
      gap: var(--gap);
      justify-content: center;
      align-items: center;
      > a {
        font: 600 1.5rem Raleway;

        :first-letter {
          text-transform: uppercase;
        }
      }
      > ul {
        display: flex;
        flex-flow: row wrap;
        gap: 0.4rem;
        padding: 0.4rem 0;
        width: 100%;
        padding-left: var(--gap);
        li {
          list-style: none;
          border: solid 1px var(--textGreen);
          border-radius: 0.2rem;
          padding: 0.2rem 0.4rem;
          font-size: 0.8rem;
        }
      }
    }
  }
  p {
    font-size: 0.8rem;
    line-height: 1.2rem;
  }
`
export const BodyCard = styled.li`
  width: 100%;
  list-style: none;
  --gap: 1rem;
  display: grid;
  grid-template-columns: 2.4rem auto;
  grid-template-rows: 1.2rem auto;
  gap: 0.6rem;
  > a {
    grid-column: 1;
    grid-row: 1 / -1;
    img {
      width: 100%;
    }
  }
  ${UserInfo} {
    > aside {
      grid-column: 2;
      grid-row: 1;
    }
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    grid-row-end: -1;
    border-radius: var(--borderRadius);
    box-shadow: 0 0 1px 1px var(--borderDivision);
    background: white;
    height: 100%;
    
    > p {
      padding: 16px 0 24px 0;
      width: 95%;
      align-self: center;
      text-align: center;
      font-size: 0.8rem;
      line-height: 1.2rem;
      border-top: 1px solid var(--borderDivision);
    }
    > aside {
      display: flex;
      width: 100%;
      align-self: flex-end;
    }
  }
  ${UserInfo} ~ div {
    grid-column: 2;
    grid-row: 2;
  }
  > aside {
    width: 100%;
    display: flex;
  }
`
