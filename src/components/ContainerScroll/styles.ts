import styled from 'styled-components'

export const DivScroll = styled.div`
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
