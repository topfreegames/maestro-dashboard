import React from 'react'
import Header from 'components/common/header'
import styles from 'constants/styles'
import { renderScheduler } from 'constants/scheduler_template'
import { css } from 'glamor'

const SchedulersNew = ({
  headerTitle,
  scheduler,
  handleChange,
  handleSubmit
}) => (
  <div {...SchedulersNew.styles}>
    <Header title={headerTitle} />
    <section role='main'>
      {renderScheduler(scheduler, handleChange)}
      <button onClick={handleSubmit}>Create</button>
    </section>
  </div>
)

SchedulersNew.styles = css({
  '> section[role="main"], .section': {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    padding: '16px'
  },

  '& .section': {
    marginTop: '8px',
    border: `1px solid ${styles.colors.gray_25}`,

    '> label': {
      color: `${styles.colors.gray_100} !important`,
      margin: '0 0 8px -4px !important',
      fontSize: `${styles.fontSizes[`3`]} !important`,
      fontWeight: 600
    }
  }
})

export default SchedulersNew
