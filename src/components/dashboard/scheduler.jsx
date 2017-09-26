import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const Scheduler = ({ name, game, ready, occupied, minimum, current, handleChange }) => (
  <div {...Scheduler.styles}>
    <div>{name}</div>
    <div><label>Game</label>{game}</div>
    <div>
      <label>Minimum</label>
      <input name='minimum' type='text' value={minimum} onChange={handleChange} />
    </div>
    <div>
      <label>Current</label>
      <input name='current' type='text' value={current} onChange={handleChange} />
    </div>
    <div><label>Ready</label>{ready}</div>
    <div><label>Occupied</label>{occupied}</div>
    <button>Save</button>
  </div>
)

Scheduler.styles = css({
  flexDirection: 'column',

  '> div': {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: styles.fontSizes['3'],
    color: styles.colors.gray_100,
    marginBottom: '4px',

    '> label': {
      marginRight: '8px',
      textTransform: 'uppercase',
      fontSize: styles.fontSizes['1'],
      fontWeight: 700,
      color: styles.colors.gray_50
    },

    '> input': {
      textAlign: 'center',
      display: 'inline-block',
      border: 'none',
      borderBottom: `2px solid ${styles.colors.gray_25}`,
      width: '30%',

      '&:focus': {
        borderColor: styles.colors.yellow,
        fontWeight: 700
      }
    }
  },

  '> div:nth-of-type(1)': {
    marginBottom: '12px',
    fontSize: styles.fontSizes['4'],
    color: styles.colors.red
  },

  '> button': {
    fontSize: styles.fontSizes['3'],
    fontWeight: 700,
    backgroundColor: styles.colors.yellow,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '8px 0',
    marginTop: '8px'
  }
})

export default Scheduler
