import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import {
  Header as CommonHeader,
  Logo,
  AutoComplete,
  TextInput
} from 'components/common'
import HeaderClusters from './header_clusters'
import styles from 'constants/styles'
import { signOut, gamesFromSchedulers } from 'helpers/common'

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

const Left = ({
  gameFilter,
  schedulerFilter,
  schedulerGames,
  handleChange
}) => (
  <div {...Left.styles}>
    <Logo />
    <HeaderClusters />
    <AutoComplete
      id='gameFilter'
      options={schedulerGames}
      value={gameFilter}
      handleChange={handleChange}
      placeholder={'Filter by game'}
    />
    <TextInput
      id='schedulerFilter'
      placeholder='Search schedulers'
      value={schedulerFilter}
      handleChange={handleChange}
    />
  </div>
)

Left.styles = css({
  '& input': {
    fontSize: styles.fontSizes['4']
  },

  '> div + div': { marginLeft: '30px' }
})

class Header extends React.Component {
  render = () => (
    <div {...Header.styles}>
      {!this.props.cluster && <div className='overlay' />}
      <CommonHeader
        left={
          <Left
            gameFilter={this.props.gameFilter}
            schedulerFilter={this.props.schedulerFilter}
            schedulerGames={this.props.schedulersGames}
            handleChange={this.props.handleChange}
          />
        }
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
  cluster: state.clusters.current,
  schedulersGames: gamesFromSchedulers(state.schedulers.index.schedulers)
}))(Header)
