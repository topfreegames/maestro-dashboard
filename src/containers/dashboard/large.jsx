import React from 'react'
import { css } from 'glamor'
import { Large } from 'components/common/responsive'
import { AddButton } from 'components/common'
import Header from './large/header'
import Schedulers from 'containers/schedulers'

class Dashboard extends React.Component {
  render = () => (
    <Large>
      <Header />
      <Schedulers filter='' />
      <AddButton />
    </Large>
  )
}

export default Dashboard
