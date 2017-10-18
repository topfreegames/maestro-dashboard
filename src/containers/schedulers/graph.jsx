import React from 'react'
import { connect } from 'react-redux'
import ReactTimeout from 'react-timeout'
import { css } from 'glamor'
import { Spinner } from 'components/common'
import styles from 'constants/styles'

const getEmbedId = async (scheduler, region) => {
  const res =
    await fetch(`${process.env.GRAPH_HOST}/graph?scheduler=${scheduler}&region=${region}`)
  return res.json()
}

class Graph extends React.Component {
  constructor () {
    super()
    this.state = { embedId: null }
  }

  componentDidMount = async () => {
    const { scheduler, region } = this.props
    const { embedId } = await getEmbedId(scheduler, region)
    this.setState({ embedId })
  }

  render = () => {
    const { embedId } = this.state

    return (
      <div
        {...Graph.styles}
        {...Graph.stylesWithEmbed({ isActive: !!embedId })}
        ref={e => (this.wrapper = e)}
      >
        {!embedId && <Spinner r={0} g={0} b={0} />}
        {embedId &&
          <iframe
            src={`https://app.datadoghq.com/graph/embed?token=${embedId}&amp;width=${this.wrapper.offsetWidth}&amp;height=200&amp;legend=false`}
            scrolling='no'
            seamless='seamless'
          />
        }
      </div>
    )
  }
}

Graph.styles = css({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  borderTop: `1px solid ${styles.colors.gray_0}`
})

Graph.stylesWithEmbed = ({ isActive } = { isActive: false }) =>
  isActive ? css({
    paddingTop: '16px',
    paddingBottom: 'calc(180px)',

    '> iframe': {
      display: 'flex',
      flex: '1 1 auto',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: '16px',
      left: 0,
      border: 'none',

      '& .graph_embed': {
        transformOrigin: 'top',
        transform: 'scale(0.5)'
      }
    }
  }) : {}

export default connect(state => ({
  region: state.clusters[state.clusters.current].region
}))(ReactTimeout(Graph))
