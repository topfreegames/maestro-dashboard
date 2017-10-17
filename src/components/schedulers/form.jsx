import React from 'react'
import { css } from 'glamor'
import { Header, Button, Form, Loading } from 'components/common'
import styles from 'constants/styles'
import schedulerTemplate from 'constants/scheduler_template'

const SchedulersForm = ({
  header,
  scheduler,
  loading,
  handleSubmit,
  isBlank
}) => (
  <div {...SchedulersForm.styles}>
    <Header
      left={header.left}
      right={header.right}
    />
    <section role='main'>
      {(loading || (scheduler && scheduler.fetching)) &&
        <Loading position='fixed' />}
      {(isBlank || (scheduler && !scheduler.fetching)) && <Form
        formFor={scheduler}
        handleSubmit={handleSubmit}
        template={schedulerTemplate}
        button={
          <Button customStyles={{ width: '100%' }} >
            Save
          </Button>
        }
      />}
    </section>
  </div>
)

SchedulersForm.styles = css({
  '& form, & .section': {
    position: 'relative',
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    padding: '16px',

    '> * + *': {
      marginTop: '8px'
    }
  },

  '& form > .section.odd > label': {
    backgroundColor: styles.colors.brandPrimary,
    width: 'calc(100% + 32px)',
    margin: '-16px 0 8px -16px',
    padding: '8px 16px',
    borderRadius: '2px 2px 0 0',
    color: styles.colors.background
  },

  '& .section': {
    marginTop: '16px !important',
    marginBottom: '8px',
    border: `1px solid ${styles.colors.gray_0}`,
    borderRadius: '2px',

    '&.odd, &.odd > div > input': {
      backgroundColor: styles.colors.background
    },
    '&.even, &.even > div > input': {
      backgroundColor: styles.colors.gray_0
    },

    '& + .section': {
      marginTop: '8px !important'
    },

    '> *:first-child:not(button)': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      textTransform: 'uppercase',
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
