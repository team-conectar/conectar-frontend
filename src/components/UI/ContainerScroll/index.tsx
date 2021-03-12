import React from 'react'
import { DivScroll } from './styles'
import { Scrollbars } from 'react-custom-scrollbars'

const ContainerScroll: React.FC = ({ children }) => {
  return (
    <DivScroll>
      <Scrollbars
        className="scrollbar"
        autoHide
        renderThumbHorizontal={props => (
          <div {...props} className="thumb-horizontal" />
        )}
        renderThumbVertical={props => (
          <div {...props} className="thumb-vertical" />
        )}
      >
        {children}
      </Scrollbars>
    </DivScroll>
  )
}

export default ContainerScroll
