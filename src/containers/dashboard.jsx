import React from 'react'
import { connect } from 'react-redux'

class Dashboard extends React.Component {
  componentDidMount = async () => {
    const response = await fetch('http://localhost:5001/scheduler', {
      headers: {
        'Authorization': `Bearer ${this.props.session.token}`
      }
    })

    console.log(response)
    const json = await response.json()
    console.log(json)
  }

  render = () => {
    return <div>dashboard</div>
  }
}

export default connect(state => ({
  session: state.session
}))(Dashboard)
