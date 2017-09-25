import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const Header = ({ switchTab, activeTab }) => (
  <div {...Header.styles}>
    <div>Maestro</div>
    <div>
      <div
        className={activeTab === 'clusters' && 'active'}
        onClick={event => switchTab(event, 'clusters')}>
        Clusters
      </div>
      <div
        className={activeTab === 'schedulers' && 'active'}
        onClick={event => switchTab(event, 'schedulers')}>
        Schedulers
      </div>
    </div>
  </div>
)

Header.styles = css({
  // Header
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',

  [`@media (min-width: ${styles.minWidth}) and (max-width: ${styles.maxWidth})`]: {
    flexDirection: 'row',
    padding: '20px 30px'
  },
  [`@media(max-width: ${styles.minWidth})`]: {
    flexDirection: 'column'
  },

  // Maestro
  '> div:nth-of-type(1)': {
    fontWeight: '700',
    fontSize: '18px',

    [`@media (min-width: ${styles.minWidth}) and (max-width: ${styles.maxWidth})`]: {
    },

    [`@media(max-width: ${styles.minWidth})`]: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      width: '100%',
      height: '48px',
      paddingLeft: '16px',
      borderBottom: `1px ${styles.colors.gray_0} solid`
    }
  },

  // Clusters & Schedulers
  '> div:nth-of-type(2)': {
    '& div': {
      cursor: 'pointer'
    },

    [`@media (min-width: ${styles.minWidth}) and (max-width: ${styles.maxWidth})`]: {
      display: 'inline-flex',
      marginLeft: 'auto',

      '& div': {
        padding: '6px 14px',
        borderRadius: '10px',
        border: `2px solid ${styles.colors.gray_25}`,
        color: '#757ab0',
        fontSize: '14px',

        '&.active': {
          borderColor: styles.colors.yellow,
          color: styles.colors.yellow
        }
      },

      '& div + div': {
        marginLeft: '20px'
      }
    },

    [`@media(max-width: ${styles.minWidth})`]: {
      display: 'flex',
      width: '100%',

      '& div': {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        width: '50%',
        height: '48px',
        paddingLeft: '16px',
        borderBottom: `3px ${styles.colors.gray_0} solid`,

        '&.active': {
          borderColor: styles.colors.red
        }
      }
    }
  }
})

export default Header
