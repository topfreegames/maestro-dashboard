import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import {
  Header as CommonHeader,
  Logo,
  AutoComplete,
  TextInput
} from 'components/common'
import Timeframes from 'components/schedulers/graph/timeframes'
import HeaderClusters from './header_clusters'
import styles from 'constants/styles'
import { gamesFromSchedulers, getSchedulersFromState } from 'helpers/common'
import { navigate } from 'actions/common'

const Left = ({
  globalMode,
  gameFilter,
  schedulerFilter,
  schedulerGames,
  handleChange
}) => (
  <div {...Left.styles}>
    <Logo />
    {!globalMode && <HeaderClusters />}
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

const Right = ({
  changeTimeframe,
  activeTimeframe,
  toggleTvMode,
  toggleGlobalMode,
  toggleAscSortMode,
  globalMode,
  tvMode,
  ascSortMode
}) => (
  <div
    {...Right.styles}
    {...Right.stylesWithTvMode({ isActive: tvMode })}
    {...Right.stylesWithGlobalMode({ isActive: globalMode })}
    {...Right.stylesWithAscSortMode({ isActive: ascSortMode })}
  >
    {tvMode &&
      <Timeframes
        changeTimeframe={changeTimeframe}
        activeTimeframe={activeTimeframe}
      />
    }
    <button onClick={toggleAscSortMode} className='asc-sort-mode-button'>
      <i className='fa fa-sort-alpha-asc' />
    </button>
    <button onClick={toggleGlobalMode} className='global-mode-button'>
      <i className='fa fa-globe' />
    </button>
    <button onClick={toggleTvMode} className='tv-mode-button'>
      <i className='fa fa-television' />
    </button>
    <button onClick={() => navigate('/sign_out')}>
      <i className='fa fa-sign-out' />
    </button>
  </div>
)

Right.stylesWithMode = ({ isActive, className }) =>
  isActive ? css({
    [`> .${className}`]: {
      borderRadius: '6px',
      padding: '5px 10px',
      background: styles.colors.gray_75,
      transform: 'scale(1.2)',
      transition: 'all 100ms ease-in',

      '> i': { color: styles.colors.background }
    }
  }) : {}

Right.stylesWithTvMode = ({ isActive } = { isActive: false }) =>
  Right.stylesWithMode({ isActive, className: 'tv-mode-button' })

Right.stylesWithGlobalMode = ({ isActive } = { isActive: false }) =>
  Right.stylesWithMode({ isActive, className: 'global-mode-button' })

Right.stylesWithAscSortMode = ({ isActive } = { isActive: false }) =>
  Right.stylesWithMode({ isActive, className: 'asc-sort-mode-button' })

Right.styles = css({
  '> .tv-mode-button, > .global-mode-button, > .asc-sort-mode-button': {
    padding: '5px 10px 5px 12px',
    transition: 'all 100ms ease-in'
  },

  '> ul': {
    marginRight: '10px'
  },

  '> button + button': {
    marginLeft: '20px'
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
        left={
          <Left
            globalMode={this.props.globalMode}
            gameFilter={this.props.gameFilter}
            schedulerFilter={this.props.schedulerFilter}
            schedulerGames={this.props.schedulersGames}
            handleChange={this.props.handleChange}
          />
        }
        right={
          <Right
            activeTimeframe={this.props.activeTimeframe}
            changeTimeframe={this.props.changeTimeframe}
            tvMode={this.props.tvMode}
            globalMode={this.props.globalMode}
            ascSortMode={this.props.ascSortMode}
            toggleTvMode={this.props.toggleTvMode}
            toggleGlobalMode={this.props.toggleGlobalMode}
            toggleAscSortMode={this.props.toggleAscSortMode}
          />
        }
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

export default connect((state, ownProps) => ({
  cluster: state.clusters.current,
  schedulersGames: gamesFromSchedulers(
    getSchedulersFromState(state, ownProps)
  )
}))(Header)
