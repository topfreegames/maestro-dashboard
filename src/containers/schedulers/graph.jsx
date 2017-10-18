import React from 'react'
import { connect } from 'react-redux'
import ReactTimeout from 'react-timeout'
import { css } from 'glamor'
import { Spinner } from 'components/common'
import Timeframes from 'components/schedulers/graph/timeframes'
import styles from 'constants/styles'

const getEmbedId = async argsObj => {
  const url = Object.entries(argsObj)
    .reduce(
      (acc, [k, v]) => `${acc}${k}=${v}&`,
      `${process.env.GRAPH_HOST}/graph?`
    )
  const res = await fetch(url)
  return res.json()
}

class Graph extends React.Component {
  constructor () {
    super()

    this.state = {
      activeTimeframe: '1_hour',
      embedId: null
    }
  }

  getEmbedId = async () => {
    const { scheduler, region, upUsage, downUsage } = this.props
    const { embedId } = await getEmbedId({
      scheduler,
      region,
      upUsage,
      downUsage,
      timeframe: this.state.activeTimeframe
    })
    this.setState({ embedId })
  }

  componentDidMount = () => this.getEmbedId()

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.activeTimeframe !== this.state.activeTimeframe) {
      this.getEmbedId()
    }
  }

  changeTimeframe = activeTimeframe => this.setState({ activeTimeframe })

  render = () => {
    const { embedId, activeTimeframe } = this.state

    return (
      <div
        {...Graph.styles}
        {...Graph.stylesWithEmbed({ isActive: !!embedId })}
        ref={e => (this.wrapper = e)}
      >
        {!embedId && <Spinner r={0} g={0} b={0} />}
        {embedId &&
          <Timeframes
            changeTimeframe={this.changeTimeframe}
            activeTimeframe={activeTimeframe}
          />
        }
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

    '> ul': {
      marginBottom: '12px'
    },

    '> iframe': {
      display: 'flex',
      flex: '1 1 auto',
      width: '100%',
      height: '180px',
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
