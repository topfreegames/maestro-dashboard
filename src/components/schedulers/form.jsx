import React from 'react'
import { css } from 'glamor'
import Header from 'components/common/header'
import { Button, Form } from 'components/common'
import styles from 'constants/styles'
import schedulerTemplate from 'constants/scheduler_template'

const SchedulersForm = ({
  header,
  scheduler,
  handleSubmit
}) => (
  <div {...SchedulersForm.styles}>
    <Header
      left={header.left}
      right={header.right}
    />
    <section role='main'>
      <Form
        formFor={scheduler}
        handleSubmit={handleSubmit}
        template={schedulerTemplate}
        button={
          <Button customStyles={{ width: '100%' }} >
            Save
          </Button>
        }
      />
    </section>
  </div>
)

SchedulersForm.styles = css({
  '> section[role="main"] > form, & .section': {
    position: 'relative',
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

export default SchedulersForm
