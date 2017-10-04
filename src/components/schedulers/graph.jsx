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
      snapshotUrl: null
    }
  }

  componentDidMount = async () => {
    const snapshotUrl = await getSnapshot('tanks-blue-d-con')

    this.maybeForceUpdate()

    this.setState({
      ...this.state,
      snapshotUrl
    })
  }

  maybeForceUpdate = async () => {
    const { img } = this
    const { snapshotUrl } = this.state

    if (!img || !snapshotUrl ||
      (img.naturalWidth <= 1)) {
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
        {!this.state.imagesReady && <Spinner r={0} g={0} b={0} />}
        <img
          ref={img => (this.img = img)}
          src={`${this.state.snapshotUrl}?${randomString(10)}`}
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
