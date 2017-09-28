import React from 'react'
import { css } from 'glamor'
import HeaderBar from 'components/common/header_bar'
import HeaderTabs from 'components/common/header_tabs'
import styles from 'constants/styles'

const Header = ({ title, switchTab, activeTab }) => (
  <div {...Header.styles}>
    <HeaderBar title={title} />
    {switchTab && activeTab &&
      <HeaderTabs switchTab={switchTab} activeTab={activeTab} />}
    {!switchTab && !activeTab && <div />}
  </div>
)

const commonStyles = css({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box'
})

const smallStyles = css({
  [`@media(max-width: ${styles.minWidth})`]: {
    flexDirection: 'column'
  }
})

Header.styles = css(
  commonStyles,
  smallStyles
)

export default Header
