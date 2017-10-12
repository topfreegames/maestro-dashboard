import React from 'react'
import { connect } from 'react-redux'
import ReactTimeout from 'react-timeout'
import { css } from 'glamor'
import { Spinner } from 'components/common'
import styles from 'constants/styles'

const snapshotInterval = 60000

const getSnapshot = async (scheduler, region) => {
  const res =
    await fetch(`${process.env.GRAPH_HOST}/graph?scheduler=${scheduler}&region=${region}`)
  return (await res.json()).snapshot
}

class Graph extends React.Component {
  constructor () {
    super()

    this.state = {
      snapshotUrl: null
    }
  }

  componentDidMount = async () => {
    this.refreshSnapshot()
    this.refreshLoop()
  }

  refreshLoop = () => {
    this.props.setTimeout(() => {
      this.refreshSnapshot()
      this.refreshLoop()
    }, snapshotInterval)
  }

  refreshSnapshot = async () => {
    const snapshotUrl = await getSnapshot(this.props.scheduler, this.props.region)
    if (snapshotUrl === this.state.snapshotUrl) return
    this.setState({ snapshotUrl })
  }

  render = () => {
    const { snapshotUrl } = this.state

    return (
      <div {...Graph.styles}>
        {!snapshotUrl && <Spinner r={0} g={0} b={0} />}
        {snapshotUrl && <img src={snapshotUrl} />}
      </div>
    )
  }
}

Graph.styles = css({
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${styles.colors.gray_0}`,
  paddingTop: '16px',

  '> img': {
    marginLeft: '-10px',
    width: 'calc(100% + 10px)',
    height: 'auto',

    '& + img': {
      marginTop: '8px'
    }
  }
})

export default connect(state => ({
  region: state.clusters[state.clusters.current].region
}))(ReactTimeout(Graph))
