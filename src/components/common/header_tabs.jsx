import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const renderTab = (name, activeTab, switchTab) => (
  <div
    className={activeTab === name && 'active'}
    onClick={event => switchTab(event, name)}>
    {name}
  </div>
)

const HeaderTabs = ({ switchTab, activeTab }) => (
  <div {...HeaderTabs.styles}>
    {renderTab('Clusters', activeTab, switchTab)}
    {renderTab('Schedulers', activeTab, switchTab)}
  </div>
)

const smallStyles = css({
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
      color: styles.colors.gray_75,
      cursor: 'pointer',

      '&.active': {
        color: styles.colors.gray_100,
        borderColor: styles.colors.brandPrimary
      }
    }
  }
})

HeaderTabs.styles = css(
  smallStyles
)

export default HeaderTabs
