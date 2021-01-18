import styled from 'styled-components'

export const BodyCard = styled.div`
  border-radius: var(--borderRadius);
  background: var(--green-bg);
  padding: 2rem 0.6rem 2.4rem 0.6rem;
  width: 100%;
  height: fit-content;
  border: solid 1px var(--borderDivision);
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  align-items: center;
  justify-content: space-evenly;
  > h3 {
    color: white;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    text-align: center;
    margin-bottom: 0.8rem;
    img {
      width: 2rem;
      align-self: flex-start;
      :nth-of-type(1) {
        transform: scaleX(-1);
      }
    }
  }
  a {
    display: flex;
    text-decoration: none;
    align-items: center;
    color: var(--green);
    span {
      color: white;
    }
    font: 700 1.2rem Raleway;
  }
`
