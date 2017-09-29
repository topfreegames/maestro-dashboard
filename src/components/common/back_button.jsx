import React from 'react'
import { css } from 'glamor'
import history from 'constants/history'
import styles from 'constants/styles'

const back = () => history.go(-1)

const buttonStyles = css({
  color: styles.colors.gray_100,
  fontSize: styles.fontSizes['5']
})

export default () =>
  <button {...buttonStyles} onClick={back}>
    <i className='fa fa-arrow-left' aria-hidden='true' />
  </button>
