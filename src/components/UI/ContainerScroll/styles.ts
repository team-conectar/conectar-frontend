import styled from 'styled-components'

export const DivScroll = styled.div`
  width: 100%;
  height: 100%;
  .thumb-horizontal,
  .thumb-vertical {
    background: var(--gray);
    border-radius: 0.8rem;
    cursor: pointer;
    opacity: 0.6;
    :hover {
      opacity: 0.8;
    }
  }
  > div {
    height: 100%;
  }
`
