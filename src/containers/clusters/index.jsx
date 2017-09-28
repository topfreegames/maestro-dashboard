import React from 'react'
import { connect } from 'react-redux'
import { selectCluster } from 'actions/clusters'

const clusters = [
  {
    name: 'North America',
    host: 'http://localhost:5001'
  },
  {
    name: 'South America',
    host: 'http://localhost:5001'
  },
  {
    name: 'Asia Pacific',
    host: 'http://localhost:5001'
  }
]

class ClustersIndex extends React.Component {
  renderCluster = ({ name, host }) => (
    <button
      key={name}
      onClick={e => this.handleClick(e, { name, host })}
    >
      {name}
    </button>
  )

  handleClick = (event, cluster) => {
    event.preventDefault()
    if (cluster.name === this.props.cluster.name) {
      window.location = 'dashboard'
    } else {
      this.props.dispatch(selectCluster(cluster))
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.cluster.name !== nextProps.cluster.name) {
      window.location = 'dashboard'
    }
  }

  render = () => (
    <div>
      {clusters.map(c => this.renderCluster(c))}
    </div>
  )
}

export default connect(state => ({
  cluster: (state.clusters.current && state.clusters[state.clusters.current]) || {}
}))(ClustersIndex)
