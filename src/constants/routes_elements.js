import React from 'react'
import Home from 'containers/home'
import GACallback from 'containers/ga_callback'

const BlankDiv = () => (<div />)

export default {
  home: {
    element: Home
  },
  gACallback: {
    element: GACallback
  },
  default: {
    element: BlankDiv
  }
}
