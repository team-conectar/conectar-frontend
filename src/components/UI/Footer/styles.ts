import styled from 'styled-components'

export const BodyFooter = styled.div`
    footer {
        background: var(--textGreen);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        > h3 {
          color: white;
          font-size: 2rem;
          height: 4rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 2rem;
          img {
            width: 4rem;
            align-self: flex-start;
            :nth-of-type(1) {
              transform: scaleX(-1);
            }
          }
        }

        > section {
          height: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: 1rem 0;
          a {
            text-decoration: none;
            cursor: pointer;
            color: white;
            font-size: 1.2rem;
          }
          img {
            width: 20%;
          }
        }
        .redes {
          a + a {
            margin-left: 20%;
          }
          a {
            display: flex;
            align-items: center;
            span {
              color: white;
            }
            font: 700 1.6rem Raleway;
            svg {
              color: var(--green) !important;
            }
          }
        }
        p {
          color: gray;
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
      }

`
