import React from 'react'
import { connect } from 'react-redux'
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
    <div {...Header.styles}>
      {!this.props.cluster && <div className='overlay' />}
      <CommonHeader
        left={<Left />}
        right={<Right />}
      />
    </div>
  )
}

Header.styles = css({
  '> .overlay': {
    position: 'absolute',
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
})

export default connect(state => ({
  cluster: state.clusters.current
}))(Header)
