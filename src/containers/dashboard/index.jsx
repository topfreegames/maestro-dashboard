import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import Header from 'components/common/header'
import Schedulers from 'containers/schedulers'
import Settings from 'components/settings'
import styles from 'constants/styles'

class SearchTextInput extends React.Component {
  componentDidMount = () => this.input.focus()

  render = () => (
    <input
      {...SearchTextInput.styles}
      ref={e => (this.input = e)}
      type='text'
      placeholder='Search schedulers'
      value={this.props.value}
      onChange={this.props.handleChange}
    />
  )
}

class Dashboard extends React.Component {
  constructor (props) {
    super(props)

    const activeTab = this.props.session.token ? 'Schedulers' : 'Settings'

    this.state = {
      activeTab,
      schedulerFilter: '',
      header: this.headerNormal
    }
  }

  switchTab = (event, tab) => {
    event && event.preventDefault()

    if (!this.props.session.token) return

    this.setState({
      ...this.state,
      activeTab: tab
    })
  }

  switchToSchedulers = () => this.switchTab(null, 'Schedulers')

  headerNormal = () => ({
    left: <div {...headerLeftStyles}>M</div>,
    title: this.props.cluster.name,
    right: (
      <i
        onClick={() => this.setState({ ...this.state, header: this.headerSearch })}
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
          onClick={() => this.setState({
            ...this.state,
            schedulerFilter: '',
            header: this.headerNormal
          })}
          className='fa fa-arrow-left'
          aria-hidden='true'
        />
        <SearchTextInput
          value={this.state.schedulerFilter}
          handleChange={this.handleChangeSchedulerFilter}
        />
      </div>
    ),
    title: null,
    right: <i className='fa fa-search' aria-hidden='true' {...headerRightStyles} />
  })

  handleChangeSchedulerFilter = event => {
    event.preventDefault()

    this.setState({
      ...this.state,
      schedulerFilter: event.target.value
    })
  }

  render = () => {
    const { activeTab } = this.state
    const header = this.state.header()

    return (
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
          <Schedulers filter={this.state.schedulerFilter} />}
        {activeTab === 'Settings' &&
          <Settings switchToSchedulers={this.switchToSchedulers} />}
      </div>
    )
  }
}

SearchTextInput.styles = css({
  fontSize: styles.fontSizes['4'],

  '&::placeholder': {
    color: styles.colors.gray_50
  }
})

const headerLeftStyles = css({
  color: styles.colors.brandPrimary,
  fontWeight: 700,
  fontSize: styles.fontSizes['7']
})

const headerRightStyles = css({
  color: styles.colors.gray_75,
  fontSize: styles.fontSizes['7']
})

Dashboard.styles = css({
  '> div:nth-of-type(2)': {
    display: 'flex',
    width: '100%'
  },

  paddingBottom: '88px'
})

export default connect(state => ({
  cluster: (state.clusters.current && state.clusters[state.clusters.current]) ||
  {},
  session: state.session
}))(Dashboard)
