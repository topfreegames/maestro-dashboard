import React from 'react'
import Small from './edit/small'
import Large from './edit/large'

const SchedulersEdit = props => (
  <div>
    <Small {...props} />
    <Large {...props} />
  </div>
)

export default SchedulersEdit
