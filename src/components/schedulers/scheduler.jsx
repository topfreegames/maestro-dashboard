import React from 'react'
import { css } from 'glamor'
import { Loading, Button, Form } from 'components/common'
import Graph from 'containers/schedulers/graph'
import { navigate } from 'actions/common'
import styles from 'constants/styles'
import basicSchedulerTemplate from 'constants/basic_scheduler_template'

const wrapperStyles = css({
  position: 'relative',
  width: '100%',
  boxSizing: 'border-box',

  [`@media(max-width: ${styles.sizes.maxSmall})`]: {
    '& + div': { marginTop: '16px' }
  },

  [`@media(min-width: ${styles.sizes.minLarge})`]: {
    margin: '15px',
    width: '350px'
  }
})

const Scheduler = ({
  name,
  state,
  game,
  ready,
  occupied,
  occupancy,
  minimum,
  replicas,
  showGraph,
  fetching,
  handleChange,
  handleSubmit,
  toggleGraphs,
  tvMode,
  globalMode,
  activeTimeframe,
  upUsage,
  downUsage,
  region
}) => (
  <div {...wrapperStyles}>
    {fetching && <Loading />}
    <div className={minimum === 0 && 'disabled'} {...Scheduler.styles} {...Scheduler.stylesByState(state)}>
      <div>
        {name}
        {globalMode && <span>{region}</span>}
        {!tvMode && <button onClick={() => navigate(`schedulers/${name}/edit`)}>
          <i className='fa fa-ellipsis-v' aria-hidden='true' />
        </button>}
      </div>
      <div>
        <div>
          <label>Game</label>
          {game}
        </div>
        <div>
          <label>State</label>
          {state}
        </div>
      </div>
      <div>
        <div>
          <div>
            <label>Ready</label>
            <i className='fa fa-play-circle' aria-hidden='true' />
            {ready}
          </div>
          <div>
            <label>Occupied</label>
            <i className='fa fa-ban' aria-hidden='true' />
            {occupied}
          </div>
          <div className={(occupancy > upUsage) && 'critical'}>{(occupancy * 100).toPrecision(3)}%</div>
        </div>
        {!tvMode && <Button
          variant={showGraph ? 'inverse' : 'ghost'}
          size='small'
          handleClick={toggleGraphs}
        >
          <i className='fa fa-area-chart' aria-hidden='true' />
        </Button>}
      </div>
      {(showGraph || tvMode) && minimum !== 0 &&
        <Graph
          scheduler={name}
          upUsage={upUsage}
          downUsage={downUsage}
          region={region}
          tvMode={tvMode}
          activeTimeframe={activeTimeframe}
        />
      }
      {!tvMode && <div className='footer'>
        <Form
          formFor={{ minimum, replicas }}
          handleSubmit={handleSubmit}
          template={basicSchedulerTemplate}
          button={
            <Button
              variant={fetching && 'inverse'}
            >
              {fetching && 'Saving'}
              {!fetching && 'Save'}
            </Button>
          }
        />
      </div>}
    </div>
  </div>
)

Scheduler.stylesByState = state => {
  let color
  if (state === 'overdimensioned') color = styles.colors.brandInverse
  else if (state === 'subdimensioned') color = styles.colors.brandSecondary
  else color = styles.colors.background

  return css({
    boxShadow: `0 1px 4px 0 rgba(0, 0, 0, 0.2), inset 0 0px 0 2px ${color}, inset 0 3px 0 2px ${color}`
  })
}

Scheduler.styles = css({
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: '100%',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.2)',
  padding: '10px',
  overflow: 'hidden',
  background: styles.colors.background,

  '&.disabled, &.disabled input': {
    background: `${styles.colors.gray_0} !important`
  },

  '> .fetching': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },

  '& label': {
    fontSize: styles.fontSizes['2'],
    color: styles.colors.gray_50,
    textTransform: 'uppercase'
  },

  '& + &': {
    marginTop: '16px'
  },

  '> div': {
    display: 'flex',
    color: styles.colors.gray_100,

    '& + div': {
      marginTop: '16px'
    }
  },

  '> div:nth-of-type(1)': {
    justifyContent: 'space-between',
    fontSize: styles.fontSizes['4'],
    fontWeight: 500,
    color: styles.colors.brandSecondary,

    '> span': {
      color: styles.colors.gray_100
    },

    '> button': {
      padding: '0 8px',
      color: styles.colors.gray_75,
      fontSize: styles.fontSizes['3']
    }
  },

  '> div:nth-of-type(2)': {
    fontSize: styles.fontSizes['3'],
    color: styles.colors.gray_100,

    '> div': {
      '> label': { marginRight: '8px' },
      '& + div': { marginLeft: '12px' }
    }
  },

  '> div:nth-of-type(3)': {
    justifyContent: 'space-between',
    fontSize: styles.fontSizes['3'],
    color: styles.colors.gray_100,

    '> div': {
      display: 'flex',

      '> div': {
        display: 'flex',
        alignItems: 'center',

        '& + div': {
          marginLeft: '12px'
        }
      },

      '> div:nth-of-type(3)': {
        color: styles.colors.gray_100,

        '&.critical': {
          color: styles.colors.brandSecondary
        }
      },

      '& label': {
        marginRight: '10px'
      },

      '& .fa': {
        marginRight: '4px'
      }
    }
  },

  '> div.footer': {
    borderTop: `1px solid ${styles.colors.gray_0}`,
    paddingTop: '16px',

    '> form': {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',

      '> div': {
        width: '25%',

        '& + div': {
          marginLeft: '20px'
        }
      },

      '> button': {
        alignSelf: 'center',
        marginLeft: 'auto'
      }
    }
  }
})

export default Scheduler
