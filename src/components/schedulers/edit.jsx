import React from 'react'
import { css } from 'glamor'
import Header from 'components/common/header'
import { Button, BackButton } from 'components/common'
import styles from 'constants/styles'
import { render } from 'helpers/templates'
import schedulerTemplate from 'constants/scheduler_template'

const headerLeft = scheduler =>
  <div>
    <BackButton />
    <span>{scheduler && scheduler.name}</span>
  </div>

const headerRight = () => <Button variant='secondary' size='small'>Remove</Button>

const SchedulersEdit = ({
  scheduler,
  handleChange,
  handleAdd,
  handleRemove,
  handleSubmit
}) => (
  <div {...SchedulersEdit.styles}>
    <Header
      left={headerLeft(scheduler)}
      right={headerRight()}
    />
    <section role='main'>
      {render(schedulerTemplate, scheduler, handleChange, handleAdd, handleRemove)}
      <Button
        handleClick={handleSubmit}
        customStyles={{ width: '100%' }}
      >
        Save
      </Button>
    </section>
  </div>
)

SchedulersEdit.styles = css({
  '> section[role="main"], .section': {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    padding: '16px',

    '> * + *': {
      marginTop: '8px'
    }
  },

  '& .section': {
    marginTop: '16px !important',
    marginBottom: '8px',
    border: `1px solid ${styles.colors.gray_25}`,

    '& + .section': {
      marginTop: '8px !important'
    },

    '> *:first-child:not(button)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      textTransform: 'uppercase',
      color: `${styles.colors.gray_100}`,
      fontSize: `${styles.fontSizes[`3`]}`,
      fontWeight: 500
    },

    '> button': {
      color: 'auto'
    }
  },

  '> button': {
    marginTop: '20px'
  }
})

export default SchedulersEdit
