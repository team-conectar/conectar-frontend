import styled, { css } from 'styled-components'
import { BodyButton } from '../../components/Button/styles'
import { DivScroll } from '../../components/ContainerScroll/styles'
import { DivModalWindow } from '../../components/Modal/styles'

export const DivTags = styled.div`
  background: white;
  border-radius: 0.6rem;
  box-shadow: var(--boxShadow);
  padding: 0.6rem;
  legend {
    font: 600 1.2rem Raleway;
    
    margin: 0.4rem 0;
    padding-left: 0.4rem;
    img {
      align-self: flex-end;
      width: 1.2rem;
      cursor: pointer;
      margin: 0 0.5rem;
    }
  }
  aside {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-left: 0.4rem;
    > span {
      font-size: 0.8rem;
      word-break: normal;
      padding: 0.2rem;
      margin: 0.2rem;
      border-radius: 0.2rem;
      border: solid 1px var(--textGreen);
    }
    & + legend {
      margin-top: 0.8rem;
    }
  }
`

export const DivSobre = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  .objdes {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    > section {
      background: white;
      border-radius: 0.6rem;
      box-shadow: var(--boxShadow);
      > legend {
        font: 600 1.2rem Raleway;
        margin: 0.2rem 0;
        border-bottom: solid 1px var(--borderDivision);
        padding: 0.6rem 0.8rem 0.6rem 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .icon-objetivo {
          position: absolute;
          left: 0.5rem;
          cursor: initial;
        }
        img {
          cursor: pointer;
          width: 1.2rem;
          margin: 0 0.5rem;
        }
      }
      > p {
        padding: 0.6rem 3rem;
      }
    }
  }

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(3, auto);
    column-gap: var(--gap);
    > header {
      border-radius: 0.4rem;
      box-shadow: var(--boxShadow);
    }

    .objdes {
      grid-column: 1;
      grid-row: 1;
      aside {
        border-radius: 0.4rem;
      }
    }
  }
`
export const DivVagas = styled.div`
  width: 100%;
  display: flex;
  
  > section {
    width: 100%;
    > legend {
      display: none;
    }
    strong {
      font-weight: 600;
    }
    & + section {
      border-left: solid 1px var(--borderDivision);
      display: none;
    }
  }

  ${DivScroll} {
    width: 100%;
  }

  @media (min-width: 768px) {
    box-shadow: var(--boxShadow);
    border-radius: var(--borderRadius);
    background: white;
    > section {
      width: 50%;

      & + section {
        border-left: solid 1px var(--borderDivision);
        display: initial;
      }
      > legend {
        font: 600 1.2rem Raleway;
        border-bottom: solid 1px var(--borderDivision);
        padding: 0.6rem 0.8rem;
        display: flex;
        align-items: center;
        position: relative;
        height: 3rem;
        img {
          width: 1.2rem;
          margin: 0 0.5rem;
          :nth-of-type(2) {
            position: absolute;
            right: 0.5rem;
            cursor: pointer;
          }
        }
      }
      ${DivScroll} {
        border-bottom: solid 1px var(--borderDivision);
        padding-bottom: 1rem;
        overflow-y: auto;
        height: calc(100% - 2rem);
        min-height: 500px;
        li {
          border-radius: 0;
          border-bottom: solid 1px var(--borderDivision);
          box-shadow: none;
          margin: 0;
          padding: 0.6rem 2rem;
          cursor: pointer;
          transition: 0.2s;
        }
      }
      > aside {
        font-size: 0.8rem;
        padding: 1.4rem 3rem;
        display: flex;
        flex-direction: column;
        gap: 1.4rem;
        > p {
          line-height: 1.2rem;
        }
        ${DivTags} {
          box-shadow: none;
          padding: 0;
          legend {
            font-size: 0.8rem;
            img {
              display: none;
            }
          }
        }
      }
    }
  }
`

export const BodyProjects = styled.div`
  --gap: 1.2rem;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
  ${DivSobre},${DivVagas},header {
    width: var(--container);
  }
  ${DivModalWindow} {
    form {
      width: 100%;
    }
  }
  > header {
    background: white;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    > img {
      width: 100%;
    }
    > span {
      position: absolute;
      right: 15px;
      top: 15px;
      > img {
        width: 1rem;
        cursor: pointer;
      }
    }

    > div {
      border-bottom: solid 1px var(--borderDivision);
      padding-top: 1rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      h1 {
        font-size: 2rem;
        
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      > aside {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
      > section {
        width: var(--container);
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${BodyButton} {
          border-color: var(--yellow);
          color: var(--yellow);
        }
        a {
          font-size: 0.6rem;
          color: var(--gray);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          span {
            display: flex;
            align-items: center;
            gap: 0.2rem;
            img {
              width: 0.6rem;
              filter: grayscale(100%);
            }
          }
        }
      }
    }
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 0.8fr 2.2fr;
      grid-template-rows: auto;
      column-gap: 1rem;
      box-shadow: var(--boxShadow);
      border-radius: 0.4rem;
      width: var(--container);
      margin-top: 1rem;

      > img {
        --marginLeft: 1.2rem;
        grid-column: 1;
        border-radius: 0.4rem;
        margin-left: var(--marginLeft);
        width: calc(100% - var(--marginLeft));
      }

      > div {
        border: 0;
        width: auto;
        grid-column: 2;
        gap: 1rem;
        > section {
          padding: 0 3rem 0 2rem;
          width: 100%;
          & + section {
            margin-top: 2.8rem;
          }
        }
      }
    }
  }
`
