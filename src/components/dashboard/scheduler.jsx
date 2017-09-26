import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const Scheduler = props => (
  <div {...Scheduler.styles}>
    <div>
      <div><label>Scheduler</label>{props.name}</div>
      <div><label>Game</label>{props.game}</div>
      <div>Save</div>
    </div>
    <div>
      <div>Replicas</div>
      <div><label>Minimum</label><input type='text' value={props.autoscaling.min} /></div>
      <div><label>Current</label><input type='text' value={props.autoscaling.min} /></div>
    </div>
    <div>
      <div>Room Status</div>
      <div><label>Ready</label>{props.status.roomsAtReady}</div>
      <div><label>Occupied</label>{props.status.roomsAtOccupied}</div>
    </div>
  </div>
)

Scheduler.styles = css({
  flexDirection: 'column',
  fontSize: styles.fontSizes['3'],

  '> div': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  '> div + div': {
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: `1px solid ${styles.colors.gray_0}`
  },

  '> div:nth-of-type(1)': {
    '> div:nth-of-type(1)': {
      color: styles.colors.red
    },

    '& label': {
      display: 'block',
      fontSize: styles.fontSizes['2'],
      fontWeight: 700,
      textTransform: 'uppercase',
      color: styles.colors.gray_100
    },

    '> div:nth-of-type(3)': {
      fontSize: styles.fontSizes['3'],
      fontWeight: 700,
      background: styles.colors.yellow,
      padding: '8px 30px',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  },

  '> div:nth-of-type(2), > div:nth-of-type(3)': {
    '> div': {
      width: '33.333333%'
    },

    '> div:nth-of-type(1)': {
      textTransform: 'uppercase',
      fontSize: styles.fontSizes['2'],
      fontWeight: 700
    },

    '& label': {
      display: 'block',
      fontSize: styles.fontSizes['1'],
      fontWeight: 700,
      textTransform: 'uppercase',
      color: styles.colors.gray_50
    }
  },

  '& input': {
    width: '90%',
    boxSizing: 'border-box',
    fontSize: styles.fontSizes['3'],
    border: 'none',
    borderBottom: `2px solid ${styles.colors.gray_25}`,
    padding: '4px 8px',

    '&:focus': {
      fontWeight: 700,
      borderColor: styles.colors.yellow
    }
  }
})

export default Scheduler
