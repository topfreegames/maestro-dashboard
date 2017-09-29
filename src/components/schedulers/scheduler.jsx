import React from 'react'
import { css } from 'glamor'
import { TextInput, Button } from 'components/common'
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
      <button onClick={() => navigate(`schedulers/${name}/edit`)}>
        <i className='fa fa-ellipsis-v' aria-hidden='true' />
      </button>
    </div>
    <div>{game}</div>
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
    </div>
    <div>
      <TextInput id='minimum' label='Minimum' value={minimum} onChange={handleChange} />
      <TextInput id='replicas' label='Replicas' value={replicas} onChange={handleChange} />
      <Button>Save</Button>
    </div>
  </div>
)

Scheduler.styles = css({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: '100%',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.2)',
  padding: '10px',

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

    '> button': {
      color: styles.colors.gray_75,
      fontSize: styles.fontSizes['3']
    }
  },

  '> div:nth-of-type(2)': {
    fontSize: styles.fontSizes['3'],
    color: styles.colors.gray_100
  },

  '> div:nth-of-type(3)': {
    fontSize: styles.fontSizes['3'],
    color: styles.colors.gray_100,

    '> div': {
      display: 'flex',
      alignItems: 'center',

      '& + div': {
        marginLeft: '20px'
      }
    },

    '& label': {
      marginRight: '10px'
    },

    '& .fa': {
      marginRight: '4px'
    }
  },

  '> div:nth-of-type(4)': {
    borderTop: `1px solid ${styles.colors.gray_0}`,
    paddingTop: '16px',

    '> div': {
      display: 'flex',
      justifyContent: 'center',
      width: '25%',

      '& input': {
        textAlign: 'center'
      },

      '& + div': {
        marginLeft: '20px'
      }
    },

    '> button': {
      marginLeft: 'auto'
    }
  }
})

export default Scheduler
