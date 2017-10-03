import React from 'react'
import { css } from 'glamor'
import { Spinner } from 'components/common'
import styles from 'constants/styles'
import { randomString } from 'helpers/common'

const end = Math.round(new Date() / 1000)
const start = end - 1000*60*60

const getSnapshot = async (scheduler, type) => {
  const res =
    await fetch(`http://localhost:9000/graph?scheduler=${scheduler}&type=${type}`)
  return (await res.json()).snapshot_url
}

class Graph extends React.Component {
  constructor () {
    super()

    this.state = {
      imagesReady: false,
      occupiedSnapshotUrl: null,
      readySnapshotUrl: null
    }
  }

  componentDidMount = async () => {
    const readySnapshotUrl = await getSnapshot('tanks-blue-d-con', 'ready')
    const occupiedSnapshotUrl = await getSnapshot('tanks-blue-d-con', 'occupied')

    this.maybeForceUpdate()

    this.setState({
      ...this.state,
      readySnapshotUrl,
      occupiedSnapshotUrl
    })
  }

  maybeForceUpdate = async () => {
    const { readyImg, occupiedImg } = this
    const { readySnapshotUrl, occupiedSnapshotUrl } = this.state

    if (!readyImg || !readySnapshotUrl ||
      !occupiedImg || !occupiedSnapshotUrl ||
      (readyImg.naturalWidth <= 1) ||
      (occupiedImg.naturalWidth <= 1)) {
      this.forceUpdate()
      setTimeout(() => this.maybeForceUpdate(), 1000)
    } else {
      this.setState({
        ...this.state,
        imagesReady: true
      })
    }
  }

  imgStyle = ready =>
    ready ? {} : { position: 'absolute', top: '-1000px', left: '-1000px' }

  render = () => {
    return (
      <div {...Graph.styles}>
        {!this.state.imagesReady && <Spinner />}
        <img
          ref={img => (this.readyImg = img)}
          src={`${this.state.readySnapshotUrl}?${randomString(10)}`}
          style={this.imgStyle(this.state.imagesReady)}
        />
        <img
          ref={img => (this.occupiedImg = img)}
          src={`${this.state.occupiedSnapshotUrl}?${randomString(10)}`}
          style={this.imgStyle(this.state.imagesReady)}
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

export default Graph
