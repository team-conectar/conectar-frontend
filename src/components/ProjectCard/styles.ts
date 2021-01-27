import styled from 'styled-components'
export const UserInfo = styled.main`
  display: flex;

  > aside {
    display: flex;
    align-items: center;
    gap: 0.6rem;
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
export const ProjectInfo = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: var(--gap);

  > aside {
    display: flex;
    width: 100%;
    border-bottom: 1px solid var(--borderDivision);
    padding: 0 0.6rem var(--gap);
    img {
      width: 50%;
      height: 180px;
      object-fit: cover;
      object-position: center;
      border-radius: var(--borderRadius);
    }
    > section {
      color: var(--green-bg);
      width: 50%;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      justify-content: center;
      align-items: center;
      ul {
        li {
        }
      }
    }
  }
  p {
    color: var(--green-bg);
    font-size: 0.8rem;
    line-height: 1.2rem;
  }
`
export const BodyCard = styled.li`
  list-style: none;
  --gap: 1rem;
  display: grid;
  grid-template-columns: 2.4rem auto;
  grid-template-rows: 1.2rem auto;
  gap: 0.6rem;
  > img {
    width: 100%;
    grid-column: 1;
    grid-row: 1 / -1;
  }
  ${UserInfo} {
    > aside {
      grid-column: 2;
      grid-row: 1;
    }
  }
  > div {
    grid-column: 2;
    grid-row: 2;
    border-radius: var(--borderRadius);
    box-shadow: 0 0 1px 1px var(--borderDivision);
    background: white;

    > aside {
      display: flex;
      width: 100%;
      > button {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.4rem 0;
        border: 0;
        align-self: flex-end;
        border-top: 1px solid var(--borderDivision);
        & + button {
          border-left: 1px solid var(--borderDivision);
        }
        background: transparent;
      }
    }
  }
  > aside {
    width: 100%;
    display: flex;
  }
`
