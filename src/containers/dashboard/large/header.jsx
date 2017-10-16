import React from 'react'
import { css } from 'glamor'
import { Header as CommonHeader, Logo } from 'components/common'
import HeaderClusters from './header_clusters'
import styles from 'constants/styles'
import { signOut } from 'helpers/common'

const Left = ({
  clusterName,
  handleClusterNameChange
}) => (
  <div {...Left.styles}>
    <Logo />
    <HeaderClusters />
  </div>
)

Left.styles = css({
  '& input': {
    fontSize: styles.fontSizes['4']
  },

  '> div + div': { marginLeft: '30px' }
})

const Right = ({
}) => (
  <div {...Right.styles}>
    <button>
      <i className='fa fa-television' />
    </button>
    <button onClick={signOut}>
      <i className='fa fa-sign-out' />
    </button>
  </div>
)

Right.styles = css({
  '> button + button': {
    marginLeft: '30px'
  },

  '& i': {
    color: styles.colors.gray_100,
    fontSize: styles.fontSizes['6']
  }
})

class Header extends React.Component {
  render = () => (
    <CommonHeader
      left={
        <Left />
      }
      right={
        <Right />
      }
    />
  )
}

export default Header
