import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { Button } from 'components/common'
import { selectCluster } from 'actions/clusters'
import { navigate } from 'actions/common'

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
    <Button
      key={name}
      handleClick={e => this.handleClick(e, { name, host })}
    >
      {name}
    </Button>
  )

  handleClick = (event, cluster) => {
    event.preventDefault()
    if (cluster.name === this.props.cluster.name) {
      navigate('dashboard')
    } else {
      this.props.dispatch(selectCluster(cluster))
    }
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.cluster.name !== nextProps.cluster.name) {
      navigate('dashboard')
    }
  }

  render = () => (
    <div {...ClustersIndex.styles}>
      {clusters.map(c => this.renderCluster(c))}
    </div>
  )
}

ClustersIndex.styles = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',

  '& button': {
    width: '100%',

    '& + button': {
      marginTop: '16px'
    }
  }
})

export default connect(state => ({
  cluster: (state.clusters.current && state.clusters[state.clusters.current]) || {}
}))(ClustersIndex)
