import React from 'react'
import { DivScroll } from './styles'
import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars'

const ContainerScroll: React.FC<ScrollbarProps> = ({ children, ...rest }) => {
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
        renderView={props => <div {...props} className="view" />}
        {...rest}
      >
        {children}
      </Scrollbars>
    </DivScroll>
  )
}

export default ContainerScroll
