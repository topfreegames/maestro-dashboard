import React from 'react'
import { css } from 'glamor'
import Header from 'components/common/header'
import styles from 'constants/styles'
import { render } from 'helpers/templates'
import schedulerTemplate from 'constants/scheduler_template'

const SchedulersEdit = ({
  headerTitle,
  scheduler,
  handleChange,
  handleAdd,
  handleSubmit
}) => (
  <div {...SchedulersEdit.styles}>
    <Header title={headerTitle()} />
    <section role='main'>
      {render(schedulerTemplate, scheduler, handleChange, handleAdd)}
      <button onClick={handleSubmit}>Save</button>
    </section>
  </div>
)

SchedulersEdit.styles = css({
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
      textTransform: 'uppercase',
      color: `${styles.colors.gray_100} !important`,
      margin: '0 0 8px -4px !important',
      fontSize: `${styles.fontSizes[`3`]} !important`,
      fontWeight: 600
    }
  }
})

export default SchedulersEdit