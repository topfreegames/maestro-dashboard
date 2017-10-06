import React from 'react'
import ReactTimeout from 'react-timeout'
import { css } from 'glamor'
import { Spinner } from 'components/common'
import styles from 'constants/styles'
import { randomString } from 'helpers/common'

const getSnapshot = async (scheduler, type) => {
  const res =
    await fetch(`${process.env.GRAPH_HOST}/graph?scheduler=${scheduler}&type=${type}`)
  return (await res.json()).snapshot_url
}

class Graph extends React.Component {
  constructor () {
    super()

    this.state = {
      frontSnapshotUrl: null,
      snapshotUrl: null
    }
  }

  componentDidMount = async () => {
    this.refreshSnapshot()
    this.refreshLoop()
    this.maybeForceUpdateLoop()
  }

  refreshLoop = () => {
    this.props.setTimeout(() => {
      this.refreshSnapshot()
      this.refreshLoop()
    }, 10000)
  }

  refreshSnapshot = async () => {
    const snapshotUrl = await getSnapshot('tanks-blue-d-con')
    this.setState({ snapshotUrl })
  }

  maybeForceUpdateLoop = async () => {
    const { imgBack } = this
    const { frontSnapshotUrl, snapshotUrl } = this.state

    this.props.setTimeout(() => this.maybeForceUpdateLoop(), 1000)

    if (frontSnapshotUrl === snapshotUrl) return

    if (!imgBack || !snapshotUrl ||
      (imgBack.naturalWidth <= 1)) {
      this.forceUpdate()
    } else {
      this.setState({ frontSnapshotUrl: snapshotUrl })
    }
  }

  hideImg = { position: 'absolute', top: '-1000px', left: '-1000px' }

  render = () => {
    return (
      <div {...Graph.styles}>
        {!this.state.frontSnapshotUrl && <Spinner r={0} g={0} b={0} />}
        {this.state.frontSnapshotUrl && <img
          src={`${this.state.frontSnapshotUrl}?${randomString(10)}`}
        />}
        <img
          ref={img => (this.imgBack = img)}
          src={`${this.state.snapshotUrl}?${randomString(10)}`}
          style={this.hideImg}
        />
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

export default ReactTimeout(Graph)

