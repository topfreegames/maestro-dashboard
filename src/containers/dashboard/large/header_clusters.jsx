import React from 'react'
import { connect } from 'react-redux'
import { AutoComplete } from 'components/common'
import { selectCluster } from 'actions/clusters'

const clusters = JSON.parse(process.env.CLUSTERS)

class HeaderClusters extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      clusterName: (this.props.cluster && this.props.cluster.name) || ''
    }
  }

  handleClusterNameChange = e => {
    const selected = e.target.value
    if (this.props.cluster && selected === this.props.cluster.name) return

    this.props.dispatch(selectCluster(clusters.find(e => e.name === selected)))
    this.setState({ clusterName: selected })
  }

  render = () => (
    <AutoComplete
      disableDefault
      value={this.state.clusterName}
      handleChange={this.handleClusterNameChange}
      placeholder='Select a Cluster'
      options={clusters.map(c => c.name)}
    />
  )
}

export default connect(state => ({
  cluster: state.clusters[state.clusters.current]
}))(HeaderClusters)
