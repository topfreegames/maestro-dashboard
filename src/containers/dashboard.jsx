import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import Header from 'components/common/header'

class Dashboard extends React.Component {
  componentDidMount = async () => {
    const response = await fetch(`${process.env.MAESTRO_URL}/scheduler`, {
      headers: {
        'Authorization': `Bearer ${this.props.session.token}`
      }
    })

    console.log(response)
    const json = await response.json()
    console.log(json)
  }

  render = () => {
    return (
      <div {...Dashboard.styles}>
        <Header />
        <div>
          <div>Search</div>
          <div>Scheduler #1</div>
          <div>Scheduler #2</div>
        </div>
      </div>
    )
  }
}

Dashboard.styles = css({
  '> div:nth-of-type(2)': {
    display: 'flex',
    width: '100%'
  }
})

export default connect(state => ({
  session: state.session
}))(Dashboard)
