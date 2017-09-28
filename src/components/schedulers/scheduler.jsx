import React from 'react'
import { css } from 'glamor'
import { navigate } from 'actions/common'
import styles from 'constants/styles'

const Scheduler = ({
  name,
  game,
  ready,
  occupied,
  minimum,
  replicas,
  handleChange,
  handleSubmit
}) => (
  <div {...Scheduler.styles}>
    <div>
      {name}
      <button onClick={() => navigate(`schedulers/${name}/edit`)}>...</button>
    </div>
    <div><label>Game</label>{game}</div>
    <div>
      <label>Minimum</label>
      <input name='minimum' type='text' value={minimum} onChange={handleChange} />
    </div>
    <div>
      <label>Replicas</label>
      <input name='replicas' type='text' value={replicas} onChange={handleChange} />
    </div>
    <div><label>Ready</label>{ready}</div>
    <div><label>Occupied</label>{occupied}</div>
    <button onClick={handleSubmit}>Save</button>
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
      fontSize: styles.fontSizes['2'],
      fontWeight: 600,
      color: styles.colors.gray_50
    },

    '> input': {
      textAlign: 'center',
      fontSize: styles.fontSizes['3'],
      display: 'inline-block',
      border: 'none',
      borderBottom: `2px solid ${styles.colors.gray_25}`,
      width: '30%',

      '&:focus': {
        borderColor: styles.colors.brandPrimary,
        fontWeight: 700
      }
    }
  },

  '> div:nth-of-type(1)': {
    marginBottom: '16px',
    fontSize: styles.fontSizes['4'],
    color: styles.colors.brandPrimary
  },

  '> button': {
    fontSize: styles.fontSizes['3'],
    fontWeight: 400,
    backgroundColor: styles.colors.brandPrimary,
    color: styles.colors.white,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    padding: '8px 0',
    marginTop: '8px'
  }
})

export default Scheduler
