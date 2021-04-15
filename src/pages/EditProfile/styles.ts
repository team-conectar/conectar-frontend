import styled, { css } from 'styled-components'
import { BodyField } from '../../components/UI/FieldText/styles'
import background from '../../assets/image/background.svg'
import { BodySwitch } from '../../components/UI/ProfileTypeToggleSwitch/styles'
export const ButtonList = styled.button<{ isSelected: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0;
  border: 0;
  & + button {
    border-top: solid 1px var(--borderDivision);
  }
  background: transparent;
  position: relative;
  color: var(--textGreen);
  ${props =>
    props.isSelected &&
    css`
      :after {
        width: 3px;
        height: calc(100% - 1rem);
        content: '';
        background: var(--textGreen);
        position: absolute;
        right: 3px;
        bottom: 0.5rem;
        top: 0.5rem;
      }
    `}
`

export const Page = styled.div`
  width: 100%;
  height: 100%;
  min-height: 110vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  --PerfilWidth: 432px;
  background-color: #d9d9d9;
  background-image: url(${background});
  background-position: center;
  background-attachment: fixed;
  background-size: 50%;
  background-repeat: repeat-x;
  > main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 2rem;
    width: 100%;
    position: relative;
  }
  @media (min-width: 1024px) {
    > main {
      width: var(--container);
      display: grid;
      grid-template-columns: 0.2fr 0.8fr;
      grid-template-rows: auto auto;
      column-gap: 1rem;
      row-gap: 2rem;
      > header {
        grid-column: 1 / -1;
        grid-row: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--backgroundElevation);
        border-radius: 0.8rem;
        padding: 2rem 0;
      }
      > aside {
        grid-column: 1;
        grid-row: 2;
        background: var(--backgroundElevation);
        border-radius: 0.8rem;
        height: min-content;
        flex-direction: column;
        //box-shadow: var(--boxShadow);
      }
      > div {
        grid-column: 2;
        grid-row: 2;
        form {
          background: var(--background);
          border-radius: 0.8rem;
          padding: 1rem 2rem;
          &.Info-perfil {
            display: grid;
            grid-template-columns: 0.6fr 0.4fr;
            grid-template-rows: auto auto auto;
            gap: 1rem;
            ${BodyField} {
              grid-column: 1;
              grid-row: 1;
              &:nth-of-type(2) {
                grid-row: 2;
              }
            }
            ${BodySwitch} {
              grid-column: 1 / -1;
              grid-row: 3;
            }
            > section {
              grid-row: 4;
              grid-column: 1 / -1;
            }
          }
          > aside {
            grid-column: 2;
          }
          > section {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }
`
