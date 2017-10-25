import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { Header, Logo, AutoComplete, AddButton } from 'components/common'
import Schedulers from 'containers/schedulers'
import Settings from 'components/settings'
import { Small } from 'components/common/responsive'
import styles from 'constants/styles'
import { gamesFromSchedulers } from 'helpers/common'
import { navigate } from 'actions/common'

class SearchTextInput extends React.Component {
  componentDidMount = () => this.input.focus()

  render = () => (
    <input
      {...SearchTextInput.styles}
      id={this.props.id}
      ref={e => (this.input = e)}
      type='text'
      placeholder='Search schedulers'
      value={this.props.value}
      onChange={this.props.handleChange}
    />
  )
}

const newScheduler = event => {
  event.preventDefault()
  navigate('/schedulers/new')
}

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    const activeTab = this.props.session.token ? 'Schedulers' : 'Settings'

    this.state = {
      activeTab,
      gameFilter: '',
      schedulerFilter: '',
      header: this.headerNormal
    }
  }

  switchTab = (event, tab) => {
    event && event.preventDefault()

    if (!this.props.session.token) return

    const { header } = this.state
    const nextHeader = tab === 'Settings' ? this.headerNormal : header

    this.setState({
      activeTab: tab,
      header: nextHeader
    })
  }

  switchToSchedulers = () => this.switchTab(null, 'Schedulers')

  toggleHeader = e => {
    e.preventDefault()
    if (!this.props.session.token) return
    const { header, activeTab } = this.state
    const { headerSearch, headerNormal } = this
    const nextHeader = header === headerSearch ? headerNormal : headerSearch
    const nextActiveTab = nextHeader === headerSearch ? 'Schedulers' : activeTab

    this.setState({
      schedulerFilter: '',
      header: nextHeader,
      activeTab: nextActiveTab
    })
  }

  headerNormal = () => ({
    left: <Logo />,
    title: this.props.cluster.name,
    right: (
      <i
        onClick={this.toggleHeader}
        className='fa fa-search'
        aria-hidden='true'
        {...headerRightStyles}
      />
    )
  })

  headerSearch = () => ({
    left: (
      <div>
        <i
          onClick={this.toggleHeader}
          className='fa fa-arrow-left'
          aria-hidden='true'
        />
        <SearchTextInput
          id='schedulerFilter'
          value={this.state.schedulerFilter}
          handleChange={this.handleChange}
        />
      </div>
    ),
    title: null,
    right: <i className='fa fa-search' aria-hidden='true' {...headerRightStyles} />
  })

  handleChange = e => this.setState({ [e.target.id]: e.target.value })

  componentWillReceiveProps = nextProps => {
    if (nextProps.cluster && this.props.cluster &&
      nextProps.cluster.name !== this.props.cluster.name) {
      this.setState({
        gameFilter: '',
        schedulerFilter: ''
      })
    }
  }

  render = () => {
    const { activeTab } = this.state
    const header = this.state.header()

    return (
      <Small>
        <div {...Dashboard.styles}>
          <Header
            left={header.left}
            title={header.title}
            right={header.right}
            tabs={['Settings', 'Schedulers']}
            switchTab={this.switchTab}
            activeTab={activeTab}
          />
          {activeTab === 'Schedulers' &&
            <div className='schedulers-wrapper'>
              <AutoComplete
                id='gameFilter'
                options={this.props.schedulersGames}
                value={this.state.gameFilter}
                handleChange={this.handleChange}
                placeholder={'Filter by game'}
              />
              {this.state.schedulerFilter !== '' &&
                <div className='results'>
                  Results for <span>{this.state.schedulerFilter}</span>
                </div>
              }
              <Schedulers
                schedulerFilter={this.state.schedulerFilter}
                gameFilter={this.state.gameFilter}
              />
              <AddButton handleClick={newScheduler} />
            </div>
          }
          {activeTab === 'Settings' &&
            <Settings switchToSchedulers={this.switchToSchedulers} />
          }
        </div>
      </Small>
    )
  }
}

SearchTextInput.styles = css({
  fontSize: styles.fontSizes['5'],
  border: 'none',

  '&::placeholder': {
    color: styles.colors.gray_50
  }
})

const headerRightStyles = css({
  color: styles.colors.gray_75,
  fontSize: styles.fontSizes['8']
})

Dashboard.styles = css({
  '> div:nth-of-type(2)': {
    display: 'flex',
    width: '100%'
  },

  paddingBottom: '88px',

  '> .schedulers-wrapper': {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',

    '> * + *': {
      marginTop: '16px'
    },

    '> .results': {
      fontSize: styles.fontSizes['3'],
      color: styles.colors.gray_75,

      '> span': {
        color: styles.colors.brandPrimary
      }
    }
  }
})

export default connect(state => ({
  cluster: (state.clusters.current && state.clusters[state.clusters.current]) ||
  {},
  schedulersGames: gamesFromSchedulers(
    state.schedulers.index[state.clusters.current] &&
    state.schedulers.index[state.clusters.current].schedulers
  ),
  session: state.session
}))(Dashboard)
