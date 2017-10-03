import React from 'react'
import { css } from 'glamor'
import { Spinner } from 'components/common'
import styles from 'constants/styles'

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
    if ((!this.readyImg && this.state.readySnapshotUrl) ||
      (this.readyImg && this.readyImg.naturalWidth <= 1)) {
      this.forceUpdate()
      setTimeout(this.maybeForceUpdate(), 500)
    } else {
      this.setState({
        ...this.state,
        imagesReady: true
      })
    }
  }

  render = () => {
    return (
      <div {...Graph.styles}>
        {!this.state.imagesReady && <Spinner />}
        {this.state.imagesReady &&
          <img
            ref={img => (this.readyImg = img)}
            src={this.state.readySnapshotUrl}
          />
        }
        {this.state.imagesReady &&
          <img
            ref={img => (this.occupiedImg = img)}
            src={this.state.occupiedSnapshotUrl}
          />
        }
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