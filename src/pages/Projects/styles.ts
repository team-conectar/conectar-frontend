import styled from 'styled-components'

export const BodyProjects = styled.div`
  width: 100%;
  height: max(100vh, 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    height: 100vh;
    //background:var(--green-bg);
  }
  .modal {
    background: white;
    width: 100%;
    height: 100%;
    padding: 3rem 1.8rem 1.2rem 1.8rem;
    opacity: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    z-index: 2;
    > h1 {
      font: 500 2rem Roboto;
      margin-bottom: 4rem;
      color: white;
    }
    footer {
      display: flex;
      justify-content: space-between;
      width: 80%;
    }
    button {
      position: fixed;
      bottom: 20px;
      right: 20px;
    }
    @media (min-width: 768px) {
      justify-content: center;
      width: max(710px, 50vw);
      border-radius: 0.8rem;
      height: auto;
      overflow-y: none;
      opacity: none;
      position: relative;
      z-index: 102;
      button {
        position: relative;
        margin: 2.8rem 1.8rem 0 0;
        align-self: flex-end;
      }
    }
  }
  > header {
    background: white;
    position: relative;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .area-img {
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        width: 100%;
      }
      > section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        z-index: 1;
        padding: 0.6rem;
        top: 0;
        width: min(1100px, 90vw);
        img {
          width: 1.2rem;
        }
      }
    }
    > aside {
      border-bottom: solid 1px;
      padding: 0.5rem 0.3rem;
      width: min(1100px, 90vw);

      h1 {
        color: var(--green-bg);
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: var(--green-bg);
        img {
          width: 1.1rem;
          cursor: pointer;
          margin: 0 0.2rem;
        }
        margin: 0.2rem 0;
      }

      button {
        margin: 0.3rem;
      }
      button + button {
        margin: 0 0.8rem;
      }
      .icons {
        margin: 1rem 0.5rem;
        font: 400 0.8rem Roboto;
        img {
          width: 1rem;
          margin: 0 0.4rem;
        }
      }
      > p {
        font: 400 0.8rem Roboto;
        margin: 1rem 0.5rem;
      }
      > section {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 2.2fr;
      grid-template-rows: auto;
      column-gap: 1rem;
      border: solid 1px;
      border-radius: 0.4rem;
      width: min(1100px, 90vw);
      margin-top: 1rem;
      .area-img {
        position: relative;
        grid-column: 1;
        border: solid 1px;
        border-radius: 0.4rem;
        max-width: 300px;
        margin: 0 0.8rem;
        padding: 0;
        > img {
          border-radius: 0.4rem;
        }
        > section {
          position: absolute;
          z-index: 1;
          right: 10px;
          top: 10px;
          padding: 0;
          width: auto;
          a {
            display: none;
          }
          img {
            cursor: pointer;
          }
        }
      }
      > aside {
        border: 0;
        width: auto;
        grid-column: 2;
        padding: 0.6rem;
      }
    }
  }

  > main {
    .objdes {
      > aside {
        background: white;
        border-radius: 0.6rem;
        border: solid 1px;
        padding: 0.6rem;
        margin: 2rem 0;
        > section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: solid 1px;
          padding: 0.2rem 0;
          img {
            width: 1.1rem;
            cursor: pointer;
          }
          legend {
            font: 600 1rem Roboto;
            color: var(--green-bg);
          }
        }
        > p {
          padding: 0.2rem;
        }
      }
    }

    .caracteristicas {
      background: white;
      border-radius: 0.6rem;
      border: solid 1px;
      padding: 0.6rem;
      margin: 2rem 0;
      legend {
        font: 600 1rem Roboto;
        color: var(--green-bg);
        margin: 0.3rem 0;
        img {
          width: 1rem;
          cursor: pointer;
          margin: 0 0.5rem;
        }
      }
      aside {
        display: flex;
        flex-wrap: wrap;
        > span {
          word-break: normal;
          padding: 0.2rem;
          margin: 0.2rem;
          border-radius: 0.2rem;
          border: solid 1px;
        }
      }
    }
    aside {
      background: white;
      .vagas {
        > legend {
          font: 500 2rem Roboto;
          margin: 0.2rem 0;
          color: var(--green-bg);
          img {
            width: 1.2rem;
            cursor: pointer;
            margin: 0 0.5rem;
          }
        }
        > section {
          border-radius: 0.6rem;
          border: solid 1px;
          padding: 0.6rem 1rem;
          margin: 1.2rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          legend {
            font: 500 1.2rem Roboto;
            margin: 0.2rem 0;
          }
          img {
            width: 2rem;
            cursor: pointer;
          }
        }
      }
      .descricao {
        display: none;
      }
    }
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: repeat(3, auto);
      column-gap: 1.8rem;
      > header {
        border-radius: 0.4rem;
        border: solid 1px;
      }

      .objdes {
        grid-column: 1;
        grid-row: 1;
        aside {
          border-radius: 0.4rem;
        }
        p {
          margin-left: 1rem;
        }
      }
      .caracteristicas {
        grid-column: 2;
        grid-row: 1;
        border-radius: 0.4rem;
      }
      > aside {
        border: solid 1px;
        border-radius: 0.4rem;
        grid-column: 1 / -1;
        grid-row: 2;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
        .vagas {
          grid-column: 1;
          grid-row: 1;
          border-right: solid 1px;
          > legend {
            font-size: 1.6rem;
            margin: 0.8rem;
          }
          > section {
            border-radius: 0;
            border: 0;
            border-bottom: solid 1px;
            border-top: solid 1px;
            padding: 0.6rem 1rem;
            margin: 1.2rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            legend {
              font: 500 1.2rem Roboto;
              margin: 0.2rem 0;
            }
          }
        }
        .descricao {
          display: inline;
          grid-column: 2;
          grid-row: 1;
          padding: 0.8rem;
          > legend {
            font: 500 1.6rem Roboto;
            color: var(--green-bg);
          }
          > section {
            overflow-y: auto;
            > p {
              margin: 0.8rem 0;
            }
          }
        }
      }
    }
  }
`
