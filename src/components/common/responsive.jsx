import React from 'react'
import MediaQuery from 'react-responsive'
import styles from 'constants/styles'

export const Small = ({ children }) =>
  <MediaQuery maxWidth={styles.sizes.maxSmall}>
    {children}
  </MediaQuery>

export const Large = ({ children }) =>
  <MediaQuery minWidth={styles.sizes.minLarge}>
    {children}
  </MediaQuery>
