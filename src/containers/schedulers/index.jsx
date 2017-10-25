import React from 'react'
import ResizeAware from 'react-resize-aware'
import { css } from 'glamor'
import { connect } from 'react-redux'
import ReactTimeout from 'react-timeout'
import fuzzy from 'fuzzy'
import SchedulersComponent from 'components/schedulers'
import { getSchedulers } from 'actions/schedulers'
import { getSchedulersFromState } from 'helpers/common'

const sortSchedulers = schedulers =>
  schedulers
    .sort((a, b) => {
      const aMin = a.autoscalingMin
      const bMin = b.autoscalingMin

      if (aMin !== 0 && bMin !== 0) {
        const aState = a.state
        const bState = b.state

        if (aState === bState) {
          const calcOcc = x =>
            x.roomsOccupied / (x.roomsOccupied + x.roomsReady)

          const occA = calcOcc(a)
          const occB = calcOcc(b)

          if (occA === occB) {
            return 0
          } else {
            if (isNaN(occA)) return 1
            if (isNaN(occB)) return -1
            return occA < occB ? 1 : -1
          }
        } else {
          const states =
            ['in-sync', 'creating', 'terminating', 'overdimensioned', 'subdimensioned']

          const iA = states.findIndex(e => e === aState)
          const iB = states.findIndex(e => e === bState)

          return iA < iB ? 1 : -1
        }
      } else {
        return aMin < bMin ? 1 : -1
      }
    })

class Schedulers extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      scaleFactor: 1,
      cardsPerRow: 3
    }
  }

  doGetSchedulers = () => {
    this.props.globalMode
      ? this._doGetSchedulersGlobal() : this._doGetSchedulersFromCluster()
  }

  _doGetSchedulersFromCluster = () => {
    this.props.dispatch(getSchedulers(this.props.cluster))
  }

  _doGetSchedulersGlobal = () => {
    const clusters = JSON.parse(process.env.CLUSTERS)

    clusters.forEach(c => {
      if (this.props.clusters[c.name] && this.props.clusters[c.name].token) {
        this.props.dispatch(getSchedulers(this.props.clusters[c.name]))
      }
    })
  }

  updateSchedulersLoop = () => {
    if (this.props.cluster) this.doGetSchedulers()
    this.props.setTimeout(() => this.updateSchedulersLoop(), 1000 * 60)
  }

  componentDidMount = () => this.updateSchedulersLoop()

  componentWillReceiveProps = nextProps => {
    if (!this.props.cluster && nextProps.cluster) {
      this.doGetSchedulers()
    } else if (this.props.cluster && nextProps.cluster &&
      nextProps.cluster.name !== this.props.cluster.name) {
      this.doGetSchedulers()
    }
  }

  applyFilter = (filter, field, schedulers) =>
    fuzzy
      .filter(filter, schedulers, {
        extract: el => el[field]
      })
      .map(el => el.original)

  handleResize = ({ width }) => {
    const minWidth = 350 + 40
    let fits = width / minWidth
    let iFits = parseInt(fits)
    const cardsPerRow = process.env.CARDS_PER_ROW
    if (iFits > cardsPerRow) {
      iFits = cardsPerRow
    }
    const scaleFactor = 1 + (fits - iFits) / iFits
    if (scaleFactor !== Infinity) {
      this.setState({ scaleFactor, cardsPerRow: iFits })
    }
  }

  scaleCss = () => css({
    transformOrigin: 'top left',
    transform: `scale(${this.state.scaleFactor})`,
    maxWidth: `calc(390px * ${this.state.cardsPerRow})`
  })

  render = () => (
    <ResizeAware
      style={{ position: 'relative' }}
      onlyEvent
      onResize={this.handleResize}
    >
      <div {...this.scaleCss()}>
        <SchedulersComponent
          activeTimeframe={this.props.activeTimeframe}
          tvMode={this.props.tvMode}
          globalMode={this.props.globalMode}
          schedulerFilter={this.props.schedulerFilter}
          schedulers={
            sortSchedulers(
              this.applyFilter(this.props.schedulerFilter, 'name',
                this.applyFilter(this.props.gameFilter, 'game', this.props.schedulers)
              )
            )
          }
          fetching={this.props.fetching}
        />
      </div>
    </ResizeAware>
  )
}

export default connect((state, ownProps) => ({
  clusters: state.clusters,
  cluster: state.clusters[state.clusters.current],
  schedulers: getSchedulersFromState(state, ownProps),
  fetching: state.schedulers.index.fetching
}))(ReactTimeout(Schedulers))
