import React from 'react'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { Button } from 'components/common'
import { selectCluster } from 'actions/clusters'
import { navigate } from 'actions/common'

const clusters = JSON.parse(process.env.CLUSTERS)

class ClustersIndex extends React.Component {
  renderCluster = cluster => (
    <Button
      key={cluster.name}
      handleClick={e => this.handleClick(e, cluster)}
      variant={(this.props.cluster.name !== cluster.name) && 'ghost'}
      customStyles={buttonCustomStyles}
    >
      {cluster.name}
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
      this.props.switchToSchedulers()
    }
  }

  render = () => (
    <div {...ClustersIndex.styles}>
      {clusters.map(c => this.renderCluster(c))}
    </div>
  )
}

const buttonCustomStyles = css({
  width: '100%',

  '& + button': {
    marginTop: '16px'
  }
})

ClustersIndex.styles = css({
  display: 'flex',
  flexDirection: 'column'
})

export default connect(state => ({
  cluster: (state.clusters.current && state.clusters[state.clusters.current]) || {}
}))(ClustersIndex)
