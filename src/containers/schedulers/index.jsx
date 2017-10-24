import React from 'react'
import ResizeAware from 'react-resize-aware'
import { css } from 'glamor'
import { connect } from 'react-redux'
import fuzzy from 'fuzzy'
import SchedulersComponent from 'components/schedulers'
import { getSchedulers } from 'actions/schedulers'
import ReactTimeout from 'react-timeout'

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

  doGetSchedulers = () => this.props.dispatch(getSchedulers())

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
    if (iFits > 3) {
      iFits = 3
    }
    const scaleFactor = 1 + (fits - iFits) / iFits
    if (scaleFactor !== Infinity) {
      console.log(iFits)
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

export default connect(state => ({
  cluster: state.clusters[state.clusters.current],
  schedulers: state.schedulers.index.schedulers,
  fetching: state.schedulers.index.fetching
}))(ReactTimeout(Schedulers))
