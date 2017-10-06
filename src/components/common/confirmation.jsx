import React from 'react'
import { css } from 'glamor'
import { Button } from 'components/common'
import styles from 'constants/styles'

const renderAction = ({ name, func }) => (
  <Button
    key={name}
    variant='flat'
    handleClick={func}
  >
    {name}
  </Button>
)

const Confirmation = ({ title, description, actions, close }) => (
  <div {...Confirmation.styles} onClick={close}>
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{actions && actions.map(x => renderAction(x))}</div>
    </div>
  </div>
)

Confirmation.styles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',

  '> div': {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 30px',
    padding: '16px',
    borderRadius: '2px',
    background: styles.colors.background,
    width: '100%',
    boxShadow: '0 1px 5px 0 rgba(0, 0, 0, 0.3)',

    '> div:nth-of-type(1)': {
      fontSize: styles.fontSizes['4'],
      fontWeight: 500,
      color: styles.colors.gray_100,
      marginBottom: '16px'
    },

    '> div:nth-of-type(2)': {
      fontSize: styles.fontSizes['3'],
      lineHeight: `calc(${styles.fontSizes['3']} + 8px)`,
      fontWeight: 400,
      color: styles.colors.gray_75,
      marginBottom: '24px'
    },

    '> div:nth-of-type(3)': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',

      '> * + *': {
        marginLeft: '30px'
      }
    }
  }
})

export default Confirmation
