import React from 'react'
import { css } from 'glamor'
import Spinner from './spinner'

const Loading = props => (
  <div {...Loading.styles(props.position)}>
    <Spinner {...props} />
  </div>
)

Loading.styles = position => css({
  position: position || 'absolute',
  background: 'rgba(0, 0, 0, 0.25)',
  width: '100%',
  height: '100%',
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export default Loading
