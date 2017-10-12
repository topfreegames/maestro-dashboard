import React from 'react'
import { css } from 'glamor'
import styles from 'constants/styles'

const renderTab = (name, activeTab, switchTab) => (
  <div
    key={name}
    className={activeTab === name && 'active'}
    onClick={event => switchTab(event, name)}>
    {name}
  </div>
)

const HeaderTabs = ({ tabs, switchTab, activeTab }) => (
  <div {...HeaderTabs.styles}>
    {tabs.map(t => renderTab(t, activeTab, switchTab))}
  </div>
)

const smallStyles = css({
  display: 'flex',
  width: '100%',

  '& div': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    width: '50%',
    height: '48px',
    borderBottom: `2px ${styles.colors.gray_0} solid`,
    fontSize: styles.fontSizes['5'],
    color: styles.colors.gray_50,
    cursor: 'pointer',

    '&.active': {
      color: styles.colors.brandPrimary,
      borderColor: styles.colors.brandPrimary
    }
  }
})

HeaderTabs.styles = css(
  smallStyles
)

export default HeaderTabs
